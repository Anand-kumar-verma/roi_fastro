import React, { useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import calc from '../images/equatity.svg';
import gif1 from '../images/gif1.gif';
import gif2 from '../images/gif2.gif';
import curr from '../images/in-equity-2-icon-1.svg';
import forex from '../images/in-equity-2-icon-3.svg';
import meta from '../images/in-equity-2-icon-4.svg';
import Review from './Review';

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
  useEffect(() => {
    // Check if script is already loaded
    if (!document.getElementById('tradingview-widget-script')) {
      const script = document.createElement('script');
      script.id = 'tradingview-widget-script';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        // Initialize TradingView widget after script loads
        if (window.TradingView) {
          new window.TradingView.widget({
            width: '200%',
            height: 500,
            symbol: 'DOT',
            interval: 'D',
            timezone: 'Etc/UTC',
            theme: 'dark',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: 'tradingview_2d7e100',
          });
        }
      };
    } else {
      // If script is already loaded, initialize immediately
      if (window.TradingView) {
        new window.TradingView.widget({
          width: '200%',
          height: 500,
          symbol: 'DOT',
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_2d7e100',
        });
      }
    }
  }, []);
  const steps = [
    {
      id: 1,
      title: 'Choose your Forex account and submit your registration.',
      description: 'Choose your Forex account and submit your registration.',
    },
    {
      id: 2,
      title:
        'Deposit funds securely using debit card or bank transfer to fund your trading account.',
      description:
        'Deposit funds securely using debit card or bank transfer to fund your trading account.',
    },
    {
      id: 3,
      title:
        'Trade with ease on our platform with access to over 40+ currency pairs.',
      description:
        'Trade with ease on our platform with access to over 40+ currency pairs.',
    },
  ];
  const products = [
    {
      id: 1,
      label: 'Stocks',
      description:
        'Access 19,000+ stocks across core and emerging markets on 40+ exchanges worldwide, all with Meta Prime.',
      spanClass: 'bg-[#e54a41]',
      spanText: 'EQ',
      bgClass: 'bg-[#a7e2f2]',
    },
    {
      id: 2,
      label: 'Listed Options',
      description:
        'Access 19,000+ stocks across core and emerging markets on 40+ exchanges worldwide, all with Meta Prime.',
      spanClass: 'bg-[#37bc9c]',
      spanText: 'LQ',
      bgClass: 'bg-[#a7e2f2]',
    },
    {
      id: 3,
      label: 'Futures',
      description:
        'Access 19,000+ stocks across core and emerging markets on 40+ exchanges worldwide, all with Meta Prime.',
      spanClass: 'bg-[#4886d9]',
      spanText: 'FU',
      bgClass: 'bg-[#a7e2f2]',
    },
    {
      id: 4,
      label: 'More products',
      description:
        'Access 19,000+ stocks across core and emerging markets on 40+ exchanges worldwide, all with Meta Prime.',
      spanClass: 'bg-[#fff]',
      spanText: '---',
      bgClass: 'bg-[#a7e2f2]',
    },
  ];

  const statsData = [
    {
      id: 1,
      label: 'BitCoin',
      value: curr_data_bit,
      spanClass: 'bg-red-600',
      spanText: '500',
    },
    {
      id: 3,
      label: 'Europe',
      value: curr_data_Eth,
      spanClass: 'bg-purple-600',
      spanText: 'E',
    },
    {
      id: 4,
      label: 'Bitcoin',
      value: curr_data_bit,
      spanClass: 'bg-yellow-600',
      spanText: 'B',
    },
    {
      id: 5,
      label: 'Ethereum',
      value: curr_data_Eth,
      spanClass: 'bg-pink-600',
      spanText: 'Eth',
    },
  ];

  const features = [
    {
      id: 1,
      image: calc,
      title: 'Forex Calculators',
    },
    {
      id: 2,
      image: curr,
      title: 'Currency Analysis',
    },
    {
      id: 3,
      image: forex,
      title: 'Forex Market Insights',
    },
    {
      id: 4,
      image: meta,
      title: 'Meta Prime Forex Academy',
    },
  ];
  return (
    <>
      <div className=" !lg:p-8 lg:py-14 p-2 py-10 ">
        <p className="text-xl lg:pl-12 p-2 font-bold text-text-color">
          Popular products
        </p>
        <div className="relative w-full overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-10 "
            style={{ display: 'flex', minWidth: '200%' }} // Ensures infinite scroll effect
          >
            {/* Duplicate product list to enable seamless looping */}
            {[...products, ...products].map((product, index) => (
              <div
                key={index}
                className="p-6 shadow-2xl text-[#656d70] text-lg rounded-lg transition-all duration-500 hover:scale-75 hover:shadow-2xl hover:shadow-purple-500 !bg-[#010b13] min-w-[250px]"
              >
                <p className="font-bold text-text-color mb-4">
                  <span
                    className={`!text-text-color rounded-full p-1 mx-2 text-xs ${product.spanClass}`}
                  >
                    {product.spanText}
                  </span>
                  {product.label}
                </p>
                <p className="!text-text-color text-opacity-50 text-sm">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="p-4 flex  justify-center gap-5 !text-text-color overflow-x-auto"
        style={{ backgroundColor: 'rgb(26, 26, 26)' }}
      >
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="flex justify-start items-center gap-10  "
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
                style={{ height: '30px' }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="text-center flex flex-col justify-center items-center gap-8 p-8 bg-blue-50">
        {/* <p
          className={`lg:text-6xl text-4xl font-bold text-gray-800`}
          data-aos="zoom-in-down"
          style={{
            color: textColor,
          }}
        > */}
        {/* <TypeAnimation
            sequence={[
              `Meta Prime: Your gateway to
               advanced forex trading`,
              500,
              () => setTextColor("#010b13"),
              `Your gateway to
               advanced forex trading`, //  Continuing previous Text
              500,
              () => setTextColor("darkmagenta"),
              `Meta Prime`,
              500,
              () => setTextColor("darksalmon"),
              `Meta Prime: Your gateway to
               advanced forex trading`,
              500,
              `Your gateway to
               advanced forex trading`,
              500,
              "",
              500,
            ]}
            style={{ fontSize: "50px" }}
            repeat={Infinity}
          /> */}
        {/* </p> */}
        <p className="mt-8 text-xl text-black" style={{ fontSize: '50px' }}>
          Your Gateway To Advanced Forex Trading
        </p>
        <p className="mt-5 text-xl text-gray-800" data-aos="fade-up">
          Experience seamless forex trading with Meta Prime. Make smarter,
          faster, <br /> and more precise decisions with advanced tools and{' '}
          <br /> real-time data for currency pairs worldwide.
        </p>
      </div>
      <div className="px-2 py-5 bg-[#EFF6FF]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col justify-center">
            <h2
              className="text-4xl font-bold text-gray-800 mb-4"
              data-aos="fade-right"
            >
              Maximize Your MLM Returns with Predictable Growth
            </h2>
            <p className="text-2xl text-blue-500 mb-6" data-aos="fade-right">
              Achieve consistent and scalable returns through our carefully
              designed MLM investment structures.
            </p>
            <hr className="border-t-2 border-gray-300 w-full" />
          </div>
          <div className=" shadow-xl hover:shadow-2xl hover:shadow-emerald-400 overflow-hidden ">
            <img
              data-aos="flip-left"
              src={gif2}
              alt="dashboard"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="py-10 lg:pr-[6rem] bg-[#EFF6FF] ">
        <div className="max-w-6xl mx-auto px-2 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="shadow-xl hover:shadow-2xl hover:shadow-cyan-700 overflow-hidden">
            <img
              data-aos="flip-right"
              src={gif1}
              alt="dashboard"
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex lg:pl-16 flex-col justify-center">
            <h2
              className="text-4xl font-bold text-gray-800 mb-4"
              data-aos="fade-up"
            >
              Unlock Financial Freedom with Guaranteed MLM ROI
            </h2>
            <p className="text-2xl text-blue-500 mb-6" data-aos="fade-up">
              Start building your wealth today! Our MLM platform is engineered
              to deliver strong returns, fast payouts, and unmatched earning
              potential.
            </p>
            <hr className="border-t-2 border-gray-300 w-full" />
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col justify-center gap-16 items-center bg-blue-50 lg:p-8 text-gray-600 font-bold">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col justify-center items-center gap-5 "
          >
            <img
              src={feature.image}
              alt={feature.title}
              className="h-16 w-16 bg-white p-4 rounded shadow-2xl"
            />
            <p className="text-center">{feature.title}</p>
          </div>
        ))}
      </div>
      <div className="text-center flex lg:flex-row flex-col  justify-center lg:items-center gap-8 lg:p-16 py-10 bg-blue-50">
        <p className="lg:text-5xl text-4xl font-bold text-gray-800 text-left p-4  ">
          <TypeAnimation
            sequence={[
              `Tight spreads and ultra-fast execution 
              in forex trading
              `,
              500,
              `Tight spreads and ultra-fast execution 
              in forex trading
              `, //  Continuing previous Text
              500,
              `Tight spreads and ultra-fast execution 
              in forex trading
              `,
              500,
              `Tight spreads and ultra-fast execution 
              in forex trading
              `,
              500,
              `Tight spreads and ultra-fast execution 
              in forex trading
              `,
              500,
              '',
              500,
            ]}
            style={{ fontSize: '50px' }}
            repeat={Infinity}
          />

          <p className=" text-2xl text-blue-800 font-bold mt-6">
            Best forex market prices available for excellent trading conditions.
          </p>
          <p className="border-t border-gray-400 my-5"></p>
        </p>
        <img
          data-aos="flip-right"
          src={
            'https://media.istockphoto.com/id/1271131500/vector/bitcoins-crypto-currency-concept.jpg?s=612x612&w=0&k=20&c=v-xMm4rWBTFr9zr9e2YKhDXgPau2tP-9uAxJL7skkLE='
          }
          alt=""
          className="lg:h-[400px] transition-all duration-500 hover:scale-75 rounded hover:shadow-2xl hover:shadow-purple-500"
        />
        {/* <img src={graph} alt="" className="lg:h-[500px]" /> */}
      </div>

      {/* <div className="flex lg:flex-row flex-col py-10  justify-center items-center gap-8 px-2 lg:p-8 bg-blue-50">
        <img
          data-aos="flip-up"
          src={coin1}
          alt=""
          className="lg:h-full h-[250px]"
        />
        <img
          data-aos="flip-down"
          src={coin2}
          alt=""
          className="lg:h-full h-[250px]"
        />
      </div> */}
      <div className="tradingview-widget-container">
        <div id="tradingview_2d7e100"></div>
      </div>

      <div className="text-center flex lg:flex-row-reverse flex-col  justify-center lg:items-center gap-8 lg:p-16 py-10 bg-blue-50">
        <p className="text-4xl font-bold text-gray-800 text-left p-4  ">
          Grow Your Investments, Grow Your Network
          <p className=" text-2xl text-blue-800 font-bold mt-6">
            With our MLM ROI plans, your network isn't just expanding — your
            returns are too. It's time to turn connections into profits.
          </p>
          <p className="border-t border-gray-400 my-5"></p>
        </p>
        <img
          data-aos="flip-left"
          src={
            'https://img.freepik.com/premium-photo/graphic-people-with-word-people-their-heads_653449-2685.jpg?w=1060'
          }
          alt=""
          className="lg:h-[400px] transition-all duration-500 hover:scale-75 rounded hover:shadow-2xl hover:shadow-purple-500"
        />
      </div>
      <p className="text-center lg:text-4xl text-xl py-10 text-[#e68413] font-bold">
        Getting Started with Forex Trading is Easy
      </p>
      <div className="flex lg:flex-row flex-col justify-center gap-16 items-center lg:p-8 text-text-color font-bold">
        {steps.map((step) => (
          <div
            key={step?.id}
            className="flex flex-col justify-center items-center items-start gap-5 px-5 lg:w-[300px]"
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
