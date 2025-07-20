import { FilterAlt } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import CustomToPagination from "../../../Shared/CustomToPagination";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

const BoosterBonus = () => {
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const LevelBonusFn = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.level_bonus_data, {
        income_type: "REWARD",
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
    LevelBonusFn();
  }, [page]);

  const tablehead = [
    <span>S.No.</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Mobile</span>,
    <span>Email</span>,
    <span>Topup Amnt</span>,
    <span>Lapps Amnt</span>,
    <span>Net Amnt</span>,
    <span>Curr Wallet</span>,
    <span>Cr. Amount</span>,
    <span>Date/Time</span>,
    <span>Description</span>,
  ];

  const tablerow = data?.data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.lgn_cust_id}</span>,
      <span>{i?.lgn_real_name}</span>,
      <span>{i?.lgn_real_mob}</span>,
      <span>{i?.lgn_real_email}</span>,
      <span>{i?.jnr_topup_wallet}</span>,
      <span>{i?.jnr_collapse_pkg}</span>,
      <span>
        {Number(
          Number(i?.jnr_topup_wallet || 0) - Number(i?.jnr_collapse_pkg || 0)
        )?.toFixed(2) || "--"}
      </span>,
      <span>{i?.jnr_curr_wallet}</span>,
      <span>{Number(i?.ledger_amount)?.toFixed(2)}</span>,
      <span>{moment(i?.ledger_created_at).format("DD-MM-YYYY HH:mm:ss")}</span>,
      <span>{i?.ledger_des}</span>,
    ];
  });

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:flex-wrap gap-4 md:items-end">
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

        {/* Search by User ID */}
        <div className="w-full md:w-64">
          <TextField
            type="search"
            size="small"
            placeholder="Search by User ID"
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
              LevelBonusFn();
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
              LevelBonusFn();
            }}
            variant="outlined"
            color="secondary"
            startIcon={<FilterAltOffIcon />}
            className="w-full md:w-auto"
          >
            Remove Filter
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

export default BoosterBonus;
