import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { logOutFunction } from "../utils/APICalling";
import { useNavigate } from "react-router-dom";
const ButtomNavigation = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();

  return (
    <div>
      {isSmallScreen && (
        <BottomNavigation
          showLabels
          className="fixed bottom-0 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-[#3f7de0] shadow-xl rounded-t-3xl z-50"
        >
          <BottomNavigationAction
            label="Home"
            icon={
              <HomeIcon
                className="!text-yellow-500"
                onClick={() => navigate("/dashboard")}
              />
            }
            className="text-yellow-500 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
          />
          <BottomNavigationAction
            label="Profile"
            icon={
              <PersonPinIcon
                className="!text-yellow-500"
                onClick={() => navigate("/view")}
              />
            }
            className="text-yellow-500 hover:text-red-400 transition-all duration-300 transform hover:scale-110"
          />
          <BottomNavigationAction
            label="Logout"
            icon={
              <LogoutIcon
                className="!text-yellow-500"
                onClick={logOutFunction}
              />
            }
            className="text-yellow-500 hover:text-green-400 transition-all duration-300 transform hover:scale-110"
          />
        </BottomNavigation>
      )}
    </div>
  );
};

export default ButtomNavigation;
