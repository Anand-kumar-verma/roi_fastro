import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import React, { useState } from "react";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { PiMicrosoftTeamsLogoLight } from "react-icons/pi";
import { VscFileSubmodule } from "react-icons/vsc";
import { useQuery } from "react-query";
import Navbar from "../dashboard/Navbar";
import crown from "../images/crown.png";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import Loader from "../Shared/Loader";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
const Network = () => {
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
  return (
    <>
      <Navbar />
      <Loader isLoading={proLoding} />
      <div className="p-6 mt-10 min-h-screen flex flex-col bg-custom-gradient overflow-y-auto">
        <div className="flex justify-center gap-[10%] items-center mt-1 p-2 lg:w-[60%] w-full border border-text-color rounded bg-glassy">
          <Diversity3Icon className="!text-text-color !text-[80px]" />
        </div>
        <p className="text-text-color text-sm md:text-base md:text-center ">
          View your referral network and earnings
        </p>
        <div className="md:grid md:grid-cols-3 grid grid-cols-1 gap-3 pt-2">
          <div className="bg-glassy p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={crown}
                  alt="Crown"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <p className="text-white font-medium">Current Reward</p>
              </div>
              <p className="text-text-color font-semibold">No Reward</p>
            </div>
            <p className="text-xs text-text-color text-end pt-2">
              Next Reward: 0.00 USD
            </p>
          </div>
          <div className="bg-glassy p-6 rounded-xl flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <AccountCircleIcon className="!text-text-color" />
              <p className="text-white font-medium">Telegram ID</p>
            </div>
            <p className="text-white font-semibold">{profile?.lgn_cust_id}</p>
          </div>
          <div className="bg-glassy p-2 rounded-xl flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <PersonAddAltIcon className="!text-text-color" />
              <p className="text-white font-medium">Sponser Telegram ID</p>
            </div>
            <p className="text-white font-semibold">
              {profile?.lgn_cust_id - 1}
            </p>
          </div>
        </div>
        <div className="md:grid md:grid-cols-4 grid grid-cols-2 gap-3 pt-5 mb-10">
          <div className="bg-glassy p-4 rounded-xl gap-2 flex flex-col shadow-md text-text-color">
            <FaUserCheck className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Active Referrals
            </p>
            <p className="text-lg text-white font-semibold">
              {profile?.jnr_direct_topup_mem || 0} Active
            </p>
          </div>
          <div className="bg-glassy p-4 gap-2 rounded-xl  flex flex-col shadow-md text-text-color">
            <FaUserTimes className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Inactive Referrals
            </p>
            <p className="text-lg text-white font-semibold">
              {Number(profile?.jnr_direct_team || 0) -
                Number(profile?.jnr_direct_topup_mem || 0)}{" "}
              Inactive
            </p>
          </div>
          <div className="bg-glassy p-4 rounded-xl  gap-2 flex flex-col shadow-md text-text-color">
            <FaUserGroup className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Total Network Size
            </p>
            <p className="text-lg text-white font-semibold">
              {profile?.jnr_direct_team || 0}{" "}
            </p>
          </div>
          <div className="bg-glassy p-4 rounded-xl gap-2 flex flex-col shadow-md text-text-color">
            <PiMicrosoftTeamsLogoLight className="!w-12 !h-12" />
            <p className="text-sm text-gray-300 font-medium ">
              Direct Business
            </p>
            <p className="text-lg text-white font-semibold">
              ${profile?.jnr_direct_business || 0}
            </p>
          </div>
          <div className="bg-glassy p-4 rounded-xl gap-2 flex flex-col shadow-md text-text-color">
            <VscFileSubmodule className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">Topup Wallet</p>
            <p className="text-lg text-white font-semibold">
              {profile?.jnr_topup_wallet || 0} USD
            </p>
          </div>
          {/* <div className="bg-glassy p-4 rounded-xl gap-2 flex flex-col shadow-md text-text-color">
            <IoArrowDownCircle className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Total Withdrawal
            </p>
            <p className="text-lg text-white font-semibold">0.00 USD</p>
          </div>
          <div className="bg-glassy p-4 rounded-xl gap-2 flex flex-col shadow-md text-text-color">
            <FaRegClock className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Total Rank Salary
            </p>
            <p className="text-lg text-white font-semibold">0.00 USD</p>
          </div>
          <div className="bg-glassy rounded-xl p-4 gap-2 flex flex-col shadow-md text-text-color">
            <VscFileSubmodule className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Restake Balance
            </p>
            <p className="text-lg text-white font-semibold">0.00 USD</p>
          </div> */}
        </div>
        {/* <Box sx={{ width: '100%' }} className="!bg-glassy ">
          <Box sx={{ overflowX: 'auto', width: '100%' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={false}
              allowScrollButtonsMobile
              className="!text-text-color"
              sx={{
                px: 1,
                '& .MuiTabs-flexContainer': {
                  flexWrap: 'nowrap',
                },
                '& .MuiTabs-scroller': {
                  overflowX: 'auto',
                },
              }}
            >
              {[1, 2, 3, 4, 5].map((level, index) => (
                <Tab
                  key={level}
                  label={`Level ${level}`}
                  sx={{
                    px: 1,
                    py: 1,
                    minWidth: 'auto',
                    color: '#60A5FA',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    '&.Mui-selected': {
                      color: '#3f7de0',
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ p: 2 }} className="!text-text-color">
            {value === 0 && <Levelone />}
            {value === 1 && <Leveltwo />}
            {value === 2 && <Levelthree />}
            {value === 3 && <Levelfour />}
            {value === 4 && <Levelfive />}
          </Box>
        </Box> */}
      </div>
      <ButtomNavigation />
    </>
  );
};

export default Network;
