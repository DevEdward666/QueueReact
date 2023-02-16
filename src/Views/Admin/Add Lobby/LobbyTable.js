import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useStyles from "./style";
import {
  Button,
  Container,
  FormControl,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useSelector } from "react-redux";
export default function LobbyTable() {
  const classes = useStyles();
  const lobbytable = useSelector((state) => state.AdminReducers.lobbytable);
  const columns = [
    { id: "name", label: "Lobby no.", minWidth: 10 },
    { id: "type", label: "Location", minWidth: 10 },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    let mounted = true;
    const lobbylist = async () => {
      function createData(lobbyno, location) {
        return { lobbyno, location };
      }
      const tempRows = [];
      lobbytable?.map((data) =>
        tempRows.push(createData(data.lobbyno, data.location))
      );
      setRows(tempRows);
    };

    mounted && lobbylist();
    return () => {
      return false;
    };
  }, [lobbytable]);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
<div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
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
                <TableRow key={row.lobbyno} data-item={row}>
                  <TableCell>{row.lobbyno}</TableCell>
                  <TableCell>{row.location} </TableCell>
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
    </div>
  );
}
