import { FilterAlt, Lock } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SweetAlert from "sweetalert2";
import CustomTable from "../../Shared/CustomTable";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";

const INRPaying = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [totalamount, setTotalamount] = useState([]);
  const [from_date, setFrom_date] = useState("");
  const [to_date, setTo_date] = useState("");
  const [loding, setloding] = useState(false);

  const INRPayingFunction = async () => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.inr_payingdata, {
        start_date: from_date,
        end_date: to_date,
        username: search,
      });
      setData(res?.data?.data || []);
      setTotalamount(res?.data?.total);

      if (res) {
        setTo_date("");
        setFrom_date("");
      }
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };

  const changeStatusApprovedFunction = async (id) => {
    try {
      const res = await axiosInstance.get(
        `${API_URLS?.approval_payin}?order_id=${id}`
      );
      if (res) INRPayingFunction();
      toast(res?.data?.msg);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = (id) => {
    SweetAlert.fire({
      title: "Are you sure?",
      text: "You want to Approve this Amount!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "custom-confirm",
        cancelButton: "custom-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        changeStatusApprovedFunction(id);
      }
    });
  };
  useEffect(() => {
    INRPayingFunction();
  }, []);

  const tablehead = [
    <span>S.No</span>,
    <span>Name</span>,
    <span>User Id</span>,
    <span>Mobile</span>,
    <span>Amount</span>,
    <span>Status</span>,
    <span>UTR Number</span>,
    <span>Req Date / Time</span>,
    <span>Success Date / Time</span>,
    <span>Action</span>,
  ];

  const tablerow = data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.full_name}</span>,
      <span>{i?.username}</span>,
      <span>{i?.mobile}</span>,
      <span>{i?.tr15_amt}</span>,
      <span>{i?.tr15_status}</span>,
      <span className="">{i?.tr15_trans}</span>,
      <span className="">
        {moment(i?.tr15_date)?.format("DD-MM-YYYY HH:mm:ss")}
      </span>,
      <span className="">
        {i?.tr15_status === "Pending"
          ? "--"
          : moment(i?.success_date)
          .format("DD-MM-YYYY HH:mm:ss")
        }
      </span>,

      <span>
        {i?.tr15_status === "Pending" ? (
          <Button
            variant="contained"
            className="!bg-[#198754]"
            onClick={() => handleSubmit(i?.tr15_trans)}
          >
            Approve
          </Button>
        ) : (
          <Lock />
        )}
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
          onClick={() => INRPayingFunction()}
          variant="contained"
          startIcon={<FilterAlt />}
        >
          Filter
        </Button>
      </div>
      <CustomTable
        isTotal={
          <div className="bg-white my-2 p-2 px-5 !text-right">
            Total Amount : <span className="!font-bold">{totalamount}</span>
          </div>
        }
        tablehead={tablehead}
        tablerow={tablerow}
        isLoading={loding}
      />
    </div>
  );
};

export default INRPaying;
