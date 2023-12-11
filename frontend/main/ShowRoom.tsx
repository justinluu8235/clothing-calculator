import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";

let ENDPOINT = "";
if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://127.0.0.1:8000";
} else {
  ENDPOINT =
    "http://clothing-calculator-env.eba-qnfpfgsz.us-west-2.elasticbeanstalk.com/";
}

const URL = `${ENDPOINT}/app/showroom/`;
const fetchStyles = async ({ queryKey }) => {
  const [_, currentUser] = queryKey;
  console.log("user", currentUser);
  if (currentUser) {
    const { id: userId, userEmail, expiration } = currentUser;
    const result = await axios.get(`${URL}${userId}`);
    console.log("result", result.data);
    return result.data;
  }
  return null;
};

interface ShowRoomProps {
  currentUser: any;
}

export default function ShowRoom({ currentUser }: ShowRoomProps) {
  const { isLoading, error, data } = useQuery(
    ["style", currentUser],
    fetchStyles
  );
  const [styles, setStyles] = useState(null);

  useEffect(() => {
    if (data) {
      setStyles(data["style_data"]);
    }
  }, [data, currentUser]);

  const updateStyleAtIndex = (index, styleObject) => {
    setStyles((prevStyles) => {
      // Create a new array with the updated object at the specified index
      return prevStyles.map((item, i) =>
        i === index ? { ...item, ...styleObject } : item
      );
    });
  };

  return (
    <>{currentUser ? (
      <Stack
      style={{ marginTop: "120px" }}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      >
        <Stack direction={"row"} gap={"40px"} flexWrap={'wrap'}>
          {styles &&
            styles.map((style, i) => {
              // TODO: what if no image? maybe show no image icon
              const numImages = style.images.length;
              const currentImageIndex = style.current_image;
              const currentImage =
                numImages > 0 ? 
                style.images[currentImageIndex].image : null
  
              const showRightIcon = currentImageIndex + 1 < numImages
              const showLeftIcon = currentImageIndex - 1 >= 0
              return (
                <Card key={i}>
                  <CardMedia
                    sx={{ width: "300px", height: "500px" }}
                    image={currentImage}
                    children={
                      <>
                      {showRightIcon && (
                       
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            let newStyleObj = { ...style };
                            newStyleObj.current_image += 1;
                            updateStyleAtIndex(i, newStyleObj);
                          }}
                          style={{backgroundColor:'whitesmoke'}}
                          sx={{position:'relative', top:'250px', left:'260px'}}
                        >
                          <ArrowForwardIosIcon />
                        </IconButton>
                      )}
                      {showLeftIcon && (
                       
                       <IconButton
                         aria-label="delete"
                         onClick={() => {
                           let newStyleObj = { ...style };
                           newStyleObj.current_image -= 1;
                           updateStyleAtIndex(i, newStyleObj);
                         }}
                         style={{backgroundColor:'whitesmoke'}}
                         sx={{position:'relative', top:'250px', right: `${showRightIcon ? '40px':'0px'}`}}
                       >
                         <ArrowBackIos />
                       </IconButton>
                     )}
                      </>
                    }
                  />
  
                  <CardContent>
                    <Typography gutterBottom variant="subtitle2" component="div">
                      model number: {style.model_number}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="div">
                      {style.name}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
        </Stack>
      </Stack>
    ) : <p>Please <Link to="/app/login">log in</Link> to view this page.</p>}</>

  );
}
