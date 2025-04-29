import {
  Box,
  MenuItem,
  TextField
} from "@mui/material";
import { ethers } from "ethers";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import Navbar from "../../dashboard/Navbar";
import crypto from "../../images/crypto.jpg";
import Loader from "../../Shared/Loader";
import { apiConnectorGet, apiConnectorPost } from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import ButtomNavigation from "../../Layout/ButtomNaviagatoin";

function TopUP() {
  const [data, setData] = useState("");
  const [loding, setLoding] = useState(false);

  const initialValues = {
    topup_amnt: "",
    pack_id: "SelectPackage"
  }

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      if (fk.values.pack_id === "SelectPackage") {
        setLoding(false);
        return toast("Select Your Package.");
      }
      const reqbody = {
        topup_amnt: Number(res?.find((e) => e?.pack_id === Number(fk.values.pack_id))?.pack_amount),
        package_id: fk.values.pack_id,
        user_id: fk.values.user_id
      };
      TopUpFn(reqbody)
    }
  });
  async function TopUpFn(reqbody) {
    setLoding(true)
    try {
      const res = await apiConnectorPost(
        endpoint?.topup_api, reqbody
      );
      toast(res?.data?.message);
      fk.handleReset();
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }

  const { data: user } = useQuery(
    ["package_api"],
    () => apiConnectorGet(endpoint?.package_list_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false
    }
  );
  const res = user?.data?.result || [];

  const Customerfunction = async () => {
    const reqbody = {
      user_id: fk.values.user_id,
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
  }, [fk.values.user_id]);

  return (
    <>
      <Loader isLoading={loding} />
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center items-center"
        style={{ backgroundImage: `url(${crypto})` }}>
        <Box

          sx={{

            margin: "",
            background: "#ffffff",
            borderRadius: "10px",
            padding: 5,
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
          className="!cursor-pointer !flex !flex-col !justify-center gap-2 lg:w-[30%] w-full"
        >
          <p className="px-5 font-bold text-xl text-center text-black">TopUp</p>

          <p className="my-2 font-bold">Select Package Name</p>
          <TextField
            select
            id="pack_id"
            name="pack_id"
            value={fk.values.pack_id}
            onChange={fk.handleChange}
          >
            <MenuItem value="SelectPackage">
              Select Package
            </MenuItem>
            {res?.map((item) => (
              <MenuItem key={item?.pack_id} value={item?.pack_id}>
                {item?.pack_name}
              </MenuItem>
            ))}
          </TextField>
          <p>UserID</p>
          <TextField
            id="user_id"
            name="user_id"
            value={fk.values.user_id}
            onChange={fk.handleChange}
          />
                  <span className="text-red-800 !px-2">{data?.jnr_name}</span>

          <button
            className="!bg-black rounded-full hover:bg-white mt-2 hover:text-black  p-2 !text-white"
          onClick={fk.handleSubmit}
          >
            Submit
          </button>

        </Box>
      </div>
      <ButtomNavigation/>

    </>
  );
}
export default TopUP;
