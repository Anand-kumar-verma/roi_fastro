import "animate.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import "../src/index.css";
import AdminLayout from "./Adminpages/Layout";
import { adminroutes } from "./AdminRoutes";
import "./App.css";
import Login from "./authentication/login";
import Registration from "./authentication/Registration";
import Home from "./component/Home";
import Activation from "./main/Payment/Activation";
import { routes } from "./routes/Routes";

const App = () => {
  const user = localStorage.getItem("logindataen");

  useEffect(() => {
    Aos.init({
      duration: 2000, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once
    });
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
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/activation-link" element={<Activation />} />
        {/* <Route path="/withdrawal-link" element={<Withdrawal />} /> */}

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
