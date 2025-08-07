import Navbar from "../dashboard/Navbar";
import { price_statics } from "../utils/APICalling";
import ButtomNavigation from "../Layout/ButtomNaviagatoin";

const PriceStatics = () => {
  return (
    <>
      <Navbar />
      <div className="text-text-color p-0 md:p-3 min-h-screen flex flex-col  items-center bg-black ">
        <div className="p-4 lg:w-[70%] w-full mt-20">
          <h1 className="text-xl md:text-2xl font-bold mb-6 lg:mb-10 text-center text-gold-color">
            Price Statistics
          </h1>

          <div className="mt-6 lg:mt-10 overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="min-w-full text-xs md:text-sm">
              <thead>
                <tr>
                  <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    S No.
                  </th>
                  <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                   FST Price
                  </th>
                  {/* <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Dollar
                  </th> */}
                  {/* <th className="px-2 md:px-4 py-2 border border-yellow-500 text-center text-yellow-700 font-semibold uppercase tracking-wider">
                    Token(Qnt)
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {price_statics?.map((i, index) => (
                  <tr key={index}>
                    <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap">
                      {index + 11}
                    </td>
                    <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-gold-color">
                      {i?.start1} - {i?.end1}
                    </td>
                    <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-rose-500">
                      {i.burning_event} $
                    </td>
                    {/* <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-green-500">
                      $ {i.dollar}
                    </td> */}
                    {/* <td className="px-2 md:px-4 py-2 border border-yellow-500 text-center whitespace-nowrap text-white">
                      {i.token_cnt}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
};

export default PriceStatics;
