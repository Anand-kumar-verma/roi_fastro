import { FilterAlt } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";

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
      setData(res?.data?.result?.[0] || null);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const displayFields = {
    "User Id": data?.lgn_cust_id,
    Name: data?.lgn_real_name,
    Mobile: data?.lgn_real_mob,
    Email: data?.lgn_real_email,
    "Self Buss": data?.jnr_topup_wallet,
    "Mem Lev 1": data?.tb_mem_lev_1,
    "Mem Lev 2": data?.tb_mem_lev_2,
    "Mem Lev 3": data?.tb_mem_lev_3,
    "Mem Lev 4": data?.tb_mem_lev_4,
    "Mem Lev 5": data?.tb_mem_lev_5,
    "Mem Lev 6": data?.tb_mem_lev_6,
    "Buss Lev 1": data?.tb_buss_lev_1,
    "Buss Lev 2": data?.tb_buss_lev_2,
    "Buss Lev 3": data?.tb_buss_lev_3,
    "Buss Lev 4": data?.tb_buss_lev_4,
    "Buss Lev 5": data?.tb_buss_lev_5,
    "Buss Lev 6": data?.tb_buss_lev_6,
  };

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

      {data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(displayFields).map(([label, value]) => (
            <div
              key={label}
              className="border border-gray-300 rounded p-3 shadow-sm bg-white"
            >
              <div className="text-gray-600 font-semibold">{label}</div>
              <div className="text-black">{value ?? "-"}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No data found</p>
      )}
    </div>
  );
};

export default TeamIncome;
