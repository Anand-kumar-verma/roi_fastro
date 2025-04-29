import React, { useState } from 'react';
import Navbar from '../dashboard/Navbar';
import Loader from '../Shared/Loader';
import ButtomNavigation from '../Layout/ButtomNaviagatoin';

function Referral() {
  const [loading, setLoading] = useState();
  return (
    <>
      <Navbar />
      <div className=" text-white lg:px-32 min-h-screen pb-10 bg-custom-gradient">
        <Loader isLoading={loading} />
        <div className="px-8 pt-10  mt-10">ajhdbsh</div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Referral;
