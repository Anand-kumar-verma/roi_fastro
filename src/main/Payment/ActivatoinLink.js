import React from "react";
import Navbar from "../../dashboard/Navbar";
import crypto from "../../images/crypto.jpg";
import { frontend } from "../../utils/APIRoutes";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { CopyAll } from "@mui/icons-material";

const ActivatoinLink = () => {
  return (
    <>
      <Navbar />
      <div
        className="flex min-h-screen flex-col justify-center items-center bg-custom-gradient"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <p
          onClick={() => {
            copy(
              frontend +
                "/activation-link?token=" +
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
          <span className="!text-blue-500">{frontend}/activation-link</span>
        </p>
      </div>
    </>
  );
};

export default ActivatoinLink;
