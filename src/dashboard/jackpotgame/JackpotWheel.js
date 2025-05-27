import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useRef, useState } from "react";
import { Wheel } from "react-custom-roulette";
import voice from "../../images/rotate_wheel_ball_music.mp3";
const data = Array.from({ length: 10 }, (_, i) => ({
  option: `${i}    🎁`,
}));
export const JackpotWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [myWallet, setMyWallet] = useState(100);
  const [myNumber, setMyNumber] = useState(0);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const audioRef = useRef(new Audio(voice)); // create audio instance

  const handleSpinClick = () => {
    if (myWallet === 0) return;
    setMyWallet(myWallet - 1);
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);

    const audio = audioRef?.current;
    audio.currentTime = 0;
    audio.play().catch((e) => console.log("Audio play error:", e));
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    if (Number(data[prizeNumber].option?.split(" ")[0]) === myNumber) {
      alert(`Congratulations! You are the Winner.`);
      setMyWallet((myWallet || 1) * 2);
    } else {
      alert(`Best of luck next time!`);
    }
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "10px" }}>
      <div>
        <p>Choose Your Number:</p>
        <p className="flex gap-3 justify-center">
          <span>
            <AddCircleOutlineIcon
              onClick={() => setMyNumber(myNumber + 1 > 9 ? 9 : myNumber + 1)}
            />
          </span>
          {myNumber}
          <span>
            <RemoveCircleOutlineIcon
              onClick={() => setMyNumber(myNumber - 1 < 0 ? 0 : myNumber - 1)}
            />
          </span>
        </p>
      </div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={[
          "#FF6B6B",
          "#FFD93D",
          "#6BCB77",
          "#4D96FF",
          "#A66DD4",
        ]}
        textColors={["#fff"]}
        fontSize={30}
        radiusLineWidth={1}
        outerBorderColor="#FFD700" // gold color
        outerBorderWidth={10} // thick enough to stand out
        innerRadius={10}
        onStopSpinning={handleStopSpinning}
      />

      <button
        onClick={handleSpinClick}
        style={{
          marginTop: 30,
          padding: "10px 25px",
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: "#4D96FF",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        Spin
      </button>
      <div>
        Your Dummy Wallet:
        <span className="ml-2 text-green-500 text-lg">{myWallet}$</span>
      </div>
    </div>
  );
};
