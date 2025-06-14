import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Button,
  Dialog,
  IconButton,
  TablePagination,
  TextField,
} from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { Edit } from "@mui/icons-material";
import toast from "react-hot-toast";
import CustomToPagination from "../../../Shared/CustomToPagination";

const P2pHistory = () => {
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState();
  const [to_date, setTo_date] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [reply, setReply] = useState("");
  const P2pHistoryFunction = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.support_ticket_list, {
        created_at: from_date,
        updated_at: to_date,
        search: search,
        page: page,
        type: 1, // 1 for pending, 2 for success
      });
      // console.log(res?.data)
      setData(res?.data?.data || []);
      if (res) {
        setTo_date("");
        setFrom_date("");
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };
  useEffect(() => {
    P2pHistoryFunction();
  }, [page, search]);

  async function ticketReply() {
    setloding(true);
    try {
      const result = await axiosInstance.post(API_URLS?.support_ticket_reply, {
        t_id: openDialog,
        reply: reply,
      });
      if (result?.data?.success) {
        setOpenDialog(false);
        P2pHistoryFunction();
      }
    } catch (e) {
      toast("Something went wrong!");
    }
    setloding(false);
  }
  const tablehead = [
    <span>S.No.</span>,
    <span>User ID</span>,
    <span>Ticket ID</span>,
    <span>Name</span>,
    <span>Email</span>,
    <span>mobile</span>,
    <span>Issue</span>,
    <span>Title</span>,
    <span>Description</span>,
    <span>Date</span>,
    <span>Reply</span>,
  ];

  const tablerow = data?.data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.lgn_cust_id}</span>,
      <span>{i?.tkt_uni_id}</span>,
      <span>{i?.lgn_real_name}</span>,
      <span>{i?.lgn_real_email}</span>,
      <span>{i?.lgn_real_mob}</span>,
      <span>{i?.tkt_type}</span>,
      <span>{i?.tkt_title}</span>,
      <span>{i?.tkt_description}</span>,
      <span>{moment(i?.tkt_created_at).format("DD-MM-YYYY HH:mm:ss")}</span>,
      <span>
        <IconButton onClick={() => setOpenDialog(i.tkt_id)}>
          <Edit />
        </IconButton>
      </span>,
    ];
  });

  return (
    <div>
      <div className="flex px-2 !justify-start py-2 gap-2 !place-items-center">
        <span className="font-bold">From:</span>
        <TextField
          type="date"
          value={from_date}
          onChange={(e) => setFrom_date(e.target.value)}
        />
        <span className="font-bold">To:</span>
        <TextField
          type="date"
          value={to_date}
          onChange={(e) => setTo_date(e.target.value)}
        />
        <TextField
          type="search"
          placeholder="Search by user id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() => P2pHistoryFunction()}
          variant="contained"
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
      </div>
      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
      />
      <div className="flex justify-center mt-6">
        <CustomToPagination setPage={setPage} page={page} data={data} />
      </div>
      <Dialog open={openDialog}>
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:w-1/2 w-full mx-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Enter Your Reply
          </h2>

          <textarea
            className="w-full h-32 p-3 border-2 border-gold-color rounded-md focus:outline-none focus:ring-2 focus:ring-gold-color resize-none"
            placeholder="Type your reply here..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            minLength={20}
          />

          <div className="flex justify-end mt-4 gap-3">
            <button
              onClick={() => setOpenDialog(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={ticketReply}
              className="px-4 py-2 bg-gold-color text-white rounded-md hover:bg-yellow-600"
            >
              Submit
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default P2pHistory;
