import { Switch } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { API_URLS } from "../Adminpages/config/APIUrls";
import axiosInstance from "../Adminpages/config/axios";
import Navbar from "../dashboard/Navbar";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import CustomToPagination from "../Shared/CustomToPagination";
import Loader from "../Shared/Loader";
import { apiConnectorPost } from "../utils/APIConnector";
import { domain } from "../utils/APIRoutes";

const TicketListAdmin = () => {
  const client = useQueryClient();
  const [loding, setloding] = useState(false);
  const [page, setPage] = useState(1);
  const { data: apiData, isLoading } = useQuery(
    ["jackpot_ticket_admin", page],
    () =>
      apiConnectorPost(domain + API_URLS.jackpot_ticket_list_admin, {
        page: page,
      }),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const ticketList = apiData?.data?.result || [];
  const UpdateCoupon = async (id) => {
    setloding(true);
    try {
      const res = await axiosInstance.get(API_URLS?.jackpot_ticket_set_result, {
        params: { ticket_id: id },
      });
      if (res?.data?.success) {
        client.refetchQueries(["jackpot_ticket_admin", page]);
      }

      toast(res?.data?.message, { id: 1 });
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };
  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading || loding} />
      <div
        className=" text-text-color p-3 h-screen overflow-y-scroll flex flex-col bg-custom-gradient items-center "
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="p-4 lg:w-[70%] w-full mt-20 ">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-gold-color">
            Ticket List
          </h1>
          <div className="mt-6 lg:mt-10 overflow-x-auto max-h-[400px] overflow-y-auto !pb-[20%]">
            <table className="min-w-full text-xs rounded overflow-hidden border border-yellow-500">
              <table className="min-w-full text-xs rounded overflow-hidden border border-yellow-500">
                <thead>
                  <tr>
                    {[
                      "S No.",
                      "Ticket Id",
                      "Name",
                      "Email",
                      "Phone",
                      "User ID",
                      "Result",
                      "Status",
                      "Date(Result)",
                      "Date(Buy)",
                      "Action",
                    ].map((title, i) => (
                      <th
                        key={i}
                        className="px-4 py-2 border border-yellow-500 text-center font-semibold uppercase tracking-wide text-yellow-700"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketList?.data?.map((item, index) => (
                    <tr key={index} className="hover:bg-yellow-50 transition">
                      <td className="px-4 py-2 border border-yellow-500 text-center text-text-color">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border border-yellow-500 text-center text-gold-color">
                        {item?.jack_ticket_id}
                      </td>
                      <td className="px-4 py-2 border border-yellow-500 text-center text-gold-color">
                        {item?.lgn_real_name}
                      </td>
                      <td className="px-4 py-2 border border-yellow-500 text-center text-gold-color">
                        {item?.lgn_real_email}
                      </td>
                      <td className="px-4 py-2 border border-yellow-500 text-center text-gold-color">
                        {item?.lgn_real_mob}
                      </td>
                      <td className="px-4 py-2 border border-yellow-500 text-center text-gold-color">
                        {item?.lgn_cust_id}
                      </td>
                      <td className="px-4 py-2 border border-yellow-500 text-center text-gold-color">
                        {`${
                          item?.jack_release_no1 === -1
                            ? "-"
                            : item.jack_release_no1
                        }${
                          item?.jack_release_no2 === -1
                            ? "-"
                            : item.jack_release_no2
                        }${
                          item?.jack_release_no3 === -1
                            ? "-"
                            : item.jack_release_no3
                        }${
                          item?.jack_release_no4 === -1
                            ? "-"
                            : item.jack_release_no4
                        }`}
                      </td>
                      <td
                        className={`px-4 py-2 border border-yellow-500 text-center font-bold ${
                          item?.jack_win_loss === "Win"
                            ? "text-green-500"
                            : "text-gold-color"
                        }`}
                      >
                        {item?.jack_result_decl_date
                          ? item?.jack_win_loss
                          : "--"}
                      </td>
                      <td className="px-4 py-2 border border-yellow-500 text-center text-green-500">
                        {item?.jack_result_decl_date
                          ? moment(item?.jack_result_decl_date).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )
                          : "--"}
                      </td>
                      <td className="px-4 py-2 border border-yellow-500 text-center text-white">
                        {moment(item?.jack_created_at).format("DD-MM-YYYY")}
                      </td>
                      <span>
                        <Switch
                          checked={
                            item?.jack_is_pre_winn === "Active" ? true : false
                          }
                          className="px-4 py-2 border border-yellow-500 text-center text-white"
                          onChange={() => UpdateCoupon(item?.jack_id)}
                        />
                      </span>
                    </tr>
                  ))}
                </tbody>
              </table>
            </table>
          </div>
          <div className="flex justify-center mb-6">
            <CustomToPagination
              data={ticketList}
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

export default TicketListAdmin;
