import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Navbar from "../dashboard/Navbar";
import CustomPagination from "../Shared/CustomPagination";
import Loader from "../Shared/Loader";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import CustomToPagination from "../Shared/CustomToPagination";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";

const CompoundHistory = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const { isLoading, data } = useQuery(
    ["roi_income_api"],
    () => apiConnectorGet(`${endpoint?.compounding_wallet_history}`),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const roi_data = data?.data?.result || [];
  // console.log(roi_data)
  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading} />
      <div
        className="p-0 md:p-3 h-screen overflow-y-scroll flex flex-col text-text-color bg-custom-gradient items-center"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="p-4 lg:w-[70%] w-full mt-20 ">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-gold-color">
            Compound History
          </h1>
          <div className="mt-6 lg:mt-10 overflow-x-auto max-h-[400px] overflow-y-auto !pb-[20%]">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="md:px-6 text-nowrap px-2 py-3 border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    S No.
                  </th>
                  <th className="md:px-6 px-2 py-3 border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Date
                  </th>
                  <th className="md:px-6 px-2 py-3 border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="md:px-6 px-2 py-3 border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {roi_data?.map((item, index) => (
                  <tr key={index}>
                    <td className="md:px-6 text-sm px-2 py-4 border border-yellow-500 text-text-color text-center text-colorspace-nowrap">
                      {(page - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="md:px-6 text-sm text-nowrap px-2 py-4 border border-yellow-500 text-gold-color  text-center text-colorspace-nowrap">
                      {moment(item?.ledger_created_at)?.format("DD-MM-YYYY")}
                    </td>
                    <td className="md:px-6 text-sm px-2 border border-yellow-500 text-green-500 text-center py-4 text-colorspace-nowrap">
                      {Number(item?.ledger_amount).toFixed(2)}
                    </td>
                    <td className="md:px-6 text-sm px-2 border border-yellow-500 text-whitetext-center py-4 text-colorspace-nowrap">
                      {item?.ledger_des}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <CustomToPagination page={page} data={roi_data} setPage={setPage} />
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
};

export default CompoundHistory;
