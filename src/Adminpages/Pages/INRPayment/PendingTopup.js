import { Edit, FilterAlt } from "@mui/icons-material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import LockIcon from "@mui/icons-material/Lock";
import { Button, Dialog, IconButton, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomToPagination from "../../../Shared/CustomToPagination";
import { enCryptData } from "../../../utils/Secret";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import { endpoint } from "../../../utils/APIRoutes";
import { apiConnectorPost } from "../../../utils/APIConnector";

const PendingTopup = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [totalamount, setTotalamount] = useState({});
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [loding, setloding] = useState(false);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [amount, setAmount] = useState("");
  const [checkhash, setcheckhash] = useState("");
  const [isName, setisName] = useState([]);

  const INRPayoutFunction = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.inr_Pending_Topup_data, {
        created_at: from_date,
        updated_at: to_date,
        page: page,
        count: 10,
        search: search,
      });
      setData(res?.data?.data?.data || []);
      setTotalamount(res?.data);
      // if (res) {
      //   setSearch("");
      //   setTo_date("");
      //   setFrom_date("");
      // }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    INRPayoutFunction();
  }, [page]);

  async function ifHashAvailable(params) {
    try {
      const res = await apiConnectorPost(endpoint?.get_if_hash_availbale, {
        hash: checkhash,
      });
      setisName(res?.data?.result || []);
    } catch (e) {
      toast("Something went wrong");
    }
  }
  useEffect(() => {
    checkhash && ifHashAvailable();
  }, [checkhash]);

  async function TopUpFn() {
    const pack = [
      { id: 1, amount: 5 },
      { id: 2, amount: 10 },
      { id: 3, amount: 20 },
      { id: 4, amount: 50 },
      { id: 5, amount: 100 },
      { id: 6, amount: 300 },
      { id: 7, amount: 500 },
      { id: 8, amount: 1000 },
      { id: 9, amount: 3000 },
      { id: 10, amount: 5000 },
    ];
    const walletType = data?.find(
      (i) => i?.tr_id === openDialog
    )?.tr_deposit_type;
    const lgn_cust_id = data?.find((i) => i?.tr_id === openDialog)?.lgn_cust_id;
    if (!walletType) return toast("Deposit Type Not Define", { id: 1 });
    const reqbody = {
      t_id: openDialog,
      topup_amnt: Number(amount),
      type: "gateway",
      package_id:
        walletType === "Mlm"
          ? pack?.find((j) => j.amount === Number(amount))?.id || 1
          : 1,
      user_id: lgn_cust_id?.trim(),
      transactionType: walletType?.toLowerCase(),
      checkhash: checkhash || "",
    };
    setloding(true);
    try {
      const res = await apiConnectorPost(endpoint?.topup_api_pending, reqbody);
      toast(res?.data?.message);
      checkhash && ifHashAvailable();
      INRPayoutFunction()
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  }

  const tablehead = [
    <span>S.No</span>,
    <span>Name</span>,
    <span>Email</span>,
    <span>User Id</span>,
    <span>Mobile</span>,
    <span>Deposit Type</span>,
    <span>Address</span>,
    <span>Hash</span>,
    <span>Req Amnt</span>,
    <span>Date/Time</span>,
    <span>Status</span>,
    <span>Action</span>,
  ];
  const tablerow = data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.lgn_real_name}</span>,
      <span>{i?.lgn_real_email}</span>,
      <span>{i?.lgn_cust_id}</span>,
      <span>{i?.lgn_real_mob}</span>,
      <span>{i?.tr_deposit_type}</span>,
      <span>{i?.tr_deposit_from}</span>,
      <span>{i?.tr_trans_hash}</span>,
      <span>{i?.tr_amount}</span>,
      <span className="">
        {moment(i?.tr_date).format("DD-MM-YYYY HH:mm:ss")}
      </span>,
      <span
        className={`${
          i?.tr_status === "Success"
            ? "text-green-500"
            : i?.tr_status === "Failed"
            ? "!text-rose-500"
            : "!text-gray-800"
        }`}
      >
        {i?.tr_status}
      </span>,
      <p>
        {i?.tr_status === "Failed" ? (
          <span className="!flex !justify-center">
            <IconButton
              className="!text-green-500"
              onClick={() => setOpenDialog(i.tr_id)}
            >
              <Edit />
            </IconButton>
            {/* <IconButton
              className="!text-rose-500"
              onClick={() => handleWithdrawalStatus(i?.wdrl_id, 4)} //      // 1: successs, 2 failed, 3 pending, 4 rejecred
            >
              <CancelIcon />
            </IconButton> */}
          </span>
        ) : (
          <IconButton>
            <LockIcon />
          </IconButton>
        )}
      </p>,
    ];
  });

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:flex-wrap gap-4 md:items-end">
        {/* From Date */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
          <span className="text-sm font-semibold">From:</span>
          <TextField
            type="date"
            size="small"
            value={from_date}
            onChange={(e) => setFrom_date(e.target.value)}
            fullWidth
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
          <span className="text-sm font-semibold">To:</span>
          <TextField
            type="date"
            size="small"
            value={to_date}
            onChange={(e) => setTo_date(e.target.value)}
            fullWidth
          />
        </div>

        {/* Search Input */}
        <div className="w-full md:w-64">
          <TextField
            type="search"
            size="small"
            placeholder="Search by user ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            onClick={() => {
              setPage(1);
              INRPayoutFunction();
            }}
            variant="contained"
            color="primary"
            startIcon={<FilterAlt />}
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
              INRPayoutFunction();
            }}
            variant="outlined"
            color="secondary"
            startIcon={<FilterAltOffIcon />}
            className="w-full md:w-auto"
          >
            Remove
          </Button>
        </div>
      </div>

      <CustomTable
        isTotal={false}
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
      />
      <CustomToPagination
        setPage={setPage}
        page={page}
        data={totalamount?.data}
      />
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full mx-auto max-w-3xl">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Enter Your Amount
          </h2>
          <input
            className="w-full min-h-[50px] mb-2 max-h-[50px] p-3 border-2 border-gold-color rounded-md focus:outline-none focus:ring-2 focus:ring-gold-color resize-y"
            placeholder="Enter The Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <textarea
            className="w-full min-h-[120px] max-h-[300px] p-3 border-2 border-gold-color rounded-md focus:outline-none focus:ring-2 focus:ring-gold-color resize-y"
            placeholder="Type your hash here..."
            value={checkhash}
            onChange={(e) => setcheckhash(e.target.value)}
            minLength={20}
          />
          <span className="!text-xs !text-rose-500">
            {isName?.[0]?.lgn_real_name || "Not Found"}{" "}
            {isName?.[0]?.lgn_cust_id}
          </span>
          <div className="flex justify-end mt-4 gap-3 flex-wrap">
            {/* <button
              onClick={() => setOpenDialog(false)}
              className="px-4 py-2 bg-red-200 text-gray-800 rounded-md hover:bg-red-300"
            >
              Search
            </button> */}
            <button
              onClick={() => setOpenDialog(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={TopUpFn}
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

export default PendingTopup;
