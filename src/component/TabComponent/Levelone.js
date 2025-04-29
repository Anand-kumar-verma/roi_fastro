import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Levelone() {
  return (
    <>
      <div className="rounded-2xl border border-[#1E293B] p-6 text-white">
        <div className="rounded-xl bg-glassy p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-blue-400 font-semibold">Level 2</span>
            <span className="text-sm text-gray-400">0 Members</span>
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-400">USD Volume</p>
              <p className="font-bold text-white">$0</p>
            </div>
            <div>
              <p className="text-gray-400">TON Volume</p>
              <p className="font-bold text-white">0 TON</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 px-1">
          <span>User</span>
          <span>Stake (USD)</span>
          <span>Stake (TON)</span>
        </div>

        <div className="flex flex-col items-center justify-center mt-10 opacity-70">
          <AccountCircleIcon />
          <span className="text-sm">No referrals at this level yet</span>
        </div>
      </div>
    </>
  );
}

export default Levelone;
