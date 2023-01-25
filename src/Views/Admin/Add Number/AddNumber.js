import {
  Button,
  Container,
  FormControl,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
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
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import {
  action_setsnackbar,
  addcounter_number,
  action_get_countertable,
  action_geno,
  getcounters_table,
} from "../../../Services/Actions/AdminActions";
import NumberTable from "./NumberTable";
export default function AddNumber() {
  const generate_number = useSelector(
    (state) => state.AdminReducers.generate_number
  );
  const countertable = useSelector((state) => state.AdminReducers.countertable);
  
  const add_counter_success = useSelector((state) => state.AdminReducers.add_counter_NUMBER_success);
  
  const selectcountertype = useSelector(
    (state) => state.AdminReducers.countertype
  );
  const [selectCounter, setselectCounter] = useState("");
  const [typeclient, settypeclient] = useState("");
  const [BtnTxt, setBtnTxt] = useState("Add Counter Number");
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleChangeCounterSelect = (event) => {
    setselectCounter(event.target.value);
  };
  const handleChange = (event) => {
    settypeclient(event.target.value);
  };
  const handleSubmit = useCallback(() => {
    if (selectCounter === "") {
      dispatch(action_setsnackbar("Please Fill Counter ", "warning", true));
    } else if (typeclient === "") {
      dispatch(action_setsnackbar("Please Fill Counter Type", "warning", true));
    } else {
      dispatch(
        addcounter_number(generate_number?.counterno, selectCounter, typeclient)
      );
      dispatch(action_get_countertable());
      
    }
  }, [dispatch, generate_number?.counterno, selectCounter, typeclient]);
  useEffect(() => {
    let mounted = true;
    const geno = async () => {
      dispatch(action_geno(selectCounter, typeclient));
    };

    mounted && geno();

    return () => {
      return false;
    };
  }, [selectCounter, typeclient, dispatch]);
useEffect(()=>{
  let mounted = true;
    const addnumbersuccess = async () => {
      if(mounted){
        if(add_counter_success.message!==""){
          dispatch(action_setsnackbar(add_counter_success.message,"success", true));
          dispatch(getcounters_table());
        }
      }
   
    };

    mounted && addnumbersuccess();

    return () => {
      return false;
    };
},[add_counter_success.message, dispatch])
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper
          elevation={3}
          style={{
            display: "grid",
            gridGap: "1em",
            padding: "1em",
          }}
          className={classes.paper}
        >
          Counter
          <div
            style={{
              fontSize: 50,
              fontWeight: 400,
            }}
          >
            {selectCounter}

            {generate_number?.counterno}
          </div>
        </Paper>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            Select Counter Name
          </InputLabel>
          <Select
            name="countertype"
            label="Countertype"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectCounter}
            onChange={handleChangeCounterSelect}
          >
            {countertable?.map((counters,index) => (
              <MenuItem key={counters.countername} value={counters.countername}>
                {counters.countername}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            Select Counter Type
          </InputLabel>
          <Select
            name="countertype"
            label="Countertype"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeclient}
            onChange={handleChange}
          >
            {selectcountertype?.map((type, index) => (
              <MenuItem key={type.typename} value={type.typename}>{type.typename}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid item xs={6} style={{ float: "right" }}>
          <Button
            onClick={handleSubmit}
            className="submit-btn"
            style={{ borderRadius: 25 }}
            variant="contained"
            size="large"
            color="primary"
            fullWidth={true}
          >
            <AddIcon /> {BtnTxt}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <NumberTable />
      </Grid>
    </Grid>
  );
}
