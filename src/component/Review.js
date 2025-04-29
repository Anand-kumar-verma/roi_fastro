import React from "react";
import Taskbg from "../images/in-equity-11-bg.png";
import t1 from "../images/in-equity-11-icon-1.svg";
import t2 from "../images/in-equity-11-icon-2.svg";
import t3 from "../images/in-equity-11-icon-3.svg";
import women from "../images/in-team-1.png";
import men from "../images/in-team-8.png";

export default function Review() {
  const reviews = [
    {
      name: 'Angela Nannenhorn',
      country: 'United Kingdom',
      text: 'Very convenient for traders, spread for gold is relatively low compared to other brokers.',
      image: women,
    },
    {
      name: 'Wade Palmer',
      country: 'Germany',
      text: 'One of the best FX brokers, I have been using! Their trading conditions are excellent.',
      image: men,
    },
    // {
    //   name: "Lina Schwarz",
    //   country: "France",
    //   text: "Meta Prime's platform is incredibly user-friendly and provides real-time forex trading information.",
    //   image: women,
    // },
    // {
    //   name: "Ravi Patel",
    //   country: "India",
    //   text: "The spreads for USD/INR are unbeatable! I'm very satisfied with the services Meta Prime provides.",
    //   image: men,
    // },
  ];
  const marketData = [
    {
      name: 'Forex',
      description:
        'Trade 40+ major, minor, and exotic currency pairs with AI-powered strategies.',
      image: t1,
      color: 'text-blue-400',
    },
    {
      name: 'Indices',
      description: 'Trade 15 global indices with AI-assisted market trends.',
      image: t2,
      color: 'text-green-400',
    },
    // {
    //   name: "Stocks",
    //   description:
    //     "Trade the most popular stocks with advanced technical analysis and AI insights.",
    //   image: t3,
    //   color: "text-yellow-400",
    // },
    // {
    //   name: "Metals",
    //   description:
    //     "Trade precious metals like Gold and Silver with predictive AI models.",
    //   image: t4,
    //   color: "text-gray-400",
    // },
    // {
    //   name: "Cryptos",
    //   description:
    //     "Trade top cryptocurrencies including Bitcoin, Ethereum, and Ripple with smart AI algorithms.",
    //   image: t5,
    //   color: "text-purple-400",
    // },
    // {
    //   name: "Energies",
    //   description:
    //     "Trade Energy assets like Brent Crude Oil, WTI, Natural Gas, and Coal with AI-driven insights.",
    //   image: t6,
    //   color: "text-orange-400",
    // },
  ];

  const tradingInfo = [
    {
      image: t3,
      title: 'Best Trading Conditions',
      description:
        'Trade precious metals like Gold and Silver with predictive AI models.',
    },
    {
      image: t2,
      title: 'Best Forex Trading Platform',
      description:
        'Trade precious metals like Gold and Silver with predictive AI models.',
    },
  ];
  return (
    <>
      <p className="text-center lg:text-5xl text-2xl py-10 font-bold text-[#e68413]">
        More than 23,000 traders joined
      </p>

      <div className="grid lg:grid-cols-2 gap-8 px-5 lg:px-20">
        {reviews.map((review, index) => (
          <div
            data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            data-aos-delay="300"
            data-aos-offset="0"
            key={index}
            className="flex items-center space-x-6 p-6 bg-[#1e2b34] rounded-lg shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#e68413]"
          >
            <img
              src={review.image}
              alt={review.name}
              className="lg:w-28 lg:h-28 w-16 h-16 rounded-full border-4 border-[#e68413] object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">
                {review.name}
              </h3>
              <p className="text-sm text-gray-400">from {review.country}</p>
              <p className="text-gray-500 mt-2 italic">"{review.text}"</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="bg-cover bg-center py-20"
        style={{
          backgroundImage: `url(${Taskbg})`,
        }}
      >
        <h1 className="lg:text-5xl text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6e96cf] to-[#e68413] my-4">
          Trade the World's Most Popular Markets
        </h1>
        <p className="text-xl text-center text-gray-400 max-w-2xl mx-auto">
          Access AI-powered insights and advanced tools to trade a wide range of
          markets.
        </p>

        <div className="lg:p-10 p-6 w-full flex items-center gap-2 justify-center">
          <div className="grid lg:grid-cols-2 grid-cols-1 place-content-center gap-6">
            {marketData.map((market, index) => (
              <div
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                key={market.id}
                className="p-8 shadow-2xl text-[#656d70] bg-[#010b13] text-lg rounded-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500"
              >
                <img
                  src={market.image}
                  alt=""
                  className="h-16 w-16 mx-auto mb-4 border-4 border-[#e68413] rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {market.name}
                  </h2>
                  <p className="text-sm text-gray-400">{market.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-blue-500 text-center my-2">
          Warning: All trading involves risk. It is possible to lose all your
          capital. Use AI-powered analysis to trade wisely.
        </p>

        <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center lg:p-10 p-5">
          {tradingInfo.map((item, index) => (
            <div
              key={index}
              className="p-6 flex gap-6 items-center hover:bg-[#1e2b34] rounded-lg transition-all hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 border-4 border-[#e68413] rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
