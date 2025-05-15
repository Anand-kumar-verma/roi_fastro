import moment from 'moment';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Navbar from '../dashboard/Navbar';
import crypto from '../images/crypto.jpg';
import { apiConnectorGet } from '../utils/APIConnector';
import { endpoint } from '../utils/APIRoutes';
import Loader from '../Shared/Loader';
import ButtomNavigation from '../Layout/ButtomNaviagatoin';

function TopUP() {
  const { isLoading, data: topup_data } = useQuery(
    ['topup_api'],
    () => apiConnectorGet(endpoint?.get_topup_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const data = topup_data?.data?.result || [];

  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading} />
      <div
        className="p-0 md:p-4 flex min-h-screen flex-col items-center bg-custom-gradient"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="p-4 lg:w-[70%] w-full mt-20 ">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-gold-color">
            Top Up Details
          </h1>

          <div className="mt-6 lg:mt-10 overflow-x-auto">
            <table className="min-w-full ">
              <thead>
                <tr>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    No.
                  </th>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Date
                  </th>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td className="md:px-6 px-2 py-4  border border-yellow-500 text-text-color text-center text-colorrspace-nowrap">
                      {index + 1}
                    </td>
                    <td className="md:px-6 px-2 text-nowrap py-4 border border-yellow-500 text-text-color text-center text-colorrspace-nowrap">
                      {moment
                        ?.utc(item?.topup_date)
                        ?.format('DD-MM-YYYY')}
                    </td>
                    <td className="md:px-6 px-2 text-center border border-yellow-500 text-text-color py-4 text-colorrspace-nowrap">
                      {Number(item?.topup_pack_amount).toFixed(2)}
                    </td>
                    <td className="md:px-6 px-2  text-center border border-yellow-500 py-4 text-colorrspace-nowrap text-green-500">
                      Success
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default TopUP;
