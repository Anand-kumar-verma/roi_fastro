import React, { useState } from 'react';
import Navbar from '../dashboard/Navbar';

function AssociateSignUp() {
  const [sponsorId, setSponsorId] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    
  };

  return (

   <>
   <Navbar/>
    <div className="bg-gray-200 p-6  rounded-lg lg:px-32">
      <h2 className="text-xl text-gray-800 font-bold my-2">Associate Sign-up</h2>
      <form onSubmit={handleSubmit} className='p-10 !mb-10 bg-white border border-gray-400 rounded'>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4  ">
          <div className='flex lg:flex-row flex-col justify-between lg:items-center '>
            <label htmlFor="sponsorId" className="block text-sm font-medium text-gray-700">
              Sponsor ID *
            </label>
            <input
              type="text"
              id="sponsorId"
              value={sponsorId}
              onChange={(e) => setSponsorId(e.target.value)}
              className="mt-1 p-2 lg:w-[60%] w-full border border-gray-500 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className='flex lg:flex-row flex-col justify-between lg:items-center '>
            <label htmlFor="sponsorName" className="block text-sm font-medium text-gray-700">
              Sponsor Name *
            </label>
            <input
              type="text"
              id="sponsorName"
              value={sponsorName}
              onChange={(e) => setSponsorName(e.target.value)}
              className="mt-1 p-2 lg:w-[60%] w-full border border-gray-500 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
         <div className='flex lg:flex-row flex-col justify-between lg:items-center '>
            <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700">
              Applicant Name *
            </label>
            <input
              type="text"
              id="applicantName"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              className="mt-1 p-2 lg:w-[60%] w-full border border-gray-500 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
         <div className='flex lg:flex-row flex-col justify-between lg:items-center '>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="mt-1 p-2 lg:w-[60%] w-full border border-gray-500 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
         <div className='flex lg:flex-row flex-col justify-between lg:items-center '>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 lg:w-[60%] w-full border border-gray-500 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
         <div className='flex lg:flex-row flex-col justify-between lg:items-center '>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 p-2 lg:w-[60%] w-full border border-gray-500 rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Country</option>
              {/* Add country options here */}
            </select>
          </div>
        </div>
        <div className='flex flex-col mt-4 gap-2 justify-center'>
        <div className="mt-4">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className="mr-2"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            By clicking the button you have confirmed accept the Meta Prime - Online Forex Trading Terms & Conditions and
            <p className="text-blue-500">Privacy Policy</p>.
          </label>
        </div>
        <button
          type="submit"
          disabled={!termsAccepted}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full"
        >
          Register
        </button>
        </div>
      </form>
    </div></>
  );
}

export default AssociateSignUp;