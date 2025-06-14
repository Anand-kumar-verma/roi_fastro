import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import logo from "../images/fastro.png";
import Loader from "../Shared/Loader";
import { endpoint } from "../utils/APIRoutes";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    otp: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const reqbody = {
        otp: formik.values.otp,
      };
      loginFn(reqbody);
    },
  });

  const loginFn = async (reqBody) => {
    setLoading(true);
    try {
      const response = await axios.post(endpoint?.very_fy_OTP, reqBody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      // console.log(response?.data);
      toast(response?.data?.message);
      setLoading(false);

      if (response?.data?.message === "Login Successfully") {
        localStorage.setItem("logindataen", response?.data?.result?.[0]?.token);
        localStorage.setItem("uid", "ADMIN");
        localStorage.setItem("username", "ADMIN");
        if (response?.data?.result?.[0]?.user_type === "Admin") {
          navigate("/admindashboard");
          window.location.reload();
        } else {
          navigate("/home");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error during login.");
      setLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={loading} />

      <div className="flex justify-center items-center h-screen overflow-y-scroll bg-custom-gradient">
        <Tilt className="w-full max-w-lg lg:p-6 p-4 border-[#008eff] border rounded-xl shadow-2xl">
          <div className="bg-glassy">
            <div className="flex justify-center my-2">
              <img src={logo} alt="Logo" className="h-14 w-16" />
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <input
                  placeholder="Hey! Enter your OTP"
                  type="text"
                  id="otp"
                  name="otp"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  className="w-full p-3 mt-1 text-black placeholder:text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008eff] transition duration-300 ease-in-out transform hover:scale-105"
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundImage:
                    "linear-gradient(162deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
                }}
                className="w-full py-3 text-white border-2 border-[#008eff] font-semibold rounded-full hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#128C7E] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </button>
            </form>
          </div>
        </Tilt>
      </div>
    </>
  );
};

export default AdminLogin;
