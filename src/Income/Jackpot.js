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

const Jackpot = () => {
  const [page, setPage] = useState(1);

  const { isLoading, data } = useQuery(
    ["booster_income_api", page],
    () =>
      apiConnectorGet(
        `${endpoint?.roi_income_api}?income_type=Jackpot&page=${page}`
      ),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const booster_data = data?.data?.data || [];

  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading} />
      <div
        className=" text-text-color bg-custom-gradient p-3 min-h-screen flex flex-col items-center"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="p-4 lg:w-[70%] w-full mt-20  ">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-text-color ">
            Jackpot Income
          </h1>

          <div className="mt-6 lg:mt-10 overflow-x-auto max-h-[400px] overflow-y-auto !pb-[20%]">
            <table className="min-w-full ">
              <thead>
                <tr>
                  <th className="px-6 py-3 border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    S No.
                  </th>
                  <th className="px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {booster_data?.data?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 border border-yellow-500 text-text-color  text-center text-colorspace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 border border-yellow-500 text-text-color  text-center text-colorspace-nowrap">
                      {moment(item?.ledger_created_at)?.format(
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                    </td>
                    <td className="px-6 border border-yellow-500 text-text-color  text-center py-4 text-colorspace-nowrap">
                      {item?.ledger_amount}
                    </td>
                    <td className="px-6  border border-yellow-500 text-text-color  text-center py-4 text-colorspace-nowrap">
                      {item?.ledger_des}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6">
            <CustomToPagination data={booster_data} page={page} setPage={setPage} />
          </div>
        </div>
      </div>
      <ButtomNavigation/>
    </>
  );
};

export default Jackpot;
