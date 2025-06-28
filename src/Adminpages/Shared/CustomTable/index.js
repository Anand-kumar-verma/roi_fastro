import {
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const CustomTable = ({
  tablehead,
  tablerow,
  className,
  isLoading,
  isTotal,
  isPagination,
}) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: "4px 10px !important", // Adjust the padding values as needed
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  // const visibleRows = React.useMemo(
  //   () => tablerow?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  //   [page, rowsPerPage, tablerow]
  // );
  return (
    <>
      <TableContainer sx={{}} className={className}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="!bg-white !bg-opacity-50">
            <TableRow>
              {tablehead.map((column) => (
                <TableCell className="!text-black !font-bold !bg-white !bg-opacity-50 !text-center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
                return (
                  <StyledTableRow>
                    {tablehead.map(() => (
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    ))}
                  </StyledTableRow>
                );
              })
            ) : tablerow?.length === 0 ? (
              <TableRow>
                {tablehead
                  ?.slice(0, parseInt(tablehead?.length / 2 - 1))
                  .map((column) => (
                    <TableCell></TableCell>
                  ))}
                <TableCell>No data Found</TableCell>
              </TableRow>
            ) : (
              tablerow?.map((row, index) => (
                <StyledTableRow
                  key={index}
                  className="hover:!bg-purple-200 cursor-pointer"
                >
                  {row?.map((i) => {
                    return (
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className=" !text-center !py-[10px]"
                      >
                        {i}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isTotal && isTotal}
      {/* <Box sx={{ background: "white", mt: 3 }}>
        <Stack spacing={2}>
          {isPagination && (
            <TablePagination
              className={"!bg-white !bg-opacity-30"}
              rowsPerPageOptions={[10, 15, 20]}
              component="div"
              count={tablerow?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows per page:"
            />
          )}
        </Stack>
      </Box> */}
    </>
  );
};

export default CustomTable;
