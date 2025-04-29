import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IconButton } from "@mui/material";
const CustomToPagination = ({ setPage, page, data }) => {
  return (
    <div className="bg-custom-gradient w-full flex items-center justify-end gap-4 p-3 rounded ">
      <span className=" font-semibold text-text-color">
        Total Pages: <span className="text-text-colo">{data?.totalPage}</span>
      </span>
      <span className=" font-semibold text-text-color">
        Current Page: <span className="text-text-color">{data?.currPage}</span>
      </span>

      <IconButton
        className="transition-transform duration-200 hover:scale-110  rounded-full"
        onClick={() => setPage(page - 1 > 0 ? page - 1 : 1)}
      >
        <ChevronLeftIcon className="text-text-color" />
      </IconButton>

      <IconButton
        className="transition-transform duration-200 hover:scale-110  rounded-full"
        onClick={() =>
          setPage(page + 1 < data?.totalPage ? page + 1 : data?.totalPage)
        }
      >
        <ChevronRightIcon className="text-text-color" />
      </IconButton>
    </div>
  );
};

export default CustomToPagination;
