import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import {
  action_getmaxnumber,
  actions_GET_counterlist,
} from "../../Services/Actions/CashierActions";
import useStyles from "./styles";
export default function SetUpCounter() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectCounterNo, setselectCounterNo] = useState("");
  const [selectCounter, setselectCounter] = useState("");
  const counterno = useSelector((state) => state.CashierReducers.counters);
  const selectedcounter = useSelector(
    (state) => state.CashierReducers.selectedcounter
  );
  const selectcountertype = useSelector(
    (state) => state.CashierReducers.countertype
  );
  const [typecounterclient, settypecounterclient] = useState("");
  const handlecountertypeChange = (event) => {
    settypecounterclient(event.target.value);
  };
  const handleCounterClick = () => {
    window.localStorage.removeItem("countername");
    window.localStorage.removeItem("countertype");
    window.localStorage.removeItem("counterno");
    dispatch(action_getmaxnumber(selectCounter));
    window.localStorage.setItem("countername", selectCounter);
    window.localStorage.setItem("countertype", typecounterclient);
    window.localStorage.setItem("counterno", selectCounterNo);
  };
  const handleChangeCounterSelect = useCallback(
    async (event) => {
      await setselectCounter(event.target.value);
      dispatch(actions_GET_counterlist(event.target.value));
    },
    [dispatch]
  );
  const handleChangeCounterNoSelect = (event) => {
    setselectCounterNo(event.target.value);
  };
  return (
    <div>
      <Paper
        elevation={3}
        style={{ display: "grid", gridGap: "1em", padding: "1em" }}
        className={classes.paper}
      >
        <div>Choose Counter</div>
        <Grid container spacing={3} visible>
          <Grid item xs={4}>
            <FormControl className={classes.formCounterName}>
              <InputLabel id="demo-simple-select-label">
                Counter Name
              </InputLabel>
              <Select
                name="countertype"
                label="Countertype"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectCounter}
                fullWidth={true}
                onChange={handleChangeCounterSelect}
              >
                {counterno?.map((counters, index) => (
                  <MenuItem key={counters.countername} value={counters.countername}>
                    {counters.countername}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formCounterNo}>
              <InputLabel id="demo-simple-select-label">No.</InputLabel>
              <Select
                name="countertype"
                label="Countertype"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectCounterNo}
                fullWidth={true}
                onChange={handleChangeCounterNoSelect}
              >
                {selectedcounter?.map((no, index) => (
                  <MenuItem key={no.counter_name} value={no.counter_name}>
                    {no.counter_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl className={classes.formCounterType}>
              <InputLabel id="demo-simple-select-label">
                Counter Type
              </InputLabel>
              <Select
                name="countertype"
                label="Countertype"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typecounterclient}
                onChange={handlecountertypeChange}
              >
                {selectcountertype?.map((type, index) => (
                  <MenuItem key={type.typename} value={type.typename}>
                    {type.typename}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={handleCounterClick}
            style={{
              float: "right",
              borderRadius: 25,
            }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Grid>
      </Paper>
    </div>
  );
}
