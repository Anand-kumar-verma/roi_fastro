import React, { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Navbar from "../dashboard/Navbar";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import Loader from "../Shared/Loader";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint, telegram_url } from "../utils/APIRoutes";

function Referral() {
  const { isLoading: proLoding, data: profile_data } = useQuery(
    ["profile_api"],
    () => apiConnectorGet(endpoint?.profile_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const profile = profile_data?.data?.result?.[0] || [];

  const handleCopy = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <Navbar />
      <div className=" text-white lg:px-32 min-h-screen pb-10 bg-custom-gradient">
        <Loader isLoading={proLoding} />
        <div className="p-6 gap-2 mt-10 min-h-screen flex flex-col bg-custom-gradient overflow-y-auto">
          <p className="text-2xl text-text-color pt-4">Referral Income</p>
          <p className="text-sm">
            Track your referral earnings and invite friends
          </p>
          <div className="grid gap-3 lg:gap-5 items-start mt-2 p-3 lg:w-[50%] w-full border border-text-color rounded bg-glassy">
            <p className="text-sm text-white">Share Your Referral Link</p>
            <p className="text-sm text-rose-600">
              Activate your account to start earning through referrals
            </p>
            <p className="text-xs text-white">
              {telegram_url + `startapp=${profile?.lgn_cust_id}`}
            </p>
            <button
              className="w-[40%] bg-blue-500 text-white text-sm rounded-lg py-2 px-3"
              onClick={() =>
                handleCopy(telegram_url + `startapp=${profile?.lgn_cust_id}`)
              }
            >
              COPY
            </button>
          </div>
          {/* <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2">
            <div className="bg-glassy p-4 gap-1 rounded-xl flex flex-col items-start shadow-md text-white space-y-1">
              <LuArrowDownToLine className="w-8 h-8 text-text-color" />
              <p className="text-xs text-white">Deposit Referral Income</p>
              <p className="text-sm text-white">$0.00</p>
            </div>
            <div className="bg-glassy p-4 rounded-xl flex flex-col items-start shadow-md text-white space-y-1">
              <LuArrowUpFromLine className="w-8 h-8 text-text-color" />
              <p className="text-xs text-white">Withdrawal Referral Income</p>
              <p className="text-sm text-white">$0.00</p>
            </div>
          </div> */}
          {/* <div className="bg-glassy p-3 mt-2 rounded-xl shadow-md flex justify-center items-center">
            <button
              className="flex items-center md:justify-evenly gap-2 bg-blue-500 text-white text-sm font-medium rounded-lg py-3 px-11 lg:w-[40%] lg:gap-0 shadow transition hover:bg-blue-600"
              onClick={() => navigate("/roi_income")}
            >
              <GoClock className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
              <span className="lg:text-lg">View Income History</span>
            </button>
          </div> */}
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Referral;
