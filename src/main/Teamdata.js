import moment from "moment";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Navbar from "../dashboard/Navbar";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import CustomToPagination from "../Shared/CustomToPagination";
import Loader from "../Shared/Loader";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import { Button } from "@mui/material";

function Teamdata() {
  const client = useQueryClient();
  const [level, setLevel] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  const { isLoading, data: team_data } = useQuery(
    ["team_api", level, searchTrigger],
    () =>
      apiConnectorGet(
        `${endpoint?.team_data_api}?level=${limit || level}&page=${page}`
      ),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const data = team_data?.data?.result || [];

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
  };

  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading} />
      {/* <LevelwiseBusiness /> */}
      <div
        className="p-0 md:p-4  flex h-screen overflow-y-scroll flex-col bg-custom-gradient items-center "
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="p-4 lg:w-[70%] w-full mt-20">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-gold-color">
            Team Data
          </h1>
          <div className="mb-6 w-full">
            <p className="text-text-color mb-2">
              {localStorage.getItem("isCP") === "Yes" ? "Enter" : "Select"}{" "}
              Level:
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              {localStorage.getItem("isCP") === "No" ? (
                <select
                  value={level}
                  onChange={(e) => handleLevelChange(Number(e.target.value))}
                  className="px-4 py-2 rounded text-black w-full md:w-1/2 bg-white bg-opacity-50"
                >
                  {[...Array(15)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      Level {index + 1}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  placeholder="Enter Level"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="px-4 py-2 rounded w-full md:w-1/2 bg-white bg-opacity-50 text-black"
                />
              )}

              {localStorage.getItem("isCP") === "Yes" && (
                <Button
                  onClick={() => setSearchTrigger((prev) => prev + 1)}
                  size="small"
                  variant="contained"
                  className="w-full md:w-auto"
                >
                  Search
                </Button>
              )}
            </div>
          </div>
          <div className="!text-white !flex !flex-wrap !justify-between">
            <p>
              Total Count:{" "}
              <span className="!text-gold-color font-extrabold">
                {data?.length}
              </span>
            </p>
            <p>
              Last Week Buss:
              <span className="!text-gold-color font-extrabold">
                {data
                  ?.reduce((a, b) => a + Number(b?.last_week_buss), 0)
                  ?.toFixed(2)}
                $
              </span>
            </p>
            <p>
              Total Buss:
              <span className="!text-gold-color font-extrabold">
                {data
                  ?.reduce((a, b) => a + Number(b?.jnr_topup_wallet), 0)
                  ?.toFixed(2)}
                $
              </span>
            </p>
          </div>
          <div className="mt-3  overflow-x-auto">
            <table className="min-w-full ">
              <thead>
                <tr>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Date
                  </th>
                  {/* <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                                        Email
                                    </th> */}
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Customer ID
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Wallet
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Last Week Buss
                  </th>
                  <th className="px-2 md:px-6 py-3  border border-yellow-500 text-center text-xs text-yellow-700 font-semibold  uppercase tracking-wider">
                    Level
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 md:px-6 py-4  border border-yellow-500 text-white text-center text-colorspace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-2 md:px-6 py-4  border border-yellow-500 text-white text-center text-colorspace-nowrap">
                      {item?.jnr_topup_date
                        ? moment
                            ?.utc(item?.jnr_topup_date)
                            ?.format("DD-MM-YYYY HH:mm:ss")
                        : "----"}
                    </td>
                    {/* <td className="px-2 md:px-6 py-4 border border-yellow-500 text-white text-center text-colorspace-nowrap">
                                            {item?.lgn_email}
                                        </td> */}
                    <td className="px-2 md:px-6 text-center border border-yellow-500 text-white py-4 text-colorspace-nowrap">
                      {item?.lgn_cust_id}
                    </td>
                    <td className="px-2 md:px-6  text-center border border-yellow-500 text-white py-4 text-colorspace-nowrap">
                      {" "}
                      $ {Number(item?.jnr_topup_wallet)?.toFixed(0, 2)}
                    </td>
                    <td className="px-2 md:px-6  text-center border border-yellow-500 text-white py-4 text-colorspace-nowrap">
                      {" "}
                      $ {Number(item?.last_week_buss)?.toFixed(0, 2)}
                    </td>
                    <td className="px-2 md:px-6  text-center border border-yellow-500 text-white py-4 text-colorspace-nowrap">
                      Level {item?.level}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-6">
            <CustomToPagination data={data} page={page} setPage={setPage} />
            {/* <CustomPagination data={data} setPage={setPage} /> */}
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
}

export default Teamdata;
