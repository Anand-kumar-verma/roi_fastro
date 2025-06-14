import { CopyAll } from "@mui/icons-material";
import toast from "react-hot-toast";
import Navbar from "../../dashboard/Navbar";
import ButtomNavigation from "../../Layout/ButtomNaviagatoin";
import { frontend } from "../../utils/APIRoutes";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BuyTicket = () => {
  const navigate = useNavigate();
  const handleCopy = (url) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast.error("Failed to copy link.");
        });
    } else {
      // Fallback method for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          toast.success("Link copied to clipboard!");
        } else {
          toast.error("Copy failed. Please try manually.");
        }
      } catch (err) {
        console.error("Fallback copy failed: ", err);
        toast.error("Clipboard not supported in this browser.");
      }

      document.body.removeChild(textArea);
    }
  };
  return (
    <>
      <Navbar />
      <div
        className="flex h-screen overflow-y-scroll px-3 flex-col justify-center items-center bg-custom-gradient"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <div className="!flex justify-between gap-5">
          <Button
            onClick={() => navigate("/ticket-list")}
            color="secondary"
            className="!bg-gold-color"
          >
            Your Ticket
          </Button>
          <Button
            onClick={() => navigate("/winner-list")}
            color="secondary"
            className="!bg-gold-color"
          >
            Top winners
          </Button>
        </div>
        <div class="bg-gradient-to-r from-blue-700 to-blue-900 p-6 rounded-xl w-full mt-5 max-w-sm mx-auto text-white shadow-lg">
          <div class="bg-blue-500 p-4 rounded-lg flex items-center justify-between space-x-4">
            <div>
              <p class="font-semibold text-gold-color text-lg">Copy Link:</p>
              <p class="font-semibold text-gold-color text-lg">
                Deposit USDT/FST
              </p>
              <div class="text-sm text-blue-100 underline break-all">
                {frontend}/game_usdt
              </div>
            </div>
            {localStorage.getItem("uid") && (
              <button
                onClick={() => {
                  handleCopy(
                    frontend +
                      "/jackpot-payin?token=" +
                      localStorage.getItem("uid")
                  );
                  // toast.success("Copy to clipboard", { id: 1 });
                }}
                class="bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                <CopyAll className="text-gold-color" />
              </button>
            )}
          </div>
        </div>
        {/* <div class="bg-gradient-to-r from-blue-700 to-blue-900 p-6 rounded-xl w-full max-w-sm mx-auto text-white shadow-lg">
          <div class="bg-blue-500 p-4 rounded-lg flex items-center justify-between space-x-4">
            <div>
              <p class="font-semibold text-gold-color text-lg">Copy Link:</p>
              <p class="font-semibold text-gold-color text-lg">Deposit FST</p>
              <div class="text-sm text-blue-100 underline break-all">
                {frontend}/game_fst
              </div>
            </div>
            {localStorage.getItem("uid") && (
              <button
                onClick={() => {
                  handleCopy(
                    frontend + "/game-fst?token=" + localStorage.getItem("uid")
                  );
                  // toast.success("Copy to clipboard", { id: 1 });
                }}
                class="bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                <CopyAll className="text-gold-color" />
              </button>
            )}
          </div>
        </div> */}
      </div>
      <ButtomNavigation />
    </>
  );
};

export default BuyTicket;
