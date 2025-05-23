import React from "react";

const fstToUsd = [
  { usd: 1, fst: 1 },
  { usd: 1, fst: 1.5 },
  { usd: 1, fst: 3 },
  { usd: 1, fst: 6 },
  { usd: 1, fst: 12 },
  { usd: 1, fst: 25 },
  { usd: 1, fst: 50 },
  { usd: 1, fst: 100 },
];

const usdToFst = [
  { usd: 2, fst: 1 },
  { usd: 4, fst: 1 },
  { usd: 8, fst: 1 },
  { usd: 16, fst: 1 },
  { usd: 32, fst: 1 },
  { usd: 64, fst: 1 },
  { usd: 128, fst: 1 },
];

const DoublePyramid = () => {
  const points = [
    "Starting June 1st, 50% of FST will be burned through the Jackpot launch.",
    "From July 1st, 50% of FST will be burned through the Wingo game.",
    "Beginning June 15th, 10% to 30% of FST will be burned on every new user joining.",
    "Currently, 10% FST is already being burned on every transaction.",
    "Special burning events are underway, burning over 2 million tokens.",
    "The ultimate goal is to burn all FST tokens to boost the price by 100x.",
  ];
  return (
    <>
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-1">
          {/* 🔁 Reversed Top Pyramid with gradient */}
          {[...fstToUsd].reverse().map((item, index) => (
            <div
              key={index}
              className="text-white py-1 text-center shadow-lg rounded-md"
              style={{
                width: `${100 + (fstToUsd.length - 1 - index) * 30}px`,
                background: `linear-gradient(90deg, #FFD700, #3f7de0)`,
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {item.usd}$ <span className="!text-gold-color">=</span>{" "}
              <span className="!text-black">{item.fst} FST</span>
            </div>
          ))}

          {/* Touch Point */}
          <div className="text-yellow-400 font-bold my-2">🔷</div>

          {/* Bottom to Top Pyramid with gradient */}
          {[...usdToFst].map((item, index) => (
            <div
              key={index}
              className="text-white py-1 text-center shadow-lg rounded-md"
              style={{
                width: `${100 + index * 30}px`,
                background: `linear-gradient(90deg, #3f7de0, #FFD700)`,
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <span className="!text-black">{item.usd}$</span>{" "}
              <span className="!text-gold-color">=</span> {item.fst} FST
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-6">
        <div className="w-full max-w-2xl bg-gradient-to-br from-[#FFD700] to-[#3f7de0] p-1 rounded-xl shadow-2xl">
          <div className="bg-[#111827] rounded-xl p-6 text-white">
            <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
              🔥 FST Burning Points
            </h2>
            <ul className="space-y-4 text-lg">
              {points.map((point, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-2 bg-gradient-to-r
                   from-[#FFD700]/20 to-[#3f7de0]/20 p-3 rounded-lg border
                   border-yellow-500/20 ${
                     index % 2 === 0 ? "flip-left" : "flip-right"
                   }`}
                >
                  <span className={`text-yellow-300 text-xl`}>👉</span>
                  <span
                    className={`${
                      index % 2 === 0 ? "!text-gold-color" : "!text-text-color"
                    }`}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoublePyramid;
