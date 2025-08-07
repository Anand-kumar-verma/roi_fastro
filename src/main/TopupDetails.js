import { Cancel, Lock } from "@mui/icons-material";
import { Dialog, DialogTitle } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaAmazonPay } from "react-icons/fa";
import { useQuery } from "react-query";
import Navbar from "../dashboard/Navbar";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import Loader from "../Shared/Loader";
import { apiConnectorGet, apiConnectorPost } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import { enCryptData } from "../utils/Secret";

function InitiateTrans() {
  const [open, setOpen] = useState(false);
  const [loding, setLoding] = useState(false);
  const { isLoading, data: topup_data } = useQuery(
    ["topup_api_all_details"],
    () => apiConnectorGet(endpoint?.get_transacton_details),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const data = topup_data?.data?.result || [];
  async function handlePayinReq(transId) {
    setLoding(true);
    try {
      const result = await apiConnectorPost(endpoint?.auto_withdrawal_req_gtw, {
        payload: enCryptData({ transactoinId: transId }),
      });
      if (result?.data?.data) {
        setOpen(result?.data?.data);
      }
      toast("Data Fetched!");
    } catch (e) {
      toast("Something went wrong!");
    }
    setLoding(false);
  }
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds

  useEffect(() => {
    let timer;

    if (open) {
      // Reset timer on open
      setTimeLeft(300);

      // Start countdown
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setOpen(false); // Auto-close modal
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup on close
  }, [open]);

  // Format MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading || loding} />
      <div
        className="p-0 md:p-4 flex h-screen overflow-y-scroll flex-col items-center bg-custom-gradient"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="p-4 lg:w-[70%] w-full mt-20 !mb-20">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-gold-color">
            Inititate Transaction
          </h1>

          <div className="mt-6 lg:mt-10 overflow-x-auto">
            <table className="min-w-full ">
              <thead>
                <tr>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    No.
                  </th>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Type
                  </th>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    FST Date
                  </th>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    FST Status
                  </th>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    USD Status
                  </th>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    USD Date
                  </th>
                  <th className="md:px-6 px-2 py-3  border border-yellow-500 text-center text-xs  text-yellow-700 font-semibold uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td className="md:px-6 px-2 py-4  border border-yellow-500 text-text-color text-center text-colorrspace-nowrap">
                      {index + 1}
                    </td>
                    <td className="md:px-6 px-2 py-4  border border-yellow-500 text-text-color text-center text-colorrspace-nowrap">
                      {item?.tr_deposit_type === "Mlm"
                        ? "PKG"
                        : item?.tr_deposit_type === "Wingo"
                        ? "Game"
                        : item?.tr_deposit_type}
                    </td>
                    <td className="md:px-6 px-2 text-nowrap py-4 border border-yellow-500 text-gold-color  text-center text-colorrspace-nowrap">
                      {moment?.utc(item?.["tr_date"])?.format("DD-MM-YYYY")}
                    </td>
                    <td className="md:px-6 px-2  text-center border border-yellow-500 py-4 text-colorrspace-nowrap text-green-500">
                      {item?.tr_status}
                    </td>
                    <td className="md:px-6 px-2 text-center border border-yellow-500 text-green-500 py-4 text-colorrspace-nowrap">
                      {Number(item?.["tr_amount"]).toFixed(2)}
                    </td>
                    <td className="md:px-6 px-2  text-center border border-yellow-500 py-4 text-colorrspace-nowrap text-green-500">
                      {item?.tr_usd_status}
                    </td>
                    <td className="md:px-6 px-2  text-center border border-yellow-500 py-4 text-colorrspace-nowrap text-green-500">
                      {item?.tr_usd_succ_date
                        ? moment?.utc(item?.["tr_date"])?.format("DD-MM-YYYY")
                        : " --"}
                    </td>
                    <td className="border border-yellow-500 py-4 px-2 text-center text-green-500">
                      <div className="flex justify-center items-center gap-2">
                        {item?.tr_usd_succ_date ? (
                          <Lock className="text-yellow-600" />
                        ) : item?.tr_status === "Success" ? (
                          <FaAmazonPay
                            className="text-white bg-green-500 p-1 rounded-full cursor-pointer hover:bg-green-600 transition duration-200"
                            size={24}
                            onClick={() =>
                              handlePayinReq(item?.tr_transaction_id)
                            }
                          />
                        ) : (
                          <Cancel className="text-red-500" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Dialog open={open}>
        <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-sm mx-auto">
          {/* Close Icon */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            <Cancel />
          </button>

          {/* Title */}
          <DialogTitle className="text-center text-xl font-semibold mb-4 text-gray-800">
            Payment Request
          </DialogTitle>

          {/* Amount */}
          <div className="text-center text-lg text-blue-700 font-medium mb-2">
            Payable Amount:{" "}
            <span className="font-bold">{Number(open?.amount) + 0.5} USD</span>
          </div>

          {/* Countdown Timer */}
          <div className="text-center text-sm text-red-500 mb-4 font-semibold">
            Please do not use QR after :<br />
            Time Remaining: {formatTime(timeLeft)}
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-4">
            <img
              src={open?.qr_url}
              alt="QR Code"
              className="w-48 h-48 rounded-lg border shadow"
            />
          </div>

          {/* Address */}
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              Address:
              <span className="block font-mono break-words mt-1 !text-xs">
                {open?.address}
              </span>
            </p>

            {/* Copy to clipboard */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(open?.address);
                toast("Copied!");
              }}
              className="mt-1 text-xs text-blue-500 hover:underline"
            >
              Copy Address
            </button>
          </div>
        </div>
      </Dialog>

      <ButtomNavigation />
    </>
  );
}

export default InitiateTrans;
