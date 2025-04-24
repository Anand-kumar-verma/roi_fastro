import React from 'react'
import graph1 from "../images/graph1.webp";
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { TypeAnimation } from 'react-type-animation';
import gif1 from "../images/gif1.gif";
import gif2 from "../images/gif2.gif";

export default function Market() {

  const forexData = [
    { pair: 'EUR/USD', name: 'Euro / U.S. Dollar', rate: '1.02669', change: '-0.28%', pip: '-0.00293' },
    { pair: 'GBP/USD', name: 'British Pound / U.S. Dollar', rate: '1.21611', change: '-0.60%', pip: '-0.00729' },
    { pair: 'USD/JPY', name: 'U.S. Dollar / Japanese Yen', rate: '156.259', change: '+0.74%', pip: '+1.145' },
    { pair: 'USD/CHF', name: 'U.S. Dollar / Swiss Franc', rate: '0.91398', change: '+0.37%', pip: '+0.00338' },
    { pair: 'AUD/USD', name: 'Australian Dollar / U.S. Dollar', rate: '0.61869', change: '-0.40%', pip: '-0.00249' },
    { pair: 'USD/CAD', name: 'U.S. Dollar / Canadian Dollar', rate: '1.44777', change: '+0.59%', pip: '+0.000' },
  ];
  const tradingFeatures = [
    {
        bgColor: "#27bc9c",
        title: "Forex Trading",
        description: "Access to major, minor, and exotic currency pairs with competitive spreads and low commissions.",
    },
    {
        bgColor: "#4284dd",
        title: "Trading Tools",
        description: "Advanced charting tools, technical indicators, and resources to help with your forex trading strategies.",
    },
    {
        bgColor: "#9b4de5",
        title: "Market Insights",
        description: "Real-time forex market analysis and insights to help you make informed trading decisions.",
    },
    {
        bgColor: "#4a4a4a",
        title: "Forex Education",
        description: "Learn about the forex market, trading strategies, and risk management with expert-led resources.",
    }
];

  return (
    <div className='overflow-hidden'>
      <Header />
      {/* <div className="text-center flex lg:flex-row flex-col  justify-center lg:items-center gap-8 lg:p-16 py-10 bg-blue-50"> */}
        {/* <p className="lg:text-5xl text-4xl font-bold text-gray-800 text-left p-4  ">
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
              "",
              500,
            ]}
            style={{ fontSize: "50px" }}
            repeat={Infinity}
          />

          <p className=" text-2xl text-blue-800 font-bold mt-6">
            Best forex market prices available for excellent trading conditions.
          </p>
          <p className="border-t border-gray-400 my-5"></p>
        </p>
        <img
          data-aos="flip-right"
          src={graph1}
          alt=""
          className="lg:h-[400px] transition-all duration-500 hover:scale-75 rounded-lg hover:shadow-2xl hover:shadow-purple-500"
        />
        {/* <img src={graph} alt="" className="lg:h-[500px]" /> */}
      {/* </div>
      <div className="bg-blue-50 px-2 lg:flex lg:justify-center lg:gap-5 space-y-5 lg:space-y-0">
        <img
          src={gif1}
          alt="gif1"
          className="lg:h-[50vh] h-[40vh] lg:w-[42vw] w-full rounded-lg"
        />
        <img
          src={gif2}
          alt="gif1"
          className="lg:h-[50vh] h-[40vh] rounded-lg"
        />
      </div>
      <div className="w-full bg-blue-50 p-10 lg:px-40">
        <div className="overflow-y-auto max-h-64 border bg-white border-gray-200 rounded shadow-2xl p-2">
          <table className="w-full border-collapse">
            <thead className=''>
              <tr className="text-left  text-black font-semibold">
                <th className="">Pair</th>
                <th className="">Rate</th>
                <th className="">Change</th>
                <th className="">Pip</th>
              </tr>
            </thead>
            <tbody>
              {forexData.map((data, index) => (
                <tr key={index} className="border-b text-black ">
                  <td className="">
                    <div className="flex items-center">
                      <span className="mr-2 text-sm">

                      </span>
                      <span>{data.pair}</span>
                    </div>
                    <p className="text-xs text-gray-500">{data.name}</p>
                  </td>
                  <td className="p-2">{data.rate}</td>
                  <td className={`p-2 ${data.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {data.change}
                  </td>
                  <td className={`p-2 ${data.pip.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {data.pip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */} 
      <p className='lg:text-center  text-left pt-10 lg:text-4xl bg-black text-white text-2xl px-4 font-bold'>A relationship on your terms with Meta Prime.</p>
      <p className='text-center p-2 lg:text-xl text-white bg-black'>Work with us the way you want in the forex market.</p>
 
      <div className="grid lg:grid-cols-2 grid-cols-1 bg-black gap-10 py-10 place-items-center lg:px-40 p-10 animate-pulse">
            {tradingFeatures.map((feature, index) => (
                <div
                    key={index}
                    className="p-6 rounded-lg flex flex-col gap-5"
                    style={{ backgroundColor: feature.bgColor }}
                >
                    <p className="w-5 px-1 bg-blue-100 rounded-full">+</p>
                    <div className="flex flex-col gap-5">
                        <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                        <p className="border-t border-white" />
                        <p className="text-sm text-white">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
      
      <Footer />
    </div>
  )
}
