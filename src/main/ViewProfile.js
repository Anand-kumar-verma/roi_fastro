import React from "react";
import { useQuery, useQueryClient } from "react-query";
import Navbar from "../dashboard/Navbar";
import { apiConnectorGet, apiConnectorPost } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import Loader from "../Shared/Loader";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function ViewProfile() {
  const client = useQueryClient();
  const { isLoading, data: profile_data } = useQuery(
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
  const data = profile_data?.data?.result?.[0] || [];

  const initialValues = {
    lgn_real_mob: data?.lgn_real_mob || "",
    lgn_real_email: data?.lgn_real_email || "",
    lgn_real_name: data?.lgn_real_name || "",
    lgn_wallet_add: data?.lgn_wallet_add || "",
  };
  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async () => {
      try {
        const apiRes = await apiConnectorPost(
          endpoint?.update_profile_data,
          fk.values
        );
        if (String(apiRes?.data?.success) === "true")
          client.refetchQueries("profile_api");
        toast(apiRes?.data?.message);
      } catch (e) {
        toast(e?.message || "Something went wrong.");
      }
    },
  });
  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading} />
      <div
        className="p-3 md:p-6 mt-10  h-screen overflow-y-scroll  flex flex-col items-center justify-center  bg-custom-gradient"

        //  style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="flex justify-center gap-[10%] items-center mt-1 p-2 lg:w-[60%] w-full border border-gold-color rounded focus:ring-blue-500 focus:border-blue-500">
          <AccountCircleIcon className="!text-gold-color !text-[80px]" />
        </div>

        <div className="lg:px-10 py-5 p-2 lg:w-[60%] w-full !mb-10  border border-gold-color ">
          <div className="flex !flex-col">
            {data?.jnr_achieve_reward ? (
              <div className=" flex lg:flex-row flex-col justify-between lg:items-center ">
                <label className="block text-sm font-medium text-gold-color">
                  Rank *
                </label>
                <div className="mt-1 p-2 lg:w-[60%] w-full border border-gold-color rounded focus:ring-blue-500 focus:border-blue-500">
                  {data?.jnr_achieve_reward}
                </div>
              </div>
            ) : (
              <span></span>
            )}
            <div className=" flex lg:flex-row flex-col justify-between lg:items-center ">
              <label className="block text-sm font-medium text-gold-color">
                My Referral Id *
              </label>
              <input
                value={data?.lgn_cust_id}
                className="mt-1 p-2 lg:w-[60%] w-full border border-text-color rounded focus:ring-blue-500 focus:border-blue-500 bg-glassy  !text-white"
              />
            </div>
            <div className=" flex lg:flex-row flex-col justify-between lg:items-center ">
              <label className="block text-sm font-medium text-gold-color">
                Applicant Name *
              </label>
              <input
                type="text"
                id="lgn_real_name"
                name="lgn_real_name"
                onChange={(e) => {
                  data?.lgn_update_prof === "Active" && fk.handleChange(e);
                }}
                value={fk.values.lgn_real_name}
                className="mt-1 p-2 lg:w-[60%] w-full border border-text-color rounded focus:ring-blue-500 focus:border-blue-500 bg-glassy !text-white"
              />
            </div>
            <div className=" flex lg:flex-row flex-col justify-between lg:items-center ">
              <label className="block text-sm font-medium text-gold-color">
                Mobile
              </label>
              <input
                type="text"
                id="lgn_real_mob"
                name="lgn_real_mob"
                onChange={(e) => {
                  data?.lgn_update_prof === "Active" && fk.handleChange(e);
                }}
                value={fk?.values.lgn_real_mob}
                className="mt-1 p-2 lg:w-[60%] w-full border border-text-color rounded focus:ring-blue-500 focus:border-blue-500 bg-glassy !text-white"
              />
            </div>
            <div className=" flex lg:flex-row flex-col justify-between lg:items-center ">
              <label className="block text-sm font-medium text-gold-color">
                Email Id *
              </label>
              <input
                id="lgn_real_email"
                name="lgn_real_email"
                onChange={(e) => {
                  data?.lgn_update_prof === "Active" && fk.handleChange(e);
                }}
                value={fk?.values.lgn_real_email}
                className="mt-1 p-2 lg:w-[60%] w-full border border-text-color rounded focus:ring-blue-500 focus:border-blue-500 bg-glassy !text-white"
              />
            </div>

            {/* <div className=" flex lg:flex-row flex-col justify-between lg:items-center ">
                <label className="block text-sm font-medium text-text-color">
                  Current Wallet *
                </label>
                <>
                  <input
                    value={data?.jnr_curr_wallet}
                    className="mt-1 p-2 lg:w-[60%] w-full border border-text-color rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                </>
              </div> */}
            <div className=" flex lg:flex-row flex-col justify-between lg:items-center ">
              <label className="block text-sm font-medium text-gold-color">
                Address (BEP20)*
              </label>
              <input
                id="lgn_wallet_add"
                name="lgn_wallet_add"
                placeholder="0x..."
                onChange={(e) => {
                  data?.lgn_update_prof === "Active" && fk.handleChange(e);
                }}
                value={fk.values.lgn_wallet_add}
                className="mt-1 p-2 lg:w-[60%] w-full border border-text-color rounded focus:ring-blue-500 focus:border-blue-500 bg-glassy !text-white"
              />
            </div>
            <div className="!text-rose-500 mt-2 !text-[10px] w-full p-3 overflow-x-auto bg-glassy rounded-lg border border-rose-200">
              Note: Please ensure that your wallet address is BEP20 Network
              (Format: 0x..), otherwise, you will be responsible for any issues.
            </div>

            {data?.lgn_update_prof === "Active" && (
              <Button
                variant="contained"
                className="!mt-2 !bg-glassy !rounded-full !hover:bg-text-color !hover:text-black  !p-2 !text-background"
                onClick={fk.handleSubmit}
              >
                Update
              </Button>
            )}
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default ViewProfile;
