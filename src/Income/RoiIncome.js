import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Navbar from "../dashboard/Navbar";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import moment from "moment";
import crypto from "../images/crypto.jpg";
import CustomPagination from "../Shared/CustomPagination";
import Loader from "../Shared/Loader";
import CustomToPagination from "../Shared/CustomToPagination";

const RoiIncome = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;


  const { isLoading,data } = useQuery(
    ["roi_income_api", page],
    () =>
      apiConnectorGet(
        `${endpoint?.roi_income_api}?income_type=ROI&page=${page}`
      ),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const roi_data = data?.data?.data || [];

  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading}/>
      <div
        className="text-white p-3 min-h-screen flex flex-col bg-[#111022] items-center"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="p-4 lg:w-[70%] w-full mt-20 ">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-white">
            ROI Income
          </h1>
          <div className="mt-6 lg:mt-10 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    S No.
                  </th>
                  <th className="px-6 py-3 border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {roi_data?.data?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 border border-yellow-500 text-white text-center whitespace-nowrap">
                      {(page - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 border border-yellow-500 text-white text-center whitespace-nowrap">
                      {moment(item?.ledger_created_at)?.format(
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                    </td>
                    <td className="px-6 border border-yellow-500 text-white text-center py-4 whitespace-nowrap">
                      {item?.ledger_amount}
                    </td>
                    <td className="px-6 border border-yellow-500 text-white text-center py-4 whitespace-nowrap">
                      {item?.ledger_des}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <CustomToPagination data={roi_data} page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoiIncome;
