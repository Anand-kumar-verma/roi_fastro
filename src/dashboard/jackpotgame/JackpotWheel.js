import { useRef, useState } from "react";
import { Wheel } from "react-custom-roulette";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import voice from "../../images/rotate_wheel_ball_music.mp3";
import { apiConnectorGet, apiConnectorPost } from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import { enCryptData } from "../../utils/Secret";

const wheelData = Array.from({ length: 10 }, (_, i) => ({
  option: `${i} `,
}));

export const JackpotWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showAllTickets, setShowAllTickets] = useState(false);
  const audioRef = useRef(new Audio(voice));
  const { data: apiData } = useQuery(
    ["ticket_api"],
    () => apiConnectorGet(endpoint?.ticket_list),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const ticketList = apiData?.data?.result || [];

  const handleSpinClick = () => {
    const last_digit =
      ticketList?.find((i) => i?.jack_is_pre_winn === "Active")
        ?.jack_last_digit || "-1";
    const jack_release_no1 =
      ticketList?.find((i) => i?.jack_is_pre_winn === "Active")
        ?.jack_release_no1 || -2;
    const jack_release_no2 =
      ticketList?.find((i) => i?.jack_is_pre_winn === "Active")
        ?.jack_release_no2 || -2;
    const jack_release_no3 =
      ticketList?.find((i) => i?.jack_is_pre_winn === "Active")
        ?.jack_release_no3 || -2;
    const jack_release_no4 =
      ticketList?.find((i) => i?.jack_is_pre_winn === "Active")
        ?.jack_release_no4 || -2;

    const newPrizeNumber =
      Number(last_digit) < 0
        ? Math.floor(Math.random() * wheelData.length)
        : jack_release_no1 === -1
        ? last_digit?.slice(0, 1)
        : jack_release_no2 === -1
        ? last_digit?.slice(1, 2)
        : jack_release_no3 === -1
        ? last_digit?.slice(2, 3)
        : jack_release_no4 === -1 && last_digit?.slice(3, 4);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);

    const audio = audioRef?.current;
    audio.currentTime = 0;
    audio.play().catch((e) => console.log("Audio play error:", e));
  };

  const client = useQueryClient();

  const handleStopSpinning = async () => {
    setMustSpin(false);
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;

    const winningNumber = Number(wheelData[prizeNumber].option?.split(" ")[0]);
    try {
      const reqbody = {
        result: String(winningNumber),
      };
      const encryptedPayload = enCryptData(reqbody);
      const response = await apiConnectorPost(endpoint.jackpot_result, {
        payload: encryptedPayload,
      });
      toast(response?.data?.message);
      client.refetchQueries("ticket_api");
    } catch (err) {
      toast.error("Error sending jackpot result:", err);
    }
  };

  const Handlebutton = ticketList.some(
    (ticket) =>
      [
        ticket.jack_release_no1,
        ticket.jack_release_no2,
        ticket.jack_release_no3,
        ticket.jack_release_no4,
      ].some((n) => n === -1) && ticket?.day_name === "Sunday"
  );

  return (
    <div style={{ textAlign: "center", paddingTop: "1px" }}>
      <div style={{ marginTop: "10px" }}>
        <div className="grid grid-cols-3  place-content-start gap-2 place-items-center mx-2">
          {(showAllTickets ? ticketList : ticketList.slice(0, 3)).map(
            (ticket, index) => (
              <div
                className="text-white text-xs bg-black rounded p-2 "
                key={index}
              >
                <p>
                  {String(ticket?.jack_ticket_id).slice(0, 7)}
                  {[
                    "jack_release_no1",
                    "jack_release_no2",
                    "jack_release_no3",
                    "jack_release_no4",
                  ].map((key, idx) => {
                    const digit = String(ticket?.jack_last_digit).charAt(idx);
                    const match = String(ticket?.[key]) === digit;
                    return (
                      <span
                        key={key}
                        className={
                          match ? "text-gold-color font-bold blink" : ""
                        }
                      >
                        {digit}
                      </span>
                    );
                  })}
                </p>
              </div>
            )
          )}
        </div>
        {ticketList.length > 3 && (
          <button onClick={() => setShowAllTickets((prev) => !prev)}>
            {showAllTickets ? "Show Less" : "Show More...."}
          </button>
        )}
      </div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={wheelData}
        backgroundColors={[
          "#FF6B6B",
          "#FFD93D",
          "#6BCB77",
          "#4D96FF",
          "#A66DD4",
        ]}
        textColors={["#fff"]}
        fontSize={30}
        radiusLineWidth={1}
        outerBorderColor="#FFD700"
        outerBorderWidth={10}
        innerRadius={10}
        onStopSpinning={handleStopSpinning}
      />

      {Handlebutton && (
        <button
          onClick={handleSpinClick}
          style={{
            marginTop: 30,
            padding: "10px 25px",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: "#4D96FF",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          Spin
        </button>
      )}
    </div>
  );
};
