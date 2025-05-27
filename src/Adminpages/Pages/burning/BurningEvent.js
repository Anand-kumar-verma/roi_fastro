import {
    Button,
    CircularProgress,
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
    apiConnectorPost
} from "../../../utils/APIConnector";
import { endpoint } from "../../../utils/APIRoutes";
  
  const BurningEvent = () => {
    const [loading, setLoading] = useState(false);
    const [burnDate, setBurnDate] = useState("");
  
    const formik = useFormik({
      initialValues: {
        br_slot_count: "",
        br_count_value: "",
        br_tr_hash: "",
      },
      onSubmit: async (values, { resetForm }) => {
       
  
        const payload = {
          br_date: burnDate,
          br_slot_count: values.br_slot_count,
          br_count_value: values.br_count_value,
          br_tr_hash: values.br_tr_hash,
        };
  
        await handleTopUp(payload);
        resetForm();
      },
    });
  
    const handleTopUp = async (reqBody) => {
      setLoading(true);
      try {
        const res = await apiConnectorPost(endpoint?.add_burning_count, reqBody);
        toast.success(res?.data?.message || "Top-up added successfully");
      } catch (error) {
        console.error("Top-up Error:", error);
        toast.error("Something went wrong during top-up.");
      } finally {
        setLoading(false);
      }
    };
  
   
  
   
  
    if (loading) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress />
        </div>
      );
    }
  
    return (
      <div className="flex justify-center items-center w-full">
        <div className="p-5 lg:w-[70%] w-full bg-white bg-opacity-30 rounded-lg">
          <p className="text-center font-bold py-4 pb-10 text-lg"> Add Burning Event </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             
  
              <div>
                <p>Slot </p>
                <TextField
                  fullWidth
                  id="br_slot_count"
                  name="br_slot_count"
                  value={formik.values.br_slot_count}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p> Date</p>
                <TextField
                  fullWidth
                  type="date"
                  value={burnDate}
                  onChange={(e) => setBurnDate(e.target.value)}
                />
              </div>
              <div>
                <p>FST Qty</p>
                <TextField
                  fullWidth
                  id="br_count_value"
                  name="br_count_value"
                  value={formik.values.br_count_value}
                  onChange={formik.handleChange}
                />
              </div>
  
              <div>
                <p>Transaction Hash</p>
                <TextField
                  fullWidth
                  id="br_tr_hash"
                  name="br_tr_hash"
                  value={formik.values.br_tr_hash}
                  onChange={formik.handleChange}
                />
              </div>
  
             
            </div>
  
            <div className="flex justify-end gap-3 mt-5">
              <Button
                onClick={() => formik.resetForm()}
                variant="contained"
                className="!bg-[#E74C3C]"
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="!bg-[#07BC0C]"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default BurningEvent;
  