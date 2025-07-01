import { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import bgImagewingo from "../images/wingoimage.jpeg"; // 🎯 Change to Wingo game image

import DoublePyramid from "../dashboard/Cone";
import bgImage from "../images/jackpot-removebg-preview.png";
import jackgif from "../images/KolntAno33.gif";
import Review from "./Review";
const Popular = ({ curr_data_bit, curr_data_Eth }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      let scrollAmount = 0;
      const speed = 1; // Adjust scroll speed

      const scroll = () => {
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0; // Reset to create an infinite loop
        } else {
          scrollAmount += speed;
        }
        scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(scroll);
      };

      scroll();
    }
  }, []);

  const steps = [
    {
      id: 1,
      title: "Choose your Forex account and submit your registration.",
      description: "Choose your Forex account and submit your registration.",
    },
    {
      id: 2,
      title:
        "Deposit funds securely using debit card or bank transfer to fund your trading account.",
      description:
        "Deposit funds securely using debit card or bank transfer to fund your trading account.",
    },
    {
      id: 3,
      title:
        "Trade with ease on our platform with access to over 40+ currency pairs.",
      description:
        "Trade with ease on our platform with access to over 40+ currency pairs.",
    },
  ];
  const products = [
    {
      id: 1,
      label: "Jackpot Launch",
      description:
        "Starting June 1st, 50% of FST will be burned through the Jackpot launch.",
      spanClass: "bg-[#e54a41]",
      spanText: "EQ",
      bgClass: "bg-[#a7e2f2]",
    },
    {
      id: 2,
      label: "Wingo Game",
      description:
        "From July 1st, 50% of FST will be burned through the Wingo game.",
      spanClass: "bg-[#37bc9c]",
      spanText: "LQ",
      bgClass: "bg-[#a7e2f2]",
    },
    {
      id: 3,
      label: "User Onboarding",
      description:
        "Beginning June 15th, 10% to 30% of FST will be burned on every new user joining.",
      spanClass: "bg-[#4886d9]",
      spanText: "FU",
      bgClass: "bg-[#a7e2f2]",
    },
    {
      id: 4,
      label: "Transaction Burns",
      description:
        "Currently, 10% FST is already being burned on every transaction.",
      spanClass: "bg-[#f39c12]",
      spanText: "TX",
      bgClass: "bg-[#a7e2f2]",
    },
    {
      id: 5,
      label: "Burning Events",
      description:
        "Special burning events are underway, burning over 2 million tokens.",
      spanClass: "bg-[#9b59b6]",
      spanText: "BE",
      bgClass: "bg-[#a7e2f2]",
    },
    {
      id: 6,
      label: "Burn Target",
      description:
        "The ultimate goal is to burn all FST tokens to boost the price by 100x.",
      spanClass: "bg-[#2ecc71]",
      spanText: "BT",
      bgClass: "bg-[#a7e2f2]",
    },
  ];

  const statsData = [
    {
      id: 1,
      label: "BitCoin",
      value: curr_data_bit,
      spanClass: "bg-red-600",
      spanText: "500",
    },
    {
      id: 3,
      label: "Europe",
      value: curr_data_Eth,
      spanClass: "bg-purple-600",
      spanText: "E",
    },
    {
      id: 4,
      label: "Bitcoin",
      value: curr_data_bit,
      spanClass: "bg-yellow-600",
      spanText: "B",
    },
    {
      id: 5,
      label: "Ethereum",
      value: curr_data_Eth,
      spanClass: "bg-pink-600",
      spanText: "Eth",
    },
  ];

  return (
    <>
      <div className="!lg:p-8 lg:py-14 p-2 py-10 ">
        <p className="text-xl lg:pl-12 p-2 font-bold text-text-color">
          Burning Events
        </p>
        <div className="relative w-full overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-10 "
            style={{ display: "flex", minWidth: "200%" }}
          >
            {[...products, ...products].map((product, index) => (
              <div
                key={index}
                className={`p-6 shadow-2xl text-[#656d70] 
                text-lg rounded-lg transition-all duration-500
                 hover:scale-95 hover:shadow-2xl hover:shadow-purple-500
                  !bg-[#010b13] min-w-[250px] ${
                    index % 2 === 0 ? "flip-left" : "flip-right"
                  }`}
              >
                <p
                  className={`${
                    index % 2 === 0 ? "!text-white" : "!text-text-color"
                  } font-bold  mb-4`}
                >
                  <span
                    className={` rounded-full p-1 mx-2 text-xs ${product.spanClass}`}
                  >
                    {product.spanText}
                  </span>
                  {product.label}
                </p>
                <p
                  className={`text-opacity-50 text-sm ${
                    index % 2 === 1 ? "!text-white" : "!text-text-color"
                  }`}
                >
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div
        className="p-4 flex justify-center gap-5 !text-text-color overflow-x-auto"
        style={{ backgroundColor: "rgb(26, 26, 26)" }}
      >
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="flex justify-start items-center gap-10 "
          >
            <p>
              <span
                className={`!text-text-color rounded-full p-1 mx-2 text-xs ${stat.spanClass}`}
              >
                {stat.spanText}
              </span>
              {stat.label}
            </p>
            <p>{stat.value}</p>
            {stat.id !== statsData.length && (
              <div
                className="!border-r !border-white mt-2"
                style={{ height: "30px" }}
              />
            )}
          </div>
        ))}
      </div> */}

      <div className="text-center flex flex-col justify-center items-center gap-8 p-8 bg-blue-50">
        <p className="mt-8 text-4xl font-bold text-black">
          Grow Smart, Earn Fast- With FASTRO
        </p>
      </div>

      <DoublePyramid />
      <div className="text-center flex lg:flex-row flex-col justify-center lg:items-center gap-8 lg:p-16 py-10 bg-blue-50">
        <p className="lg:text-5xl text-4xl font-bold text-gray-800 text-left p-4">
          <TypeAnimation
            sequence={[
              `Starting June 1st, 50% of FST will be burned through the Jackpot launch.`,
              500,
              `From July 1st, 50% of FST will be burned through the Wingo game.`,
              500,
              "",
              500,
            ]}
            style={{ fontSize: "50px" }}
            repeat={Infinity}
          />
          <p className="text-2xl text-blue-800 font-bold mt-6">
            Beginning June 15th, 10% to 30% of FST will be burned on every new
            user joining.
          </p>
          <p className="border-t border-gray-400 my-5"></p>
        </p>
      </div>
      <>
        <div className="w-full min-h-screen overflow-y-auto relative bg-gradient-to-b from-[#0f0f1c] via-[#1a1c2d] to-[#000] text-white px-4 py-2">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center z-0"
            style={{
              backgroundImage: `url(https://img.freepik.com/premium-vector/concept-lottery-win_144920-19.jpg)`,
            }}
          ></div>

          {/* Floating Jackpot Icon */}
          {/* <div className="fixed bottom-20 right-4 w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-400 z-50 shadow-lg animate-bounce">
            <img
              src={jackgif}
              alt="jackpot gif"
              className="w-full h-full object-cover"
            />
          </div> */}

          <div className="relative z-10 max-w-3xl mx-auto text-center bg-black bg-opacity-60 backdrop-blur-md p-6 rounded-3xl shadow-2xl">
            <div className="flex justify-center mb-6">
              <img src={bgImage} alt="Jackpot Logo" className="w-48 sm:w-60" />
            </div>

            <p className="text-3xl lg:text-5xl font-extrabold text-yellow-400 mb-4 animate-pulse">
              🎉 Coming Soon!
            </p>

            {/* Rules */}
            <div className="bg-black bg-opacity-50 p-6 rounded-2xl text-white shadow-inner">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <span>📜</span> Jackpot Game Rules
              </h2>
              <ul className="space-y-3 text-left list-none text-base sm:text-lg">
                <li className="flex items-start gap-2">
                  <span>🗓️</span> This game will run only on Sundays.
                </li>
                <li className="flex items-start gap-2 text-text-color">
                  <span>⏱️</span> The game duration will be 3 minutes.
                </li>
                <li className="flex items-start gap-2">
                  <span>🚀</span> Launching on 1st June.
                </li>
                <li className="flex items-start gap-2 text-text-color">
                  <span>💰</span> To play, your wallet must have 50% USD and 50%
                  FST balance.
                </li>
                <li className="flex items-start gap-2">
                  <span>🔥</span> All FST used will be sent to the null address.
                </li>
                <li className="flex items-start gap-2 text-text-color">
                  <span>🎟️</span> Ticket purchase will begin from 1st June.
                </li>
                <li className="flex items-start gap-2">
                  <span>🔢</span> Matching the last 4 digits of any number will
                  make you a winner.
                </li>
                <li className="flex items-start gap-2 text-text-color">
                  <span>🥇</span> Match 1 digit to win $100.
                </li>
                <li className="flex items-start gap-2">
                  <span>🥈</span> Match 2 digits to win $200.
                </li>
                <li className="flex items-start gap-2 text-text-color">
                  <span>🥉</span> Match 3 digits to win $300.
                </li>
                <li className="flex items-start gap-2">
                  <span>🏆</span> Match 4 digits to win $400.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
      <div className="text-center flex lg:flex-row flex-col justify-center lg:items-center gap-8 lg:p-16 py-10 bg-blue-50">
        <p className="lg:text-5xl text-4xl font-bold text-gray-800 text-left p-4">
          <TypeAnimation
            sequence={[
              `Beginning June 15th, 10% to 30% of FST will be burned on every new user joining.`,
              500,
              `Currently, 10% FST is already being burned on every transaction.`,
              500,
              "",
              500,
            ]}
            style={{ fontSize: "50px" }}
            repeat={Infinity}
          />
          <p className="text-2xl text-blue-800 font-bold mt-6">
            Special burning events are underway, burning over 2 million tokens.
          </p>
          <p className="border-t border-gray-400 my-5"></p>
        </p>
      </div>
      <>
        <div className="w-full min-h-screen overflow-y-auto relative bg-gradient-to-b from-[#0e172a] via-[#1e1e2f] to-[#000] text-white px-4 py-2">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center z-0"
            style={{
              backgroundImage: `url(https://img.freepik.com/free-vector/realistic-confetti-background_52683-64606.jpg)`,
            }}
          ></div>

          {/* Main Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center bg-black bg-opacity-60 backdrop-blur-md p-6 rounded-3xl shadow-2xl">
            <div className="flex justify-center mb-6">
              <img
                src={bgImagewingo}
                alt="Wingo Logo"
                className="w-48 sm:w-60 !rounded-lg"
              />
            </div>

            <p className="text-3xl lg:text-5xl font-extrabold text-yellow-400 mb-4 animate-pulse">
              🎉 Coming Soon!
            </p>

            {/* Rules Section */}
            <div className="bg-black bg-opacity-50 p-6 rounded-2xl text-white shadow-inner">
              <h2 className="text-2xl font-bold text-gold-color mb-4 flex items-center gap-2">
                <span>📘</span> Wingo Game Rules
              </h2>
              <ul className="space-y-3 text-left list-none text-base sm:text-lg ">
                <li className="flex items-start gap-2 text-text-color">
                  <span>🗓️</span> Game will be available every day.
                </li>
                <li className="flex items-start gap-2">
                  <span>🎯</span> Choose RED, GREEN, or VIOLET and bet
                  accordingly.
                </li>
                <li className="flex items-start gap-2 text-text-color">
                  <span>🧠</span> Predict and place your bet before the timer
                  ends.
                </li>
                <li className="flex items-start gap-2">
                  <span>⏱️</span> Each round lasts 60 seconds.
                </li>
                <li className="flex items-start gap-2 text-text-color">
                  <span>💸</span> Win up to 2x your bet amount based on your
                  prediction.
                </li>
                <li className="flex items-start gap-2">
                  <span>🔥</span> All losing bets go to reward pool.
                </li>
                <li className="flex items-start gap-2 text-text-color">
                  <span>🎟️</span> You can bet multiple times in one round.
                </li>
                <li className="flex items-start gap-2">
                  <span>🔐</span> Fair and transparent smart contract based
                  game.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
      <div className="tradingview-widget-container">
        <div id="tradingview_2d7e100"></div>
      </div>

      <div className="text-center flex lg:flex-row-reverse flex-col justify-center lg:items-center gap-8 lg:p-16 py-10 bg-blue-50">
        <p className="text-4xl font-bold text-gray-800 text-left p-4">
          Burning FST Events
          <p className="text-2xl text-blue-800 font-bold mt-6">
            The ultimate goal is to burn all FST tokens to boost the price by
            100x.
          </p>
          <p className="border-t border-gray-400 my-5"></p>
        </p>
      </div>

      <p className="text-center lg:text-4xl text-xl py-10 text-[#e68413] font-bold">
        Getting Started with Forex Trading is Easy
      </p>

      <div className="flex lg:flex-row flex-col justify-center gap-16 items-center lg:p-8 text-text-color font-bold">
        {steps.map((step) => (
          <div
            key={step?.id}
            className="flex flex-col justify-center items-center gap-5 px-5 lg:w-[300px]"
          >
            <p className="bg-gray-300 rounded-full px-4 py-2 text-black">
              {step?.id}
            </p>
            <p className="text-center text-text-color">{step?.title}</p>
          </div>
        ))}
      </div>

      <Review />
    </>
  );
};
export default Popular;
