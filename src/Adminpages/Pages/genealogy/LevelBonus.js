import { FilterAlt } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import CustomToPagination from "../../../Shared/CustomToPagination";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";

const LevelBonus = () => {
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const LevelBonusFn = async (page) => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.level_bonus_data, {
        income_type: "LEVEL",
        created_at: from_date,
        updated_at: to_date,
        page: page,
        count: 10,
      });
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
    LevelBonusFn(page);
  }, [page]);

  const tablehead = [
    <span>S.No.</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Mobile</span>,
    <span>Type</span>,
    <span>Amount</span>,
    <span>Date/Time</span>,
    <span>Description</span>,
  ];

  const tablerow = data?.data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.lgn_cust_id}</span>,
      <span>{i?.jnr_name}</span>,
      <span>{i?.lgn_mobile}</span>,
      <span>{i?.ledger_income_type}</span>,
      <span>{i?.ledger_amount}</span>,
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
          onClick={() => LevelBonusFn()}
          variant="contained"
          startIcon={<FilterAlt />}
        >
          Filter
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

export default LevelBonus;
