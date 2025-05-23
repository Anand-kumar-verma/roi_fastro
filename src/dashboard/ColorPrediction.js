import React, { useEffect, useState } from "react";
import bgImage from "../images/wingoimage.jpeg"; // 🎯 Change to Wingo game image
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import Navbar from "./Navbar";

const WingoCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const targetDate = new Date("2025-07-01T00:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({});
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Navbar />
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
              src={bgImage}
              alt="Wingo Logo"
              className="w-48 sm:w-60 !rounded-lg"
            />
          </div>

         <p className="text-3xl lg:text-5xl font-extrabold text-yellow-400 mb-4 animate-pulse">
            🎉 Coming Soon!
          </p>

          {/* Countdown */}
          {timeLeft.days !== undefined ? (
            <div className="flex justify-center gap-4 text-xl sm:text-3xl font-bold mb-6">
              {["days", "hours", "minutes", "seconds"].map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center bg-black bg-opacity-40 px-4 py-2 rounded-lg"
                >
                  <span>{timeLeft[key]}</span>
                  <span className="text-sm text-gray-300 capitalize">
                    {key}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-2xl text-green-400 mb-6">🎮 It's Live Now!</p>
          )}

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
                <span>🔐</span> Fair and transparent smart contract based game.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <ButtomNavigation />
    </>
  );
};

export default WingoCountdown;
