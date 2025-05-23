import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { logOutFunction } from "../utils/APICalling";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

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
            sx={{ minWidth: 40, padding: "2px 2px" }}
            className="text-yellow-500 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
          />
          <BottomNavigationAction
            label="Game"
            icon={
              <SportsEsportsIcon
                className="!text-yellow-500"
                onClick={() => navigate("/game-project")}
              />
            }
            sx={{ minWidth: 40, padding: "2px 2px" }}
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
            sx={{ minWidth: 40, padding: "2px 2px" }}
            className="text-yellow-500 hover:text-red-400 transition-all duration-300 transform hover:scale-110"
          />
          <BottomNavigationAction
            label="Network"
            icon={
              <LanguageIcon
                className="!text-yellow-500"
                onClick={() => navigate("/network")}
              />
            }
            sx={{ minWidth: 40, padding: "2px 2px" }}
            className="text-yellow-500 hover:text-red-400 transition-all duration-300 transform hover:scale-110"
          />
          <BottomNavigationAction
            label="Referral"
            icon={
              <PersonAddAlt1Icon
                className="!text-yellow-500"
                onClick={() => navigate("/referral")}
              />
            }
            sx={{ minWidth: 40, padding: "2px 2px" }}
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
            sx={{ minWidth: 40, padding: "2px 2px" }}
            className="text-yellow-500 hover:text-green-400 transition-all duration-300 transform hover:scale-110"
          />
        </BottomNavigation>
      )}
    </div>
  );
};

export default ButtomNavigation;
