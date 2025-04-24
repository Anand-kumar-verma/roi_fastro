import moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Navbar from "../dashboard/Navbar";
import CustomPagination from "../Shared/CustomPagination";
import Loader from "../Shared/Loader";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";

const BoosterIncome = () => {
  const [page, setPage] = useState(1);
  const [remainingDate, setRemainingDate] = useState("");

  const { isLoading, data } = useQuery(
    ["booster_income_api", page],
    () =>
      apiConnectorGet(
        `${endpoint?.roi_income_api}?income_type=Rocket&page=${page}`
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
  const { isLoading: proLoding, data: profile_data } = useQuery(
    ["profile_api"],
    () => apiConnectorGet(endpoint?.profile_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const profile = profile_data?.data?.result?.[0] || [];

  // console.log(profile);
  function printReverseTime(startDate) {
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30);

    let interval = setInterval(() => {
      let diff = Math.floor((endDate - new Date()) / 1000); // Difference in seconds

      if (diff <= 0) {
        clearInterval(interval);
        console.log("Time is up!");
        return;
      }

      let days = Math.floor(diff / (24 * 3600));
      let hours = Math.floor((diff % (24 * 3600)) / 3600);
      let minutes = Math.floor((diff % 3600) / 60);
      let seconds = diff % 60;

      let remainingTime = `Remaining Time: ${days}d ${hours}h ${minutes}m ${seconds}s`;
      setRemainingDate(remainingTime);
    }, 1000);
  }

  // Example usage
  // printReverseTime(new Date("2025-03-27T00:00:00"));

  useEffect(() => {
    profile?.topup_date && printReverseTime(profile?.topup_date);
  }, [profile]);
  // Example usage
  // printReverseTime(new Date("2025-03-27T00:00:00"));

  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading} />
      <div
        className=" text-white bg-[#111022] p-3 min-h-screen flex flex-col  items-center"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="p-4 lg:w-[70%] w-full mt-20 ">
          <div>
            <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-white">
              Rocket Income
            </h1>
            <h2 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-white">
              {remainingDate}
            </h2>
          </div>

          <div className="mt-6 lg:mt-10 overflow-x-auto">
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
                    <td className="px-6 py-4 border border-yellow-500 text-white bg-black text-center whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 border border-yellow-500 text-white bg-black text-center whitespace-nowrap">
                      {moment(item?.ledger_created_at)?.format(
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                    </td>
                    <td className="px-6 border border-yellow-500 text-white bg-black text-center py-4 whitespace-nowrap">
                      {item?.ledger_amount}
                    </td>
                    <td className="px-6  border border-yellow-500 text-white bg-black text-center py-4 whitespace-nowrap">
                      {item?.ledger_des}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6">
            <CustomPagination data={booster_data} setPage={setPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BoosterIncome;
