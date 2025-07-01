import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import Navbar from "../dashboard/Navbar";
import Loader from "../Shared/Loader";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint, frontend } from "../utils/APIRoutes";
import CustomToPagination from "../Shared/CustomToPagination";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CopyAll } from "@mui/icons-material";
const MyFSTOrders = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(
    ["my-fst-orders", page],
    () => apiConnectorGet(`${endpoint?.my_fst_orders}`),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const level_data = data?.data?.result || [];

  const handleCopy = (url) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast.error("Failed to copy link.");
        });
    } else {
      // Fallback method for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          toast.success("Link copied to clipboard!");
        } else {
          toast.error("Copy failed. Please try manually.");
        }
      } catch (err) {
        console.error("Fallback copy failed: ", err);
        toast.error("Clipboard not supported in this browser.");
      }

      document.body.removeChild(textArea);
    }
  };
  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading} />
      <div
        className=" text-text-colorp-o  md:p-3 h-screen overflow-y-scroll flex flex-col bg-custom-gradient items-center"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="p-4 lg:w-[70%] w-full mt-20 ">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-gold-color">
            My FST ORDERS{" "}

          </h1>
          <div class="bg-blue-500 p-4 rounded-lg flex items-center justify-between space-x-4">
            <div>
              <p class="font-semibold text-gold-color text-lg">Buy FST: </p>
              <div class="text-sm text-blue-100 underline break-all">
                https://fastro.info//buy-fst-token
              </div>
            </div>
            {localStorage.getItem("uid") && (
              <button
                onClick={() => {
                  handleCopy(
                    frontend +
                      "/buy-fst-token?token=" +
                      localStorage.getItem("uid")
                  );
                  // toast.success("Copy to clipboard", { id: 1 });
                }}
                class="bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                <CopyAll className="text-gold-color" />
              </button>
            )}
          </div>
          <div className="mt-6 lg:mt-10 overflow-x-auto max-h-[400px] overflow-y-auto !pb-[20%]">
            <table className="min-w-full ">
              <thead>
                <tr>
                  <th className="px-2 md:px-6 py-3 border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    S No.
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Trans Id
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Buyer Id
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Req Amnt
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Charges
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Net Amnt
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Req From
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Req To
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {level_data?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 md:px-6 py-4 border border-yellow-500 text-white text-center whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-2 md:px-6 py-4 border border-yellow-500 text-white text-center whitespace-nowrap">
                      {item?.fs_bs_transaction_id}
                    </td>
                    <td className="px-2 md:px-6 py-4 border border-yellow-500 text-white text-center whitespace-nowrap">
                      {item?.buyer_c_id}
                    </td>
                    <td className="px-2 md:px-6 py-4 border border-yellow-500 text-white text-center whitespace-nowrap">
                      {Number(item?.fs_bs_buyer_req_amnt)?.toFixed(2)}
                    </td>
                    <td className="px-2 md:px-6 py-4 border border-yellow-500 text-white text-center whitespace-nowrap">
                      {Number(item?.fs_bs_admin_charges)?.toFixed(2)}
                    </td>
                    <td className="px-2 md:px-6 py-4 border border-yellow-500 text-white text-center whitespace-nowrap">
                      {Number(item?.fs_bs_net_amount)?.toFixed(2)}
                    </td>
                    <td className="px-2 md:px-6 py-4 border border-yellow-500 text-gold-color  text-center whitespace-nowrap">
                      {moment(item?.fs_bs_order_date)?.format(
                        "DD-MM-YYYY HH:mm:ss"
                      )}
                    </td>
                    <td className="px-2 md:px-6 border border-yellow-500 text-green-500 text-center py-4 whitespace-nowrap">
                      {item?.fs_bs_buyera_wallet}
                    </td>
                    <td className="px-2 md:px-6 border border-yellow-500 text-green-500 text-center py-4 whitespace-nowrap">
                      {item?.fs_bs_buy_req_to}
                    </td>
                    <td
                      className={`px-2 md:px-6 border text-center py-4 whitespace-nowrap
                        ${
                          item?.fs_bs_seller_status === "Pending"
                            ? "text-yellow-500 border-yellow-500"
                            : item?.fs_bs_seller_status === "Success"
                            ? "text-green-500 border-green-500"
                            : "text-red-500 border-red-500"
                        }`}
                    >
                      {item?.fs_bs_seller_status}
                    </td>
                    <td className="px-2 md:px-6 border border-yellow-500 text-green-500 text-center py-4 whitespace-nowrap">
                      {item?.fs_bs_seller_status === "Pending" ? (
                        <>
                          <IconButton className="!text-green-500">
                            <CheckCircleIcon />
                          </IconButton>
                          <IconButton className="!text-rose-500">
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton className="!text-blue-900">
                          <LockIcon />
                        </IconButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6">
            <CustomToPagination
              data={level_data}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
};

export default MyFSTOrders;
