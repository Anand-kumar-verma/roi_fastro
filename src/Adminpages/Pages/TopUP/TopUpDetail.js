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
import { useEffect, useState } from "react";
import CustomToPagination from "../../../Shared/CustomToPagination";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";

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
        search: search,
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

        {/* Select Dropdown */}
        <FormControl className="w-full md:w-40" size="small">
          <InputLabel id="select-by-label">Select by</InputLabel>
          <Select
            labelId="select-by-label"
            value={selectBy}
            onChange={(e) => setSelectBy(e.target.value)}
            label="Select by"
          >
            <MenuItem value="total">Total</MenuItem>
            <MenuItem value="gateway">Gateway</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        {/* Filter Button */}
        <div className="w-full md:w-auto">
          <Button
            onClick={() => TopUpBonusFn(page)}
            variant="contained"
            startIcon={<FilterAlt />}
            className="w-full md:w-auto"
            color="primary"
          >
            Filter
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

export default TopUpDetail;
