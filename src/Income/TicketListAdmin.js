import { Switch } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { API_URLS } from "../Adminpages/config/APIUrls";
import axiosInstance from "../Adminpages/config/axios";

import { FilterAlt } from "@mui/icons-material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Button, TextField } from "@mui/material";
import { apiConnectorPost } from "../utils/APIConnector";
import { domain } from "../utils/APIRoutes";
import CustomTable from "../Adminpages/Shared/CustomTable";
import CustomToPagination from "../Shared/CustomToPagination";

const TicketListAdmin = () => {
  const client = useQueryClient();
  const [loding, setloding] = useState(false);
  const [page, setPage] = useState(1);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [search, setSearch] = useState("");
  const { data: apiData, isLoading } = useQuery(
    ["jackpot_ticket_admin", page, from_date, to_date, search], // 🧠 dynamic key
    () =>
      apiConnectorPost(domain + API_URLS.jackpot_ticket_list_admin, {
        page,
        from_date,
        to_date,
        search,
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

  const tablehead = [
    <span>S.No.</span>,
    <span>User Id</span>,
    <span>Ticket Id</span>,
    <span>Name</span>,
    <span>Mobile</span>,
    <span>Email</span>,
    <span>Result</span>,
    <span>Status</span>,
    <span>Date(Result)</span>,
    <span>Date(Buy)</span>,
    <span>Action</span>,
  ];

  const tablerow = ticketList?.data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.lgn_cust_id}</span>,
      <span>{i?.jack_ticket_id}</span>,
      <span>{i?.lgn_real_name}</span>,
      <span>{i?.lgn_real_mob}</span>,
      <span>{i?.lgn_real_email}</span>,
      <span className=" text-gold-color">
        {`${i?.jack_release_no1 === -1 ? "-" : i.jack_release_no1}${
          i?.jack_release_no2 === -1 ? "-" : i.jack_release_no2
        }${i?.jack_release_no3 === -1 ? "-" : i.jack_release_no3}${
          i?.jack_release_no4 === -1 ? "-" : i.jack_release_no4
        }`}
      </span>,
      <span
        className={` font-bold ${
          i?.jack_win_loss === "Win" ? "text-green-500" : "text-gold-color"
        }`}
      >
        {i?.jack_result_decl_date ? i?.jack_win_loss : "--"}
      </span>,
      <span className=" text-green-500">
        {i?.jack_result_decl_date
          ? moment(i?.jack_result_decl_date).format("DD-MM-YYYY HH:mm:ss")
          : "--"}
      </span>,
      <span className=" text-black">
        {moment(i?.jack_created_at).format("DD-MM-YYYY")}
      </span>,
      <span>
        <Switch
          checked={i?.jack_is_pre_winn === "Active" ? true : false}
          className=" text-black"
          onChange={() => UpdateCoupon(i?.jack_id)}
        />
      </span>,
    ];
  });

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row flex-wrap gap-4 md:gap-5 items-start md:items-end">
        {/* From Date */}
        <div className="flex flex-col w-full md:w-48">
          <span className="text-sm font-semibold mb-1">From:</span>
          <TextField
            type="date"
            size="small"
            value={from_date}
            onChange={(e) => setFrom_date(e.target.value)}
            fullWidth
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col w-full md:w-48">
          <span className="text-sm font-semibold mb-1">To:</span>
          <TextField
            type="date"
            size="small"
            value={to_date}
            onChange={(e) => setTo_date(e.target.value)}
            fullWidth
          />
        </div>

        {/* Search Field */}
        <div className="flex flex-col w-full md:w-64">
          <span className="text-sm font-semibold mb-1">User ID:</span>
          <TextField
            type="search"
            placeholder="Search by user ID"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            onClick={() => {
              setPage(1);
              client.invalidateQueries(["jackpot_ticket_admin"]); // 🔁 Refetch with new filters
            }}
            variant="contained"
            startIcon={<FilterAlt />}
            color="primary"
            className="w-full md:w-auto"
          >
            Filter
          </Button>

          <Button
            onClick={() => {
              setSearch("");
              setTo_date("");
              setFrom_date("");
              setPage(1);
              // LevelBonusFn(); // Uncomment if needed
            }}
            variant="outlined"
            startIcon={<FilterAltOffIcon />}
            color="secondary"
            className="w-full md:w-auto"
          >
            Remove
          </Button>
        </div>
      </div>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
      />

      <CustomToPagination setPage={setPage} page={page} data={ticketList} />
    </div>
  );
};

export default TicketListAdmin;
