import { FaUserCheck, FaUserPlus, FaUserTimes } from "react-icons/fa";
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
import { FaCircleUser } from "react-icons/fa6";
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
  const { isLoading: LevelBusinessLoding, data: LevelBusiness } = useQuery(
    ["level_business"],
    () => apiConnectorGet(endpoint?.level_business),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const level_business = LevelBusiness?.data?.result || [];
  return (
    <>
      <Navbar />
      <Loader isLoading={proLoding} />
      <div className="md:p-6 p-4 mt-16  !pb-16 h-screen overflow-y-scroll flex flex-col bg-custom-gradient ">
        {/* <div className="flex justify-center gap-[10%] items-center mt-1 p-2 lg:w-[60%] w-full border border-text-color rounded bg-glassy">
          <Diversity3Icon className="!text-text-color !text-[80px]" />
        </div>
        <p className="text-text-color text-sm md:text-base md:text-center ">
          View your referral network and earnings
        </p> */}
        <div className="md:grid md:grid-cols-3 grid grid-cols-1 gap-3 pt-2">
          <div className="bg-glassy !border px-5 !border-gold-color flex items-center w-full h-20">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center gap-2">
                <img
                  src={crown}
                  alt="Crown"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <p className="text-white text-sm md:text-lg font-medium text-nowrap">
                  Current Reward
                </p>
              </div>
              <div>
                <p className="text-text-color text-end  font-semibold">
                  No Reward
                </p>
                <p className="text-xs text-text-color text-end pt-2">
                  Next Reward: 0.00 USD
                </p>
              </div>
            </div>
          </div>
          <div className="bg-glassy !border px-5 !border-gold-color flex items-center justify-between w-full h-20">
            <div className="flex items-center gap-2">
              <FaCircleUser className="!text-gold-color " size={30} />
              <p className="text-white text-sm md:text-lg font-medium">
                Telegram ID
              </p>
            </div>
            <p className="text-text-color font-semibold">
              {profile?.lgn_cust_id || 0}
            </p>
          </div>
          {/* <div className="bg-glassy !border px-5 !border-gold-color flex items-center justify-between w-full h-20">
            <div className="flex items-center gap-2">
              <FaUserPlus className="!text-gold-color" size={30} />
              <p className="text-white text-sm md:text-lg font-medium">Sponser Telegram ID</p>
            </div>
            <p className="text-text-color font-semibold">
              {profile?.lgn_cust_id ? `${Number(profile?.lgn_cust_id) - 1}` : 0}
            </p>
          </div> */}
        </div>
        <div className="md:grid  md:grid-cols-4 grid grid-cols-2 gap-3 pt-5 mb-10">
          <div class="rounded-xl p-4 bg-gradient-to-r from-[#d34a4a] to-[#fe9e9e] shadow-lg text-white">
            <div class="flex md:flex-row flex-col md:gap-0 gap-2 justify-between items-center  h-full space-x-3">
              <div class=" text-3xl">
                <FaUserCheck className="!w-10 !h-10 text-[#a52828]" />
              </div>
              <div className="flex flex-col gap-0 md:gap-2">
                <p class="text-sm md:text-2xl text-gold-color">
                  Active Referrals
                </p>
                <p class="text-lg text-center text-nowrap md:text-xl font-semibold text-white">
                  {profile?.jnr_direct_topup_mem || 0}{" "}
                  <span class="font-normal">Active</span>
                </p>
              </div>
            </div>
          </div>

          <div class="rounded-xl p-4 bg-gradient-to-r from-[#291d57] to-[#a38afb] shadow-lg text-white">
            <div class="flex md:flex-row flex-col md:gap-0 gap-2 justify-between items-center  h-full space-x-3">
              <div class=" text-3xl">
                <FaUserTimes className="!w-10 !h-10 text-[#201355]" />
              </div>
              <div className="flex flex-col gap-0 md:gap-2">
                <p class="text-sm md:text-2xl text-gold-color">
                  Inactive Referrals
                </p>
                <p class="text-lg text-center text-nowrap md:text-xl font-semibold text-white">
                  {Number(profile?.jnr_direct_team || 0) -
                    Number(profile?.jnr_direct_topup_mem || 0)}{" "}
                  <span class="font-normal">Inactive</span>
                </p>
              </div>
            </div>
          </div>

          <div class="rounded-xl p-4 bg-gradient-to-r from-[#8f8f2f] to-[#f3e17e] shadow-lg text-white">
            <div class="flex md:flex-row flex-col md:gap-0 gap-2 justify-between items-center  h-full space-x-3">
              <div class="text-blue-500 text-3xl">
                <FaUserGroup className="!w-10 !h-10 !text-[#5f5f12]" />
              </div>
              <div className="flex flex-col gap-0 md:gap-2">
                <p class="text-sm md:text-2xl text-nowrap text-gold-color">
                  {" "}
                  Total Network Size
                </p>
                <p class="text-lg text-center text-nowrap md:text-xl font-semibold text-white">
                  {profile?.jnr_direct_team || 0}{" "}
                </p>
              </div>
            </div>
          </div>

          <div class="rounded-xl p-4 bg-gradient-to-r from-[#f74ede] to-[#f58ce0] shadow-lg text-white">
            <div class="flex md:flex-row flex-col md:gap-0 gap-2 justify-between items-center  h-full space-x-3">
              <div class="text-blue-500 text-3xl">
                <PiMicrosoftTeamsLogoLight className="!w-10 !h-10 !text-[#c526ad]" />
              </div>
              <div className="flex flex-col gap-0 md:gap-2">
                <p class="text-sm md:text-2xl  text-gold-color">
                  Direct Business
                </p>
                <p class="text-lg text-center text-nowrap md:text-xl font-semibold text-white">
                  ${profile?.jnr_direct_business || 0}
                </p>
              </div>
            </div>
          </div>

          <div class="rounded-xl p-4 bg-gradient-to-r from-[#53a73a] to-[#94f37e] shadow-lg text-white">
            <div class="flex md:flex-row flex-col md:gap-0 gap-2 justify-between items-center  h-full space-x-3">
              <div class="text-blue-500 text-3xl">
                <VscFileSubmodule className="!w-10 !h-10 !text-[#4ff02b]" />
              </div>
              <div className="flex flex-col gap-0 md:gap-2">
                <p class="text-sm md:text-2xl text-gold-color">Topup Wallet</p>
                <p class="text-lg text-center text-nowrap md:text-xl font-semibold text-white">
                  {profile?.jnr_topup_wallet || 0} USD
                </p>
              </div>
            </div>
          </div>
          <div class="rounded-xl p-4 bg-gradient-to-r from-[#3a60a7] to-[#94f37e] shadow-lg text-white">
            <div class="flex md:flex-row flex-col md:gap-0 gap-2 justify-between items-center  h-full space-x-3">
              <div class="text-blue-500 text-3xl">
                <VscFileSubmodule className="!w-10 !h-10 !text-[#4ff02b]" />
              </div>
              <div className="flex flex-col gap-0 md:gap-2">
                <p class="text-sm md:text-2xl text-gold-color">
                  Total Team Business
                </p>
                {/* <p class="text-lg text-center text-nowrap md:text-xl font-semibold text-white">
                  {Number(
                    level_business?.[0]?.total_team_business || 0
                  )?.toFixed(2) || 0}{" "}
                  USD
                </p> */}
                <p class="text-lg text-center text-nowrap md:text-xl font-semibold text-white">
                  {Number(
                    level_business?.find(
                      (j) => j?.level_label === `total_team_business`
                    )?.level_value
                  )?.toFixed(2) || 0}{" "}
                  USD
                </p>
              </div>
            </div>
          </div>
          <div class="rounded-xl p-4 bg-gradient-to-r from-[#a73a5c] to-[#94f37e] shadow-lg text-white">
            <div class="flex md:flex-row flex-col md:gap-0 gap-2 justify-between items-center  h-full space-x-3">
              <div class="text-blue-500 text-3xl">
                <VscFileSubmodule className="!w-10 !h-10 !text-[#4ff02b]" />
              </div>
              <div className="flex flex-col gap-0 md:gap-2">
                <p class="text-sm md:text-2xl text-gold-color">
                  Today Team Business
                </p>
                {/* <p class="text-lg text-center text-nowrap md:text-xl font-semibold text-white">
                  {Number(
                    level_business?.[0]?.today_team_business || 0
                  )?.toFixed(2) || 0}{" "}
                  USD
                </p> */}
                <p class="text-lg text-center text-nowrap md:text-xl font-semibold text-white">
                  {Number(
                    level_business?.find(
                      (j) => j?.level_label === `today_team_business`
                    )?.level_value
                  )?.toFixed(2) || 0}{" "}
                  USD
                </p>
              </div>
            </div>
          </div>

          {/* <div className="bg-glassy p-4 rounded-xl gap-2 flex flex-col shadow-md text-text-color">
            <VscFileSubmodule className="!w-10 !h-10" />
            <p className="text-sm text-gray-300 font-medium ">Topup Wallet</p>
            <p className="text-lg text-white font-semibold">
              {profile?.jnr_topup_wallet || 0} USD
            </p>
          </div> */}
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
