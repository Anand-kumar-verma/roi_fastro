import { useEffect, useState } from "react";
import { FaCoins, FaPlay, FaRedoAlt } from "react-icons/fa";

function Footer({ betAmount, setBetAmount }) {
  const [betvalue, setBetvalue] = useState(betAmount.toFixed(2))

  const handleBetChange = (e) => {
    const val = e.target.value;
    setBetvalue(val)
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      setBetAmount(parsed);
    }
  };

  const incrementBet = () => {
    const newBet = parseFloat((betAmount + 0.1).toFixed(2))
    setBetAmount(newBet);
    setBetvalue(newBet?.toFixed(2));

  }

  const decrementBet = () => {
    const newBet = parseFloat(Math.max(0, betAmount - 0.1).toFixed(2))
    setBetAmount(newBet)
    setBetvalue(newBet?.toFixed(2))
  }

  useEffect(() => {
    setBetvalue(betAmount?.toFixed(2));
  }, [betAmount]);

  return (
    <footer className="bg-blue-900 p-4 flex flex-col justify-center items-center gap-4 text-white shadow-md">
      <div className="flex items-center justify-center w-full gap-3">
        {/* Bet Controls Box */}
        <div className="flex items-center bg-blue-700 rounded-full px-4 py-1 border border-blue-900 gap-3">
          <div className="flex flex-col items-center mr-2">
            <span className="text-[8px] text-white">Bet USD</span>
            <input
              className="mt-1 w-20 h-5 text-center text-white font-bold bg-blue-900 
              rounded-full border border-blue-800 focus:outline-none"
              id="betAmount"
              name="betAmount"
              type="number"
              value={betvalue}
              onChange={handleBetChange}
            />
          </div>

          <button
            className="h-5 w-5  flex justify-center items-center  rounded-full bg-blue-600 hover:bg-blue-500 border border-blue-800"
            onClick={decrementBet}>
            <span>−</span>
          </button>

          <button className="h-5 w-5 flex justify-center items-center rounded-full bg-blue-600 hover:bg-blue-500 border border-blue-800">
            <FaCoins className="w-4 h-4" />
          </button>

          <button
            className="h-5 w-5 flex justify-center items-center rounded-full bg-blue-600 hover:bg-blue-500 border border-blue-800"
            onClick={incrementBet}
          >
            <span>+</span>
          </button>
        </div>

        {/* Reset Button */}
        <button className="p-3 rounded-full bg-blue-700 hover:bg-blue-600 border border-blue-900">
          <FaRedoAlt className="w-4 h-4 text-white" />
        </button>

        {/* BET Button */}
        <button className="flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-b from-lime-500 to-green-700 border border-black shadow-md hover:from-lime-400 hover:to-green-600 text-white font-bold text-lg">
          <FaPlay className="text-white w-4 h-4" />
          BET
        </button>
      </div>
    </footer>
  );
}

export default Footer;
