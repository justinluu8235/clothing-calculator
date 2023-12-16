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
import { Chip, IconButton, MenuItem, Select, TextField } from "@mui/material";
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
import getCookie from "./App/utils/getCookie";
import StylesTable from "./StylesTable";
import { CircularProgress } from "@mui/material";

let ENDPOINT = "";
if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://127.0.0.1:8000";
} else {
  ENDPOINT =
    "http://clothing-calculator-env.eba-qnfpfgsz.us-west-2.elasticbeanstalk.com/";
}

const URL = `${ENDPOINT}/app/`;

const fetchStyles = async ({ queryKey }) => {
  const [_, currentUser] = queryKey;
  let queryURL;
  if (currentUser) {
    const { id: userId, userEmail, expiration } = currentUser;
    queryURL = `${URL}styles_admin/${userId}`;
    const result = await axios.get(queryURL);
    console.log("res", result);
    return result.data;
  }
  return null;
};

interface StaffStylesProps {
  currentUser: any;
}

export default function StaffStyles({ currentUser }: StaffStylesProps) {
  const {
    isLoading: isInitialLoading,
    error,
    data,
  } = useQuery(["style", currentUser], fetchStyles, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [styles, setStyles] = useState(null);
  const [users, setUsers] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userIdFilter, setUserIdFilter] = useState("0");
  const [filteredStyles, setFilteredStyles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMode, setModalMode] = useState("");

  console.log("gi");
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
      setFilteredStyles(data["style_data"]);
      setUsers(data["user_info_list"]);
    }
  }, [data, currentUser]);

  const addRemoveStylesToUser = (operation) => {
    const userStyleURL = `${URL}styles_admin/${currentUser.id}`;
    setIsLoading(true);
    axios
      .post(
        userStyleURL,
        {
          action:
            operation == "add"
              ? "add_styles_to_user"
              : "remove_styles_from_user",
          target_user_id: userIdFilter,
          selected_styles: getSelectedStyles(filteredStyles),
        },
        {
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        if (operation == "remove") {
          handleFilterByUser();
        }
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };
  const handleFilterByUser = async () => {
    const userStyleURL = `${URL}styles_admin/${currentUser.id}`;
    setIsLoading(true);
    const result = await axios
      .post(
        userStyleURL,
        { action: "fetch_user_styles", target_user_id: userIdFilter },
        {
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        const userStylesData = response.data["user_styles"];
        const filteredUserStyles = [];
        for (const userStyle of userStylesData) {
          const styleId = userStyle["id"];
          //find the style
          for (const [index, style] of styles.entries()) {
            if (style && styleId == style["id"]) {
              filteredUserStyles.push({ ...style });
            }
          }
        }
        setFilteredStyles(filteredUserStyles);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };
  const filterByModelNumber = (modelNumber) => {
    const filteredUserStyles = [];
    for (const [index, style] of styles.entries()) {
      if (style && modelNumber == style["model_number"]) {
        filteredUserStyles.push({ ...style });
      }
    }
    setFilteredStyles(filteredUserStyles);
  };

  const updateStyleAtIndex = (index, styleObject) => {
    setFilteredStyles((prevStyles) => {
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
  const unSelectAllStyles = (styles: any) => {
    console.log("style", styles);
    const updatedStyles = styles.map((style) => {
      return { ...style, added_cart: false };
    });
    setFilteredStyles(updatedStyles);
  };
  console.log("sty", styles);
  return (
    <>
      {currentUser && currentUser.is_staff ? (
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
            Admin View
          </Typography>
          <TextField
            id="outlined-basic"
            label="Search by model number"
            variant="outlined"
            onChange={(e) => {
              filterByModelNumber(e.target.value);
            }}
          />
          {users && (
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={userIdFilter}
              onChange={async (val) => {
                setUserIdFilter(val.target.value);
                if (val.target.value == "0") {
                  setFilteredStyles(styles);
                }
              }}
              label="User"
            >
              <MenuItem value={"0"}>Select By User</MenuItem>
              {users.map((userFilter) => {
                const userLabelString = `${userFilter["username"]} | ${userFilter["email"]} | ${userFilter["company"]}`;
                return (
                  <MenuItem value={userFilter["user_id"]}>
                    {userLabelString}
                  </MenuItem>
                );
              })}
            </Select>
          )}

          {isLoading || isInitialLoading ? (
            <CircularProgress />
          ) : (
            <Stack
              direction={"row"}
              flexWrap={"wrap"}
              gap="20px"
              justifyContent="center"
            >
              <Button
                style={{
                  backgroundColor: "whitesmoke",
                  color: "cadetblue",
                  border: "2px solid cadetblue",
                }}
                variant="contained"
                onClick={() => {
                  setFilteredStyles(styles);
                }}
              >
                Reset to all styles
              </Button>
              <Button
                style={{
                  backgroundColor: "whitesmoke",
                  color: "cadetblue",
                  border: "2px solid cadetblue",
                }}
                variant="contained"
                onClick={async () => {
                  await handleFilterByUser();
                }}
              >
                Filter Styles By User
              </Button>
              <Button
                style={{
                  backgroundColor: "whitesmoke",
                  color: "cadetblue",
                  border: "2px solid cadetblue",
                }}
                variant="contained"
                onClick={() => {
                  if (userIdFilter != "0") {
                    setModalMode("remove_styles");
                    setModalOpen(true);
                  }
                }}
              >
                Remove Styles from this user
              </Button>
              <Button
                style={{
                  backgroundColor: "whitesmoke",
                  color: "cadetblue",
                  border: "2px solid cadetblue",
                }}
                variant="contained"
                onClick={() => {
                  if (userIdFilter != "0") {
                    setModalOpen(true);
                    setModalMode("add_styles");
                  }
                }}
              >
                Add Styles to this user
              </Button>
              <Button
                style={{
                  backgroundColor: "whitesmoke",
                  color: "cadetblue",
                  border: "2px solid cadetblue",
                }}
                variant="contained"
                onClick={() => {
                  setModalOpen(true);
                  setModalMode("csv_table");
                }}
              >
                Export CSV
              </Button>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                style={{ backgroundColor: "cadetblue", left: "30px" }}
                sx={{ mr: 2 }}
                onClick={() => unSelectAllStyles(filteredStyles)}
              >
                <CloseOutlined />
              </IconButton>
            </Stack>
          )}

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
                onClick={() => setModalOpen(false)}
              >
                <CloseOutlined />
              </IconButton>
              {modalMode == "csv_table" ? (
                <StylesTable
                  styles={getSelectedStyles(filteredStyles)}
                  currentUser={currentUser}
                />
              ) : modalMode == "add_styles" || modalMode == "remove_styles" ? (
                <Stack flexDirection={"column"} gap="30px">
                  <Typography gutterBottom variant="subtitle2" component="div">
                    Are you sure you want to{" "}
                    {modalMode == "add_styles" ? "add" : "remove"} below styles
                    to
                    {
                      users.filter(
                        (user) => user["user_id"] == userIdFilter
                      )[0]["email"]
                    }
                    ?
                  </Typography>
                  <Stack flexDirection={"row"} gap={"20px"}>
                    {getSelectedStyles(filteredStyles).map(
                      (requested_style) => {
                        return (
                          <Chip
                            sx={{
                              backgroundColor: "whitesmoke",
                              color: "cadetblue",
                              border: "2px solid cadetblue",
                            }}
                            label={requested_style.model_number}
                          />
                        );
                      }
                    )}
                  </Stack>
                  <Button
                    style={{
                      backgroundColor: "whitesmoke",
                      color: "cadetblue",
                      border: "2px solid cadetblue",
                    }}
                    variant="contained"
                    onClick={() => {
                      if (modalMode == "add_styles") {
                        addRemoveStylesToUser("add");
                      } else {
                        addRemoveStylesToUser("remove");
                      }
                      setModalOpen(false);
                    }}
                  >
                    Confirm
                  </Button>
                </Stack>
              ) : (
                <></>
              )}
            </Box>
          </Modal>

          <Stack
            direction={"row"}
            gap={"40px"}
            flexWrap={"wrap"}
            justifyContent={"center"}
          >
            {filteredStyles &&
              filteredStyles.map((style, i) => {
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
                      sx={{ width: "150px", height: "250px" }}
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
                                top: "75px",
                                left: "110px",
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
                                top: "75px",
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
                                showRightIcon && showLeftIcon ? "0px" : "20px"
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
                      {Object.keys(style).map((field) => {
                        if(field == "current_image"){
                          return <></>
                        }
                        return (
                          <span key={`${style['id']}_${field}`}>
                            {style.hasOwnProperty(field) &&
                              style[field] &&
                              (typeof style[field] == "number" ||
                                typeof style[field] == "string") && (
                                <Typography
                                  gutterBottom
                                  variant="subtitle2"
                                  component="div"
                                >
                                  {field}: {style[field]}
                                </Typography>
                              )}
                          </span>
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })}
          </Stack>
        </Stack>
      ) : currentUser && !currentUser.is_staff ? (
        <p>You do not have access to this page</p>
      ) : (
        <p>
          Please <Link to="/app/login">log in</Link> to view this page.
        </p>
      )}
    </>
  );
}
