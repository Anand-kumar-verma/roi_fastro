import React, { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import slide from "../images/m.png";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import Popular from "./Popular";

function Home() {

  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { data } = useQuery(
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

  const curr_data = data?.data?.polkadot?.usd;

  const { data: bit } = useQuery(
    ["bit_api"],
    () =>
      apiConnectorGet(`${endpoint?.market_api}?ids=BITCOIN&vs_currencies=BTC`),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const curr_data_bit = bit?.data?.bitcoin?.btc;

  const { data: Eth } = useQuery(
    ["eth_api"],
    () =>
      apiConnectorGet(`${endpoint?.market_api}?ids=Ethereum&vs_currencies=ETH`),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const curr_data_Eth = Eth?.data?.ethereum?.eth;

  const slides = [
    {
      id: 1,
       image: slide,
    },
    {
      id: 2,
      image: slide,
    },
    {
      id: 3,
       image: slide,
    },
  ];

  return (
    <div className="!bg-[#111022] !overflow-hidden">
      <Header />
      {/* <div>
        startAppValue : {JSON.stringify(startAppValue || "")}
        datatele : {JSON.stringify(datatele || "")}
      </div> */}
      <div
        className="w-full flex items-center justify-center  relative"
        style={{
          backgroundImage: `url(${"https://t3.ftcdn.net/jpg/04/08/55/24/240_F_408552427_4YG6SEh8h8zcJP8AmhVXC6TMG2mDnAFh.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor:"#111022"
        }}
      >
       
        <div className="!w-full hidden lg:block !overflow-hidden py-1">
          <Slider {...settings}>
            {slides.map((slideData) => (
              <div
                key={slideData?.id}
                className="!flex justify-center px-8 mt-5 py-2 animate-pulse"
              >
              
                <img
                  src={slideData?.image}
                  alt={`Slide ${slideData?.id}`}
                  className="!h-[600px] w-[1000px] !mt-5"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="!w-full lg:hidden block !overflow-hidden py-1">
          <Slider {...settings}>
            {slides.map((slideData) => (
              <div key={slideData?.id} className="p-2 animate-pulse">
                <p className="mt-1 text-2xl py-2 text-center font-extrabold text-white">
                  {slideData.heading}
                </p>
                <img src={slideData?.image} alt={`Slide ${slideData?.id}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <Popular
        market={curr_data}
        curr_data_bit={curr_data_bit}
        curr_data_Eth={curr_data_Eth}
      />

      <Footer />
    </div>
  );
}

export default Home;
