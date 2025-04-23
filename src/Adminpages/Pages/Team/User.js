import { Edit, FilterAlt } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";
import CustomPagination from "../../../Shared/CustomPagination";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import toast from "react-hot-toast";
import CustomToPagination from "../../../Shared/CustomToPagination";
const UserDetail = () => {
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const UserBonusFn = async (page) => {
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
    UserBonusFn(page, search);
  }, [page, search]);

  async function stopIncome(id, type) {
    try {
      const response = await axiosInstance.post(API_URLS?.stop_user_income, {
        lgn_cust_id: id,
        type: type,
      });
      UserBonusFn(page, search);
      toast(response?.data?.message);
    } catch (e) {
      return toast("Something went wrong");
    }
  }
  const tablehead = [
    <span>S.No.</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Mobile</span>,
    <span>Email</span>,
    <span>Date/Time</span>,
    <span>Income | Profile</span>,
  ];

  const tablerow = data?.data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.lgn_cust_id}</span>,
      <span>{i?.lgn_real_name || i?.jnr_name || "--"}</span>,
      <span>{i?.lgn_real_mob || "--"}</span>,
      <span>{i?.lgn_real_email || "--"}</span>,
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
          onClick={() => UserBonusFn()}
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
        isPagination={false}
      />
      <div className="flex justify-center mt-6">
        {/* <CustomPagination data={data} setPage={setPage} /> */}
        <CustomToPagination setPage={setPage} page={page} data={data} />
      </div>
    </div>
  );
};

export default UserDetail;
