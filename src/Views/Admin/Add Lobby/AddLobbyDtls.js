import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Select,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import {
  action_setsnackbar,
  addlobbydtls,
  action_getcounternumber,
  action_lobbytable,
  action_get_countertable
} from "../../../Services/Actions/AdminActions";
export default function AddLobbyDtls() {
  const getcounternumber = useSelector(
    (state) => state.AdminReducers.getcounternumber
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const addcallback = useSelector((state) => state.AdminReducers.addcallback);
  const countertable = useSelector((state) => state.AdminReducers.countertable);
  const lobbytable = useSelector((state) => state.AdminReducers.lobbytable);
  const [selectCounter, setselectCounter] = useState("");
  const [selectCounterNo, setselectCounterNo] = useState(0);
  const [lobbySelected, setlobbySelected] = useState("");
  const handleChangeCounterSelect = (event) => {
    setselectCounter(event.target.value);
  };
  const handleChangeCounterNoSelect = (event) => {
    setselectCounterNo(event.target.value);
  };
  const handleChangeLobbySelect = (event) => {
    setlobbySelected(event.target.value);
  };
  const handleSubmit = useCallback(async () => {
    if (selectCounter === "") {
      dispatch(action_setsnackbar("Please Fill Counter ", "warning", true));
    } else if (selectCounterNo === "") {
      dispatch(action_setsnackbar("Please Fill Counter No", "warning", true));
    } else if (lobbySelected === "") {
      dispatch(action_setsnackbar("Please Fill Lobby ", "warning", true));
    } else {
      dispatch(addlobbydtls(lobbySelected, selectCounter, selectCounterNo));
    }
  }, [dispatch, lobbySelected, selectCounter, selectCounterNo]);
  useEffect(() => {
    let mounted = true;
    const checkifadded = () => {
      if (mounted) {
        if (addcallback) {
          dispatch(action_setsnackbar("Successfully Added", "info", true));
          dispatch(action_lobbytable());
          dispatch(action_get_countertable());
        }
      }
    };
    mounted && checkifadded();
    return () => {
      mounted = false;
    };
  }, [addcallback, dispatch]);
  useEffect(() => {
    let mounted = true;
    const counterlists = async () => {
      dispatch(action_getcounternumber(selectCounter));
    };

    mounted && counterlists();

    return () => {
      return false;
    };
  }, [dispatch, selectCounter]);
  return (
    <Grid container spacing={3}>
      <Grid item lg={12}>
        <Paper
          elevation={3}
          style={{
            display: "grid",
            gridGap: "1em",
            padding: "1em",
          }}
          className={classes.paper}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            <Grid container spacing={3}>
              <Grid item lg={10}>
                <FormControl className={classes.formControl}>
                  <InputLabel
                    id="demo-simple-select-label"
                    className={classes.counterSelect}
                  >
                    Select Counter Name
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
                    {countertable?.map((counters, index) => (
                      <MenuItem
                        key={counters.countername}
                        value={counters.countername}
                      >
                        {counters.countername}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={2}>
                <FormControl className={classes.formControl}>
                  <InputLabel
                    id="demo-simple-select-label"
                    className={classes.counterSelect}
                  >
                    No.
                  </InputLabel>
                  <Select
                    name="countertype"
                    label="Countertype"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectCounterNo}
                    fullWidth={true}
                    onChange={handleChangeCounterNoSelect}
                  >
                    {getcounternumber?.map((no) => (
                      <MenuItem key={no.counter_name} value={no.counter_name}>
                        {no.counter_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel
                    id="demo-simple-select-label"
                    className={classes.counterSelect}
                  >
                    Select Lobby
                  </InputLabel>
                  <Select
                    name="countertype"
                    label="Countertype"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={lobbySelected}
                    fullWidth={true}
                    onChange={handleChangeLobbySelect}
                  >
                    {lobbytable?.map((lobby) => (
                      <MenuItem key={lobby.lobbyno} value={lobby.lobbyno}>
                        {lobby.location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} style={{ float: "right" }}>
                <Button
                  onClick={() => handleSubmit()}
                  className="submit-btn"
                  style={{ borderRadius: 25 }}
                  variant="contained"
                  size="small"
                  color="primary"
                  fullWidth={true}
                >
                  <AddIcon /> Add Lobby Details
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
