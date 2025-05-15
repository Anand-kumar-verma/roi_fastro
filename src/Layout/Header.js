import React, { useState } from "react";
import logo from "../images/logo1.png";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import fastroLogo from "../images/fastro.png";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <>
      <div
        //  style={{ backgroundColor: "rgb(26, 26, 26)" }}
        className="bg-[#111022]"
      >
        <div className="flex justify-between lg:px-20 text-sm text-white">
          <div className="flex p-2 justify-center items-center gap-10">
            <img src={fastroLogo} alt="fastroLogo" className="h-14 w-16" />
            <div className="hidden lg:flex gap-10">
              <p
                className="cursor-pointer"
                onClick={() => {
                  navigate("/home");
                  // window.location.reload();
                }}
              >
                Dashboard
              </p>
              <p
                className="cursor-pointer"
                onClick={() => navigate("/markets")}
              >
                Markets
              </p>
              <p className="cursor-pointer" onClick={() => navigate("/about")}>
                About
              </p>
              <p
                className="cursor-pointer"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </p>
            </div>
          </div>

          {/* Login/SignUp Links */}
          <div className="hidden lg:flex justify-center items-center gap-10">
            <p className="cursor-pointer" onClick={() => navigate("/login")}>
              UID: {localStorage.getItem("uid")}
              <i className="fas fa-arrow-circle-right uk-margin-small-left" />
            </p>
            <p className="cursor-pointer" onClick={() => navigate("/register")}>
              User: {localStorage.getItem("username")}
              <i className="fas fa-arrow-circle-right uk-margin-small-left" />
            </p>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center">
            <IconButton onClick={toggleDrawer(true)} style={{ color: "white" }}>
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {/* MUI Drawer */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div
          style={{
            width: 250,
            backgroundColor: "#1a1a1a",
            height: "100%",
            color: "white",
            padding: "20px",
          }}
        >
          <IconButton onClick={toggleDrawer(false)} style={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
          <List>
            <ListItem
              button
              onClick={() => {
                navigate("/dashboard");
                setIsDrawerOpen(false);
                // window.location.reload();
              }}
            >
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate("/markets");
                setIsDrawerOpen(false);
              }}
            >
              <ListItemText primary="Markets" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate("/about");
                setIsDrawerOpen(false);
              }}
            >
              <ListItemText primary="About" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                navigate("/contact");
                setIsDrawerOpen(false);
              }}
            >
              <ListItemText primary="Contact Us" />
            </ListItem>
            <ListItem
              button
              // onClick={() => {
              //   navigate("/login");
              //   setIsDrawerOpen(false);
              // }}
            >
              <ListItemText primary={`UID: ${localStorage.getItem("uid")}`} />
            </ListItem>
            <ListItem
              button
              // onClick={() => {
              //   navigate("/register");
              //   setIsDrawerOpen(false);
              // }}
            >
              <ListItemText
                primary={`User: ${localStorage.getItem("username")}`}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
