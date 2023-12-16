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
import Box from "@mui/material/Box";
import StyleRequestForm from "./StyleRequestForm";
import CloseOutlined from "@mui/icons-material/CloseOutlined";

let ENDPOINT = "";
if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://127.0.0.1:8000";
} else {
  ENDPOINT =
    "http://clothing-calculator-env.eba-qnfpfgsz.us-west-2.elasticbeanstalk.com/";
}

const URL = `${ENDPOINT}/app/`;

const fetchStyles = async ({ queryKey }) => {
  const [_, currentUser, isTradeShow, isShowRoom] = queryKey;
  let queryURL;
  if (currentUser) {
    const { id: userId, userEmail, expiration } = currentUser;
    if (isTradeShow) {
      queryURL = `${URL}tradeshow_styles/${userId}`;
    } else if (isShowRoom) {
      queryURL = `${URL}showroom_styles/${userId}`;
    } else {
      queryURL = `${URL}user_styles/${userId}`;
    }
    const result = await axios.get(queryURL);
    return result.data;
  }
  return null;
};

interface ShowRoomProps {
  currentUser: any;
  isTradeShow?: boolean;
  isShowRoom?: boolean;
}

export default function ShowRoom({
  currentUser,
  isTradeShow = false,
  isShowRoom = false,
}: ShowRoomProps) {
  const { isLoading, error, data, refetch } = useQuery(
    ["style", currentUser, isTradeShow, isShowRoom],
    fetchStyles,
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );

  const [styles, setStyles] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [company, setCompany] = useState(null);
  const [touched, setTouched] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    maxHeight: "80%",
    p: 4,
    overflow: "scroll",
    "@media only screen and (max-width: 500px)": {
      width: 300,
    },
  };

  useEffect(() => {
    if (data) {
      setStyles(data["style_data"]);
      setCompany(data["company_info"]);
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
    if (styles) {
      return styles.filter(
        (style) => style.hasOwnProperty("added_cart") && !!style.added_cart
      );
    }
    return [];
  };

  const unSelectAllStyles = () => {
    const updatedStyles = styles.map((style) => {
      return { ...style, added_cart: false };
    });
    setStyles(updatedStyles);
  };
  return (
    <div
    onTouchStart={() => {
      if(timeoutId){
        clearTimeout(timeoutId)
      }
      let newTimeoutId
      setTouched(true)
      newTimeoutId = setTimeout(() => {
        setTouched(false)
      }, 2000)
      setTimeoutId(newTimeoutId)

    }}
    >
      {currentUser ? (
        <Stack
          style={{ marginTop: "120px" }}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap="20px"
        >
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            color="cadetblue"
            fontFamily={"fantasy"}
            textAlign={"center"}
          >
            {isShowRoom
              ? "Veisais Showroom"
              : isTradeShow
              ? "Magic Show 2024 Feb: Kachii Fashion "
              : currentUser.company_name && currentUser.company_name.length < 40
              ? `Selected For ${currentUser.company_name}`
              : "Selected For You"}
          </Typography>
          <Stack direction={"row"}>
            <Button
              style={{
                backgroundColor: "whitesmoke",
                color: "cadetblue",
                border: "2px solid cadetblue",
              }}
              variant="contained"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Request a Quotation
            </Button>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              style={{ backgroundColor: "cadetblue", left: "30px" }}
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
                style={{
                  backgroundColor: "cadetblue",
                  bottom: "20px",
                  opacity: "0.7",
                }}
                sx={{ mr: 2 }}
                onClick={() => {
                  setModalOpen(false);
                  refetch();
                }}
              >
                <CloseOutlined />
              </IconButton>

              <StyleRequestForm
                requested_styles={getSelectedStyles(styles)}
                currentUser={currentUser}
                isTradeShow={isTradeShow}
                company={company}
              />
            </Box>
          </Modal>
          {!isShowRoom && styles && styles.length == 0 && (
            <Typography gutterBottom variant="h6" component="div" textAlign={"center"} style={{margin:"20px"}}>
              No styles here... Tell us what styles you are interested in by
              emailing us at veisais.aca@gmail.com or telling us more in the request
              a quotation form!
            </Typography>
          )}
          <Stack
            direction={"row"}
            gap={"40px"}
            flexWrap={"wrap"}
            justifyContent={"center"}
          >
            {styles &&
              styles.map((style, i) => {
                const numImages = style.images.length;
                const currentImageIndex = style.current_image;
                const currentImage =
                  numImages > 0 ? style.images[currentImageIndex].image : null;

                const isHovered = style.hasOwnProperty("is_hovered") && !!style.is_hovered;

                const showRightIcon = currentImageIndex + 1 < numImages && (isHovered || touched)
                const showLeftIcon = currentImageIndex - 1 >= 0 && (isHovered || touched)
                const addedToCart =
                  style.hasOwnProperty("added_cart") && !!style.added_cart;
                
                return (
                  <Card key={i}>
                    <CardMedia
                      sx={{ width: "300px", height: "500px" }}
                      image={currentImage}
                      onMouseEnter={() => {
                        let newStyleObj = { ...style };
                        newStyleObj.is_hovered = true;
                        updateStyleAtIndex(i, newStyleObj);
                      }}
                      onMouseLeave = {() => {
                        let newStyleObj = { ...style };
                        newStyleObj.is_hovered = false;
                        updateStyleAtIndex(i, newStyleObj);
                      }}
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
                              backgroundColor: "whitesmoke",
                              color: "black",
                              ...(addedToCart && {
                                backgroundColor: green[500],
                                color:"white",
                                "&:hover": {
                                  backgroundColor: green[700],
                                },
                              }),
                            }}
                            sx={{
                              position: "relative",
                              top:"3px", 
                              left: `${
                                showRightIcon && showLeftIcon
                                  ? "160px" : !showRightIcon && !showLeftIcon ? "243px" 
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
    </div>
  );
}
