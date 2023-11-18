import React, {useState, useEffect} from 'react'
import { useQuery } from "react-query";
import axios from "axios";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


let ENDPOINT = "";
if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://127.0.0.1:8000";
} else {
  ENDPOINT =
    "http://clothing-calculator-env.eba-qnfpfgsz.us-west-2.elasticbeanstalk.com/";
}

const URL = `${ENDPOINT}/app/showroom/`;
const fetchStyles = async ({queryKey}) => {
    const [_, currentUser] = queryKey
    console.log('user', currentUser)
    if(currentUser){
        const { id: userId, userEmail, expiration } = currentUser;
        const result = await axios.get(`${URL}${userId}`);
        console.log('result',result.data)
        return result.data;
    }
  return null
};


interface ShowRoomProps {
  currentUser: any
}

export default function ShowRoom({currentUser}: ShowRoomProps){
    const { isLoading, error, data } = useQuery(["style", currentUser], fetchStyles);
    const [styles, setStyles] = useState(null)



  useEffect(() => {
    if (data) {
        setStyles(data['style_data'])
    }
  }, [data, currentUser]);

   const updateStyleAtIndex = (index, styleObject) => {
   setStyles((prevStyles) => {
      // Create a new array with the updated object at the specified index
      return prevStyles.map((item, i) => (i === index ? { ...item, ...styleObject } : item));
    });
   }

    return (
        <>
            {
            styles && (
                styles.map((userStyle, i) => {
                    // TODO: what if no image? maybe show no image icon

                    return (
                    <Card key={i} sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={userStyle.style.images[userStyle.style.current_image].image}
                          />
                          <IconButton aria-label="delete" onClick={() => {
                          let newUserStyleObj = {...userStyle}
                            // TODO:  set max
                          newUserStyleObj.style.current_image += 1
                          updateStyleAtIndex(i, newUserStyleObj)
                          }}>
                            <ArrowForwardIosIcon />
                          </IconButton>

                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            model number: {userStyle.style.model_number}
                            </Typography>
                          </CardContent>
                    </Card>
            )
                })
            )}

        </>
    )
}