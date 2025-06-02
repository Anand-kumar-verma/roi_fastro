import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import WingoCountdown from "./ColorPrediction";
import JackpotCountdown from "./JackpotCountdown";
import Navbar from "./Navbar";

const GameProject = () => {
  const [activeTab, setActiveTab] = useState("jackpot");
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      {/* Tab Header */}
      <div className="bg-[#111827] text-white px-4 py-3 flex justify-center gap-4 shadow-md pt-[20%]">
        <button
          onClick={() => setActiveTab("jackpot")}
          className={`px-4 py-2 rounded-full font-semibold transition duration-200 ${
            activeTab === "jackpot"
              ? "bg-yellow-400 text-black shadow-lg"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          🎉 Jackpot Game
        </button>
        <button
          // onClick={() => navigate("/wingo")}
          onClick={() => setActiveTab("wingo")}
          className={`px-4 py-2 rounded-full font-semibold transition duration-200 ${
            activeTab === "wingo"
              ? "bg-pink-400 text-black shadow-lg"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          🎯 Wingo Game
        </button>
      </div>

      {/* Game Sections */}
      <div className="w-full min-h-screen bg-[#0e172a] text-white">
        {activeTab === "jackpot" && <JackpotCountdown />}
        {/* {activeTab === "jackpot" && <JackpotCountdownOLD />} */}
        {activeTab === "wingo" && <WingoCountdown />}
      </div>

      <ButtomNavigation />
    </>
  );
};

export default GameProject;
