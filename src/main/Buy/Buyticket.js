import { CopyAll } from "@mui/icons-material";
import toast from "react-hot-toast";
import Navbar from "../../dashboard/Navbar";
import ButtomNavigation from "../../Layout/ButtomNaviagatoin";
import { frontend } from "../../utils/APIRoutes";
import { Button, Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import metamask from "../../images/metamask.png";
import trustwallet from "../../images/trustwallet.jpeg";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
const BuyTicket = () => {
  const [openWallet, setOpenWallet] = useState(false);

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
  const handleWalletClick = (wallet) => {
    const uid = localStorage.getItem("uid");
    if (!uid) return;

    const encodedUid = encodeURIComponent(uid);
    let url = "";

    if (wallet === "metamask") {
      url = `https://metamask.app.link/dapp/fastro.info/jackpot-payin?token=${encodedUid}`;
    } else if (wallet === "trustwallet") {
      url = `https://link.trustwallet.com/open_url?coin_id=20000714&url=https%3A%2F%2Ffastro.info%2Fjackpot-payin%3Ftoken%3D${encodedUid}`;
    }

    if (url) {
      window.open(url);
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
          <Button
            onClick={() => {
              setOpenWallet(true);
            }}
            color="secondary"
            className="!bg-gold-color"
          >
            Buy Ticket
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
        <Dialog open={openWallet}>
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-auto text-center">
            {/* Close Button */}
            <button
              onClick={() => setOpenWallet(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <CancelIcon />
            </button>

            <p className="text-xl font-extrabold text-gray-800 mb-4">
              Select Wallet
            </p>
            <div className="flex justify-around gap-4">
              <div className="cursor-pointer hover:scale-105 transition-transform duration-200">
                <img
                  onClick={() => handleWalletClick("trustwallet")}
                  className="h-24 w-24 mx-auto"
                  src={trustwallet}
                  alt="Trust Wallet"
                />
                <p className="mt-2 text-sm font-medium text-gray-600">
                  Trust Wallet
                </p>
              </div>
              <div className="cursor-pointer hover:scale-105 transition-transform duration-200">
                <img
                  onClick={() => handleWalletClick("metamask")}
                  className="h-24 w-24 mx-auto"
                  src={metamask}
                  alt="MetaMask"
                />
                <p className="mt-2 text-sm font-medium text-gray-600">
                  MetaMask
                </p>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
      <ButtomNavigation />
    </>
  );
};

export default BuyTicket;
