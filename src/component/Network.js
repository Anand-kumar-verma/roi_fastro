import React, { useState } from 'react';
import Navbar from '../dashboard/Navbar';
import Loader from '../Shared/Loader';
import ButtomNavigation from '../Layout/ButtomNaviagatoin';
import crown from '../images/crown.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { FaUserCheck } from 'react-icons/fa';
import { FaUserTimes } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { IoArrowDownCircle } from 'react-icons/io5';
import { VscFileSubmodule } from 'react-icons/vsc';
import { PiMicrosoftTeamsLogoLight } from 'react-icons/pi';
import { FaRegClock } from 'react-icons/fa';
import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import Levelone from './TabComponent/Levelone';

const Network = () => {
  const [loading, setLoading] = useState();
  const [value, setValue] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const isMobile = '';
  return (
    <>
      <Navbar />
      <Loader isLoading={loading} />
      <div className="p-6 min-h-screen flex flex-col bg-custom-gradient overflow-y-auto">
        <p className="text-2xl text-text-color md:text-center font-bold pt-12 lg:pt-16 bg-gradient-to-r from-green-400 to-[#44a8e7] bg-clip-text text-transparent">
          {' '}
          Network{' '}
        </p>
        <p className="text-[#60A5FA] text-sm md:text-base md:text-center ">
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
                <p className="text-white font-medium">Current Rank</p>
              </div>
              <p className="text-[#60A5FA] font-semibold">No Rank</p>
            </div>
            <p className="text-xs text-[#80caff] text-end pt-2">
              Next Novice Requirement
            </p>
          </div>
          <div className="bg-glassy p-6 rounded-xl flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <AccountCircleIcon className="!text-[#60A5FA]" />
              <p className="text-white font-medium">Telegram ID</p>
            </div>
            <p className="text-white font-semibold">9876543210</p>
          </div>
          <div className="bg-glassy p-2 rounded-xl flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <PersonAddAltIcon className="!text-[#60A5FA]" />
              <p className="text-white font-medium">Sponser Telegram ID</p>
            </div>
            <p className="text-white font-semibold">Not Set</p>
          </div>
        </div>
        <div className="md:grid md:grid-cols-4 grid grid-cols-2 gap-3 pt-5">
          <div className="bg-glassy p-4 rounded-xl gap-2 flex flex-col shadow-md text-[#60A5FA]">
            <FaUserCheck className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Active Referrals
            </p>
            <p className="text-lg text-white font-semibold">0 Active</p>
          </div>
          <div className="bg-glassy p-4 gap-2 rounded-xl  flex flex-col shadow-md text-[#60A5FA]">
            <FaUserTimes className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Inactive Referrals
            </p>
            <p className="text-lg text-white font-semibold">0 Inactive</p>
          </div>
          <div className="bg-glassy p-4 rounded-xl  gap-2 flex flex-col shadow-md text-[#60A5FA]">
            <FaUserGroup className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Total Network Size
            </p>
            <p className="text-lg text-white font-semibold">0 </p>
          </div>
          <div className="bg-glassy p-4 rounded-xl gap-2 flex flex-col shadow-md text-[#60A5FA]">
            <PiMicrosoftTeamsLogoLight className="!w-12 !h-12" />
            <p className="text-sm text-gray-300 font-medium ">Team Volume</p>
            <p className="text-lg text-white font-semibold">$0 </p>
          </div>
          <div className="bg-glassy p-4 rounded-xl gap-2 flex flex-col shadow-md text-[#60A5FA]">
            <VscFileSubmodule className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Redeposited Wallet
            </p>
            <p className="text-lg text-white font-semibold">0.00 USD</p>
          </div>
          <div className="bg-glassy p-4 rounded-xl gap-2 flex flex-col shadow-md text-[#60A5FA]">
            <IoArrowDownCircle className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Total Withdrawal
            </p>
            <p className="text-lg text-white font-semibold">0.00 USD</p>
          </div>
          <div className="bg-glassy p-4 rounded-xl gap-2 flex flex-col shadow-md text-[#60A5FA]">
            <FaRegClock className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Total Rank Salary
            </p>
            <p className="text-lg text-white font-semibold">0.00 USD</p>
          </div>
          <div className="bg-glassy rounded-xl p-4 gap-2 flex flex-col shadow-md text-[#60A5FA]">
            <VscFileSubmodule className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">
              Restake Balance
            </p>
            <p className="text-lg text-white font-semibold">0.00 USD</p>
          </div>
        </div>
        <Box sx={{ width: '100%' }} className="!bg-glassy !p-6 ">
          <Tabs
            value={value}
            onChange={handleChange}
            variant={isMobile ? 'scrollable' : 'fullWidth'}
            scrollButtons={false}
            allowScrollButtonsMobile
            className="!text-text-color"
          >
            <Tab
              label="Level 1"
              sx={{
                color: '#60A5FA',
                '&.Mui-selected': {
                  color: '#3f7de0',
                },
              }}
            />
            <Tab
              label="Level 2"
              sx={{
                color: '#60A5FA',
                '&.Mui-selected': {
                  color: '#3f7de0',
                },
              }}
            />
            <Tab
              label="Level 3"
              sx={{
                color: '#60A5FA',
                '&.Mui-selected': {
                  color: '#3f7de0',
                },
              }}
            />
            <Tab
              label="Level 4"
              sx={{
                color: '#60A5FA',
                '&.Mui-selected': {
                  color: '#3f7de0',
                },
              }}
            />
            <Tab
              label="Level 5"
              sx={{
                color: '#60A5FA',
                '&.Mui-selected': {
                  color: '#3f7de0',
                },
              }}
            />
          </Tabs>

          <Box sx={{ p: 2 }} className="!text-text-color ">
            {value === 0 && <div>Content for Tab 1</div>}
            {value === 1 && <Levelone />}
            {value === 2 && <div>Content for Tab 3</div>}
            {value === 3 && <div>Content for Tab 4</div>}
            {value === 4 && <div>Content for Tab 5</div>}
          </Box>
        </Box>
      </div>
      <ButtomNavigation />
    </>
  );
};

export default Network;
