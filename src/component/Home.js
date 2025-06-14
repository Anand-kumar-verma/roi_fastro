import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
// import slide from "../images/m.png";
// import bitcoin from "../images/in-equity-slide-1.png";
// import m from "../images/mainb.png";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import { apiConnectorGetHome } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import Popular from "./Popular";
import { useSelector } from "react-redux";

function Home() {
  const { logindataen } = useSelector((state) => state.aviator);

  useQuery(
    ["dashboard_api"],
    () => apiConnectorGetHome(endpoint?.user_dashboard_api, {}, logindataen),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  useQuery(
    ["profile_api"],
    () => apiConnectorGetHome(endpoint?.profile_api, {}, logindataen),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  useQuery(
    ["level_business"],
    () => apiConnectorGetHome(endpoint?.level_business, {}, logindataen),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // const { data: bit } = useQuery(
  //   ["bit_api"],
  //   () =>
  //     apiConnectorGetHome(`${endpoint?.market_api}?ids=BITCOIN&vs_currencies=BTC`),
  //   {
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     retry: false,
  //     retryOnMount: false,
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // const curr_data_bit = bit?.data?.bitcoin?.btc;
  const curr_data_bit = 10;

  // const { data: Eth } = useQuery(
  //   ["eth_api"],
  //   () =>
  //     apiConnectorGetHome(`${endpoint?.market_api}?ids=Ethereum&vs_currencies=ETH`),
  //   {
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     retry: false,
  //     retryOnMount: false,
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // const curr_data_Eth = Eth?.data?.ethereum?.eth;
  const curr_data_Eth = 20;

  const slides = [
    {
      id: 1,
      image:
        "https://www.teambonding.com/wp-content/uploads/2016/10/SPINTOWIN_RGB-01.png",
    },
    {
      id: 2,
      image:
        "https://www.nsoft.com/assets/images/_1035x690_crop_center-center_75_line/274718/Spin-and-Win-image-2.webp",
    },
    {
      id: 3,
      image:
        "https://images.dwncdn.net/images/t_app-cover-s,f_auto/p/b7cec2e9-b927-489c-b293-0e1844d26d24/2538840230/2647_4-78277926-imgingest-343376247191459907.jpg",
    },
  ];

  return (
    <div
      ref={scrollRef}
      className="bg-custom-gradient !overflow-hidden !overflow-y-scroll"
    >
      <Header />
      {/* <div>
        startAppValue : {JSON.stringify(startAppValue || "")}
        datatele : {JSON.stringify(datatele || "")}
      </div> */}
      <div
        className="w-full flex items-center justify-center relative"
        style={{
          backgroundImage: `url("https://t3.ftcdn.net/jpg/04/08/55/24/240_F_408552427_4YG6SEh8h8zcJP8AmhVXC6TMG2mDnAFh.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#111022",
        }}
      >
        {/* Desktop View */}
        <div className="w-full hidden lg:block py-1">
          <Slider {...settings}>
            {slides.map((slideData) => (
              <div
                key={slideData?.id}
                className="flex justify-center items-center px-8 py-4"
              >
                <img
                  src={slideData?.image}
                  alt={`Slide ${slideData?.id}`}
                  className="h-[400px] w-full max-w-[1200px] object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Mobile View */}
        <div className="w-full lg:hidden block overflow-hidden py-1">
          <Slider {...settings}>
            {slides.map((slideData) => (
              <div key={slideData?.id} className="p-2">
                <p className="mt-2 text-xl py-2 text-center font-extrabold text-white">
                  {slideData.heading}
                </p>
                <div className="flex justify-center items-center">
                  <img
                    src={slideData?.image}
                    alt={`Slide ${slideData?.id}`}
                    className="h-[250px] w-full max-w-[95%] object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <Popular curr_data_bit={curr_data_bit} curr_data_Eth={curr_data_Eth} />

      <Footer />
    </div>
  );
}

export default Home;
