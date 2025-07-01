import { Lock, LogoutTwoTone, Person, Person3 } from "@mui/icons-material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useEffect, useState } from "react";
import { BsPerson, BsTrophy } from "react-icons/bs";
import {
  FaAffiliatetheme,
  FaBars,
  FaHome,
  FaIntercom,
  FaRegMoneyBillAlt,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { default as fastroLogo, default as logo } from "../images/fastro.png";
import { logOutFunction } from "../utils/APICalling";
export default function Navbar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const toggleLogoutDropdown = () => {
    setIsLogoutOpen(!isLogoutOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflow = isSidebarOpen ? "auto" : "hidden";
  };

  const handleDropdownToggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown") &&
        !event.target.closest(".logout-dropdown")
      ) {
        setOpenDropdown(null);
        setIsLogoutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-custom-gradient !text-black z-50 shadow-md bg">
      <div className="flex justify-between px-10 text-sm h-16 items-center">
        <div className="flex font-medium items-center gap-10">
          <img
            src={
              fastroLogo
              // 'https://static.vecteezy.com/system/resources/previews/009/029/127/non_2x/mlm-logo-mlm-letter-mlm-letter-logo-design-initials-mlm-logo-linked-with-circle-and-uppercase-monogram-logo-mlm-typography-for-technology-business-and-real-estate-brand-vector.jpg'
            }
            alt="Logo"
            className="h-14 w-16"
          />
          <div className="lg:hidden sm:pl-[32rem]  pl-[9rem] flex items-center">
            <FaBars
              className="cursor-pointer text-2xl text-text-color"
              onClick={toggleSidebar}
            />
          </div>

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 p-4 h-full  ! transition-transform transform  ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0 md:flex md:gap-10 bg-custom-gradient text-white`}
          >
            <div className="flex justify-between  px-2 py-1 items-center mb-5 md:hidden">
              <img src={logo} alt="Logo" className="h-10" />
              <FaTimes
                className="cursor-pointer text-2xl"
                onClick={toggleSidebar}
              />
            </div>
            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => {
                navigate("/home");
                // window.location.reload();
              }}
            >
              <FaHome className="text-blue-400" /> Home
            </p>
            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => {
                navigate("/dashboard");
                // window.location.reload();
              }}
            >
              <FaHome className="text-blue-400" /> Dashboard
            </p>
            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => {
                navigate("/price-statistics");
                // window.location.reload();
              }}
            >
              <CurrencyExchangeIcon className="text-blue-400 !text-sm" /> Price
              Statistics
            </p>
            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => {
                navigate("/burning");
                // window.location.reload();
              }}
            >
              <CurrencyExchangeIcon className="text-blue-400 !text-sm" />{" "}
              Burning Event
            </p>
            <div
              className="relative dropdown"
              onMouseEnter={() => setOpenDropdown("affiliate")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <p
                className="flex items-center gap-1 cursor-pointer px-2 py-1 "
                onClick={() => handleDropdownToggle("affiliate")}
              >
                <FaAffiliatetheme className="text-blue-400" /> Affiliates
              </p>
              {openDropdown === "affiliate" && (
                <div className="absolute left-0 bg-white shadow-md rounded w-48 p-3 z-40">
                  <div
                    className="cursor-pointer flex items-center gap-1 py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate("/withdrawalhistory")}
                  >
                    <Lock className="text-blue-400" fontSize="small" />
                    <p>Withdrawal</p>
                  </div>
                  {/* <div
                    className="cursor-pointer flex items-center gap-1 py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate("/password")}
                  >
                    <KeyOff className="text-blue-400" fontSize="small" />
                    <p>Password</p>
                  </div> */}
                  <div
                    className="cursor-pointer flex items-center gap-1 py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate("/view")}
                  >
                    <Person className="text-blue-400" fontSize="small" />
                    <p>View Profile</p>
                  </div>
                  <div
                    className="cursor-pointer flex items-center gap-1 py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate("/Teamdata")}
                  >
                    <Person3 className="text-blue-400" fontSize="small" />
                    <p>Team Data</p>
                  </div>
                  <div
                    className="cursor-pointer flex items-center gap-1 py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate("/support-list-user")}
                  >
                    <Person3 className="text-blue-400" fontSize="small" />
                    <p>Support Reply</p>
                  </div>
                </div>
              )}
            </div>

            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => navigate("/activation")}
            >
              <BsTrophy className="text-blue-400" /> Activation
            </p>
            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => navigate("/buy")}
            >
              <BsTrophy className="text-blue-400" /> Buy Ticket
            </p>
            {/* <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => navigate("/my-fst-orders")}
            >
              <BsTrophy className="text-blue-400" /> FST Orders
            </p> */}
            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => navigate("/topup_detail")}
            >
              <BsTrophy className="text-blue-400" /> Top Up Details
            </p>
            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => navigate("/team-business-count")}
            >
              <BsTrophy className="text-blue-400" /> Team Buss Count
            </p>
            <div
              className="relative dropdown"
              onMouseEnter={() => setOpenDropdown("income")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <p
                className="flex items-center gap-1 cursor-pointer px-2 py-1 "
                onClick={() => handleDropdownToggle("income")}
              >
                <FaIntercom className="text-blue-400" /> Income
              </p>
              {openDropdown === "income" && (
                <div className="absolute left-0  bg-white shadow-md rounded w-48 p-3 z-40">
                  <div
                    className="cursor-pointer py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate("/roi_income")}
                  >
                    ROI Income
                  </div>
                  {/* <div
                    className="cursor-pointer py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate('/direct_income')}
                  >
                    Direct Income
                  </div> */}
                  <div
                    className="cursor-pointer py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate("/level_income")}
                  >
                    Level Income
                  </div>
                  {/* <div
                    className="cursor-pointer py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate('/booster_income')}
                  >
                    Rocket Income
                  </div> */}
                  {/* <div
                    className="cursor-pointer py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate('/matching_income')}
                  >
                    Magic Income
                  </div> */}

                  <div
                    className="cursor-pointer py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate("/weekly_income")}
                  >
                    Weekly Income
                  </div>

                  <div
                    className="cursor-pointer py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate("/award-reward")}
                  >
                    Award-Reward
                  </div>
                  <div
                    className="cursor-pointer py-1 hover:text-blue-400 text-gray-800"
                    onClick={() => navigate("/betting-income")}
                  >
                    Betting Income
                  </div>
                </div>
              )}
            </div>

            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => navigate("/withdrawal-link")}
            >
              <FaRegMoneyBillAlt className="text-blue-400" /> Withdrawal
            </p>
            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => navigate("/compound-history")}
            >
              <FaRegMoneyBillAlt className="text-blue-400" /> Compound
            </p>
            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => navigate("/view")}
            >
              <FaRegMoneyBillAlt className="text-blue-400" /> Profile
            </p>
            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => navigate("/game-project")}
            >
              <SportsEsportsIcon className="text-blue-400" /> Project
            </p>
            <p
              className="flex items-center gap-1 cursor-pointer px-2 py-1 "
              onClick={() => navigate("/ticket")}
            >
              <SportsEsportsIcon className="text-blue-400" /> Support
            </p>
            {/* <div
              className="cursor-pointer py-1 flex items-center gap-1 lg:hidden hover:text-blue-400 "
              onClick={logOutFunction}
            >
              <LogoutTwoTone className="text-blue-400" /> Logout
            </div> */}
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center gap-10 relative">
          <p className="cursor-pointer" onClick={toggleLogoutDropdown}>
            <BsPerson className="text-blue-400" />
          </p>
          {isLogoutOpen && (
            <div className="absolute top-8 right-0 bg-white shadow-md rounded p-3 w-32 z-40 logout-dropdown">
              <div
                className="cursor-pointer py-1 hover:text-blue-400 text-gray-800"
                onClick={logOutFunction}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
