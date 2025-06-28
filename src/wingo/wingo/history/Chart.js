import { Box, Stack, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Chart = ({ gid }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [cor, setcor] = React.useState([]);
  const [preData, setPreData] = useState([]);
  const game_history = useSelector(
    (state) => state.aviator.gameHistory_trx_one_min
  );

  useEffect(() => {
    setPreData([]);
    const array = [];
    let get0 = game_history?.findIndex(
      (element) => element.tr41_slot_id - 1 === 0
    );
    let get1 = game_history?.findIndex(
      (element) => element.tr41_slot_id - 1 === 1
    );
    let get2 = game_history?.findIndex(
      (element) => element.tr41_slot_id - 1 === 2
    );
    let get3 = game_history?.findIndex(
      (element) => element.tr41_slot_id - 1 === 3
    );
    let get4 = game_history?.findIndex(
      (element) => element.tr41_slot_id - 1 === 4
    );
    let get5 = game_history?.findIndex(
      (element) => element.tr41_slot_id - 1 === 5
    );
    let get6 = game_history?.findIndex(
      (element) => element.tr41_slot_id - 1 === 6
    );
    let get7 = game_history?.findIndex(
      (element) => element.tr41_slot_id - 1 === 7
    );
    let get8 = game_history?.findIndex(
      (element) => element.tr41_slot_id - 1 === 8
    );
    let get9 = game_history?.findIndex(
      (element) => element.tr41_slot_id - 1 === 9
    );
    array.push(
      get0 < 0 ? 100 : get0,
      get1 < 0 ? 100 : get1,
      get2 < 0 ? 100 : get2,
      get3 < 0 ? 100 : get3,
      get4 < 0 ? 100 : get4,
      get5 < 0 ? 100 : get5,
      get6 < 0 ? 100 : get6,
      get7 < 0 ? 100 : get7,
      get8 < 0 ? 100 : get8,
      get9 < 0 ? 100 : get9
    );
    setPreData(array);
  }, [game_history]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      game_history?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, game_history]
  );
  React.useEffect(() => {
    if (visibleRows && game_history?.length > 0) {
      const parent = document.getElementById("parent");
      const parentRect = parent.getBoundingClientRect();
      const newCor = visibleRows?.map((element, index) => {
        const childId =
          element.number === "0"
            ? `zero${index}`
            : element.number === "1"
            ? `one${index}`
            : element.number === "2"
            ? `two${index}`
            : element.number === "3"
            ? `three${index}`
            : element.number === "4"
            ? `four${index}`
            : element.number === "5"
            ? `five${index}`
            : element.number === "6"
            ? `six${index}`
            : element.number === "7"
            ? `seven${index}`
            : element.number === "8"
            ? `eight${index}`
            : `nine${index}`;
        const childRect = document
          .getElementById(childId)
          .getBoundingClientRect();
        const centerX = childRect.left + childRect.width / 2 - parentRect.left;
        const centerY = childRect.top + childRect.height / 2 - parentRect.top;

        return { x: centerX, y: centerY };
      });
      setcor(newCor);
    }
  }, [visibleRows]);

  return (
    <Box className="!bg-custom-gradient">
      <div className="relative !h-[65vh] overflow-auto !w-[100%] no-scrollbar !overflow-x-hidden">
        <div className="absolute !w-[100%]">
          {visibleRows?.map((i, indexi) => {
            return (
              <Box
                sx={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid white",
                }}
              >
                <div className="flex justify-between">
                  <span
                    className={` text-[14px]
                          !bg-gradient-to-t from-[#FE63FF] to-[#007AFF]
                           transparentColor font-bold  pr-5
                          `}
                  >
                    {i?.gamesno}
                  </span>
                  {/* // main box of chart form 0 to 9 */}
                  <Box className="flex items-center justify-between !w-[80%]   lg:!w-[70%]">
                    {/* /// 0   //// */}
                    <div
                      id={`zero${indexi}`}
                      className={`${
                        i?.number === "0" ? "!z-20" : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        sx={{ fontsize: "5px" }}
                        className={`circleNumberbody   ${
                          i?.number === "0"
                            ? "!bg-gradient-to-b from-[#e85053] to-[#8c06f2] !text-white !mr-1 !font-bold circleNumberbody-number"
                            : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px]  !border-black   circleNumberbody-number"
                        }`}
                      >
                        {" "}
                        0
                      </Typography>
                    </div>
                    {/* /// 1   //// */}
                    <div
                      id={`one${indexi}`}
                      className={`${
                        i?.number === "1" ? "!z-20" : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody  ${
                          i?.number === "1"
                            ? "!bg-[#4bef98] !text-white !mr-1 !font-bold circleNumberbody-number"
                            : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                        }`}
                      >
                        {" "}
                        1
                      </Typography>
                    </div>
                    {/* /// 2   //// */}
                    <div
                      id={`two${indexi}`}
                      className={`${
                        i?.number === "2" ? "!z-20" : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody   ${
                          i?.number === "2"
                            ? "!bg-[#f1494c] !text-white !font-bold !mr-1 circleNumberbody-number"
                            : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                        }`}
                      >
                        {" "}
                        2
                      </Typography>
                    </div>
                    {/* /// 3   //// */}
                    <div
                      id={`three${indexi}`}
                      className={`${
                        i?.number === "3" ? "!z-20" : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody  ${
                          i?.number === "3"
                            ? "!bg-[#46eb93] !text-white !font-bold !mr-1 circleNumberbody-number"
                            : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                        }`}
                      >
                        {" "}
                        3
                      </Typography>
                    </div>
                    {/* /// 4   //// */}
                    <div
                      id={`four${indexi}`}
                      className={`${
                        i?.number === "4" ? "!z-20" : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody ${
                          i?.number === "4"
                            ? "!bg-[#ed4b4e] !text-white !font-bold !mr-1 circleNumberbody-number"
                            : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                        }`}
                      >
                        {" "}
                        4
                      </Typography>
                    </div>
                    {/* /// 5   //// */}
                    <div
                      id={`five${indexi}`}
                      className={`${
                        i?.number === "5" ? "!z-20" : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody ${
                          i?.number === "5"
                            ? "!bg-gradient-to-b from-[#55f8a1] to-[#8c06f2] !text-white !mr-1 !font-bold circleNumberbody-number"
                            : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                        }`}
                      >
                        {" "}
                        5
                      </Typography>
                    </div>
                    {/* /// 6   //// */}
                    <div
                      id={`six${indexi}`}
                      className={`${
                        i?.number === "6" ? "!z-20" : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody ${
                          i?.number === "6"
                            ? "!bg-[#f54b4e] !text-white !font-bold !mr-1 circleNumberbody-number"
                            : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                        }`}
                      >
                        {" "}
                        6
                      </Typography>
                    </div>
                    {/* /// 7   //// */}
                    <div
                      id={`seven${indexi}`}
                      className={`${
                        i?.number === "7" ? "!z-20" : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody ${
                          i?.number === "7"
                            ? "!bg-[#4af499] !text-white !font-bold !mr-1 circleNumberbody-number"
                            : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                        }`}
                      >
                        {" "}
                        7
                      </Typography>
                    </div>
                    {/* /// 8   //// */}
                    <div
                      id={`eight${indexi}`}
                      className={`${
                        i?.number === "8" ? "!z-20" : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody  ${
                          i?.number === "8"
                            ? "!bg-[#eb494c] !text-white !font-bold !mr-1 circleNumberbody-number"
                            : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                        }`}
                      >
                        {" "}
                        8
                      </Typography>
                    </div>
                    {/* /// 9   //// */}
                    <div
                      id={`nine${indexi}`}
                      className={`${
                        i?.number === "9" ? "!z-20" : "!z-[-10px]"
                      }`}
                    >
                      <Typography
                        className={`circleNumberbody  ${
                          i?.number === "9"
                            ? "!bg-[#4cf199] !text-white !font-bold !mr-1 circleNumberbody-number"
                            : "!bg-white !text-black !border-[1px] !mr-1 !text-[5px] !border-black  circleNumberbody-number"
                        }`}
                      >
                        {" "}
                        9
                      </Typography>
                    </div>
                    <Typography
                      className={`circleNumberbody ${
                        i?.number <= 4 ? "!bg-[#468ce8] " : "!bg-[#df4be1]"
                      }  !h-[20px] !w-[20px] !rounded-full !text-center circleNumberbody-number !mr-1 !text-[5px] !text-white `}
                    >
                      {i?.tr41_slot_id?.toString() <= 4 ? "S" : "B"}
                    </Typography>
                  </Box>
                </div>
              </Box>
            );
          })}
        </div>
        <div className=" h-[100%] w-[100%] absolute flex justify-end">
          <div className="!w-[80%] lg:!w-[70%]" id="parent">
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              className="z-10 absolute"
            >
              {cor?.map((i, index) => {
                return (
                  index > 0 && (
                    <line
                      x1={cor?.[index]?.x}
                      y1={cor?.[index]?.y}
                      x2={cor?.[index - 1]?.x}
                      y2={cor?.[index - 1]?.y}
                      stroke="#FBAC3D"
                      stroke-width="2"
                      fill="none"
                    />
                  )
                );
              })}
            </svg>
          </div>
        </div>
      </div>
      <Box sx={{ background: "white", mt: 3 }}>
        <Stack spacing={2}>
          <TablePagination
            sx={{ background: "#7700ff", color: "white" }}
            rowsPerPageOptions={[10]}
            component="div"
            count={game_history?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Rows"
          />
        </Stack>
      </Box>
      {/* <CustomCircularProgress isLoading={isLoading} /> */}
    </Box>
  );
};

export default Chart;
