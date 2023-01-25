import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { useCallback, useEffect, useState } from "react";
import useStyles from "./style";
import { useSelector } from "react-redux";
export default function NumberTable() {
  const classes = useStyles();
  const setcountertable = useSelector(
    (state) => state.AdminReducers.setcountertable
  );
  const columns = [
    { id: "number", label: "Number", minWidth: 10 },
    { id: "name", label: "Name", minWidth: 10 },
    { id: "type", label: "Type", minWidth: 10 },
  ];
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useEffect(() => {
    let mounted = true;
    const counterlist = async () => {
      function createData(counter_name, displayedto, type) {
        return { counter_name, displayedto, type };
      }
      const tempRows = [];
      setcountertable?.map((data) =>
        tempRows.push(
          createData(data.counter_name, data.displayedto, data.type)
        )
      );
      setRows(tempRows);
    };

    mounted && counterlist();
    return () => {
      return false;
    };
  }, [setcountertable]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
                  key={row.displayedto}
                  data-item={row}
                  //   onClick={() => handleTableData(row)}
                >
                  <TableCell>{row.counter_name}</TableCell>
                  <TableCell>{row.displayedto} </TableCell>
                  <TableCell>{row.type} </TableCell>
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
