import { CopyAll } from "@mui/icons-material";
import toast from "react-hot-toast";
import Navbar from "../../dashboard/Navbar";
import ButtomNavigation from "../../Layout/ButtomNaviagatoin";
import { frontend } from "../../utils/APIRoutes";

const ActivatoinLink = () => {
  const handleCopy = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <>
      <Navbar />
      <div
        className="flex h-screen overflow-y-scroll px-3 flex-col justify-center items-center bg-custom-gradient"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        {/* <p
          onClick={() => {
            copy(
              frontend +
                "/activation-link?token=" +
                btoa(localStorage.getItem("logindataen"))
            );
            toast.success("Copy to clipboard", { id: 1 });
          }}
          className="!text-[10px] flex flex-col !bg-text-color p-5 rounded-md"
        >
          <span>
            Copy Link:
            <CopyAll className="text-white" />
          </span>
          <span className="!text-blue-700">{frontend}/activation-link</span>
        </p> */}
        <div class="bg-gradient-to-r from-blue-700 to-blue-900 p-6 rounded-xl w-full max-w-sm mx-auto text-white shadow-lg">
          <div class="bg-blue-500 p-4 rounded-lg flex items-center justify-between space-x-4">
            <div>
              <p class="font-semibold text-gold-color text-lg">Copy Link:</p>
              <div class="text-sm text-blue-100 underline break-all">
                https://fastro.info/activation-link
              </div>
            </div>
            <button
              onClick={() => {
                handleCopy(
                  frontend +
                    "/activation-link?token=" +
                    btoa(localStorage.getItem("logindataen"))
                );
                // toast.success("Copy to clipboard", { id: 1 });
              }}
              class="bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <CopyAll className="text-gold-color" />
            </button>
          </div>
        </div>
      </div>
      <ButtomNavigation />
    </>
  );
};

export default ActivatoinLink;
