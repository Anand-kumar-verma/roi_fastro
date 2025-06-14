import { useQuery } from "react-query";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import Navbar from "./Navbar";

const LevelwiseBusiness = () => {
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
  // console.log(level_business);
  return (
    <>
      <Navbar />
      <div className="text-text-color p-0 md:p-3  flex flex-col  items-center bg-black ">
        <div className=" lg:w-[70%] w-full">
          <h1 className="text-xl md:text-2xl font-bold mb-6 mt-2 text-center text-gold-color">
            Team Business
          </h1>

          <div className="mt-6 lg:mt-10 overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="min-w-full text-xs md:text-sm">
              <thead>
                <tr>
                  <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Total Team
                  </th>
                  <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Business
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array(6)
                  .fill(1)
                  ?.map((_, index) => (
                    <tr key={index}>
                      <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap">
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
                      <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-green-500">
                        {Number(
                          level_business?.[0]?.[`tb_buss_lev_${index + 1}`]
                        )?.toFixed(2) || 0}{" "}
                        ${" "}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap">
                    Total
                  </td>

                  <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-gold-color">
                    {Array.from({ length: 6 }, (_, index) =>
                      Math.floor(
                        level_business?.[0]?.[`tb_mem_lev_${index + 1}`] || 0
                      )
                    ).reduce((sum, val) => sum + val, 0)}{" "}
                  </td>
                  <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-green-500">
                    {Array.from({ length: 6 }, (_, index) =>
                      Number(
                        level_business?.[0]?.[`tb_buss_lev_${index + 1}`] || 0
                      )
                    )
                      .reduce((sum, value) => sum + value, 0)
                      .toFixed(2)}{" "}
                    $
                  </td>
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

export default LevelwiseBusiness;
