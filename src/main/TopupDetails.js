import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Navbar from "../dashboard/Navbar";
import crypto from "../images/crypto.jpg";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import Loader from "../Shared/Loader";

function TopUP() {
  const { isLoading, data: topup_data } = useQuery(
    ["topup_api"],
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
        className="p-4  flex min-h-screen flex-col "
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="p-4 lg:w-[70%] w-full mt-20 lg:mx-40  rounded shadow-md">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-text-color">
            Top Up Details
          </h1>

          <div className="mt-6 lg:mt-10 overflow-x-auto">
            <table className="min-w-full ">
              <thead>
                <tr>
                  <th className="px-6 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-6 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4  border border-yellow-500 text-text-color text-center whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 border border-yellow-500 text-text-color text-center whitespace-nowrap">
                      {moment
                        ?.utc(item?.topup_date)
                        ?.format("DD-MM-YYYY HH:mm:ss")}
                    </td>
                    <td className="px-6 text-center border border-yellow-500 text-text-color py-4 whitespace-nowrap">
                      {item?.topup_pack_amount}
                    </td>
                    <td className="px-6  text-center border border-yellow-500 py-4 whitespace-nowrap text-green-500">
                      Success
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopUP;
