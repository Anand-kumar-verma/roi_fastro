import moment from "moment";
import { useQuery } from "react-query";
import Navbar from "../dashboard/Navbar";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import Loader from "../Shared/Loader";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

function Burning() {
  const location = useLocation();
  const { isLoading, data: burning_data } = useQuery(
    ["burning_api"],
    () => apiConnectorGet(endpoint?.get_burning_count + ``),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  let data = burning_data?.data?.result || [];
  data = data?.filter((i) => i?.br_status === location.state.fst_tupe) || [];
  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading} />
      <div className="p-0 md:p-4 flex h-screen overflow-y-scroll flex-col items-center bg-custom-gradient">
        <div className="p-4 lg:w-[70%] w-full mt-20">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-gold-color">
            {location.state.fst_tupe === "Burning" ? "Burning Events":"Pending Slot FST"}
          </h1>

          <div className="mt-6 lg:mt-10 overflow-x-auto mb-20">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-2 md:px-6 py-3 border border-yellow-500 text-center text-xs text-yellow-700 font-semibold uppercase">
                    Slot
                  </th>
                  <th className="px-2 md:px-6 py-3 border border-yellow-500 text-center text-xs text-yellow-700 font-semibold uppercase">
                    Date
                  </th>
                  <th className="px-2 md:px-6 py-3 border border-yellow-500 text-center text-xs text-yellow-700 font-semibold uppercase">
                    FST Qty
                  </th>
                  <th className="px-2 md:px-6 py-3 border border-yellow-500 text-center text-xs text-yellow-700 font-semibold uppercase">
                    Transaction Hash
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr key={item.br_id}>
                    <td className="px-2 md:px-6 py-4 border border-yellow-500 text-center text-blue-600">
                      {item.br_slot_count}
                    </td>
                    <td className="px-2 md:px-6 py-4 border border-yellow-500 text-center text-white">
                      {moment(item.br_date).format("DD-MM-YYYY")}
                    </td>
                    <td className="px-2 md:px-6 py-4 border border-yellow-500 text-center text-green-600">
                      {Number(item.br_count_value).toFixed(0, 2)}
                    </td>
                    <td className="px-2 md:px-6 py-4 border border-yellow-500 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={`https://bscscan.com/tx/${item.br_tr_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold-color underline hover:text-blue-800"
                        >
                          {item.br_tr_hash}
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.br_tr_hash);
                            toast.success("Copied successfully!");
                          }}
                          title="Copy to clipboard"
                          className="text-gray-500 hover:text-gray-700"
                        >
                          📋
                        </button>
                      </div>
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

export default Burning;
