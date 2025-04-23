import React, { useState } from "react";
import abb from "../images/about.PNG";
import abm from "../images/aboutm.PNG";
import philosphy from "../images/philosphy.PNG";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { TypeAnimation } from "react-type-animation";

export default function About() {
  const [textColor, setTextColor] = useState("grey");
  const sections = [
    {
      title: "Our Philosophy",
      description:
        "We believe in simplifying forex trading for both novice and experienced traders. Our philosophy is grounded in transparency, reliability, and cutting-edge technology. We aim to empower traders by providing them with accurate market data, professional analysis, and powerful trading tools that allow them to make informed decisions.",
      additionalInfo:
        "We also emphasize continuous learning in the face of ever-evolving market dynamics. This helps our clients stay ahead of trends and market shifts.",
      image: philosphy, // You can replace this with the actual image variable
    },
    {
      title: "Our Culture",
      description:
        "At Meta Prime, we believe in simplifying forex trading for both novice and experienced traders. Our philosophy is grounded in transparency, reliability, and cutting-edge technology. We aim to empower traders by providing them with accurate market data, professional analysis, and powerful trading tools that allow them to make informed decisions.",
      additionalInfo:
        "We also emphasize continuous learning in the face of ever-evolving market dynamics. This helps our clients stay ahead of trends and market shifts.",
      image: philosphy,
    },
    {
      title: "Our History",
      description:
        "At Meta Prime, we believe in simplifying forex trading for both novice and experienced traders. Our philosophy is grounded in transparency, reliability, and cutting-edge technology. We aim to empower traders by providing them with accurate market data, professional analysis, and powerful trading tools that allow them to make informed decisions.",
      additionalInfo:
        "We also emphasize continuous learning and adaptation in the face of ever-evolving market dynamics. This helps our clients stay ahead of trends and market shifts.",
      image: philosphy,
    },
  ];
  const products = [
    {
      id: 1,
      label: "Stocks",
      description:
        " core and emerging markets on 40+ exchanges worldwide, all with Meta Prime.",
      spanClass: "bg-[#e54a41]",
      spanText: "EQ",
      bgClass: "bg-[#a7e2f2]",
    },
    {
      id: 2,
      label: "Listed Options",
      description:
        "Access 19,000+ stocks across core and emerging markets on 40+ exchanges worldwide, all with Meta Prime.",
      spanClass: "bg-[#37bc9c]",
      spanText: "LQ",
      bgClass: "bg-[#a7e2f2]",
    },
    {
      id: 3,
      label: "Futures",
      description:
        "Access 19,000+ stocks across core and emerging markets on 40+ exchanges worldwide, all with Meta Prime.",
      spanClass: "bg-[#4886d9]",
      spanText: "FU",
      bgClass: "bg-[#a7e2f2]",
    },
    {
      id: 4,
      label: "More products",
      description:
        "Access 19,000+ stocks across core and emerging markets on 40+ exchanges worldwide, all with Meta Prime.",
      spanClass: "bg-[#fff]",
      spanText: "---",
      bgClass: "bg-[#a7e2f2]",
    },
  ];

  const statsData = [
    {
      id: 1,
      label: "S&PA 500 index",
      value: "52,000",
      spanClass: "bg-red-600",
      spanText: "500",
    },
    {
      id: 2,
      label: "USA & CFE",
      value: "240,000",
      spanClass: "bg-blue-600",
      spanText: "100",
    },
    {
      id: 3,
      label: "Europe",
      value: "1,47854",
      spanClass: "bg-purple-600",
      spanText: "E",
    },
    {
      id: 4,
      label: "Bitcoin",
      value: "1,14250",
      spanClass: "bg-yellow-600",
      spanText: "B",
    },
    {
      id: 5,
      label: "Ethereum",
      value: "1,8576",
      spanClass: "bg-pink-600",
      spanText: "Eth",
    },
  ];
  return (
    <div className="">
      <Header />
      <img src={abb} alt="" className="lg:block hidden w-full" />
      <img src={abm} alt="" className="lg:hidden block w-full" />
      <p className="p-5 lg:text-4xl bg-black text-white lg:text-center text-2xl text-left font-bold">
        Putting our clients first since 1986
      </p>
      <p className=" p-2 lg:text-center bg-black text-white text-left">
        {" "}
        empowering clients by helping them take control of their forex trading
        journey.
        <p>
          {" "}
          Our commitment to deliverin, and advanced tools has positioned{" "}
        </p>{" "}
        Meta Prime as a trusted leader in the forex industry.
      </p>
      <div>
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex space-x-4 p-5 bg-black text-white lg:px-32 py-10"
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-12 h-12 rounded-full bg-blue-400 object-cover"
            />
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-white">{section.title}</h3>
              <p className="text-sm text-gray-600">{section.description}</p>
              <p className="text-gray-700 mt-2 italic">
                {section.additionalInfo}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center flex flex-col justify-center items-center gap-8 p-8 bg-blue-50">
        {/* <p
          className={`lg:text-6xl text-4xl font-bold text-white`}
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
        <p className="mt-8 text-xl text-red-400" style={{ fontSize: "50px" }}>Your gateway to
        advanced forex trading</p>
        <p className="mt-8 text-xl text-gray-400" data-aos="fade-up">
          Experience seamless forex trading with Meta Prime. Make smarter,
          faster, <br /> and more precise decisions with advanced tools and{" "}
          <br /> real-time data for currency pairs worldwide.
        </p>

        {/* <img src={money} alt="" className="" /> */}
      </div>
      <div
        className="p-4 flex  justify-center gap-5 !text-white overflow-x-auto"
        style={{ backgroundColor: "rgb(26, 26, 26)" }}
      >
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="flex justify-start items-center gap-10  "
          >
            <p>
              <span
                className={`!text-white rounded-full p-1 mx-2 text-xs ${stat.spanClass}`}
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
      </div>
      <Footer />
    </div>
  );
}
