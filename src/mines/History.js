import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { apiConnectorGet } from "../utils/APIConnector";
import { endpoint } from "../utils/APIRoutes";
import Navbar from "../dashboard/Navbar";
import CustomCircularProgress from "../wingo/shared/loder/CustomCircularProgress";
const zubgback = "#00ECBE"
const zubgmid = "#00ECBE"
const zubgbackgrad = "#00ECBE"

function MinesHistory() {
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

 
  const { isLoading, data } = useQuery(
    ["mines"],
    () => apiConnectorGet(endpoint?.mines_history),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
  const res = data?.data?.data;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setVisibleRows(
      res?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    );
  }, [page, rowsPerPage, res]);
  if (!isLoading && !res)
    return (
       <>
       <Navbar />
        <Container
          sx={{
            width: "100%",
            height: "100vh",
            overflow: "auto",
            mb: 5,
          }}
        >
          <Box sx={style.header}>
            <Box component={NavLink} onClick={goBack}>
              <KeyboardArrowLeftOutlinedIcon />
            </Box>
            <p>Mines History</p>
          </Box>
          <div>
            <img className="" src={"nodatafoundimage"} />
          </div>
        </Container>
       </>
    );
  return ( 
    <>
    <Navbar/>
      <Container
        sx={{
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
        className="no-scrollbar"
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <p>Mines History</p>
        </Box>
        <div className="!overflow-x-auto" style={{ width: "95%", marginLeft: '2.5%', marginTop: '16px', }}>
          <Table sx={{ background: "black", boxShadow: "#fff" }}>
            <TableHead>
              <TableRow >
                <TableCell sx={{ color: 'white' }} className="!p-2 !font-bold !border !text-xs !border-r  !text-center !border-b !border-white" id="tablepadding">S.No</TableCell>
                <TableCell sx={{ color: 'white' }} className="!p-2 !font-bold !border !text-xs !border-r !text-center  !border-b !border-white" id="tablepadding">Amount</TableCell>
                <TableCell sx={{ color: 'white' }} className="!p-2 !font-bold !border !text-xs !border-r !text-center  !border-b !border-white" id="tablepadding">Win</TableCell>
                <TableCell sx={{ color: 'white' }} className="!p-2 !font-bold !border !text-xs !border-r !text-center  !border-b !border-white" id="tablepadding">Multiplier</TableCell>
                <TableCell sx={{ color: 'white' }} className="!p-2 !font-bold !border !text-xs !border-r !text-center  !border-b !border-white" id="tablepadding">Status</TableCell>
                <TableCell sx={{ color: 'white' }} className="!p-2 !font-bold !border !text-xs !border-r !text-center  !border-b !border-white" id="tablepadding">Date/Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows?.map((i, index) => (
                <TableRow key={i?.id}>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !mt-5  !border-b !border-white">{index + 1}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{Number(i?.amount)?.toFixed(2)}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">{Number(i?.win)?.toFixed(2)}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !border-b !border-white">{Number(i?.multiplier)?.toFixed(2)}</TableCell>
                  <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center !border-b !border-white">{String(i?.status)==="1" ? 
                   <span className="text-green-500 font-bold">Win</span> :  <span className="text-red-500 font-bold">Loss</span>}</TableCell>
             
                <TableCell sx={{ color: 'white' }} className="!border !border-r !text-xs !text-center  !border-b !border-white">
                    {moment?.utc(i?.datetime).format("DD-MM-YYYY HH:mm")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box className="paginationTable ">
            <TablePagination
              sx={{
                background: "black",
                color: "white",
                borderRadius: "10px",
                marginTop: "10px",
                mb: 10,
              }}
              rowsPerPageOptions={[10, 15, 25, 35]}
              component="div"
              count={res?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows"
            />
          </Box>
        </div>
      </Container>
    </>
  );
}

export default MinesHistory;

const style = {
  header: {
    padding: "15px 8px",
    background: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "15px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
  },
  wthui: {
    textAlign: "center",
    width: "32%",
    minHeight: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white" },
  },
  paymentlink: {
    width: "32%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    "&>p": {
      color: "white",
      fontSize: "12px",
      fontWeight: "500",
      textAlign: "center",
      mt: "5px",
    },
  },
  paymentBoxOuter: {
    width: "95%",
    margin: "auto",
    my: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paytmbtn: {
    mb: 2,
    background: zubgback,
    color: "white !important",
    width: "31%",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: zubgbackgrad,
    color: "white !important",
    width: "100%",
    mt: 2,
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};














