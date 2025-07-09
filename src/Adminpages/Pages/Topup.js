import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { apiConnectorGet, apiConnectorPost } from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";

const TopUp = () => {
  const [checkhash, setcheckhash] = useState("");
  const [data, setData] = useState("");
  const [isName, setisName] = useState([]);
  const [loding, setLoding] = useState(false);
  const [transactionType, setTransactionType] = useState("mlm");

  const initialValues = {
    type: "admin",
    topup_amnt: "",
    user_id: "",
    pack_id: "SelectPackage",
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      if (fk.values.pack_id === "SelectPackage" && transactionType === "mlm") {
        setLoding(false);
        return toast("Select Your Package.");
      }
      const reqbody = {
        topup_amnt:
          transactionType === "mlm"
            ? Number(
                res?.find((e) => e?.pack_id === Number(fk.values.pack_id))
                  ?.pack_amount
              )
            : fk.values.topup_amnt,
        type: fk.values.type,
        package_id: fk.values.pack_id,
        user_id: fk.values.user_id?.trim(),
        transactionType: transactionType,
        checkhash: checkhash || "",
      };
      TopUpFn(reqbody);
    },
  });
  async function TopUpFn(reqbody) {
    setLoding(true);
    try {
      const res = await apiConnectorPost(endpoint?.topup_api, reqbody);
      toast(res?.data?.message);
      checkhash && ifHashAvailable();
      fk.handleReset();
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }

  const { data: user } = useQuery(
    ["package_api"],
    () => apiConnectorGet(endpoint?.package_list_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const res = user?.data?.result || [];

  const Customerfunction = async () => {
    const reqbody = {
      user_id: fk.values.user_id,
    };
    try {
      const res = await apiConnectorPost(endpoint?.customer_api, reqbody);
      setData(res?.data?.result?.[0]);
    } catch (e) {
      console.log("something went wrong");
    }
  };
  useEffect(() => {
    Customerfunction();
  }, [fk.values.user_id]);

  async function ifHashAvailable(params) {
    try {
      const res = await apiConnectorPost(endpoint?.get_if_hash_availbale, {
        hash: checkhash,
      });
      setisName(res?.data?.result || []);
    } catch (e) {
      toast("Something went wrong");
    }
  }
  useEffect(() => {
    checkhash && ifHashAvailable();
  }, [checkhash]);

  if (loding)
    return (
      <div className="w-[100%] h-[100%] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  return (
    <div className="!flex justify-center items-center w-full">
      <div className="p-5  lg:w-1/2 md:w-3/4 w-full bg-white !bg-opacity-30 rounded-lg">
        <p className="!text-center font-bold !py-4 !pb-10 text-lg">Add TopUp</p>
        <div className="grid grid-cols-1  gap-[6%] gap-y-4">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Transaction Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <FormControlLabel value="mlm" control={<Radio />} label="MLM" />
              <FormControlLabel
                value="wingo"
                control={<Radio />}
                label="Wingo"
              />
              <FormControlLabel
                value="jackpot"
                control={<Radio />}
                label="jackpot"
              />
            </RadioGroup>
          </FormControl>
          {transactionType === "mlm" ? (
            <div>
              <p className="my-2 font-bold">Select Package Name</p>
              <TextField
                fullWidth
                select
                id="pack_id"
                name="pack_id"
                value={fk.values.pack_id}
                onChange={fk.handleChange}
              >
                <MenuItem value="SelectPackage">Select Package</MenuItem>
                {res?.map((item) => (
                  <MenuItem key={item?.pack_id} value={item?.pack_id}>
                    {item?.pack_name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          ) : (
            <div>
              <p className="my-2 font-bold">Enter {transactionType?.toLocaleUpperCase()} Amount</p>
              <TextField
                type="number"
                fullWidth
                id="topup_amnt"
                name="topup_amnt"
                value={fk.values.topup_amnt}
                onChange={fk.handleChange}
              />
            </div>
          )}
          <div>
            <p>UserID</p>
            <TextField
              fullWidth
              id="user_id"
              name="user_id"
              value={fk.values.user_id}
              onChange={fk.handleChange}
            />
            <span className="text-red-800 !px-2">{data?.jnr_name}</span>
          </div>
          {transactionType === "mlm" && (
            <div>
              Choose Type
              <div className="!flex !gap-4 items-center">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="admin"
                    checked={fk.values.type === "admin"}
                    onChange={fk.handleChange}
                  />
                  Admin
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="gateway"
                    checked={fk.values.type === "gateway"}
                    onChange={fk.handleChange}
                  />
                  Gateway
                </label>
              </div>
            </div>
          )}
        </div>
        <p>Check Hash</p>
        <TextField
          multiline
          rows={2}
          fullWidth
          value={checkhash}
          onChange={(e) => setcheckhash(e.target.value)}
        />
        <span className="!text-xs !text-rose-500">
          {isName?.[0]?.lgn_real_name || "Not Found"} {isName?.[0]?.lgn_cust_id}
        </span>
        <div className="flex justify-end gap-3 mt-5">
          <Button
            onClick={() => fk.handleReset()}
            variant="contained"
            className="!bg-[#E74C3C]"
          >
            Clear
          </Button>
          <Button
            onClick={() => fk.handleSubmit()}
            variant="contained"
            className="!bg-[#07BC0C]"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
