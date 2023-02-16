import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
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
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  insert_user_queue,
  action_userlists,
  action_userlists_select,
  action_getcounternumber,
  action_setsnackbar,
  action_get_countertable
} from "../../../Services/Actions/AdminActions";
import Select2 from "react-select";
import UserTable from "./UserTable";
export default function UsermanageUI() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userlists = useSelector((state) => state.AdminReducers.userlists);
  const userlistselect = useSelector(
    (state) => state.AdminReducers.userlistselect
  );
  const countertable = useSelector((state) => state.AdminReducers.countertable);
  const countertype = useSelector((state) => state.AdminReducers.countertype);
  const getcounternumber = useSelector(
    (state) => state.AdminReducers.getcounternumber
  );
  const [users, setusers] = useState("");
  const [counter, setcounter] = useState("");
  const [type, settype] = useState([]);
  const [counternumber, setcounternumber] = useState("");
  console.log(countertable)
  // const emp_options = userlistselect.map((item) => [
  //   { value: item?.empname, label: item?.empname },
  // ]);

  const handleChangeusers = useCallback((event) => {
    setusers(event.target.value);
    dispatch(action_get_countertable());
  },[dispatch]);
  const handleChangecounter = useCallback((event) => {
    setcounter(event.target.value);
    dispatch(action_getcounternumber(event.target.value));
  },[dispatch]);
  const handleChangecounternumber = (event) => {
    setcounternumber(event.target.value);
  };
  const handleChangetype = (event) => {
    settype(event.target.value);
  };
  useEffect(() => {
    let mounted = true;
    const getuserlist = () => {
      if (mounted) {
        dispatch(action_userlists());
        dispatch(action_userlists_select());
      }
    };
    mounted && getuserlist();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  const handleSubmit = useCallback(() => {
    if (users === "") {
      dispatch(action_setsnackbar("Please Fill User ", "warning", true));
    } else if (counter === "") {
      dispatch(action_setsnackbar("Please Fill Counter ", "warning", true));
    }  else if (counternumber === "") {
      dispatch(action_setsnackbar("Please Fill Counter Number", "warning", true));
    }else {

      dispatch(insert_user_queue(users, counternumber, counter, type));
    }
  }, [dispatch, users, counternumber, counter, type]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={5}>
        <Paper
          elevation={3}
          style={{ display: "grid", gridGap: "1em", padding: "1em" }}
          className={classes.paper}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
            }}
          >
            Assign User
          </div>
        </Paper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <FormControl className={classes.userSelect}>
              <InputLabel id="demo-simple-select-label">
                Select User
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={users}
                fullWidth={true}
                onChange={handleChangeusers}
              >
                {userlistselect?.map((item, index) => (
                  <MenuItem key={item.username} value={item.username}>
                    {item.empname}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl className={classes.formCounter}>
              <InputLabel id="demo-simple-select-label">
                Select Counter Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={counter}
                fullWidth={true}
                onChange={handleChangecounter}
              >
                {countertable?.map((counter, index) => (
                  <MenuItem key={counter.countername} value={counter.countername}>
                    {counter.countername}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formControlType}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                fullWidth={true}
                onChange={handleChangetype}
              >
                {countertype?.map((type, index) => (
                  <MenuItem key={type.typename} value={type.typename}>{type.typename}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl className={classes.formCounterNo}>
              <InputLabel id="demo-simple-select-label">No.</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={counternumber}
                onChange={handleChangecounternumber}
              >
                {getcounternumber?.map((counternumber, index) => (
                  <MenuItem key={counternumber.counter_name} value={counternumber.counter_name}>
                    {counternumber.counter_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              onClick={handleSubmit}
              className="submit-btn"
              style={{ borderRadius: 25 }}
              variant="contained"
              color="primary"
            >
              <AddIcon /> Confirm Assignment
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={7}>
        <UserTable />
      </Grid>
    </Grid>
  );
}
