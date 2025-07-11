import moment from "moment/moment";
import { useState } from "react";
import { useQuery } from "react-query";
import Navbar from "../../dashboard/Navbar";
import ButtomNavigation from "../../Layout/ButtomNaviagatoin";
import CustomToPagination from "../../Shared/CustomToPagination";
import Loader from "../../Shared/Loader";
import { apiConnectorGet } from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import { useLocation } from "react-router-dom";

function WithdrawalHistory() {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const { isLoading, data: withdrawal } = useQuery(
    ["withdraw_api", page],
    () => apiConnectorGet(`${endpoint?.withdrawal_history_api}?page=${page}`),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const withdraw_data = withdrawal?.data?.result || [];
  const wallet_type =
    location?.state?.type === "wingo" ? "Wingo Wallet" : "Working Wallet";
  return (
    <>
      <Navbar />
      <div
        className="p-0 md:p-4 text-text-color flex h-screen overflow-y-scroll flex-col bg-custom-gradient items-center"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <Loader isLoading={isLoading} />
        <div className="p-4 lg:w-[70%] w-full  mt-20">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-gold-color">
            Withdrawal History
          </h1>

          <div className="mt-6 lg:mt-10 overflow-x-auto">
            <table className="min-w-full ">
              <thead>
                <tr>
                  <th className="px-2 md:px-6 py-3 border border-yellow-500  text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    S No.
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Amount($)
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Wallet Type
                  </th>
                  <th className="px-2 md:px-6 py-3   border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {withdraw_data
                  .filter((i) => i?.wdrl_wallet_type === wallet_type)
                  ?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-2 md:px-6 py-4  b border border-yellow-500 text-text-color text-center text-colorspace-nowrap">
                        {index + 1 || "No Data"}
                      </td>
                      <td className="px-2 md:px-6 py-4  border border-yellow-500 text-gold-color  text-center text-colorspace-nowrap">
                        {moment(item?.wdrl_created_at)?.format("DD-MM-YYYY") ||
                          "No Data"}
                      </td>
                      <td className="px-2 md:px-6 text-center py-4   border border-yellow-500 text-gold-color text-colorspace-nowrap">
                        {Number(item?.wdrl_amont)?.toFixed(2) || "0"}
                      </td>
                      <td className="px-2 md:px-6 text-center py-4   border border-yellow-500 text-gold-color text-colorspace-nowrap">
                        {item?.wdrl_wallet_type}
                      </td>
                      <td
                        className={`px-2 md:px-6  text-center py-4   border border-yellow-500 text-white text-colorspace-nowrap ${
                          item?.wdrl_status === "Success"
                            ? "!text-green-500"
                            : "!text-rose-500"
                        }`}
                      >
                        {item?.wdrl_status || "No Data"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6">
            <CustomToPagination
              data={withdraw_data}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}
export default WithdrawalHistory;
