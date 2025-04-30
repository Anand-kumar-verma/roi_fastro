import React from 'react';
import { FaUserGroup } from 'react-icons/fa6';

function Levelthree() {
  return (
    <>
      <div className="rounded-2xl border border-[#1E293B] p-4 text-white !mb-10">
        <div className="rounded-xl bg-glassy p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-text-color font-semibold">Level 3</span>
            <span className="text-sm text-gray-400">0 Members</span>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-400">USD Volume</p>
            <p className="font-bold text-gray-400">$0</p>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-400 px-1 py-2">
          <span>User</span>
          <span>Stake (USD)</span>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center mt-3 ">
          <FaUserGroup className="!w-16 !h-16 !text-gray-500" />
          <span className="text-sm !text-text-color">
            No referrals at this level yet
          </span>
        </div>
      </div>
    </>
  );
}

export default Levelthree;
