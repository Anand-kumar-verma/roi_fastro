import { FilterAlt } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";
import moment from "moment";

const TeamIncome = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  const TopUpBonusFn = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(API_URLS?.get_team_data, {
        lgn_cust_id: search,
      });
      setData(res?.data || null);
      // console.log(res?.data?.result)
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const tablehead = Array.from({ length: 15 }, (_, i) => (
    <span key={i}>{`Level ${i + 1}`}</span>
  ));

  const tablerow1 = [
    Array.from({ length: 15 }, (_, i) => {
      const key = `last_7_day_buss_lev_${i + 1}`;
      const value = data?.data ? Number(data?.data[key]) : 0;
      return <span key={key}>{value}</span>;
    }),
  ];
  const tablerow2 = [
    Array.from({ length: 15 }, (_, i) => {
      const key = `last_week_buss_lev_${i + 1}`;
      const value = data?.data ? Number(data?.data[key]) : 0;
      return <span key={key}>{value}</span>;
    }),
  ];
  const tablerow3 = [
    Array.from({ length: 15 }, (_, i) => {
      const key = `last_month_buss_lev_${i + 1}`;
      const value = data?.data ? Number(data?.data[key]) : 0;
      return <span key={key}>{value}</span>;
    }),
  ];
  const tablerow4 = [
    Array.from({ length: 15 }, (_, i) => {
      const key = `total_business_lev_${i + 1}`;
      const value = data?.data ? Number(data?.data[key]) : 0;
      return <span key={key}>{value}</span>;
    }),
  ];

  const tablerow5 = [
    Array.from({ length: 15 }, (_, i) => {
      const key = `tb_mem_lev_${i + 1}`;
      const value = data?.data ? Number(data?.data[key]) : 0;
      return <span key={key}>{value}</span>;
    }),
  ];
  const tablerow6 = [
    Array.from({ length: 15 }, (_, i) => {
      const key = `tb_lapps_lev_${i + 1}`;
      const value = data?.data ? Number(data?.data[key]) : 0;
      return <span key={key}>{value}</span>;
    }),
  ];
  const tablerow7 = [
    Array.from({ length: 15 }, (_, i) => {
      const key = `tb_today_buss_lev_${i + 1}`;
      const value = data?.data ? Number(data?.data[key]) : 0;
      return <span key={key}>{value}</span>;
    }),
  ];
  const tablerow8 = [
    Array.from({ length: 15 }, (_, i) => {
      const key = `total_business_lev_${i + 1}`;
      const key1 = `tb_lapps_lev_${i + 1}`;
      const value = data?.data
        ? Number(data?.data[key]) - Number(data?.data[key1])
        : 0;
      return <span key={i}>{value}</span>;
    }),
  ];
  const tablerow0 = [
    Object.entries(data?.personalData || {}).map(([key, value]) => (
      <span key={key}>{value}</span>
    )),
  ];

  const tablehead0 = [
    <span>Customer Id</span>,
    <span>Name</span>,
    <span>Email</span>,
    <span>Mobile</span>,
    <span>Top-up Date</span>,
    <span>Total Income</span>,
    <span>Current Wallet</span>,
    <span>Total Topup</span>,
    <span>Lappse Package</span>,
    <span>Total Withdrawl</span>,
  ];
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <TextField
          type="search"
          placeholder="Search by user id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          onClick={() => search && TopUpBonusFn()}
          variant="contained"
          startIcon={<FilterAlt />}
          disabled={loading}
        >
          {loading ? "Loading..." : "Filter"}
        </Button>
      </div>
      <p className="!font-bold !px-1">User Data</p>
      <CustomTable
        isTotal={false}
        tablehead={tablehead0}
        tablerow={tablerow0}
        isLoading={loading}
      />
      <p className="!font-bold !px-1">Last 7 Days Business</p>
      <CustomTable
        isTotal={false}
        tablehead={tablehead}
        tablerow={tablerow1}
        isLoading={loading}
      />
      <p className="!font-bold !px-1">Last Week Business</p>
      <CustomTable
        isTotal={false}
        tablehead={tablehead}
        tablerow={tablerow2}
        isLoading={loading}
      />
      <p className="!font-bold !px-1">Last Month Business</p>
      <CustomTable
        isTotal={false}
        tablehead={tablehead}
        tablerow={tablerow3}
        isLoading={loading}
      />
      <p className="!font-bold !px-1">Total Business</p>
      <CustomTable
        isTotal={false}
        tablehead={tablehead}
        tablerow={tablerow4}
        isLoading={loading}
      />
      <p className="!font-bold !px-1">Lapps Business</p>
      <CustomTable
        isTotal={false}
        tablehead={tablehead}
        tablerow={tablerow6}
        isLoading={loading}
      />
      <p className="!font-bold !px-1">Total Active Business</p>
      <CustomTable
        isTotal={false}
        tablehead={tablehead}
        tablerow={tablerow8}
        isLoading={loading}
      />
      <p className="!font-bold !px-1">Team Member</p>
      <CustomTable
        isTotal={false}
        tablehead={tablehead}
        tablerow={tablerow5}
        isLoading={loading}
      />

      <p className="!font-bold !px-1">Today Business</p>
      <CustomTable
        isTotal={false}
        tablehead={tablehead}
        tablerow={tablerow7}
        isLoading={loading}
      />
    </div>
  );
};

export default TeamIncome;
