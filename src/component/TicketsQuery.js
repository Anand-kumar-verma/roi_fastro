import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Navbar from "../dashboard/Navbar";
import { apiConnectorGet, apiConnectorPost } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import Loader from "../Shared/Loader";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import toast from "react-hot-toast";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
function TicketsQuery() {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    title: "",
    description: "",
    type: "",
  };
  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async () => {
      setLoading(true);
      try {
        const apiRes = await apiConnectorPost(
          endpoint?.ticket_raised,
          fk.values
        );
        if (String(apiRes?.data?.success) === "true")
          toast(apiRes?.data?.message);
      } catch (e) {
        toast(e?.message || "Something went wrong.");
      }
      setLoading(false);
    },
  });
  return (
    <>
      <Navbar />
      <Loader isLoading={loading} />
      <div className="p-3 md:p-6 mt-[10vh]  !mb-[9vh] !overflow-y-scroll flex flex-col items-center justify-center bg-custom-gradient">
        <div className="flex justify-center gap-[10%] items-center mt-1 p-2 lg:w-[60%] w-full border border-gold-color rounded">
          <BookOnlineIcon className="!text-gold-color !text-[80px]" />
        </div>

        <div className="lg:px-10 py-5 p-2 w-full mt-6 border border-gold-color bg-black bg-opacity-50 backdrop-blur-md shadow-2xl rounded-2xl lg:w-[60%]">
          <h2 className="text-2xl font-bold text-gold-color mb-6 text-center">
            🎫 Raise a Support Ticket
          </h2>

          <div className="flex flex-col gap-6">
            {/* Issue Type */}
            <div>
              <label className="block text-sm font-semibold text-gold-color mb-2">
                Issue Type *
              </label>
              <FormControl fullWidth>
                <Select
                  sx={{
                    backgroundColor: "black",
                    color: "#FFD700",
                    border: "1px solid #FFD700",
                    borderRadius: "8px",
                    ".MuiSvgIcon-root": { color: "#FFD700" },
                  }}
                  defaultValue=""
                  displayEmpty
                  id="type"
                  name="type"
                  value={fk.values.type}
                  onChange={fk.handleChange}
                >
                  <MenuItem value="" disabled>
                    <em>Select an issue</em>
                  </MenuItem>
                  <MenuItem value="deposit">Deposit</MenuItem>
                  <MenuItem value="withdrawal">Withdrawal</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gold-color mb-2">
                Title *
              </label>
              <input
                id="title"
                name="title"
                value={fk.values.title}
                onChange={fk.handleChange}
                required
                type="text"
                className="bg-black text-gold-color placeholder-gold-color p-3 w-full border border-gold-color rounded-lg shadow-inner outline-none"
                placeholder="Enter short title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gold-color mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={fk.values.description}
                onChange={fk.handleChange}
                required
                rows="4"
                className="bg-black text-gold-color placeholder-gold-color p-3 w-full border border-gold-color rounded-lg shadow-inner outline-none"
                placeholder="Describe your issue in detail"
              ></textarea>
            </div>

            {/* Submit Button */}
            <Button
onClick={fk.handleSubmit}
                variant="contained"
              className="!bg-gold-color !rounded-full !hover:bg-white !hover:text-black !text-black !font-semibold !py-3 transition-all"
            >
              Submit Ticket
            </Button>
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default TicketsQuery;
