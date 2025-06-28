import { FilterAlt } from "@mui/icons-material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Button, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import CustomToPagination from "../../../Shared/CustomToPagination";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";

const ROIBonus = () => {
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
        income_type: "ROI",
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
    <span>Roi</span>,
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
            LevelBonusFn();
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
            LevelBonusFn();
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

      <CustomToPagination setPage={setPage} page={page} data={data} />
    </div>
  );
};

export default ROIBonus;
