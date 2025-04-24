import {
  Close,
  CopyAll,
  Diamond,
  Facebook,
  Instagram,
  People,
  Telegram,
  Twitter,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import copy from "copy-to-clipboard";
import moment from "moment/moment";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import toast from "react-hot-toast";
import { BsTrophyFill } from "react-icons/bs";
import { useQuery } from "react-query";
import Loader from "../Shared/Loader";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import Navbar from "./Navbar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
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
  const { isLoading: packageLoding, data: getPackageDetails } = useQuery(
    ["dashboard_api_package"],
    () => apiConnectorGet(endpoint?.user_buy_package_details_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const getPackageDetailsData = getPackageDetails?.data?.result || [];

  const { data: usd } = useQuery(
    ["curre_api"],
    () =>
      apiConnectorGet(`${endpoint?.market_api}?ids=polkadot&vs_currencies=usd`),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const curr_data = usd?.data?.polkadot?.usd;

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

  const ChartCount = {
    series: [
      (Number(showPopup?.topup_roi_amount) * 100) /
        showPopup?.topup_pack_amount,
    ],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Achieved",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0) + "%";
              },
            },
          },
        },
      },
    },
  };
  async function compoundFuncCalled() {
    try {
      if (Number(profile?.jnr_curr_wallet || 0) < 10)
        return toast("Amount should be equal or grater than 10$");
      setLoading(true);
      const api_response = await apiConnectorGet(endpoint?.compounding_wallet);
      toast(api_response.data?.message, { id: 1 });
    } catch (e) {
      toast("Something went wrong.", { id: 1 });
    }
    setLoading(false);
  }
  //0, roi
  //1, level ==> Booster
  //2, direct
  //3, matching ==> magic
  //4, booster ==> aise koi income nhi bni hai..
  //5, weekly ==> rank
  //6, Rocket
  // 7, Jackpot
  return (
    <>
      <Navbar />
      <div
        className=" text-white bg-[#111022] lg:px-32 min-h-screen pb-10"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <Loader isLoading={isLoading || proLoding || loading} />
        <div className="px-8 pt-10  mt-10">
          {/* <p className="text-lg text-black  p-2 px-5 lg:mt-20 mt-10 flex justify-between">
            <Telegram
              fontSize="large"
              className="!bg-blue-400 !text-background rounded-full p-1 !font-bold"
            />
            <WhatsApp
              fontSize="large"
              className="!text-background rounded-full p-1 !bg-green-400 !font-bold"
            />
            <Twitter
              fontSize="large"
              className="!text-background rounded-full p-1 !bg-blue-600 !font-bold"
            />
            <Instagram
              fontSize="large"
              className="!text-background rounded-full p-1 !bg-purple-600 !font-bold"
            />
            <Facebook
              fontSize="large"
              className="!text-background rounded-full p-1 !bg-blue-900 !font-bold"
            />
            <YouTube
              fontSize="large"
              className="!text-background rounded-full p-1 !bg-red-600 !font-bold"
            />
          </p> */}
          <div className="text-lg bg-gray-color border border-rose-500 rounded opacity-75 p-2 px-5 lg:mt-10 mt-5 flex lg:flex-row flex-col items-center justify-between">
            <p className="  !font-bold bg-gradient-to-r from-teal-600 to-yellow-500 bg-clip-text text-transparent">
              {profile?.jnr_achieve_reward && "Rank:"}{" "}
              {profile?.jnr_achieve_reward}{" "}
            </p>
            <p className=" !text-yellow-600 p-1 !font-bold">
              {" "}
              Current Wallet: {profile?.jnr_curr_wallet || 0} USD
            </p>
          </div>
          <div className="text-lg bg-gray-color border border-rose-500 rounded opacity-75 p-2 px-5 lg:mt-10 mt-5 flex lg:flex-row flex-col justify-between">
            <p className=" !text-blue-500 !font-bold ">Polkadot (DOT) :</p>
            <p className=" !text-yellow-600 p-1 !font-bold"> {curr_data} USD</p>
          </div>
          <div className="text-lg bg-gray-color opacity-75 border border-rose-500 rounded py-5 p-2 px-5 lg:mt-10 mt-5 flex flex-col gap-2 justify-start">
            <p className=" !text-green-500 bg-white !text-xs lg:!text-xl p-1  w-fit rounded">
              {profile?.topup_date && "Activated"}
            </p>
            <div className=" !text-text-color flex justify-between lg:flex-row flex-col lg:mt-0 mt-2   !text-xs lg:!text-lg p-1 ">
              <p className=" !text-text-color rounded bg-blue-600 px-4 !text-xs lg:!text-lg p-1 font-bold w-fit flex items-center">
                {" "}
                My Wallet Fund :{" "}
                <span className="bg-white text-black text-lg  mb-1 p-1 ">
                  {profile?.jnr_curr_wallet} USD
                </span>
              </p>
              <Button
                variant="contained"
                className="lg:!mt-0 !mt-2 "
                onClick={compoundFuncCalled}
              >
                Compound
              </Button>
            </div>
            <div className=" !text-text-color flex justify-between  !text-xs lg:!text-lg p-1 ">
              <p className="">User ID</p>
              <p className="bg-white text-black rounded-xl font-bold text-sm p-1">
                {profile?.lgn_cust_id}
              </p>
            </div>

          
            <div className=" !text-text-color flex justify-between  !text-xs lg:!text-lg p-1 ">
              <p className="">Activation Date</p>
              <p className="bg-white text-black rounded-xl font-bold text-sm p-1">
                {moment
                  ?.utc(profile?.topup_date)
                  ?.format("DD-MM-YYYY HH:mm:ss")}
              </p>
            </div>
            {/* <div className=" !text-text-color flex justify-between  !text-xs lg:!text-lg p-1 ">
              <p className="">Email</p>
              <p className="bg-white text-black rounded-xl font-bold text-sm p-1">
                {profile?.lgn_email}
              </p>
            </div> */}
            <div className=" !text-text-color flex justify-between  !text-xs lg:!text-lg p-1 ">
              <p className="">Direct Bussiness</p>
              <p className="bg-white text-black rounded-xl font-bold text-sm p-1">
                {profile?.jnr_direct_business}
              </p>
            </div>
            <div className=" !text-text-color flex justify-between  !text-xs lg:!text-lg p-1 ">
              <p className="">Direct Team</p>
              <p className="bg-white text-black rounded-xl font-bold text-sm p-1">
                {profile?.jnr_direct_team}
              </p>
            </div>
            <div className=" !text-text-color flex justify-between  !text-xs lg:!text-lg p-1 ">
              <p className="">Direct TopUp Member</p>
              <p className="bg-white text-black rounded-xl font-bold text-sm p-1">
                {profile?.jnr_direct_topup_mem}
              </p>
            </div>
            <div className=" !text-text-color flex justify-between  !text-xs lg:!text-lg p-1 ">
              <p className="">Today Income</p>
              <p className="bg-white text-black rounded-xl font-bold text-sm p-1">
                {profile?.today_income} $
              </p>
            </div>
            <div className=" !text-text-color flex justify-between  !text-xs lg:!text-lg p-1 ">
              <p className="">Total Income</p>
              <p className="bg-white text-black rounded-xl font-bold text-sm p-1">
                {profile?.total_income} $
              </p>
            </div>
            <div className=" !text-text-color flex justify-between  !text-xs lg:!text-lg p-1 ">
              <p className="">TopUp Amount</p>
              <p className="bg-white text-black rounded-xl font-bold text-sm p-1">
                {Number(profile?.jnr_topup_wallet)?.toFixed(0, 2)} $
              </p>
            </div>
            <div className=" !text-text-color flex justify-between  !text-xs lg:!text-lg p-1 ">
              <p className="">Team Income</p>
              <p className="bg-white text-black rounded-xl font-bold text-sm p-1">
                {Number(profile?.team_income)?.toFixed(0, 2)} $
              </p>
            </div>
            <div className=" !text-text-color flex justify-between  !text-xs lg:!text-lg p-1 ">
              <p style={{ fontWeight: "bold" }}>Flush Amount</p>
              <p
                className={`bg-white rounded-xl  p-1  text-2xl ${
                  Number(profile?.jnr_flush_amnt || 0) > 0 && "animated-text"
                }`}
              >
                {Number(profile?.jnr_flush_amnt)?.toFixed(0, 2)} $
              </p>
            </div>
          </div>
        </div>
        <p className="mt-16 p-5  mb-5 text-xl font-bold">Packages</p>
        <div className="!flex flex-wrap justify-center">
          {getPackageDetailsData?.map((i) => {
            return (
              <div
                data-aos="flip-down"
                style={{
                  padding: "35px",
                  color: "#1f2937",
                  fontSize: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "all 0.4s ease-in-out",
                  transform: "scale(1)",
                  boxShadow:
                    "0 15px 30px rgba(147, 51, 234, 0.8), 0 0 15px rgba(255, 255, 255, 0.2)",
                  background:
                    "linear-gradient(135deg, #16a34a, #065f46, #1e3a8a, #9333ea)",
                  opacity: "0.97",
                  cursor: "pointer",
                  width: "200px",
                  height: "200px",
                  border: "4px solid rgba(255, 255, 255, 0.7)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(0.88)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(147, 51, 234, 1), 0 0 20px rgba(255, 255, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(147, 51, 234, 0.8), 0 0 15px rgba(255, 255, 255, 0.2)";
                }}
                onClick={() => setShowPopup(i)}
              >
                {/* Glowing Animation Effect */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 50%)",
                    animation: "glow 3s infinite alternate",
                  }}
                />

                <p
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    color: "#ff0000",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    textShadow: "3px 3px 8px rgba(255, 0, 0, 0.6)",
                  }}
                >
                  {Number(i?.topup_pack_amount).toFixed(2)} $
                </p>
                <p
                  style={{
                    textAlign: "center",
                    color: "#000",
                    backgroundColor: "#fff",
                    borderRadius: "9999px",
                    padding: "8px 14px",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.3)",
                  }}
                  className="bg-gradient-to-r from-green-500 via-rose-500 to-blue-500"
                >
                  Influencer
                </p>
                <Diamond
                  style={{
                    color: "#facc15",
                    marginTop: "12px",
                    fontSize: "2.5rem",
                    textShadow: "0px 5px 8px rgba(255, 215, 0, 0.8)",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className=" -z-50 opacity-50">
          <div className="bubble"></div>
          <div className="bubble1"></div>
          <div className="bubble2"></div>
          <div className="bubble3"></div>
        </div>

        <style>
          {`
    @keyframes glow {
      from {
        opacity: 0.3;
      }
      to {
        opacity: 1;
      }
    }
  `}
        </style>

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
              <ReactApexChart
                className="!text-text-color"
                options={ChartCount.options}
                series={ChartCount.series}
                type="radialBar"
                height={400}
              />
            </div>
          </div>
        )}
        <p className=" mt-10 p-2 text-xl font-bold">My Referral Link</p>
        <div className="p-2 w-full text-lg   mt-1 flex justify-between">
          <p className=" !text-blue-700 bg-gray-color  rounded p-2 lg:px-5 lg:text-xl text-xs">
            https://t.me/axisuser_bot/DotPyWorld
          </p>
          <p>
            <CopyAll
              onClick={() => {
                copy(`https://t.me/axisuser_bot/DotPyWorld`);
                toast("Copied.", { id: 1 });
              }}
            />
          </p>
        </div>
        <p className="  p-2 text-xl font-bold">My Referral Id</p>
        <div className="p-2 w-full text-lg   mt-1 flex justify-between">
          <p className=" !text-blue-700 bg-gray-color  rounded p-2 lg:px-5 lg:text-xl text-xs">
            {profile?.lgn_cust_id}
          </p>
          <p>
            <CopyAll
              onClick={() => {
                copy(profile?.lgn_cust_id);
                toast("Copied.", { id: 1 });
              }}
            />
          </p>
        </div>
        <p className="mt-10 mx-5 flex items-center justify-between lg:gap-10 gap-1  p-3 px-5 lg:text-xl font-bold  !text-text-color text-lg bg-[#d8197a] rounded">
          Check Out Royality & Rewards{" "}
          <BsTrophyFill className="!text-yellow-500" />
        </p>

        <div
          className="text-lg bg-gray-color border border-rose-500 rounded mx-4 opacity-75  p-5  lg:px-10 lg:mt-10 mt-5 flex justify-between"
          onClick={() => navigate("/roi_income")}
        >
          <div>
            {" "}
            <p className=" !text-text-color !font-bold"> {"ROI Income"}</p>
            <p className=" !text-yellow-600 p-1 !font-bold">
              {Number(data?.[0]?.roi)?.toFixed(2) || 0} USD
            </p>
          </div>
          <p>
            <Diamond className="!text-yellow-600 !h-14 !w-14" />
          </p>
        </div>

        <div
          className="text-lg bg-gray-color border border-rose-500 rounded mx-4 opacity-75  p-5  lg:px-10 lg:mt-10 mt-5 flex justify-between"
          onClick={() => navigate("/direct_income")}
        >
          <div>
            {" "}
            <p className=" !text-text-color !font-bold"> {"Direct Income"}</p>
            <p className=" !text-yellow-600 p-1 !font-bold">
              {" "}
              {Number(data?.[0]?.direct)?.toFixed(2) || 0} USD
            </p>
          </div>
          <p>
            <Diamond className="!text-yellow-600 !h-14 !w-14" />
          </p>
        </div>
        <div
          className="text-lg bg-gray-color border border-rose-500 rounded mx-4 opacity-75  p-5  lg:px-10 lg:mt-10 mt-5 flex justify-between"
          onClick={() => navigate("/level_income")}
        >
          <div>
            {" "}
            <p className=" !text-text-color !font-bold">{"Level Income"}</p>
            <p className=" !text-yellow-600 p-1 !font-bold">
              {" "}
              {Number(data?.[0]?.level)?.toFixed(2) || 0} USD
            </p>
          </div>
          <p>
            <Diamond className="!text-yellow-600 !h-14 !w-14" />
          </p>
        </div>
        <div
          className="text-lg bg-gray-color border border-rose-500 rounded mx-4 opacity-75  p-5  lg:px-10 lg:mt-10 mt-5 flex justify-between"
          onClick={() => navigate("/booster_income")}
        >
          <div>
            {" "}
            <p className=" !text-text-color !font-bold">{"Rocket Income"}</p>
            <p className=" !text-yellow-600 p-1 !font-bold">
              {Number(data?.[0]?.rocket)?.toFixed(2) || 0} USD
            </p>
          </div>
          <p>
            <Diamond className="!text-yellow-600 !h-14 !w-14" />
          </p>
        </div>
        <div
          className="text-lg bg-gray-color border border-rose-500 rounded mx-4 opacity-75  p-5  lg:px-10 lg:mt-10 mt-5 flex justify-between"
          onClick={() => navigate("/matching_income")}
        >
          <div>
            {" "}
            <p className=" !text-text-color !font-bold"> {"Magic Income"}</p>
            <p className=" !text-yellow-600 p-1 !font-bold">
              {" "}
              {Number(data?.[0]?.matching)?.toFixed(2) || 0} USD
            </p>
          </div>
          <p>
            <Diamond className="!text-yellow-600 !h-14 !w-14" />
          </p>
        </div>
        <div
          className="text-lg bg-gray-color border border-rose-500 rounded mx-4 opacity-75  p-5  lg:px-10 lg:mt-10 mt-5 flex justify-between"
          onClick={() => navigate("/weekly_income")}
        >
          <div>
            {" "}
            <p className=" !text-text-color !font-bold">{"Rank Income"}</p>
            <p className=" !text-yellow-600 p-1 !font-bold">
              {Number(data?.[0]?.weekly)?.toFixed(2) || 0} USD
            </p>
          </div>
          <p>
            <Diamond className="!text-yellow-600 !h-14 !w-14" />
          </p>
        </div>
        {/* <div className="text-lg bg-gray-color border border-rose-500 rounded mx-4 opacity-75  p-5  lg:px-10 lg:mt-10 mt-5 flex justify-between">
          <div>
            {" "}
            <p className=" !text-text-color !font-bold">
              {"Weekly Bonus" || data?.[4]?.ledger_income_type}
            </p>
            <p className=" !text-yellow-600 p-1 !font-bold">
              {data?.[4]?.["SUM(`ledger_amount`)"] || 0} USD
            </p>
          </div>
          <p>
            <Diamond className="!text-yellow-600 !h-14 !w-14" />
          </p>
        </div> */}

        <div
          className="text-lg bg-gray-color border border-rose-500 rounded mx-4 opacity-75  p-5  lg:px-10 lg:mt-10 mt-5 flex justify-between"
          onClick={() => navigate("/jackpot_income")}
        >
          <div>
            {" "}
            <p className=" !text-text-color !font-bold">{"Jackpot Income"}</p>
            <p className=" !text-yellow-600 p-1 !font-bold">
              {Number(data?.[0]?.jackpot)?.toFixed(2) || 0} USD
            </p>
          </div>
          <p>
            <Diamond className="!text-yellow-600 !h-14 !w-14" />
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
