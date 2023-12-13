import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import Fab from "@mui/material/Fab";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import { green } from "@mui/material/colors";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';
import StyleRequestForm from "./StyleRequestForm";
import CloseOutlined from '@mui/icons-material/CloseOutlined';

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
  isTradeShow?: boolean;
}

export default function ShowRoom({
  currentUser,
  isTradeShow = false,
}: ShowRoomProps) {

  const { isLoading, error, data } = useQuery(
    ["style", currentUser],
    fetchStyles
  );

  const [styles, setStyles] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    maxHeight: '80%',
    p: 4,
    overflow:'scroll', 
    '@media only screen and (max-width: 500px)':{
      width: 300
    },
  };

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

  const getSelectedStyles = (styles: any) => {
      if(styles){
        return styles.filter(style => style.hasOwnProperty("added_cart") && !!style.added_cart)
      }
      return []
  }

  const unSelectAllStyles = () => {
    const updatedStyles = styles.map((style) => {
      return {...style, added_cart: false}
    })
    setStyles(updatedStyles)
  }

  return (
    <>
      {currentUser ? (
        <Stack
          style={{ marginTop: "120px" }}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap="20px"
        >
          <Stack direction={"row"}>
          <Button
            style={{
              backgroundColor: "whitesmoke",
              color: "cadetblue",
              border: "2px solid cadetblue",
            }}
            variant="contained"
            onClick={() => {setModalOpen(true)}}
          >
            Request a Quotation
          </Button>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{backgroundColor:'cadetblue', left: '30px'}}
            sx={{ mr: 2 }}
            onClick={unSelectAllStyles}
          >
            <CloseOutlined />
          </IconButton>
          
          </Stack>
          <Modal
            open={modalOpen}
            onClose={() => {}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{backgroundColor:'cadetblue', bottom:'20px', opacity: '0.7'}}
            sx={{ mr: 2 }}
            onClick={() => setModalOpen(false)}
          >
            <CloseOutlined />
          </IconButton>
              
            <StyleRequestForm requested_styles={getSelectedStyles(styles)} currentUser={currentUser}/>
            </Box>
          </Modal>

          <Stack direction={"row"} gap={"40px"} flexWrap={"wrap"} justifyContent={'center'}>
            {styles &&
              styles.map((style, i) => {
                const numImages = style.images.length;
                const currentImageIndex = style.current_image;
                const currentImage =
                  numImages > 0 ? style.images[currentImageIndex].image : null;

                const showRightIcon = currentImageIndex + 1 < numImages;
                const showLeftIcon = currentImageIndex - 1 >= 0;
                const addedToCart =
                  style.hasOwnProperty("added_cart") && !!style.added_cart;
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
                              style={{ backgroundColor: "whitesmoke" }}
                              sx={{
                                position: "relative",
                                top: "250px",
                                left: "260px",
                              }}
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
                              style={{ backgroundColor: "whitesmoke" }}
                              sx={{
                                position: "relative",
                                top: "250px",
                                right: `${showRightIcon ? "40px" : "0px"}`,
                              }}
                            >
                              <ArrowBackIos />
                            </IconButton>
                          )}
                          <Fab
                            aria-label="save"
                            color="primary"
                            style={{
                              backgroundColor: "cadetblue",
                              ...(addedToCart && {
                                backgroundColor: green[500],
                                "&:hover": {
                                  backgroundColor: green[700],
                                },
                              }),
                            }}
                            sx={{
                              position: "relative",
                              left: `${
                                showRightIcon && showLeftIcon
                                  ? "160px"
                                  : "200px"
                              }`,
                            }}
                            onClick={() => {
                              let newStyleObj = { ...style };
                              if (addedToCart) {
                                newStyleObj.added_cart = false;
                              } else {
                                newStyleObj.added_cart = true;
                              }
                              updateStyleAtIndex(i, newStyleObj);
                            }}
                          >
                            {addedToCart ? (
                              <CheckIcon />
                            ) : (
                              <AddShoppingCartIcon />
                            )}
                          </Fab>
                        </>
                      }
                    />

                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                      >
                        model number: {style.model_number}
                      </Typography>
                      {style.minimum_order_quanitity && (
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component="div"
                        >
                          MOQ: {style.minimum_order_quanitity}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
          </Stack>
        </Stack>
      ) : (
        <p>
          Please <Link to="/app/login">log in</Link> to view this page.
        </p>
      )}
    </>
  );
}
