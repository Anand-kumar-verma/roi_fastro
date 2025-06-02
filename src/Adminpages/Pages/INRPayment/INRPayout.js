import { FilterAlt } from "@mui/icons-material";
import { Button, IconButton, Switch, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import moment from "moment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import LockIcon from "@mui/icons-material/Lock";
import { enCryptData } from "../../../utils/Secret";

import CustomToPagination from "../../../Shared/CustomToPagination";
const INRPayout = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [totalamount, setTotalamount] = useState({});
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [loding, setloding] = useState(false);
  const [page, setPage] = useState(1);
  const INRPayoutFunction = async (page) => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.inr_payout_data, {
        created_at: from_date,
        updated_at: to_date,
        page: page,
        count: 10,
        search: search,
      });
      setData(res?.data?.data?.data || []);
      setTotalamount(res?.data);
      if (res) {
        setSearch("");
        setTo_date("");
        setFrom_date("");
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };
  useEffect(() => {
    INRPayoutFunction(page);
  }, [page]);
  async function handleWithdrawalStatus(t_id, status) {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.payout_request_approval, {
        payload: enCryptData({ t_id: t_id, status_type: status }),
      });
      INRPayoutFunction();
      toast(res?.data?.message);
    } catch (e) {
      console.log("Something went wrong.");
    }
    setloding(false);
  }
  const tablehead = [
    <span>S.No</span>,
    <span>Name</span>,
    <span>Email</span>,
    <span>User Id</span>,
    <span>Mobile</span>,
    <span>Address</span>,
    <span>Req Amnt</span>,
    <span>Team Buss</span>,
    <span>Wallet Type</span>,
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
      <span>{i?.wdrl_to}</span>,
      <span>{i?.wdrl_amont}</span>,
      <span>{i?.team_buss}</span>,
      <span>{i?.wdrl_wallet_type}</span>,
      <span className="">
        {moment(i?.wdrl_created_at).format("DD-MM-YYYY HH:mm:ss")}
      </span>,
      <span
        className={`${
          i?.wdrl_status === "Success"
            ? "text-green-500"
            : i?.wdrl_status === "Failed"
            ? "!text-rose-500"
            : "!text-gray-800"
        }`}
      >
        {i?.wdrl_status}
      </span>,
      <p>
        {i?.wdrl_status === "Pending" ? (
          <span className="!flex">
            <IconButton
              className="!text-green-500"
              onClick={() => handleWithdrawalStatus(i?.wdrl_id, 1)} //       // 1: successs, 2 failed, 3 pending, 4 rejecred
            >
              <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton
              className="!text-rose-500"
              onClick={() => handleWithdrawalStatus(i?.wdrl_id, 4)} //      // 1: successs, 2 failed, 3 pending, 4 rejecred
            >
              <CancelIcon />
            </IconButton>
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
          onClick={() => INRPayoutFunction()}
          variant="contained"
          startIcon={<FilterAlt />}
        >
          Filter
        </Button>
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
    </div>
  );
};

export default INRPayout;
