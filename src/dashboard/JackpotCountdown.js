import { useMemo } from "react";
// import jackgif from "../images/KolntAno33.gif";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import { JackpotWheel } from "./jackpotgame/JackpotWheel";
import Navbar from "./Navbar";

const JackpotCountdown = () => {
  const navigate = useNavigate();
  const { isLoading: proLoding, data: profile_data } = useQuery(
    ["profile_api"],
    () => apiConnectorGet(endpoint?.profile_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const profile = profile_data?.data?.result?.[0] || [];
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
              </>
            );
          }, [])}
          {useMemo(() => {
            return (
              <div className="text-xl font-bold mb-4 flex items-center justify-between">
                <p className="!text-green-500">
                  Won: ${Number(profile?.jnr_game_winning || 0)?.toFixed(2)}
                </p>
                <Button
                  variant="contained"
                  className="!rounded-full !bg-gold-color !text-text-color !font-bold"
                  onClick={() =>
                    Number(profile?.jnr_game_winning || 0) > 0
                      ? navigate("/withdrawal-link", {
                          state: {
                            type: "jackpot",
                          },
                        })
                      : toast("Your Amount is low.", { id: 1 })
                  }
                >
                  Withdrawal
                </Button>
              </div>
            );
          }, [])}
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
                  <li className="flex items-start gap-2 text-text-color">
                    <span>🥇</span> First Winner will get $500.
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🥈</span> Second Winner will get $300.
                  </li>
                  <li className="flex items-start gap-2 text-text-color">
                    <span>🥉</span> Third Winner will get $200.
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🏅</span> Fourth Winner will get $100.
                  </li>
                  <li className="flex items-start gap-2 text-text-color">
                    <span>🎖️</span> Fifth Winner will get $50.
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
