import { FilterAlt } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";
import CustomToPagination from "../../../Shared/CustomToPagination";

const TopUpDetail = () => {
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectBy, setSelectBy] = useState("total");

  const TopUpBonusFn = async (page) => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.topup_data, {
        created_at: from_date,
        updated_at: to_date,
        page: page,
        count: 10,
        type: selectBy,
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
    TopUpBonusFn(page);
  }, [page]);

  const tablehead = [
    <span>S.No.</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Mobile</span>,
    <span>Package ($)</span>,
    <span>Topup By</span>,
    <span>Date/Time</span>,
  ];

  const tablerow = data?.data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.lgn_cust_id}</span>,
      <span>{i?.jnr_name}</span>,
      <span>{i?.lgn_mobile}</span>,
      <span>{i?.ledger_amount}</span>,
      <span>{i?.ledger_topup_by}</span>,
      <span>{moment(i?.ledger_created_at).format("DD-MM-YYYY HH:mm:ss")}</span>,
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
        <FormControl variant="outlined" size="small">
          <InputLabel id="select-by-label">Select by</InputLabel>
          <Select
            labelId="select-by-label"
            value={selectBy}
            onChange={(e) => setSelectBy(e.target.value)}
            label="Select by"
            style={{ minWidth: 120 }}
          >
            <MenuItem value="total">Total</MenuItem>
            <MenuItem value="gateway">Gateway</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <Button
          onClick={() => TopUpBonusFn(page)}
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

export default TopUpDetail;
