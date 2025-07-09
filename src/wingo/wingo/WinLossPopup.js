import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loss from "../assets/images/loss.png";
import zero from "../assets/images/n0-30bd92d1.png";
import one from "../assets/images/n1-dfccbff5.png";
import two from "../assets/images/n2-c2913607.png";
import three from "../assets/images/n3-f92c313f.png";
import four from "../assets/images/n4-cb84933b.png";
import five from "../assets/images/n5-49d0e9c5.png";
import six from "../assets/images/n6-a56e0b9a.png";
import seven from "../assets/images/n7-5961a17f.png";
import eight from "../assets/images/n8-d4d951a4.png";
import nine from "../assets/images/n9-a20f6f42 (1).png";
import win from "../assets/images/winnner.png";
import { rupees } from "../services/urls";
import CustomCircularProgress from "../shared/loder/CustomCircularProgress";
const WinLossPopup = () => {
  let array = [zero, one, two, three, four, five, six, seven, eight, nine];
  const [loding, setloding] = useState(false);
  const [status, setstatus] = useState("");
  const [newstatus, setstatusNew] = useState("");
  const [all_result, setall_result] = useState();
  const my_history_data = useSelector(
    (state) => state.aviator.myHistory_trx_one_min
  );
  const MyHistoryFn = async () => {
    setloding(true);
    try {
      const firstId = my_history_data?.[0]?.gamesno;
      const winAmnt =
        my_history_data
          ?.filter((i) => i?.gamesno === firstId)
          ?.reduce((a, b) => a + Number(b?.win || 0), 0) || 0;
      const amntAmnt =
        my_history_data
          ?.filter((i) => i?.gamesno === firstId)
          ?.reduce((a, b) => a + Number(b?.amount || 0), 0) || 0;
      setall_result(my_history_data?.[0]);

      if (winAmnt) {
        setstatus({
          status: "1",
          amount: winAmnt,
        });
      } 
      else {
        // setstatus({
        //   status: "2",
        //   amount: amntAmnt,
        // });
        toast("Your Loss");
      }
      // setstatus(response?.data?.data?.[0]);
    } catch (e) {
      toast(e?.message, {id:1});
      console.log(e);
    }
    setloding(false);
  };

  useEffect(() => {
    MyHistoryFn();
    setTimeout(() => {
      localStorage.setItem("betApplied", false);
    }, 5000);
  }, []);

  useEffect(() => {
    setstatusNew(status);
  }, [status]);
  if (loding) return <CustomCircularProgress isLoading={loding} />;
  return (
    <Box
      sx={{
        width: "300px",
        height: "430px",
        margin: "auto",
        backgroundImage: `url(${
          (status?.status === "1" && Loss) || (status?.status === "2" && win)
        })`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {!loding && newstatus && (
        <>
          <Typography
            variant="body1"
            color="initial"
            className="crlg !text-center"
          >
            {(status?.status === "1" && "Win") ||
              (status?.status === "2" && "Loss")}
          </Typography>

          <Typography
            variant="body1"
            color="initial"
            className={`bonustext ${
              status?.status === "1" ? "!text-green" : "!text-red"
            }
            !mr-0
            `}
          >
            {(status?.status === "1" && (
              <>
                <div className="!text-sm !ml-7 !flex !items-center !gap-2">
                  <span>Results: </span>

                  <span
                    className={`${
                      [1, 3, 7, 9].includes(Number(all_result?.result))
                        ? "!bg-green-500"
                        : "!bg-red-500"
                    } ${
                      Number(all_result?.result) === 0
                        ? "!bg-gradient-to-r from-red-500 to-purple-500"
                        : Number(all_result?.result) === 5
                        ? "!bg-gradient-to-r from-green-500 to-purple-500"
                        : ""
                    } !text-center !p-2 !rounded-md`}
                  >
                    {Number(all_result?.result) === 0
                      ? "Red Purple"
                      : Number(all_result?.result) === 5
                      ? "Green Purple"
                      : [1, 3, 7, 9].includes(Number(all_result?.result))
                      ? "Green"
                      : "Red"}
                  </span>

                  <img
                    className="!h-[10%] !w-[10%]"
                    src={array[Number(all_result?.result)]}
                  />
                  <span
                    className={`${
                      [1, 3, 7, 9]?.includes(Number(all_result?.result))
                        ? "!bg-green-500"
                        : "!bg-red-500"
                    }
                  ${
                    String(Number(all_result?.result)) === String(0) &&
                    "!bg-gradient-to-r from-red-500 to-purple-500"
                  }
                  ${
                    String(Number(all_result?.result)) === String(5) &&
                    "!bg-gradient-to-r from-green-500 to-purple-500"
                  }
                  !text-center !p-2 !rounded-md
                  `}
                  >
                    {Number(all_result?.result) <= 4 ? "Small" : "Big"}
                  </span>
                </div>
                <div className="!text-[20px]">Bonus</div>
              </>
            )) ||
              (status?.status === "2" && "Loss Amount")}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            className={`bonusamt  ${
              status?.status === "1" ? "!text-green-500" : "!text-red-300"
            }`}
          >
            {rupees} {Number(status?.amount || 0)?.toFixed(2) || 0}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            className={`bonuspr ${
              status?.status === "1" ? "!text-black" : "!text-black"
            }`}
          >
            Period min :{all_result?.gamesno}
            {/* {(status?.gameid === "1" && "One") ||
              (status?.gameid === "3" && "Three") ||
              (status?.gameid === "5" && "Five")}{" "} */}
          </Typography>
          <Typography variant="body1" color="initial" className="bonuscl">
            {(status?.status === "1" && "") ||
              (status?.status === "2" && "Try Again")}
            {/* Auto Close in 5 sec{" "} */}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default WinLossPopup;
