import "animate.css";
// import Aos from "aos";
// import "aos/dist/aos.css";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../src/index.css";
import AdminLayout from "./Adminpages/Layout";
import { adminroutes } from "./AdminRoutes";
import "./App.css";
import AdminLogin from "./authentication/AdminLogin";
import Login from "./authentication/login";
import Home from "./component/Home";
import DepositFST from "./main/Buy/DepositFst";
import DepositUSDT from "./main/Buy/DepositUsdt";
import JackpotPayin from "./main/Buy/JackpotPayin";
import ActivationWithFST from "./main/Payment/ActivationWithFST";
import { routes } from "./routes/Routes";
import "./wingo/assets/style/main.css";
import WingoPayin from "./wingo/payin/Wingopayin";
import TokenBuy from "./main/Payment/TokenBuy";
import WingoLogin from "./authentication/WingoLogin";
import DirectAdminToUserLogin from "./Adminpages/Authentication/DirectAdminToUserLogin.js";
import { useSelector } from "react-redux";

const App = () => {
  const { logindataen, uid } = useSelector((state) => state.aviator);
  const user = logindataen || localStorage.getItem("logindataen");

  // useEffect(() => {
  //   Aos.init({
  //     duration: 2000, // Animation duration in milliseconds
  //     once: false, // Whether animation should happen only once
  //   });
  // }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard Routes */}
        {adminroutes?.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={
              <AdminLayout
                id={route.id}
                navLink={route.path}
                navItem={route.navItem}
                component={route.component}
              />
            }
          />
        ))}

        {/* Public Routes */}
        <Route path="/game-usdt" element={<DepositUSDT />} />
        <Route path="/jackpot-payin" element={<JackpotPayin />} />
        <Route path="/game-paying" element={<WingoPayin />} />
        <Route path="/game-fst" element={<DepositFST />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/wingologin" element={<WingoLogin />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/register" element={<Registration />} /> */}
        <Route path="/buy-fst-token" element={<TokenBuy />} />
        <Route path="/activation-link" element={<ActivationWithFST />} />
        {/* <Route path="/activation-link-fst" element={<ActivationWithFST />} /> */}
        {/* <Route path="/hii" element={<Test />} /> */}
        <Route
          path="/admin-login-user-id"
          element={<DirectAdminToUserLogin />}
        />

        {/* Authenticated Routes */}
        {user ? (
          routes?.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
