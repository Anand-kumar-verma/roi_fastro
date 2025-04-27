import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import logo from "../images/fastro.png";
import Loader from "../Shared/Loader";
import { apiConnectorPost } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const datatele = window?.Telegram?.WebApp?.initDataUnsafe?.user;
  // const datatele = {
  //   id: 1840589027,
  //   first_name: "A.K.",
  //   last_name: "",
  //   username: "anad_verma",
  //   language_code: "en",
  //   allows_write_to_pm: true,
  //   photo_url:
  //     "https://t.me/i/userpic/320/V-6-0O8PvVhuIICekP0zcekmh2CzqIfqakmErSwEakU.svg",
  // };
  const [data, setData] = useState("");

  useEffect(() => {
    const body = {
      id: String(datatele?.id),
    };
    loginFn(body);
  }, [datatele]);
  // datatele

  const initialValues = {
    full_name: datatele?.username,
    email: String(datatele?.id),
    mobile: String(datatele?.id),
    password: String(datatele?.id),
    referral_id: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const reqbody = {
        full_name: formik.values.full_name,
        email: formik.values.email,
        mobile: formik.values.mobile,
        password: formik.values.password,
        referral_id: formik.values.referral_id,
      };
      RegistrationFn(reqbody);
    },
  });
  const RegistrationFn = async (reqbody) => {
    setLoading(true);
    try {
      const response = await axios.post(endpoint?.registration_api, reqbody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      toast(response?.data?.message);
      setLoading(false);
      if (response?.data?.message === "Login Successfully") {
        localStorage.setItem("logindataen", response?.data?.result?.[0]?.token);
        localStorage.setItem("uid", datatele?.id);
        localStorage.setItem("username", datatele?.username);
        if (response?.data?.result?.[0]?.user_type === "Admin") {
          navigate("/admindashboard");
          window.location.reload();
        } else {
          if (response?.data?.result?.[0]?.user_type === "User") {
            navigate("/home");
            window.location.reload();
          }
        }
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  const loginFn = async (reqBody) => {
    setLoading(true);
    // const reqBodyy = {
    //   username: String(reqBody.id),
    //   password: String(reqBody.id),
    // };
    const reqBodyy = {
      username: String("1840589027"),
      password: String("1840589027"),
    };

    try {
      const response = await axios.post(endpoint?.login_api, reqBodyy, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      // console.log(response?.data);
      // toast(response?.data?.message);
      setLoading(false);
      if (response?.data?.message === "Credential not found in our record") {
        setOpenDialogBox(true);
        return;
      }
      if (response?.data?.message === "Login Successfully") {
        localStorage.setItem("logindataen", response?.data?.result?.[0]?.token);
        localStorage.setItem("uid", datatele?.id);
        localStorage.setItem("username", datatele?.username);
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
  const Customerfunction = async () => {
    const reqbody = {
      user_id: formik.values.referral_id,
    };
    try {
      const res = await apiConnectorPost(endpoint?.customer_api, reqbody);
      setData(res?.data?.result?.[0]);
    } catch (e) {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    Customerfunction();
  }, [formik.values.referral_id]);
  return (
    <>
      <Loader isLoading={loading} />
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(162deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
        }}
      >
        {openDialogBox && (
          <Tilt className="w-full max-w-lg lg:p-6 p-4 border-[#008eff] border rounded-xl shadow-2xl">
            <div
              style={{
                backgroundImage:
                  "linear-gradient(162deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
              }}
            >
              <div className="flex justify-center my-2">
                <img src={logo} alt="Logo" className="h-14 w-16" />
              </div>
              <h2 className="text-xl font-bold text-center text-white mb-6">
                Please Enter The Referral Code
              </h2>

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <input
                    placeholder="Referral Code"
                    type="text"
                    id="referral_id"
                    name="referral_id"
                    value={formik.values.referral_id}
                    onChange={formik.handleChange}
                    className="w-full p-3 mt-1 text-black placeholder:text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008eff] transition duration-300 ease-in-out transform hover:scale-105"
                    required
                  />
                  <span className="text-white !px-2">{data?.jnr_name}</span>
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
        )}
      </div>
    </>
  );
};

export default Login;
