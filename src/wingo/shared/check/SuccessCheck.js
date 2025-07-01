import React from "react";

const SuccessCheck = ({ message }) => {
  return (
    <div className="w-56 rounded-2xl shadow-md p-4 flex flex-col items-center space-y-3 animate-fade-in">
      <svg
        className="w-16 h-16 text-green-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        <circle
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeMiterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
          className="stroke-[6] animate-draw"
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5"
          className="animate-draw"
        />
      </svg>
      <p className="text-green-700 font-semibold text-center">{message}</p>
    </div>
  );
};

export default SuccessCheck;
