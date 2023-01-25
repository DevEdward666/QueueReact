import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  FormControl,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import {
  action_setsnackbar,
  action_add_counter,
  action_tableclick,
  action_get_countertable
} from "../../../Services/Actions/AdminActions";
import useStyles from "./style";
export default function AddCashier() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [typeclient, settypeclient] = useState("");

  const selectcountertype = useSelector(
    (state) => state.AdminReducers.countertype
  );
  const setbtntext = useSelector((state) => state.AdminReducers.setbtntext);
  const rescountertable = useSelector((state) => state.AdminReducers.add_counter_success);
  const handleChange = useCallback(async (event) => {
    settypeclient(event.target.value);
  }, []);
  const [countername, setcountername] = useState("");
  const handletextChange = (event) => {
    setcountername(event.target.value);
  };
  const handleSubmit = useCallback(() => {
    if (typeclient === "") {
      dispatch(action_setsnackbar("Please Fill Counter Type", "warning", true));
    } else if (countername === "") {
      dispatch(action_setsnackbar("Please Fill Counter Name", "warning", true));
    } else {
      dispatch(action_add_counter(countername, typeclient));
    }
  }, [countername, dispatch, typeclient]);
  useEffect(()=>{
    let mounted =true;
    const addcashiersuccess = async () => {
    if(mounted){ 
       dispatch(action_get_countertable());
    }
  }
    mounted && addcashiersuccess();
    return () => {
      return false;
    };
  },[dispatch,rescountertable])
  const handleCancel = useCallback(() => {
    dispatch(action_tableclick("Add"));
  }, [dispatch,]);
  return (
    <Container fixed>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography style={{ flexGrow: 1, fontSize: 24 }} key="">
            Add Cashier
          </Typography>
          <form className={classes.formControl} autoComplete="off">
            <TextField
              id="standard-basic"
              label="Counter Name"
              fullWidth={true}
              onChange={handletextChange}
            />
          </form>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Counter Type</InputLabel>
            <Select
              name="countertype"
              label="Countertype"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeclient}
              onChange={(e) => handleChange(e)}
            >
              {selectcountertype?.map((type, index) => (
                <MenuItem key={type.typename} value={type.typename}>
                  {type.typename}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              onClick={handleSubmit}
              style={{ borderRadius: 25, width: 150 }}
              className="submit-btn"
              variant="contained"
              size="large"
              color="primary"
            >
              {setbtntext}
            </Button>

            <Button
              onClick={handleCancel}
              style={{ borderRadius: 25, width: 150 }}
              className="submit-btn"
              variant="contained"
              size="large"
              color="secondary"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
