import { useEffect, useMemo, useState } from "react";
import jackgif from "../images/KolntAno33.gif";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import { JackpotWheel } from "./jackpotgame/JackpotWheel";
import Navbar from "./Navbar";

const JackpotCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const targetDate = new Date("2025-06-01T00:00:00");
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
      {useMemo(() => {
        return <Navbar />;
      }, [])}
      <div className="w-full min-h-screen overflow-y-auto relative bg-gradient-to-b from-[#0f0f1c] via-[#1a1c2d] to-[#000] text-white px-4 py-2">
        {useMemo(() => {
          return (
            <>
              {/* Background Overlay */}
              <div
                className="absolute inset-0 opacity-20 bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url(https://img.freepik.com/premium-vector/concept-lottery-win_144920-19.jpg)`,
                }}
              ></div>

              {/* Floating Jackpot Icon */}
              <div className="fixed top-30 right-4 w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-400 z-50 shadow-lg animate-bounce">
                <img
                  src={jackgif}
                  alt="jackpot gif"
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          );
        }, [])}

        <div className="relative z-10 max-w-3xl mx-auto text-center bg-black bg-opacity-60 backdrop-blur-md p-6 rounded-3xl shadow-2xl">
          {useMemo(() => {
            return (
              <>
                <div className="flex justify-center mb-6 !overflow-hidden">
                  {/* <img src={bgImage} alt="Jackpot Logo" className="w-48 sm:w-60" /> */}
                  <JackpotWheel />
                </div>

                <p className="text-3xl lg:text-5xl font-extrabold text-yellow-400 mb-4 animate-pulse">
                  🎉 Coming Soon!
                </p>
              </>
            );
          }, [])}

          {/* Countdown */}
          {useMemo(() => {
            return timeLeft.days !== undefined ? (
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
              <p className="text-2xl text-green-400 mb-6">🚀 It's Live Now!</p>
            );
          }, [timeLeft])}

          {/* Rules */}
          {useMemo(() => {
            return (
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
                    <span>💰</span> To play, your wallet must have 50% USD and
                    50% FST balance.
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🔥</span> All FST used will be sent to the null
                    address.
                  </li>
                  <li className="flex items-start gap-2 text-text-color">
                    <span>🎟️</span> Ticket purchase will begin from 1st June.
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🔢</span> Matching the last 4 digits of any number
                    will make you a winner.
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
            );
          }, [])}
        </div>
      </div>

      {useMemo(() => {
        return <ButtomNavigation />;
      }, [])}
    </>
  );
};

export default JackpotCountdown;
