import { Edit } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Button, Dialog, IconButton, TextField } from "@mui/material";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomToPagination from "../../../Shared/CustomToPagination";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { FilterAlt } from "@mui/icons-material";

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
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };
  useEffect(() => {
    P2pHistoryFunction();
  }, [page, search]);

  async function ticketReply(t_id) {
    setloding(true);
    try {
      const result = await axiosInstance.post(API_URLS?.support_ticket_reply, {
        t_id: openDialog || t_id,
        reply: reply || "No Reply",
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
        <IconButton
          className=" !text-xs"
          onClick={() => setOpenDialog(i.tkt_id)}
        >
          <Edit />
        </IconButton>
        <IconButton
          className="!text-rose-500 !text-xs"
          onClick={() => ticketReply(i.tkt_id)}
        >
          <CancelIcon />
        </IconButton>
      </span>,
    ];
  });

  return (
    <div>
      <div className="flex px-2 gap-5 !justify-start py-2">
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
          onClick={() => {
            setPage(1); // reset to page 1 on new filter
            P2pHistoryFunction();
          }}
          variant="contained"
          startIcon={<FilterAlt />}
        >
          Filter
        </Button>
        <Button
          onClick={() => {
            setSearch("");
            setTo_date("");
            setFrom_date("");
            setPage(1); // reset to first page
            P2pHistoryFunction();
          }}
          variant="outlined"
          startIcon={<FilterAltOffIcon />}
        >
          Remove Filter
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
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full mx-auto max-w-3xl">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Enter Your Reply
          </h2>

          <textarea
            className="w-full min-h-[120px] max-h-[300px] p-3 border-2 border-gold-color rounded-md focus:outline-none focus:ring-2 focus:ring-gold-color resize-y"
            placeholder="Type your reply here..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            minLength={20}
          />

          <div className="flex justify-end mt-4 gap-3 flex-wrap">
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
