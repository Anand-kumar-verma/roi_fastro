import {
  Box,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import theme from "../../utils/theme";

const GameHistory = ({ gid }) => {
  const isLoading = false;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const game_history_data = useSelector(
    (state) => state.aviator.gameHistory_trx_one_min
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      game_history_data?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, game_history_data]
  );

  if (isLoading)
    return (
      <div className="!w-full flex justify-center">
        <CircularProgress />
      </div>
    );
  return (
    <Box mt={2}>
      <TableContainer>
        <Table sx={{ maxWidth: 400 }} aria-label="simple table">
          <TableHead
            sx={{
              background: theme.palette.primary.main,
              "&>tr>th": {
                padding: 1,
                fontSize: "13px",
                fontWeight: 700,
                color: "white",
              },
            }}
          >
            <TableRow>
              <TableCell align="center">Period</TableCell>
              <TableCell align="center">Number</TableCell>
              <TableCell align="center">Big Small</TableCell>
              <TableCell align="center">Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "&>tr>td": { padding: "10px 5px", border: "none" },
              "&>tr": { borderBottom: "1px solid #ced4d7" },
            }}
          >
            {visibleRows?.map((i, index) => {
              return (
                <TableRow className="!text-white">
                  <TableCell align="center" className="!text-white">
                    {i?.gamesno}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", fontWeight: 900, color: "red" }}
                  >
                    <span
                      className={`
fp25 fw700
                ${
                  (i?.number === "0" &&
                    "!bg-gradient-to-t from-red-500 to-violet-400") ||
                  (i?.number === "5" &&
                    "!bg-gradient-to-t from-violet-400 to-green-400") ||
                  ((i?.number === "1" ||
                    i?.number === "3" ||
                    i?.number === "7" ||
                    i?.number === "9" ||
                    i?.number === "10") &&
                    "bg-gradient-to-t from-green-400 to-green-900") ||
                  ((i?.number === "2" ||
                    i?.number === "4" ||
                    i?.number === "6" ||
                    i?.number === "8" ||
                    i?.number === "30") &&
                    "bg-gradient-to-tl from-red-400 to-red-900") ||
                  (i?.number === "50" && "bg-[#3183ee]") ||
                  (i?.number === "40" && "bg-[#f1be24]") ||
                  (i?.number === "20" && "bg-[#eb2feb]")
                }
                transparentColor font-bold
                `}
                    >
                      {i?.number}
                    </span>
                  </TableCell>
                  <TableCell align="center" className="!text-white">
                    {Number(i?.number) <= 4 ? "SMALL" : "BIG"}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="!mt-2"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {i?.number === "0" || i?.number === "5" ? (
                      <div className="!flex !gap-1">
                        <div
                          className={`!w-[10px] !h-[10px] !rounded-full ${
                            (i?.number === "0" && " bg-[#be4345]") ||
                            (i?.number === "5" && "bg-[#249357]")
                          }`}
                        ></div>
                        <div
                          className={`!w-[10px] !h-[10px] !rounded-full ${
                            (i?.number === "0" && "bg-[#b065e9]") ||
                            (i?.number === "5" && "bg-[#b065e9]")
                          }`}
                        ></div>
                      </div>
                    ) : (
                      <>
                        {((i?.number === "1" ||
                          i?.number === "3" ||
                          i?.number === "7" ||
                          i?.number === "9" ||
                          i?.number === "10") && (
                          <div
                            className={`!w-[10px] !h-[10px] !rounded-full ${
                              (i?.number === "1" ||
                                i?.number === "3" ||
                                i?.number === "7" ||
                                i?.number === "9" ||
                                i?.number === "10") &&
                              "bg-[#249357]"
                            }`}
                          ></div>
                        )) ||
                          ((i?.number === "2" ||
                            i?.number === "4" ||
                            i?.number === "6" ||
                            i?.number === "8" ||
                            i?.number === "30") && (
                            <div
                              className={`!w-[10px] !h-[10px] !rounded-full ${
                                (i?.number === "2" ||
                                  i?.number === "4" ||
                                  i?.number === "6" ||
                                  i?.number === "8" ||
                                  i?.number === "30") &&
                                "bg-[#be4345]"
                              }`}
                            ></div>
                          )) || (
                            <div
                              className={`!w-[10px] !h-[10px] !rounded-full ${
                                (i?.number === "50" && "bg-[#68A1ED]") ||
                                (i?.number === "40" && "bg-[#D8B23E]") ||
                                (i?.number === "20" && "bg-[#FE63FF]")
                              }`}
                            ></div>
                          )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ background: "white", mt: 3 }}>
        <Stack spacing={2}>
          <TablePagination
            sx={{ background: "#7700ff", color: "white" }}
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={game_history_data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Rows"
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default GameHistory;
