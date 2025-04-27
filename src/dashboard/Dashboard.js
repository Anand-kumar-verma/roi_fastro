import { Close, Diamond } from "@mui/icons-material";
import moment from "moment/moment";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import toast from "react-hot-toast";
import { BsTrophyFill } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import card1 from "../images/card1.jpg";
import card2 from "../images/card2.jpg";
import card3 from "../images/card3.jpg";
import card6 from "../images/card_6.png";
import Loader from "../Shared/Loader";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import Navbar from "./Navbar";
// import ReactApexChart from 'react-apexcharts';
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
    series: getPackageDetailsData?.map((i) => {
      return Number(i?.topup_pack_amount).toFixed(2);
    }),
    options: {
      chart: {
        height: 500,
        type: "radialBar",
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: "white",
              formatter: function (val) {
                return val + "$";
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: ["Influencer"],
    },
  };

  //0, roi
  //1, level ==> Booster
  //2, direct
  //3, matching ==> magic
  //4, booster ==> aise koi income nhi bni hai..
  //5, weekly ==> rank
  //6, Rocket
  // 7, Jackpot
  const url = "https://t.me/fastro2025_bot/fastro";

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
  let statee = {
    series: [75],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.5,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.7,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "#111",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Percent"],
    },
  };
  const state = {
    series: [
      {
        name: "Package",
        data: getPackageDetailsData?.map((i) => {
          return Number(i?.topup_pack_amount).toFixed(2);
        }),
      },
      {
        name: "ROI",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Weekly",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["white"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  };
  return (
    <>
      <Navbar />
      <div className=" text-white lg:px-32 min-h-screen pb-10 bg-custom-gradient">
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
          <div className="text-lg bg-gray-100 border border-rose-500 rounded opacity-75 lg:p-4 p-2 lg:px-5 lg:mt-10 mt-5 flex lg:flex-row flex-col items-center justify-between">
            <span className="!font-bold pr-3 text-yellow-600">News:</span>
            <div className="w-full overflow-hidden whitespace-nowrap relative">
              <div
                className="flex animate-marquee"
                style={{
                  animation: "marquee 6s linear infinite",
                }}
              >
                <span className="inline-block text-red-600 text-sm">
                  Text is the exact, original words written by an author. Text
                  is also a specific work as written by the original author.
                  Text is also commonly used to refer to a text message or to
                  send a text message. Text has several other senses as a noun.
                </span>
                <span className="inline-block text-red-600  text-sm">
                  Text is the exact, original words written by an author. Text
                  is also a specific work as written by the original author.
                  Text is also commonly used to refer to a text message or to
                  send a text message. Text has several other senses as a noun.
                </span>
              </div>
              <style>{`
                   @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); }} `}</style>
            </div>
          </div>

          {/* <div className="text-lg bg-gray-color border border-rose-500 rounded opacity-75 p-2 px-5 lg:mt-10 mt-5 flex lg:flex-row flex-col items-center justify-between">
            <p className="  !font-bold bg-gradient-to-r from-teal-600 to-yellow-500 bg-clip-text text-transparent">
              {profile?.jnr_achieve_reward && 'Rank:'}{' '}
              {profile?.jnr_achieve_reward}{' '} hhhh
            </p>
            <p className=" !text-yellow-600 p-1 !font-bold">
              {' '}
              Current Wallet: {profile?.jnr_curr_wallet || 0} USD
            </p>
          </div> */}

          <div className="  w-full mt-8 grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div className="rounded-2xl bg-gradient-to-r from-pink-100 to-pink-200 p-6 shadow-lg">
              <div className="grid gap-6 grid-cols-2 place-items-center mb-4">
                <div className="flex items-center text-xl font-bold text-gray-800">
                  Current Wallet
                  <span className="ml-2 px-2 py-0.5 text-green-600 bg-green-100 rounded text-xs font-semibold">
                    {profile?.topup_date && "Activated"}
                  </span>
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  {profile?.jnr_curr_wallet || 0} USD
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">User Id</span>
                  <span className="font-semibold text-gray-500">
                    {profile?.lgn_cust_id}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Activation Date</span>
                  <span className="font-semibold text-gray-500">
                    {moment
                      ?.utc(profile?.topup_date)
                      ?.format("DD-MM-YYYY HH:mm:ss")}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Today Income</span>
                  <span className="font-semibold text-gray-500">
                    {Number(profile?.today_income || 0)?.toFixed(2)} $
                  </span>
                </div>

                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Flush Amount</span>
                  <span
                    className={`bg-white shadow px-3 py-1 rounded-lg text-2xl font-bold ${
                      Number(profile?.jnr_flush_amnt || 0) > 0
                        ? "animate-pulse text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {Number(profile?.jnr_flush_amnt || 0)?.toFixed(0)} $
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-yellow-100 to-yellow-200 p-6 shadow-lg">
              <div className="flex flex-col gap-6">
                <p className="text-2xl font-bold text-gray-800 text-center mb-4">
                  Other Details
                </p>

                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Direct Team</span>
                  <span className="font-semibold text-gray-500">
                    {profile?.jnr_direct_team || 0}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Direct TopUp Member</span>
                  <span className="font-semibold text-gray-500">
                    {profile?.jnr_direct_topup_mem || 0}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Total Income</span>
                  <span className="font-semibold text-gray-500">
                    {Number(profile?.total_income || 0)?.toFixed(2)} $
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">TopUp Amount</span>
                  <span className="font-semibold text-gray-500">
                    {Number(profile?.jnr_topup_wallet || 0)?.toFixed(2)} $
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="font-medium">Team Income</span>
                  <span className="font-semibold text-gray-500">
                    {Number(profile?.team_income || 0)?.toFixed(2)} $
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-green-100 to-green-200 p-6 shadow-lg">
              <div className="flex flex-col items-center gap-6">
                {/* Referral Link Title */}
                <p className="text-2xl font-bold text-gray-800 text-center">
                  Referral Link
                </p>

                {/* Referral Link Display */}
                <div className="flex items-center flex-wrap gap-3 justify-center">
                  <div className="flex items-center px-4 py-2 bg-green-200 text-blue-500 rounded-md border">
                    {url?.substring(0, 10)}...{url?.substring(15, 20)}
                  </div>
                  <div
                    className="flex items-center justify-center bg-green-400 hover:bg-green-500 text-white px-3 py-2 rounded-md cursor-pointer transition"
                    onClick={() => handleCopy(url)}
                  >
                    <FaCopy size={20} />
                  </div>
                </div>

                {/* Referral ID Title */}
                <p className="text-2xl font-bold text-gray-800 text-center">
                  My Referral ID
                </p>

                {/* Referral ID Display */}
                <div className="flex items-center gap-3 justify-center">
                  <div className="flex items-center px-4 py-2 bg-green-200 text-blue-500 rounded-md border">
                    {profile?.lgn_cust_id}
                  </div>
                  <div
                    className="flex items-center justify-center bg-green-400 hover:bg-green-500 text-white px-3 py-2 rounded-md cursor-pointer transition"
                    onClick={() => handleCopy(profile?.lgn_cust_id)}
                  >
                    <FaCopy size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="text-lg bg-gray-color opacity-75 border border-rose-500 rounded py-5 p-2 px-5 lg:mt-10 mt-5 flex flex-col gap-2 justify-start">
            <p className=" !text-green-500 bg-white !text-xs lg:!text-xl p-1  w-fit rounded">
              {profile?.topup_date && 'Activated'}
            </p>
            <div className=" !text-text-color flex justify-between lg:flex-row flex-col lg:mt-0 mt-2   !text-xs lg:!text-lg p-1 ">
              <p className=" !text-text-color rounded bg-blue-600 px-4 !text-xs lg:!text-lg p-1 font-bold w-fit flex items-center">
                {' '}
                My Wallet Fund :{' '}
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
                  ?.format('DD-MM-YYYY HH:mm:ss')}
              </p>
            </div>
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
              <p style={{ fontWeight: 'bold' }}>Flush Amount</p>
              <p
                className={`bg-white rounded-xl  p-1  text-2xl ${Number(profile?.jnr_flush_amnt || 0) > 0 && 'animated-text'
                  }`}
              >
                {Number(profile?.jnr_flush_amnt)?.toFixed(0, 2)} $
              </p>
            </div>
          </div> */}
        </div>
        <p className="mt-16 p-5  mb-5 text-xl text-center font-bold">
          Packages
        </p>
        <div
          className={`${
            getPackageDetailsData?.length > 0 && "!grid"
          } lg:!grid-cols-2 grid-cols-1`}
        >
          {getPackageDetailsData?.length > 0 && (
            <ReactApexChart
              className="!text-text-color"
              options={ChartCount.options}
              series={ChartCount.series}
              type="radialBar"
              height={400}
            />
          )}
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
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
            </div>
          </div>
        )}

        <p className="mt-10 mx-5 flex items-center justify-between lg:gap-10 gap-1  p-3 px-5 lg:text-xl font-bold  !text-text-color text-lg bg-[#d8197a] rounded">
          Check Out Royality & Rewards{" "}
          <BsTrophyFill className="!text-yellow-500" />
        </p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 place-items-center px-4 py-6">
          {[
            {
              title: "ROI Income",
              value: Number(data?.[0]?.roi)?.toFixed(2) || 0,
              url: "/roi_income",
              bg: card1,
            },
            {
              title: "Direct Income",
              value: Number(data?.[0]?.award_reward || 0)?.toFixed(2) || 0,
              url: "/direct_income",
              bg: card2,
            },
            {
              title: "Level Income",
              value: Number(data?.[0]?.level)?.toFixed(2) || 0,
              url: "/level_income",
              bg: card3,
            },
            {
              title: "Rank Income",
              value: Number(data?.[0]?.weekly)?.toFixed(2) || 0,
              url: "/weekly_income",
              bg: card6,
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
              className="group relative flex flex-col justify-between p-6 rounded-2xl shadow-xl w-full max-w-[400px] h-[180px] bg-gradient-to-r from-white/70 to-white/30 cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-black/20 rounded-2xl group-hover:bg-black/10 transition"></div>
              <div className="relative z-10">
                <p className="text-white text-lg font-semibold">{item.title}</p>
                <p className="text-yellow-300 text-2xl font-bold mt-2">
                  {item.value} USD
                </p>
              </div>
              <div className="relative z-10 flex justify-end">
                <Diamond className="text-yellow-300 h-14 w-14 opacity-80 group-hover:opacity-100 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
