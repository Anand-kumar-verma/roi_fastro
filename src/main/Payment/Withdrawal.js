import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import ButtomNavigation from "../../Layout/ButtomNaviagatoin";
import Loader from "../../Shared/Loader";
import Navbar from "../../dashboard/Navbar";
import { apiConnectorGet, apiConnectorPost } from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import { enCryptData } from "../../utils/Secret";
function Withdrawal() {
  // const [walletAddress, setWalletAddress] = useState("");
  const [data, setData] = useState("");
  const [loding, setLoding] = useState(false);
  const location = useLocation();

  const [userData, setUserData] = useState();

  // console.log(userData, "wghsfhdsxgqf");

  const params = new URLSearchParams(location?.search);
  const IdParam = params?.get("token");
  const base64String = atob(IdParam);
  const withdrawalType = location.state?.type;
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
      wallet_type:
        withdrawalType === "jackpot" ? 3 : withdrawalType === "wingo" ? 4 : 2,
    };
    if (fk.values.amount === "" || Number(fk.values.amount) < 2)
      return toast("Amount should be grater or equal to 2$", { id: 1 });
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
      if (String(res?.data?.success) === "true") {
        GetWalletUserData();
      }
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }

  async function GetWalletUserData() {
    setLoding(true);
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
    <div className="!my-[10%] ">
      <Navbar />
      <div className="text-gold-color md:mt-14 flex flex-col items-center h-screen overflow-y-scroll pb-10 bg-custom-gradient relative">
        <Loader isLoading={loding} />

        <div className="flex h-screen  flex-col justify-center items-center px-3 mt-5 w-full lg:w-[60%]">
          <Box
            className="w-full glass-card border border-gold-color rounded-xl p-5 shadow-xl backdrop-blur-md"
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 8px 24px",
            }}
          >
            {/* Icon Header */}
            <div className="flex justify-center mb-4">
              <AssuredWorkloadIcon
                className="text-gold-color text-[80px] hover:scale-105 transition-transform duration-300"
                fontSize="100"
              />
            </div>

            {/* Wallet Info */}
            <div className="grid grid-cols-2 gap-4 bg-glassy p-4 border border-rose-200 rounded-lg text-sm">
              <div className="flex flex-col">
                <span className="font-medium text-yellow-400 ">
                  Current Balance
                </span>
                <span className="!text-green-500 !text-lg">
                  {withdrawalType === "jackpot"
                    ? Number(userData?.jnr_game_winning || 0)?.toFixed(2)
                    : withdrawalType === "wingo"
                    ? Number(userData?.jnr_wingo_game_wallet || 0).toFixed(2)
                    : Number(userData?.jnr_curr_wallet || 0).toFixed(2)}{" "}
                  USD
                </span>
              </div>
            </div>

            {/* Address Display */}
            <div className="my-4 text-xs bg-glassy border border-rose-200 p-3 rounded-lg flex flex-col">
              <strong className="text-gold-color">Address:</strong>
              <span className="ml-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent font-medium">
                {fk.values.walletAddress}
              </span>
            </div>

            {/* Amount Input */}
            <div className="mb-3">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter Amount"
                value={fk.values.amount}
                onChange={fk.handleChange}
                className="mt-1 w-full !text-xs p-2 !text-white border border-yellow-500 rounded-lg bg-glassy focus:outline-none focus:ring focus:ring-yellow-300 transition duration-200"
              />
            </div>

            {/* Wallet Address Input */}
            <div className="mb-3">
              <label htmlFor="walletAddress" className="text-sm font-medium">
                Confirm Wallet Address (BEP20)
              </label>
              <input
                id="walletAddress"
                name="walletAddress"
                placeholder="0x..."
                value={fk.values.walletAddress}
                // onChange={fk.handleChange}
                readOnly
                className="mt-1 w-full !text-xs p-2 border border-yellow-500 rounded-lg bg-glassy focus:outline-none font-medium
             text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"
              />
            </div>

            {/* Confirm Button */}
            <button
              onClick={Payout}
              className="w-full mt-4 bg-gold-color text-background p-2 rounded-full font-semibold hover:bg-white hover:text-black transition duration-300"
            >
              Confirm
            </button>

            {/* Note */}
            <div className="text-[10px] text-rose-500 mt-4 p-3 border border-rose-200 rounded-lg bg-glassy">
              <strong>Note:</strong> Please ensure that your wallet address is
              BEP20 Network (Format: 0x..). You will be responsible for any
              incorrect entries.
            </div>
          </Box>
        </div>
      </div>
      <ButtomNavigation />
    </div>
  );
}
export default Withdrawal;
