import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import useStyle from "./style";
import { action_tableclick } from "../../../Services/Actions/AdminActions";
export default function AddCashierTable() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const countertable = useSelector((state) => state.AdminReducers.countertable);
  const columns = [
    { id: "name", label: "Counter Name", minWidth: 10 },
    { id: "type", label: "Counter Type", minWidth: 10 },
  ];
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);
  useEffect(() => {
    let mounted = true;
    const counterlist = async () => {
      function createData(countername, countertype) {
        return { countername, countertype };
      }
      const tempRows = [];
      countertable?.map((data) =>
        tempRows.push(createData(data.countername, data.countertype))
      );
      setRows(tempRows);
    };

    mounted && counterlist();
    return () => {
      return false;
    };
  }, [countertable]);
  const handleTableData = (event) => {
    console.log(event);
    // dispatch(action_tableclick("Update"));
  };
  return (
    <Grid item xs={12}>
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
                  <TableRow
                    key={index}
                    data-item={row}
                    onClick={() => handleTableData(row)}
                  >
                    <TableCell>{row.countername}</TableCell>
                    <TableCell>{row.countertype} </TableCell>
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
          onChangePage={(e, p) => handleChangePage(e, p)}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  );
}
