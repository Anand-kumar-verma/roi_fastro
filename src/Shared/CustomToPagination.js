import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IconButton } from "@mui/material";
const CustomToPagination = ({ setPage, page, data }) => {
  return (
    <div className="bg-black w-full flex items-center justify-end gap-4 p-3 rounded">
      <span className="text-white font-semibold">
        Total Pages: <span className="text-blue-600">{data?.totalPage}</span>
      </span>
      <span className="text-white font-semibold">
        Current Page: <span className="text-green-600">{data?.currPage}</span>
      </span>

      <IconButton
        className="transition-transform duration-200 hover:scale-110  rounded-full"
        onClick={() => setPage(page - 1 > 0 ? page - 1 : 1)}
      >
        <ChevronLeftIcon className="text-gray-700" />
      </IconButton>

      <IconButton
        className="transition-transform duration-200 hover:scale-110  rounded-full"
        onClick={() =>
          setPage(page + 1 < data?.totalPage ? page + 1 : data?.totalPage)
        }
      >
        <ChevronRightIcon className="text-gray-700" />
      </IconButton>
    </div>
  );
};

export default CustomToPagination;
