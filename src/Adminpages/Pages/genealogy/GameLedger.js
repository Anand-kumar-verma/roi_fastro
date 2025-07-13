import { FilterAlt } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import CustomToPagination from "../../../Shared/CustomToPagination";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { endpoint } from "../../../utils/APIRoutes";

const GameLedgerAdmin = () => {
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const GameLedgerFn = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.post(endpoint?.game_ledger, {
        income_type: "Wingo",
        created_at: from_date,
        updated_at: to_date,
        page: page,
        count: 25,
        search: search,
      });
      setData(res?.data?.data || []);
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    GameLedgerFn();
  }, [page]);

  console.log(data);

  const tablehead = [
    <span>S.No.</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Mobile</span>,
    <span>Email</span>,
    <span>Game Type</span>,
    <span>Betting Amnt</span>,
    <span>Open Bal</span>,
    <span>Close Bal</span>,
    <span>Bal Type</span>,
    <span>Date/Time</span>,
  ];

  const tablerow = data?.data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.lgn_cust_id}</span>,
      <span>{i?.lgn_real_name}</span>,
      <span>{i?.lgn_real_mob}</span>,
      <span>{i?.lgn_real_email}</span>,
      <span>{i?.gt_game_type}</span>,
      <span>{i?.gt_trad_amnt}</span>,
      <span>{i?.gt_open_balance}</span>,
      <span>{i?.gt_close_balance}</span>,
      <span>{i?.gt_balance_type}</span>,
      <span>
        {moment(i?.gt_created_at)
          .format("DD-MM-YYYY HH:mm:ss")}
      </span>,
    ];
  });

  return (
    <div>
      <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end">
        {/* From Date */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
          <span className="font-semibold text-sm">From:</span>
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
          <span className="font-semibold text-sm">To:</span>
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
              GameLedgerFn();
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
              GameLedgerFn();
            }}
            variant="outlined"
            color="secondary"
            startIcon={<FilterAltOffIcon />}
            className="w-full md:w-auto"
          >
            Clear
          </Button>
        </div>
      </div>

      <CustomTable
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
      />

      <CustomToPagination setPage={setPage} page={page} data={data} />
    </div>
  );
};

export default GameLedgerAdmin;
