import { useQuery } from "react-query";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import Navbar from "./Navbar";
import Loader from "../Shared/Loader";

const TeamBusinessCount = () => {
  const { isLoading: LevelBusinessLoding, data: LevelBusiness } = useQuery(
    ["level_business"],
    () => apiConnectorGet(endpoint?.level_business),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const level_business = LevelBusiness?.data?.result || [];
  const { isLoading: proLoding, data: profile_data } = useQuery(
    ["profile_api"],
    () => apiConnectorGet(endpoint?.profile_api),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const profile = profile_data?.data?.result?.[0] || [];

  return (
    <>
      <Navbar />
      <Loader isLoading={LevelBusinessLoding || proLoding} />
      <div
        className=" text-text-colorp-o  md:p-3 h-screen overflow-y-scroll flex flex-col bg-custom-gradient items-center"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="p-4 lg:w-[70%] w-full mt-20 ">
          <h1 className="text-2xl font-bold mb-6 lg:mb-10 text-center text-gold-color">
            Team Business Count
          </h1>

          <div className="!text-gold-color px-2 !text-xs">
            <p>
              Self Total Business :{" "}
              <span>{Number(profile?.jnr_topup_wallet)?.toFixed(2)} $</span>{" "}
            </p>
            <p>
              Active Business :{" "}
              <span className="!text-green-500">
                {Number(
                  Number(profile?.jnr_topup_wallet || 0) -
                    Number(profile?.jnr_collapse_pkg)
                )?.toFixed(2)}{" "}
                $
              </span>{" "}
            </p>
            <p>
              Deactive Business :{" "}
              <span className="!text-rose-500">
                {Number(profile?.jnr_collapse_pkg)?.toFixed(2)} $
              </span>{" "}
            </p>
          </div>
          <div className="mt-6 lg:mt-10 overflow-x-auto max-h-[400px] overflow-y-auto !pb-[20%]">
            <table className="min-w-full !text-xs">
              <thead>
                <tr>
                  <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Total Team
                  </th>
                  <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Total Buss
                  </th>
                  <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Active Buss
                  </th>
                  <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Deactive Buss
                  </th>
                  {/* <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Re Buss
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {Array(6)
                  .fill(1)
                  ?.map((_, index) => (
                    <tr key={index}>
                      <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap !text-white">
                        {index + 1}
                      </td>
                      {/* <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-gold-color">
                        {Math.floor(
                          level_business?.[0]?.[
                            `members_at_level_${index + 1}`
                          ] || 0
                        )}{" "}
                      </td>
                      <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-green-500">
                        {Math.floor(
                          level_business?.[0]?.[`buss_at_level_${index + 1}`] ||
                            0
                        )?.toFixed(2) || 0}{" "}
                        ${" "}
                      </td> */}
                      <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-gold-color">
                        {Math.floor(
                          level_business?.[0]?.[`tb_mem_lev_${index + 1}`] || 0
                        ) || 0}{" "}
                      </td>
                      <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-yellow-500">
                        {Number(
                          Number(
                            level_business?.[0]?.[`tb_t_buss_lev_${index + 1}`]
                          )
                        )?.toFixed(2) || 0}{" "}
                        ${" "}
                      </td>
                      <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-green-500">
                        {Number(
                          Number(
                            level_business?.[0]?.[`tb_t_buss_lev_${index + 1}`]
                          ) -
                            Number(
                              level_business?.[0]?.[`tb_lapps_lev_${index + 1}`]
                            )
                        )?.toFixed(2) || 0}{" "}
                        ${" "}
                      </td>
                      <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-rose-500">
                        {Number(
                          Number(
                            level_business?.[0]?.[`tb_lapps_lev_${index + 1}`]
                          )
                        )?.toFixed(2) || 0}{" "}
                        ${" "}
                      </td>
                      {/* <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-green-500">
                        {Number(
                          level_business?.[0]?.[`tb_buss_lev_${index + 1}`]
                        )?.toFixed(2) || 0}{" "}
                        ${" "}
                      </td> */}
                    </tr>
                  ))}
                <tr>
                  <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap !text-white">
                    Total
                  </td>

                  <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-white">
                    {Array.from({ length: 6 }, (_, index) =>
                      Math.floor(
                        level_business?.[0]?.[`tb_mem_lev_${index + 1}`] || 0
                      )
                    ).reduce((sum, val) => sum + val, 0)}{" "}
                  </td>
                  <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-white">
                    {Array.from({ length: 6 }, (_, index) =>
                      Number(
                        level_business?.[0]?.[`tb_t_buss_lev_${index + 1}`] || 0
                      )
                    )
                      .reduce((sum, value) => sum + value, 0)
                      .toFixed(2)}{" "}
                    $
                  </td>
                  <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-white">
                    {Array.from(
                      { length: 6 },
                      (_, index) =>
                        Number(
                          level_business?.[0]?.[`tb_t_buss_lev_${index + 1}`] ||
                            0
                        ) -
                        Number(
                          level_business?.[0]?.[`tb_lapps_lev_${index + 1}`] ||
                            0
                        )
                    )
                      .reduce((sum, value) => sum + value, 0)
                      .toFixed(2)}{" "}
                    $
                  </td>
                  <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-white">
                    {Array.from({ length: 6 }, (_, index) =>
                      Number(
                        level_business?.[0]?.[`tb_lapps_lev_${index + 1}`] || 0
                      )
                    )
                      .reduce((sum, value) => sum + value, 0)
                      .toFixed(2)}{" "}
                    $
                  </td>
                  {/* <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-green-500">
                    {Array.from({ length: 6 }, (_, index) =>
                      Number(
                        level_business?.[0]?.[`tb_buss_lev_${index + 1}`] || 0
                      )
                    )
                      .reduce((sum, value) => sum + value, 0)
                      .toFixed(2)}{" "}
                    $
                  </td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
};

export default TeamBusinessCount;
