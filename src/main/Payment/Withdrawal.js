import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Loader from "../../Shared/Loader";
import Navbar from "../../dashboard/Navbar";
import { apiConnectorGet, apiConnectorPost } from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import { enCryptData } from "../../utils/Secret";

function Withdrawal() {
  // const [walletAddress, setWalletAddress] = useState("");
  const [data, setData] = useState("");
  const [loding, setLoding] = useState(false);

  const [selectedOption, setSelectedOption] = useState(2);
  const location = useLocation();

  const [userData, setUserData] = useState();

  // console.log(userData, "wghsfhdsxgqf");

  const params = new URLSearchParams(location?.search);
  const IdParam = params?.get("token");
  const base64String = atob(IdParam);

  const fk = useFormik({
    initialValues: {
      amount: "",
      walletAddress: userData?.lgn_wallet_add || "",
    },
    enableReinitialize: true,
  });

  async function Payout() {
    const reqbody = {
      wallet_add: String(fk.values.walletAddress)?.trim(),
      amount: Number(fk.values.amount),

      wallet_type: selectedOption,
    };
    if (fk.values.amount === "" || Number(fk.values.amount) < 10)
      return toast("Amount should be grater or equal to 10$", { id: 1 });
    if (!fk.values.walletAddress)
      return toast("Please Update Your Profile before withdrawal request.", {
        id: 1,
      });
    setLoding(true);

    try {
      const res = await apiConnectorPost(
        endpoint?.withdrawal_api,
        {
          payload: enCryptData(reqbody),
        },
        base64String
      );
      setData(res?.data?.result?.[0]);
      toast(res?.data?.message);
      fk.handleReset();
      if (String(res?.data?.success) === "true") GetWalletUserData();
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }

  async function GetWalletUserData() {
    try {
      const res = await apiConnectorGet(
        endpoint?.wallet_user_data,
        {},
        base64String
      );
      setUserData(res?.data?.result?.[0]);
      // toast(res?.data?.message);
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }

  useEffect(() => {
    GetWalletUserData();
  }, []);

  // const { data: profile_data } = useQuery(
  //   ["profile_api"],
  //   () => apiConnectorGetWithoutToken(endpoint?.profile_api,{},base64String),
  //   {
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     retry: false,
  //     retryOnMount: false,
  //     refetchOnWindowFocus: false,
  //   }
  // );
  // const profile = profile_data?.data?.result || [];
  // console.log(userData);
  return (
    <>
      <Navbar />
      <div
        className=" text-white flex flex-col items-center  min-h-screen pb-10 bg-[#111022]"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <Loader isLoading={loding} />

        <div
          className="flex min-h-screen flex-col justify-center items-center bg-[#111022] px-1 mt-5"
          // style={{ backgroundImage: `url(${crypto})` }}
        >
          <Box
            className="!cursor-pointer bg-[#111022]  !flex !flex-col !justify-center gap-2  w-full border-2 border-white "
            sx={{
              // background: "#dad3d3",
              borderRadius: "5px",
              padding: 2,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <p className="text-3xl text-white text-center font-bold my-2 bg-gradient-to-r from-green-400 to-[#44a8e7] bg-clip-text text-transparent">
              Withdrawal
            </p>

            <div className="!text-green-500 !text-[13px] w-full p-3 overflow-x-auto bg-green-50 rounded-lg border border-rose-200">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex whitespace-nowrap">
                  <p>Working Wallet : </p>
                  <p>{Number(userData?.jnr_curr_wallet || 0).toFixed(2)}</p>
                </div>

                <div className="flex whitespace-nowrap">
                  <p>Fund Wallet : </p>
                  <p>{Number(userData?.jnr_topup_wallet || 0).toFixed(2)}</p>
                </div>
                <label className="!flex !items-center gap-1">
                  <input
                    type="radio"
                    // value="option1"
                    checked={selectedOption === 2}
                    onChange={() => setSelectedOption(2)}
                  />
                  Working Wallet
                </label>

                <label className="!flex !items-center gap-1">
                  <input
                    type="radio"
                    // value="option1"
                    checked={selectedOption === 1}
                    onChange={() => setSelectedOption(1)}
                  />
                  Fund Wallet
                </label>
              </div>
            </div>
            <div className="my-3">
              <div className="!text-rose-500 !text-[10px] w-full p-3 overflow-x-auto bg-rose-50 rounded-lg border border-rose-200">
                <span className="!font-bold"> Address : </span>{" "}
                <span className=""> {fk.values.walletAddress} </span>
              </div>
            </div>
            <p>Amount:</p>
            <input
              type="number"
              placeholder="Entre Amount"
              id="amount"
              name="amount"
              value={fk.values.amount}
              onChange={fk.handleChange}
              className="p-2 !-mt-2  w-full border border-yellow-500 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <p>Confirm Your Address (BEP20)*:</p>

            <input
              id="walletAddress"
              name="walletAddress"
              placeholder="0x..."
              value={fk.values.walletAddress}
              className="p-2 !-mt-2 w-full border border-yellow-500 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              className=" bg-gradient-to-r from-green-400 to-[#44a8e7] rounded-full hover:bg-white hover:text-black  p-2 !text-background"
              onClick={Payout}
            >
              Confirm
            </button>
            {/* <div className="m-3">
            <div className=" flex flex-wrap justify-start">
              <p>Transaction Hash : </p>{" "}
              <p className="!text-[9px] whitespace-break-spaces">{data?.hex}</p>
            </div>

            <div className="flex flex-wrap justify-start !gap-4">
              <p>Transaction Status : </p>{" "}
              <p className="!font-bold">{data?.status}</p>
            </div>
          </div> */}
            <div className="!text-rose-500 !text-[10px] w-full p-3 overflow-x-auto bg-rose-50 rounded-lg border border-rose-200">
              Note: Please ensure that your wallet address is BEP20 Network
              (Format: 0x..), otherwise, you will be responsible for any issues.
            </div>
          </Box>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
}
export default Withdrawal;
