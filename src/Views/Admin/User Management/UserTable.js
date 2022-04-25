import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import useStyles from "./style";
import { useSelector } from "react-redux";
export default function UserTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const userlists = useSelector((state) => state.AdminReducers.userlists);
  const [rows, setRows] = useState([]);
  const columns = [
    { id: "username", label: "Username", minWidth: 50 },
    { id: "fullname", label: "Fullname", minWidth: 50 },
    { id: "countername", label: "Counter Name", minWidth: 50 },
    { id: "counterno", label: "Counter No.", minWidth: 50 },
    { id: "countertype", label: "Counter type", minWidth: 50 },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    let mounted = true;
    const tableuser = async () => {
      if (mounted) {
        function createData(username, fullname, redirectto, accnt_type, type) {
          return { username, fullname, redirectto, accnt_type, type };
        }
        const tempRows = [];
        userlists?.map((data) =>
          tempRows.push(
            createData(
              data.username,
              data.fullname,
              data.redirectto,
              data.accnt_type,
              data.type
            )
          )
        );
        setRows(tempRows);
      }
    };

    mounted && tableuser();
    return () => {
      mounted = false;
    };
  }, [userlists]);
  return (
    <Paper
      className={classes.root}
      elevation={3}
      style={{ display: "grid", gridGap: "1em", padding: "1em" }}
    >
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell key={column.id} align="center" width={50}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell style={{ width: "2%" }}>{row.username}</TableCell>
                  <TableCell style={{ width: "30%" }}>
                    {row.fullname}{" "}
                  </TableCell>
                  <TableCell style={{ width: "15%" }}>
                    {row.redirectto}
                  </TableCell>
                  <TableCell style={{ width: "10%" }}>
                    {row.accnt_type}
                  </TableCell>
                  <TableCell style={{ width: "15%" }}>{row.type} </TableCell>
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
