import React from "react";
import { FaRegStar } from "react-icons/fa";

function Square({ revealed, hasMine, onClick, gameOver }) {
  let content = (
    <span className="text-gray-400 text-center text-6xl lg:pb-4">•</span>
  );
  let bgColor = "bg-[#0b4078] hover:bg-blue-500";
  let borderColor = "border-blue-700";
  let textColor = "text-white";

  if (revealed) {
    if (hasMine) {
      content = "💣";
      bgColor = "bg-[#0b4078]";
    } 
    else if(gameOver){
      content = <FaRegStar className="text-white text-2xl" />;
    }
    else {
      content = "⭐";
      bgColor = "bg-[#0b4078]";
    }
  }
  return (
    <button
      className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-md  text-3xl 
         font-bold transition-colors duration-150 ease-in-out
          ${bgColor}  
         ${borderColor} 
        ${textColor}  
        ${revealed || gameOver ? "cursor-default" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={revealed || gameOver}
    >
      {content}
    </button>
  );
}

export default Square;
