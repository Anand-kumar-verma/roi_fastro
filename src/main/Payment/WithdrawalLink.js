import { CopyAll } from "@mui/icons-material";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import Navbar from "../../dashboard/Navbar";
import ButtomNavigation from "../../Layout/ButtomNaviagatoin";
import { frontend } from "../../utils/APIRoutes";

const WithdrawalLink = () => {
  return (
    <>
      <Navbar />
      <div
        className="flex h-screen overflow-y-scroll flex-col justify-center items-center bg-custom-gradient"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <p
          onClick={() => {
            copy(
              frontend +
                "/withdrawal-link?token=" +
                btoa(localStorage.getItem("logindataen"))
            );
            toast.success("Copy to clipboard", { id: 1 });
          }}
          className="!text-[10px] flex flex-col !bg-gray-200 p-5 rounded-md"
        >
          <span>
            Copy Link:
            <CopyAll />
          </span>
          <span className="!text-blue-500">{frontend}/withdrawal-link</span>
        </p>
      </div>
      <ButtomNavigation />
    </>
  );
};

export default WithdrawalLink;
