import { Edit, FilterAlt } from "@mui/icons-material";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Button, Dialog, IconButton, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomToPagination from "../../../Shared/CustomToPagination";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";
const UserDetail = () => {
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [descriptin, setDescriptin] = useState("");

  const UserBonusFn = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.user_data, {
        created_at: from_date,
        updated_at: to_date,
        page: page,
        count: 10,
        search: search,
      });
      setData(res?.data?.data || []);
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    UserBonusFn();
  }, [page]);

  async function stopIncome(id, type) {
    try {
      const response = await axiosInstance.post(API_URLS?.stop_user_income, {
        lgn_cust_id: id,
        type: type,
      });
      UserBonusFn();
      toast(response?.data?.message);
    } catch (e) {
      return toast("Something went wrong");
    }
  }
  async function handleSubmit() {
    console.log(openPopup);
    try {
      const response = await axiosInstance.post(
        API_URLS?.amount_deducted_by_admin,
        {
          amount: amount || 0,
          lgn_cust_id: openPopup,
          descriptin: descriptin || "",
        }
      );
      if (response?.data?.success) {
        UserBonusFn();
        setOpenPopup(false);
      }
      toast(response?.data?.message);
    } catch (e) {
      console.log(e);
      return toast("Something went wrong");
    }
  }
  const tablehead = [
    <span>S.No.</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Mobile</span>,
    <span>Email</span>,
    <span>Topup Amnt</span>,
    <span>Lapps Amnt</span>,
    <span>Net Amnt</span>,
    <span>Total Income</span>,
    <span>Curr Wallet</span>,
    <span>Date/Time</span>,
    <span>Income | Profile | DW</span>,
  ];

  const tablerow = data?.data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.lgn_cust_id}</span>,
      <span>{i?.lgn_real_name || i?.jnr_name || "--"}</span>,
      <span>{i?.lgn_real_mob || "--"}</span>,
      <span>{i?.lgn_real_email || "--"}</span>,
      <span>{i?.jnr_topup_wallet || "--"}</span>,
      <span>{i?.jnr_collapse_pkg || "--"}</span>,
      <span>
        {Number(
          Number(i?.jnr_topup_wallet || 0) - Number(i?.jnr_collapse_pkg || 0)
        )?.toFixed(2) || "--"}
      </span>,
      <span>{i?.jnr_total_income || "--"}</span>,
      <span>{i?.jnr_curr_wallet || "--"}</span>,

      <span>{moment(i?.jnr_created_at).format("DD-MM-YYYY HH:mm:ss")}</span>,
      <span>
        <IconButton onClick={() => stopIncome(i?.lgn_cust_id, "income")}>
          <DoNotDisturbAltIcon
            className={`${
              i?.jnr_is_active_for_income === "Active"
                ? "!text-green-500"
                : "!text-rose-500"
            }`}
          />
        </IconButton>
        <IconButton onClick={() => stopIncome(i?.lgn_cust_id, "profile")}>
          <DoNotDisturbAltIcon
            className={`${
              i?.lgn_update_prof === "Active"
                ? "!text-green-500"
                : "!text-rose-500"
            }`}
          />
        </IconButton>
        <IconButton
          disabled={Number(i?.jnr_curr_wallet) <= 0}
          onClick={() => setOpenPopup(i?.lgn_cust_id)}
        >
          <Edit
            disabled={Number(i?.jnr_curr_wallet) <= 0}
            className={`!text-gray-700`}
          />
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
            UserBonusFn();
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
            UserBonusFn();
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
        isPagination={false}
      />
      <div className="flex justify-center mt-6">
        {/* <CustomPagination data={data} setPage={setPage} /> */}
        <CustomToPagination setPage={setPage} page={page} data={data} />
      </div>
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <div className="bg-white rounded-3xl shadow-2xl lg:p-6 p-1 w-full lg:!max-w-4xl mx-auto mt-10">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Deduct Wallet
          </h2>

          <div className="flex flex-wrap gap-6 px-12">
            <div className="w-full ">
              <label className="block text-gray-700 font-medium mb-1">
                Amount
              </label>
              <TextField
                type="number"
                fullWidth
                placeholder="Enter amount"
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </div>

            <div className="w-full ">
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <TextField
                type="text"
                multiline
                rows={5}
                fullWidth
                placeholder="Enter description"
                variant="outlined"
                value={descriptin}
                onChange={(e) => setDescriptin(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={() => setOpenPopup(false)}
              className="px-4 py-2 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!amount}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserDetail;
