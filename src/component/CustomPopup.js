import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import cardImg from "../images/fast_roi_popup.jpg";
import CloseIcon from "@mui/icons-material/Close";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaRegWindowClose } from "react-icons/fa";
import { Height } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // 90% width on extra-small (mobile) screens
    sm: 400, // 400px width on small and up
  },
  height: {
    // 90% width on extra-small (mobile) screens
    sm: 450, // 400px width on small and up
  },
  bgcolor: "transparent",
  // boxShadow: 24,
};

export default function CustomPopup({
  
  onChangeFun = () => null,
  open = false,
  handleClose,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, position: "relative" }}>
          <div className=" flex flex-row gap-3 pr-0 justify-end items-end bg-white">
            <FaRegWindowClose
              onClick={onChangeFun}
              className=" cursor-pointer text-red-600"
              size={25}
            />
            <FaRegWindowClose
              onClick={handleClose}
              className=" cursor-pointer text-green-600"
              size={25}
            />
          </div>

          <img src={cardImg} />
        </Box>
      </Modal>
    </div>
  );
}
