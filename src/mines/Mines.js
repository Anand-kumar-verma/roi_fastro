import React, { useEffect, useState } from "react";
import Footer from "./layoutmines/Footer";
import Header from "./layoutmines/Header";
import { Container } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { FaPlay, FaRedoAlt, FaCoins } from "react-icons/fa";
import toast from "react-hot-toast";
import Square from "./submines/Square";
import mouseSound from "../images/button_click.mp3";
import bombSound from "../images/bomb_detect.mp3";
import minesSound from "../images/mouse_over_mine.mp3";
import cashoutSound from "../images/mouse_over_mine.mp3";
import { apiConnectorPost } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import { enCryptData } from "../utils/Secret";

function getRandom(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

function Mines() {
  const [minesCount, setMinesCount] = useState(1);
  const [betAmount, setBetAmount] = useState(1);
  const [betvalue, setBetvalue] = useState(betAmount);
  const totalSquares = 25;
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1.0);
  const [isEnableClick, setIsEnableClick] = useState(false);
  const [cashoutAvailable, setCashoutAvailable] = useState(false);
  const [increment, setincrement] = useState(0.1);

  const initializeGame = (count = 1) => {
    // Generate a Set of unique mine indices
    const mineIndices = new Set();
    while (mineIndices.size < Math.max(count, minesCount)) {
      const randomIndex = getRandom(0, totalSquares - 1);
      mineIndices.add(randomIndex);
    }

    const newGrid = Array(totalSquares)
      .fill(null)
      .map((_, i) => ({
        id: i,
        revealed: false,
        hasMine: mineIndices.has(i),
      }));

    setGrid(newGrid);
    setGameOver(false);
    setIsEnableClick(false);
    setCount(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleClick = (clickedIndex) => {
    if (!isEnableClick || gameOver) return;

    let newvalues = count + 1;
    setCount(newvalues);
    const array = grid?.map((i, index) => {
      return {
        ...i,
        revealed: i.revealed || index === clickedIndex,
      };
    });
    setGrid(array);
    const isIndex = grid?.[clickedIndex]?.hasMine;
    if (isIndex) {
      const bombAudio = new Audio(bombSound);
      bombAudio.play();
      setCashoutAvailable(false);
      setIsEnableClick(false);
      setGameOverFun();
    } else {
      const safeAudio = new Audio(minesSound);
      safeAudio.play();
    }
    // const newGrid = grid?.map((i, index) => {
    //   // let last_no = 25;
    //   // if (last_win_pos < 0) last_no = 25;
    //   // else if (last_win_pos <= 5) last_no = 5;
    //   // else last_no = 10;

    //   // const random = getRandom(count, last_no);

    //   // const isMine = count === random && index === clickedIndex;
    //   if (index === clickedIndex) {
    //     if (isMine) {
    //       const bombAudio = new Audio(bombSound);
    //       bombAudio.play();
    //       setCashoutAvailable(false);
    //       setIsEnableClick(false);
    //       setGameOverFun();
    //     } else {
    //       const safeAudio = new Audio(minesSound);
    //       safeAudio.play();
    //     }
    //   }

    //   // if (isMine) {
    //   //   setCashoutAvailable(false);
    //   //   setIsEnableClick(false);
    //   //   setGameOverFun();
    //   // }

    //   return {
    //     ...i,
    //     revealed: index === clickedIndex || i?.revealed,
    //     hasMine: isMine,
    //   };
    // });
    // setGrid(newGrid);
  };
  function setGameOverFun() {
    setTimeout(() => {
      setGameOver(true);
      setCashoutAvailable(false);
      setGrid((prevGrid) =>
        prevGrid.map((cell) => {
          if (cell.hasMine) {
            return {
              ...cell,
              revealed: true,
              hasMine: cell.hasMine, // 50% chance bomb/star
            };
          }
          return cell;
        })
      );

      // setGrid((prevGrid) =>
      //   prevGrid.map((cell) => {
      //     if (!cell.revealed) {
      //       const random = Math.random();
      //       return {
      //         ...cell,
      //         revealed: true,
      //         hasMine: random < 0.5, // 50% chance bomb/star
      //       };
      //     }
      //     return cell;
      //   })
      // );

      setTimeout(() => {
        initializeGame();
        const id = document.getElementById("progress");
        id.classList.add("progress-bar");
        setTimeout(() => {
          id.classList.remove("progress-bar");
        }, 3000);
      }, 1000);
    }, 2000);
  }

  const handleBetChange = (e) => {
    const val = e.target.value;
    setBetvalue(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      setBetAmount(parsed);
    }
  };

  const incrementBet = () => {
    const newBet = parseFloat((betAmount + 0.1).toFixed(2));
    setBetAmount(newBet);
    setBetvalue(newBet);
  };

  const decrementBet = () => {
    const newBet = parseFloat(Math.max(0, betAmount - 0.1).toFixed(2));
    setBetAmount(newBet);
    setBetvalue(newBet);
  };

  useEffect(() => {
    setBetvalue(betAmount);
  }, [betAmount]);

  const client = useQueryClient();

  const Betfunction = async () => {
    const reqbody = {
      amount: betAmount,
      d_diff_level: minesCount,
      bettype: 1,
      bet_multiplier: 0,
    };

    const audio = new Audio(mouseSound);
    audio.play();
    try {
      const res = await apiConnectorPost(endpoint?.mines_bet, {
        payload: enCryptData(reqbody),
      });
      if (res?.data?.msg !== "Bid placed Successfully") {
        toast(res?.data?.msg, { id: 1 });
      }
      if (res?.data?.msg === "Bid placed Successfully") {
        setIsEnableClick(true);
        setCashoutAvailable(true);
        client.refetchQueries("wallet_amount_amount");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const Cashoutfunction = async () => {
    const reqbody = {
      amount: 0,
      d_diff_level: minesCount,
      bettype: 2,
      bet_multiplier: Number(
        multiplier + increment * (count + 1 || 1) - increment
      )?.toFixed(2),
    };
    const audio = new Audio(cashoutSound);
    audio.play();
    try {
      const res = await apiConnectorPost(endpoint?.mines_bet, {
        payload: enCryptData(reqbody),
      });
      if (res?.data?.msg !== "Cashout Successfully") {
        toast(res?.data?.msg, { id: 1 });
      }
      if (res?.data?.msg === "Cashout Successfully") {
        client.refetchQueries("wallet_amount_amount");
        setCashoutAvailable(false);
        setMultiplier(1.0);
        setTimeout(() => {
          initializeGame();
          const id = document.getElementById("progress");
          id.classList.add("progress-bar");
          setTimeout(() => {
            id.classList.remove("progress-bar");
          }, 3000);
        }, 1000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <div className="h-min-screen bg-blue-800 text-white flex flex-col gap-8 lg:gap-0 font-sans">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-blue-900 rounded-lg p-2 shadow-lg">
            <div className="flex justify-between items-center ">
              <div className="flex items-center space-x-2 bg-blue-600 rounded-full border border-blue-500 px-3 py-1 focus-within:ring-2 focus-within:ring-blue-400">
                {/* <span className="text-gray-200 text-sm">Mines:</span> */}
                <select
                  className="text-sm bg-blue-500 text-white rounded-full px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none cursor-pointer max-h-20 overflow-y-auto"
                  value={minesCount}
                  onChange={(e) => {
                    setincrement(0.1 * e.target.value);
                    setMinesCount(parseInt(e.target.value));
                    initializeGame(e.target.value);
                  }}
                  size={1}
                  disabled={count}
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      Mines : {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-sm bg-yellow-500 p-1 px-2 rounded-full">
                <span className="text-black">Next:</span>{" "}
                <span className=" text-black">
                  {Number(multiplier + increment * (count + 1 || 1))?.toFixed(
                    2
                  )}
                  x
                </span>
              </div>
            </div>
            <div className="mt-5 h-[2px] w-full bg-gray-300 relative overflow-hidden">
              <div
                id="progress"
                className=" h-[2px] bg-red-600 absolute right-0 top-0"
              ></div>
            </div>

            <div className="relative grid grid-cols-5 gap-2 md:gap-3 p-2 bg-[#025ad7] rounded-lg">
              {grid.map((square) => (
                <Square
                  key={square.id}
                  revealed={square.revealed}
                  hasMine={square.hasMine}
                  onClick={() => isEnableClick && handleClick(square.id)}
                  gameOver={gameOver}
                />
              ))}

              {gameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center rounded-lg">
                  <p className="text-xl font-bold text-red-500">Game Over!</p>
                </div>
              )}
            </div>
          </div>
        </main>
        <footer className="bg-blue-900 py-5 px-1 flex flex-col  justify-center items-center gap-1 text-white shadow-md ">
          <div className="flex items-center justify-center w-full gap-1">
            {/* Bet Controls Box */}
            <div className="flex items-center bg-blue-700 rounded-full px-4 py-1 border border-blue-900 gap-1">
              <div className="flex flex-col items-center mr-2">
                <span className="text-[8px] text-white">Bet Point </span>
                <input
                  className="mt-1 w-20 h-5 text-center text-white font-bold bg-blue-900 
                                rounded-full border border-blue-800 focus:outline-none"
                  id="betAmount"
                  name="betAmount"
                  type="number"
                  value={betvalue}
                  disabled={count > 0 || isEnableClick}
                  onChange={handleBetChange}
                />
              </div>

              <button
                className="h-5 w-5  flex justify-center items-center  rounded-full bg-blue-600 hover:bg-blue-500 border border-blue-800"
                onClick={decrementBet}
                disabled={count > 0 || isEnableClick}
              >
                <span>−</span>
              </button>

              <button
                className="h-5 w-5 flex justify-center items-center rounded-full bg-blue-600 hover:bg-blue-500 border border-blue-800"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <FaCoins className="w-4 h-4" />
              </button>

              <button
                className="h-5 w-5 flex justify-center items-center rounded-full bg-blue-600 hover:bg-blue-500 border border-blue-800"
                onClick={incrementBet}
                disabled={count > 0 || isEnableClick}
              >
                <span>+</span>
              </button>
            </div>
            <button className="p-3 rounded-full bg-blue-700 hover:bg-blue-600 border border-blue-900">
              <FaRedoAlt className="w-4 h-4 text-white" />
            </button>
            {cashoutAvailable ? (
              <button
                className={`flex items-center gap-1 px-6 py-2 rounded-full
              bg-gradient-to-b from-yellow-500 to-orange-600 border border-black shadow-md
              hover:from-yellow-400 hover:to-orange-500 text-white font-bold text-xs
              disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={Cashoutfunction}
                disabled={!count}
              >
                Cashout (
                {count === 0
                  ? 0
                  : Number(
                      (multiplier + increment * (count + 1 || 1) - increment) *
                        betAmount
                    )?.toFixed(2)}
                x)
              </button>
            ) : (
              <button
                className="flex items-center gap-1 px-6 py-2 rounded-full
                bg-gradient-to-b from-lime-500 to-green-700 border border-black shadow-md
                 hover:from-lime-400 hover:to-green-600 text-white font-bold text-lg"
                onClick={Betfunction}
              >
                <FaPlay className="text-white w-4 h-4" />
                BET
              </button>
            )}
          </div>
        </footer>
      </div>
    </Container>
  );
}

export default Mines;
