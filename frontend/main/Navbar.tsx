import React, {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


interface NavBarProps {
  currentUser: any;
  handleLogout: (idk: any) => void;
}

export default function NavBar({ currentUser, handleLogout }: NavBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if(anchorEl){
      setAnchorEl(null)
    }
  };
  return (
    <Box >
      <AppBar position="static" style={{ backgroundColor: "cadetblue" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={()=>{}}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem ><Link to="/app/selected_for_you" reloadDocument={true}>Selected For You</Link></MenuItem>
        <MenuItem ><Link to="app/showroom" reloadDocument={true}>Showroom</Link></MenuItem>
        {/* <MenuItem ><Link to="app/" reloadDocument={true}>Style Calculator</Link></MenuItem> */}
        <MenuItem ><Link to="app/tradeshow" reloadDocument={true}>Tradeshow</Link></MenuItem>
        {currentUser && currentUser.is_staff && (
          <MenuItem ><Link to="app/staff" reloadDocument={true}>Staff Styles View</Link></MenuItem>
        )}
      </Menu>


          <Typography
            variant="h6"
            textAlign={"center"}
            fontFamily={"fantasy"}
            sx={{ flexGrow: 2 }}
          >
            Veisais
          </Typography>
          {currentUser ? (
            <>
              <Typography
                variant="caption"
                textAlign={"right"}
                fontFamily={"fantasy"}
                sx={{ flexGrow: 0 }}
              >
                {currentUser.email} |
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/app/login" reloadDocument={true}>Login</Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
