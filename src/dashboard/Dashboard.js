import { Close, CopyAll, Diamond } from "@mui/icons-material";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { Button } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsTrophyFill } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import card1 from "../images/card1.jpg";
import card2 from "../images/card2.jpg";
import card3 from "../images/card3.jpg";
import card6 from "../images/card_6.png";
import tether from "../images/tether.png";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import Loader from "../Shared/Loader";
import { apiConnectorGet, apiConnectorPost } from "../utils/APIConnector";
import { contractAddress, endpoint, telegram_url } from "../utils/APIRoutes";
import { enCryptData } from "../utils/Secret";
import LevelwiseBusiness from "./LevelwiseBusiness";
import Navbar from "./Navbar";
import CustomPopup from "../component/CustomPopup";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const client = useQueryClient();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCopyy = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const { isLoading, data: dashboard } = useQuery(
    ["dashboard_api"],
    () => apiConnectorGet(endpoint?.user_dashboard_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const data = dashboard?.data?.result || [];
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
  useEffect(() => {
    setOpen(profile?.is_popup_open === "Active");
  }, [profile?.is_popup_open]);

  //   const { isLoading: isPopupLoading, data:popupResponse  } = useQuery(
  //   ["popup_close"],
  //   () => apiConnectorGet(endpoint.update_popup_status),
  //   {
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     retry: false,
  //     retryOnMount: false,
  //     refetchOnWindowFocus: false,
  //   }
  // );

  const updatePopup = async () => {
    handleClose(false);
    return;
    try {
      const res = await apiConnectorGet(endpoint?.update_popup_status);
      if (res?.data?.success) {
        client.refetchQueries("profile_api");
      }

      // toast(res?.data?.message);
    } catch (e) {
      console.log(e);
    }
  };
  const compoundWallet = async () => {
    setLoading(true);
    handleClose(false);

    try {
      const res = await apiConnectorGet(endpoint?.compounding_wallet);
      if (res?.data?.success) {
        client.refetchQueries("profile_api");
        client.refetchQueries("dashboard_api");
      }
      toast(res?.data?.message);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  //0, roi
  //1, level ==> Booster
  //2, direct
  //3, matching ==> magic
  //4, booster ==> aise koi income nhi bni hai..
  //5, weekly ==> rank
  //6, Rocket
  // 7, Jackpot

  async function claimFST(id) {
    setLoading(true);
    const reqbody = {
      payload: enCryptData({
        t_id: id,
        status_type: 1,
      }),
    };
    try {
      const res = await apiConnectorPost(endpoint?.claim_fst, reqbody);
      if (res?.data?.message === "Transaction Performed") {
        client.refetchQueries("dashboard_api");
        client.refetchQueries("profile_api");
      }
      setLoading(false);
      return toast(res?.data?.message);
    } catch (e) {
      setLoading(false);
      return toast(e.message || "Something went wrong");
    }
  }
  return (
    <>
      <Navbar />

      {profile?.is_popup_open === "Active" && (
        <CustomPopup
          onChangeFun={updatePopup}
          open={open}
          handleClose={handleClose}
        />
      )}
      <div className=" text-white lg:px-32 h-screen overflow-y-scroll pb-10 bg-custom-gradient">
        <Loader isLoading={isLoading || proLoding || loading} />
        <div className="px-8 pt-10  mt-10">
          <div className="text-lg bg-glassy border border-rose-500 rounded opacity-75 lg:p-4 p-2 lg:px-5 lg:mt-10 mt-5 flex lg:flex-row flex-col items-center justify-between">
            <span className="!font-bold pr-3 text-green-500">News:</span>
            <div className="w-full overflow-hidden whitespace-nowrap relative">
              <div
                className="flex animate-marquee"
                style={{
                  animation: "marquee 6s linear infinite",
                }}
              >
                <span className="inline-block text-text-color text-sm">
                  Congratulatoins! You have completed{" "}
                  {Number(profile?.slot_count || 1) - 1}
                  nd Slot of FST Coin.
                </span>
              </div>
            </div>
          </div>

          <div className=" w-full mt-8 grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div className="bg-glassy !bg-black p-6 !pt-4  !border-gold-color">
              <div className="relative w-full">
                <div className="absolute inset-0 rounded-full pointer-events-none">
                  <div className="w-full h-full rounded-full border-2 border-transparent bg-gradient-to-r from-black via-text-color to-text-color animate-glow bg-[length:200%_auto] bg-clip-border"></div>
                </div>
                <Button
                  variant="outlined"
                  className="!relative !z-10 !w-full !rounded-full  !text-gold-color !bg-transparent hover:!bg-violet-600/20"
                  onClick={compoundWallet}
                >
                  Compound your wallet
                </Button>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-center pt-8">
                  <div className="flex gap-2">
                    <p className="text-text-color lg:text-lg text-base">
                      Total Topup <br />
                      Amount
                    </p>
                  </div>
                  <Button
                    variant="contained"
                    className="!rounded-full"
                    onClick={() => navigate("/activation")}
                  >
                    Deposit
                  </Button>
                </div>
                <div className="text-xl font-bold text-amber-400 flex gap-2 pt-2">
                  {Number(profile?.jnr_topup_wallet || 0)?.toFixed(2)} USD
                  <img src={tether} alt="" className="w-6 h-6" />
                </div>
                <div className="flex gap-2 pt-4 justify-center">
                  <p className="text-text-color text-sm ">
                    RePurchase Your package to continue earning reward & ROI
                  </p>
                </div>
                <div className="pt-4  border-b-2 border-text-color"></div>
                <div className="flex justify-between gap-1 items-center mt-3">
                  <div>
                    <div className="flex gap-2 ">
                      {" "}
                      <AllInboxIcon />
                      <p className="text-text-color text-lg">Balance</p>
                    </div>
                    <div className="text-xl pt-2 font-bold text-amber-400 flex gap-2">
                      {Number(profile?.jnr_curr_wallet || 0)?.toFixed(2)} USD
                      <img src={tether} alt="" className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <Button
                      variant="contained"
                      className="!rounded-full !bg-gold-color !text-text-color !font-bold"
                      onClick={() => navigate("/withdrawal-link")}
                    >
                      Withdrawal
                    </Button>
                    {Number(data?.[0]?.is_pending_id || 0) > 0 && (
                      <Button
                        variant="contained"
                        className="!rounded-full !mt-2 !bg-gradient-to-r from-text-color via-orange-400 to-gold-color 
             !text-black !font-bold animate-gradient-x bg-[length:200%_200%] shadow-xl"
                        onClick={() =>
                          claimFST(Number(data?.[0]?.is_pending_id || 0))
                        }
                      >
                        ✨ Claim FST
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 flex-col items-center"></div>
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-glassy shadow-2xl !bg-black !pt-4  !border-gold-color">
              <div className="grid gap-6 grid-cols-2 w-full place-items-center mb-6">
                <div className="flex items-center justify-center bg-gold-color rounded-full text-black h-24 w-24 font-extrabold text-6xl">
                  {/* <MonetizationOnIcon className="!text-9xl " /> */}
                  {Number(profile?.slot_count || 0)}
                </div>
                <div className="text-right">
                  <span className="block text-sm text-gray-400">
                    Withdrawal Amount
                  </span>
                  <span className="text-3xl font-extrabold text-amber-400 tracking-wide">
                    {Number(profile?.withdrawal_amount || 0)?.toFixed(2)} USD
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-blue-200">
                <div className="flex justify-between">
                  <span className="font-medium text-sm">User ID</span>
                  <span className="font-semibold !text-white">
                    {profile?.lgn_cust_id}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-sm">FST Withdrawal</span>
                  <span className="font-semibold text-green-400">
                    {Number(profile?.fst_withdrawal_amount || 0)?.toFixed(2)}{" "}
                    FST
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-sm">
                    FST Slot Count {Number(profile?.slot_count || 0)}:{" "}
                  </span>
                  <span className="font-semibold text-green-400">
                    100000 /{" "}
                    {(
                      Math.ceil(Number(data?.[0]?.total_fst_with || 0)) -
                      Math.ceil(Number(profile?.token_curr_value || 0))
                    )
                      .toString()
                      .padStart(6, "0")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-sm">FST Live Price: </span>
                  <span className="font-semibold text-green-400">
                    {Number(profile?.token_price || 0)} $
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-sm">Today Income</span>
                  <span className="font-semibold text-green-400">
                    {Number(profile?.today_income || 0)?.toFixed(2)} $
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">Flush Amount</span>
                  <span
                    className={`shadow-inner px-4 py-1.5 rounded-xl text-2xl font-bold border ${
                      Number(profile?.jnr_flush_amnt || 0) > 0
                        ? "animate-pulse text-gold-color border-gold-color"
                        : "text-gold-color border-white/10"
                    }`}
                  >
                    {Number(profile?.jnr_flush_amnt || 0)?.toFixed(0)} $
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-black bg-opacity-60 shadow-2xl border border-gold-color backdrop-blur-md">
              {/* Header Icon */}
              <div className="flex items-center justify-center text-gold-color">
                <Diversity3Icon className="!text-9xl " />
              </div>

              {/* Stats Section */}
              <div className="flex flex-col gap-3 text-blue-300">
                {/* Direct Team */}
                <div className="flex justify-between items-center border-b border-white/10 pb-1">
                  <span className="font-medium">👥 Direct Team</span>
                  <span className="font-semibold text-green-400">
                    {profile?.jnr_direct_team || 0}
                  </span>
                </div>

                {/* Direct TopUp Member */}
                <div className="flex justify-between items-center border-b border-white/10 pb-1">
                  <span className="font-medium">💸 Direct TopUp Member</span>
                  <span className="font-semibold text-gold-color">
                    {profile?.jnr_direct_topup_mem || 0}
                  </span>
                </div>

                {/* Total Income */}
                <div className="flex justify-between items-center border-b border-white/10 pb-1">
                  <span className="font-medium">💰 Total Income</span>
                  <span className="font-semibold text-green-400">
                    {Number(profile?.total_income || 0)?.toFixed(2)} $
                  </span>
                </div>

                {/* TopUp Amount */}
                <div className="flex justify-between items-center border-b border-white/10 pb-1">
                  <span className="font-medium">🏦 TopUp Amount</span>
                  <span className="font-semibold text-amber-400">
                    {Number(profile?.jnr_topup_wallet || 0)?.toFixed(2)} $
                  </span>
                </div>

                {/* Team Income */}
                <div className="flex justify-between items-center">
                  <span className="font-medium">🎯 Team Income</span>
                  <span className="font-semibold text-green-400">
                    {Number(profile?.team_income || 0)?.toFixed(2)} $
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 p-6 rounded-3xl bg-custom-gradient shadow-xl border !border-gold-color">
              <div className="text-center">
                <h1 className="text-3xl font-extrabold text-gold-color tracking-wide drop-shadow">
                  🎁 Daily Rewards
                </h1>
                <div className="flex justify-center items-center gap-2 mt-4 text-green-400 text-xl font-semibold">
                  <span>✅ PACKAGE PURCHASE SUCCESSFUL</span>
                </div>
                <p className="text-gray-300 text-sm mt-1">
                  You have successfully purchased this premium package.
                </p>
              </div>

              <div className="mt-10">
                <table className="w-full text-left border-separate border-spacing-y-3">
                  <tbody>
                    {[
                      ["Package Amount", `${profile?.topup_amount || 0} $`],
                      [
                        "Purchase Date",
                        profile?.jnr_topup_date
                          ? moment(profile?.jnr_topup_date).format("DD-MM-YYYY")
                          : "---",
                      ],
                      ["Daily ROI", "5 %"],
                      ["Contract Duration", "6x"],
                      [
                        "Total ROI",
                        `${Number(profile?.topup_amount * 6 || 0)?.toFixed(
                          2
                        )} $`,
                      ],
                      [
                        "Achieved ROI",
                        `${Number(profile?.total_income || 0)?.toFixed(2)} $`,
                      ],
                      [
                        "Joining Date",
                        profile?.jnr_created_at
                          ? moment(profile?.jnr_created_at).format("DD-MM-YYYY")
                          : "---",
                      ],
                    ].map(([label, value], i) => (
                      <tr
                        key={i}
                        className="bg-white/10 rounded-lg transition hover:bg-black/20"
                      >
                        <td className="py-2 px-4 text-sm text-slate-200 font-medium">
                          {label}
                        </td>
                        <td className="py-2 px-4 text-sm font-semibold text-gold-color">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <LevelwiseBusiness />
          </div>
          <div className=" w-full mt-8 grid lg:grid-cols-3 grid-cols-1 gap-4 ">
            <div className="p-6   flex justify-between items-center space-y-2 rounded-xl !text-gold-color bg-custom-gradient shadow-xl border border-yellow-500/30">
              <p>FASTRO (FST) Contract:</p>
              <p>
                {contractAddress?.substring(0, 5)}...
                {contractAddress?.substring(
                  contractAddress?.length - 5,
                  contractAddress?.length
                )}
              </p>
              <button
                onClick={() => handleCopyy(contractAddress)}
                className="text-text-color transition"
              >
                <CopyAll className="!text-xl !text-gold-color" />
              </button>
              {copied && <p className="text-green-400 text-xs">Copied!</p>}
            </div>
            <div className="p-6 bg-custom-gradient shadow-xl border border-yellow-500/30  flex flex-col justify-between items-center space-y-2 rounded-xl !text-gold-color">
              <p className="bg-gradient-to-r from-gold-color to-text-color bg-clip-text text-transparent font-medium">
                Invitation Link:
              </p>
              <p className="bg-gradient-to-r from-gold-color via-orange-500 to-pink-500 bg-clip-text text-transparent font-medium">
                {telegram_url + `startapp=${profile?.lgn_cust_id}`}
              </p>
              <button
                onClick={() =>
                  handleCopyy(telegram_url + `startapp=${profile?.lgn_cust_id}`)
                }
                className="text-text-color transition"
              >
                <CopyAll className="!text-xl !text-gold-color" />
              </button>
              {copied && <p className="text-green-400 text-xs">Copied!</p>}
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="popup fixed inset-0 bg-gray-color bg-opacity-50 flex items-center justify-center">
            <div className=" bg-gradient-to-l from-gray-800 to-gray-200  rounded-lg">
              <div className="!flex !justify-end mt-1">
                <button
                  className="bg-blue-500 text-text-color mx-2 mb-2 p-1 rounded"
                  onClick={() => setShowPopup(false)}
                >
                  <Close />
                </button>
              </div>
              <div className=" px-2 font-bold flex justify-center items-center bg-gradient-to-r from-yellow-200 to-yellow-200 bg-clip-text text-transparent">
                Topup:{" "}
                {moment
                  ?.utc(showPopup?.created_at)
                  ?.format("DD-MM-YYYY HH:mm:ss")}
              </div>
            </div>
          </div>
        )}

        <p className="mt-10 mx-5 flex items-center justify-between lg:gap-10 gap-1  p-3 px-5 lg:text-xl font-bold  text-lg rounded bg-glassy ">
          Check Out Royality & Rewards{" "}
          <BsTrophyFill className="!text-yellow-500" />
        </p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 place-items-center px-4 py-6">
          {[
            {
              title: "ROI Income",
              value: Number(data?.[0]?.roi || 0)?.toFixed(2) || 0,
              url: "/roi_income",
              bg: card1,
            },
            {
              title: "Level Income",
              value: Number(data?.[0]?.level || 0)?.toFixed(2) || 0,
              url: "/level_income",
              bg: card3,
            },
            {
              title: "Weekly Income",
              value: Number(data?.[0]?.weekly || 0)?.toFixed(2) || 0,
              url: "/weekly_income",
              bg: card6,
            },

            {
              title: "Reward Income",
              value: Number(data?.[0]?.award_reward || 0)?.toFixed(2) || 0,
              url: "/award-reward",
              bg: card2,
            },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.url)}
              style={{
                backgroundImage: `url(${item.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="group relative flex flex-col justify-between p-6 rounded-2xl shadow-2xl w-full max-w-[400px] h-[180px] bg-gradient-to-r from-white/70 to-white/30 cursor-pointer hover:scale-110 hover:rotate-1 transition-transform duration-300 ease-in-out"
            >
              <div className="absolute inset-0 bg-black/40 rounded-2xl group-hover:bg-black/20 transition duration-300 ease-in-out"></div>
              <div className="relative z-10">
                <p className="text-white text-lg font-semibold tracking-wide">
                  {item.title}
                </p>
                <p className="text-yellow-400 text-3xl font-bold mt-2 transform group-hover:scale-105 transition duration-300 ease-in-out">
                  {item.value} USD
                </p>
              </div>
              <div className="relative z-10 flex justify-end">
                <Diamond className="text-yellow-400 h-16 w-16 opacity-80 group-hover:opacity-100 transition transform group-hover:scale-125 duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
};

export default Dashboard;
