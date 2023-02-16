import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import moment from "moment";
import { Paper } from "@material-ui/core";
export default function ReceptionWaitingTable() {
  const classes = useStyles();
  const [authLoading, setauthLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const receptionwaitinglist = useSelector((state) => state.CashierReducers.receptionwaitingList);

  useEffect(() => {
    let mounted = true;
    setauthLoading(true);
    const waitlist = async () => {
      function createData(queueno, date) {
        return { queueno, date };
      }
      const tempRows = [];
      receptionwaitinglist?.map((data) =>
        tempRows.push(createData(data.queueno, data.docdate))
      );
      setRows(tempRows);
      setauthLoading(false);
    };

    mounted && waitlist();
    return () => {
      mounted = false;
    };
  }, [receptionwaitinglist]);
  const columns = [
    { id: "name", label: "Queue No", minWidth: 170 },
    { id: "code", label: "Date", minWidth: 100 },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(receptionwaitinglist)
  return (
    <Paper>
      <TableContainer style={{ maxHeight: 350, marginTop: 14 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                <TableCell
                  key={column.label}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <TableRow key={row.queueno}>
                  <TableCell>{row.queueno}</TableCell>
                  <TableCell>{moment(row.date).format("hh:mm:ss A")}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
