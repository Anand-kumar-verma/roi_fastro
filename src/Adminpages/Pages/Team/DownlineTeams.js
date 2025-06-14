import { FilterAlt } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { API_URLS } from "../../config/APIUrls";
import axiosInstance from "../../config/axios";
import CustomTable from "../../Shared/CustomTable";
const DownlineTeams = () => {
  const [loding, setloding] = useState(false);
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  const UserBonusFn = async (page) => {
    setloding(true);
    try {
      const res = await axiosInstance.post(API_URLS?.get_downline_team, {
        userid: search,
      });
      setData(res?.data?.result || []);
    } catch (e) {
      console.log(e);
    }
    setloding(false);
  };

  const tablehead = [
    <span>S.No.</span>,
    <span>Level</span>,
    <span>User Id</span>,
    <span>Name</span>,
    <span>Mobile</span>,
    <span>Email</span>,
    <span>Spon Id</span>,
    <span>Sp. Name</span>,
    <span>Sp. Mobile</span>,
    <span>Sp. Email</span>,
  ];

  const tablerow = data?.map((i, index) => {
    return [
      <span>{index + 1}</span>,
      <span>{i?.level_id}</span>,

      <span>{i?.lgn_cust_id}</span>,
      <span>{i?.lgn_real_name || "--"}</span>,
      <span>{i?.lgn_real_mob || "--"}</span>,
      <span>{i?.lgn_real_email || "--"}</span>,
      <span>{i?.sponsor_cust_id}</span>,
      <span>{i?.sponsor_name || "--"}</span>,
      <span>{i?.sponsor_mob || "--"}</span>,
      <span>{i?.sponsor_email || "--"}</span>,
    ];
  });

  return (
    <div>
      <div className="flex px-2 gap-5 !justify-start py-2">
        <TextField
          type="search"
          placeholder="Search by user id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={UserBonusFn}
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
      {/* <div className="flex justify-center mt-6">
        <CustomToPagination setPage={setPage} page={page} data={data} />
      </div> */}
    </div>
  );
};

export default DownlineTeams;
