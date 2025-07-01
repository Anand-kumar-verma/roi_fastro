import { useQuery } from "react-query";
import { apiConnectorGet } from "../../utils/APIConnector";
import { endpoint } from "../services/urls";

const PromotionData = () => {
  const { isLoading, data: wallet_amount } = useQuery(
    ["wallet_amount"],
    () => apiConnectorGet(endpoint?.game_profile),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const profile = wallet_amount?.data?.result?.[0] || {};

  return (
    <>
      <div className="text-text-color md:p-3  flex flex-col  items-center bg-black p-4">
        <div className=" lg:w-[70%] w-full">
          <h1 className="text-xl md:text-2xl font-bold mb-6 mt-2 text-center text-gold-color">
            Promotion Data
          </h1>

          <div className="mt-6 lg:mt-10 overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="min-w-full text-xs md:text-sm">
              <tbody>
                <tr>
                  <td className="border border-yellow-500 px-4 py-2 text-yellow-400 font-medium">
                    Total Deposit
                  </td>
                  <td className="border border-yellow-500 px-4 py-2 text-white">
                    {profile?.jnr_winog_total_deposit ?? 0}
                  </td>
                </tr>
                <tr>
                  <td className="border border-yellow-500 px-4 py-2 text-yellow-400 font-medium">
                    Need to Bet
                  </td>
                  <td className="border border-yellow-500 px-4 py-2 text-white">
                    {profile?.jnr_wingo_need_bet ?? 0}
                  </td>
                </tr>
                <tr>
                  <td className="border border-yellow-500 px-4 py-2 text-yellow-400 font-medium">
                    Today's Betting
                  </td>
                  <td className="border border-yellow-500 px-4 py-2 text-white">
                    {profile?.jnr_wingo_today_betting ?? 0}
                  </td>
                </tr>
                <tr>
                  <td className="border border-yellow-500 px-4 py-2 text-yellow-400 font-medium">
                    Total Betting
                  </td>
                  <td className="border border-yellow-500 px-4 py-2 text-white">
                    {profile?.jnr_total_betting ?? 0}
                  </td>
                </tr>
                <tr>
                  <td className="border border-yellow-500 px-4 py-2 text-yellow-400 font-medium">
                    Today Winning
                  </td>
                  <td className="border border-yellow-500 px-4 py-2 text-white">
                    {profile?.jnr_today_winning ?? 0}
                  </td>
                </tr>
                <tr>
                  <td className="border border-yellow-500 px-4 py-2 text-yellow-400 font-medium">
                    Total Winning
                  </td>
                  <td className="border border-yellow-500 px-4 py-2 text-white">
                    {profile?.jnr_total_winning ?? 0}
                  </td>
                </tr>
                <tr>
                  <td className="border border-yellow-500 px-4 py-2 text-yellow-400 font-medium">
                    Total Withdrawal
                  </td>
                  <td className="border border-yellow-500 px-4 py-2 text-white">
                    {profile?.jng_wingo_withdrawal ?? 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionData;
