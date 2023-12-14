import React, {useState, useEffect} from "react";
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import StyleCalculator from '../StyleCalculator'
import ShowRoom from '../ShowRoom'
import Login from '../Login'
import Navbar from '../Navbar'
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
import { jwtDecode } from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import axios from 'axios'

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




interface AppProps {
  currentUser: any
}


const App = ({currentUser}: AppProps) => {
  return (
    <div>
      <StyleCalculator currentUser={currentUser}/>
    </div>
  );
};



const AppWithRouter = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
    useEffect(() => {
    let token;
    console.log('token', localStorage.getItem('jwtToken'))
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);

    } else {
      token = jwtDecode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.getItem('jwtToken'));
      setCurrentUser(token);
    }
  }, []);

    const nowCurrentUser = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }




  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
        // remove token for localStorage
        localStorage.removeItem('jwtToken');
        setCurrentUser(null);
        setIsAuthenticated(false);

    }
    axios.get(`${ENDPOINT}/logout/`)
    .then((res) =>{
      alert("you are now logged out")
      return <Navigate  to="/app/login"/>
    })

  }
  if(currentUser){
    const {exp} = currentUser
      // make a condition that compares exp and current time
  const expirationTime = new Date(exp * 1000);
  let currentTime = Date.now();
  if (currentTime >= expirationTime.getTime()) {
    handleLogout();
  }
  }
  return (
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      
    <Router>
    <Navbar currentUser={currentUser} handleLogout={handleLogout}/>
    <Routes>      
        <Route path="/app" element={<App currentUser={currentUser}/>}/>
        <Route path="/app/login" element={<Login nowCurrentUser={nowCurrentUser} handleLogout={handleLogout}/>}/>
        <Route path="/app/selected_for_you" element={<ShowRoom currentUser={currentUser}/>}/>
        <Route path="/app/tradeshow" element={<ShowRoom currentUser={currentUser} isTradeShow={true}/>}/>
        <Route path="/app/showroom" element={<ShowRoom currentUser={currentUser} isShowRoom={true}/>}/>
    </Routes>

    </Router>
    </QueryClientProvider>
    </React.StrictMode>
  );
};

export default AppWithRouter;
