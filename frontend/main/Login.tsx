import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import setAuthToken from "./App/utils/setAuthToken";
import getCookie from "./App/utils/getCookie";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

let ENDPOINT = "";
if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://127.0.0.1:8000";
} else {
  ENDPOINT =
    "http://clothing-calculator-env.eba-qnfpfgsz.us-west-2.elasticbeanstalk.com/";
}
const csrfTokenInput = document.getElementsByName(
  "csrfmiddlewaretoken"
)[0] as HTMLInputElement;
const CSRF_TOKEN = csrfTokenInput.value;

interface LoginProps {
  nowCurrentUser: (userData: any) => void; // Adjust the type of userData as needed
  handleLogout: (idk: any) => void;
}

export default function Login({ nowCurrentUser, handleLogout }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
    },
  });
  const handleSubmit = (e) => {
    const loginData = {
      email: email,
      password: password,
    };

    axios
      .post(`${ENDPOINT}/login/`, loginData, {
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
      })
      .then((response) => {
        console.log("response", response);
        const { token, userData } = response.data;
        // save token to localStorage
        localStorage.setItem("jwtToken", token);
        // set token to headers
        setAuthToken(token);
        // decode token to get the user data
        const decoded = jwtDecode(token);
        nowCurrentUser(decoded);
        alert("Logged In");
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log("error", err);
      });



  };

  return (
    <ThemeProvider theme={theme}>
      <Stack style={{height: '100%'}} direction={"row"} justifyContent={"center"} alignItems={"center"}>

      
      <Box sx={{ backgroundColor: "cadetblue", width:"400px"}}>
        <Stack style={{ width: "300px", padding: "20px" }} spacing={2}>
          {loggedIn && <Navigate to="/app" replace={true} />}
          <TextField
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
          <TextField
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ backgroundColor: "white" }}
          />
          <Button style={{backgroundColor:'white', color:'blue'}} variant="outlined" onClick={handleSubmit}>
            Login
          </Button>

          <Button style={{backgroundColor:'white', color:'blue'}} variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Box>
      </Stack>
    </ThemeProvider>
  );
}
