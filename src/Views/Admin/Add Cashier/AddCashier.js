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
  action_update_counter,
  action_tableclick,
  action_get_countertable
} from "../../../Services/Actions/AdminActions";
import useStyles from "./style";
export default function AddCashier() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [typeclient, settypeclient] = useState("");
  const [status, setstatus] = useState("");
  const selectcountertype = useSelector(
    (state) => state.AdminReducers.countertype
  );
  const getupdatecashier = useSelector(
    (state) => state.AdminReducers.update_cashier
  );
  const setbtntext = useSelector((state) => state.AdminReducers.setbtntext);
  const rescountertable = useSelector((state) => state.AdminReducers.add_counter_success);
  const handleChange = useCallback(async (event) => {
    settypeclient(event.target.value);
  }, []);
  const handleChangeStatus = useCallback(async (event) => {
    setstatus(event.target.value);
  }, []);
  const [countername, setcountername] = useState("");
  const [prevcountername, setprevcountername] = useState("");
  const handletextChange = (event) => {
    setcountername(event.target.value);
  };
  const handleSubmit = useCallback(() => {
    if (typeclient === "") {
      dispatch(action_setsnackbar("Please Fill Counter Type", "warning", true));
    } else if (countername === "") {
      dispatch(action_setsnackbar("Please Fill Counter Name", "warning", true));
    } else {
      if(setbtntext === 'Add') {
        dispatch(action_setsnackbar(rescountertable.message,"success", true));
        dispatch(action_add_counter(countername, typeclient,status));
      } else {
        dispatch(action_update_counter(getupdatecashier?.cashier_id,countername, typeclient,prevcountername,status));
        dispatch(action_setsnackbar("Counter Updated Successfully","success", true));
      
      }
      reset();
    }
  }, [countername, dispatch, typeclient,getupdatecashier?.cashier_id,status]);

  const reset=()=>{
    setcountername("");
    settypeclient("");
    setstatus("");
    dispatch(action_tableclick("Add"));
  }
  useEffect(()=>{
    let mounted =true;
    const addcashiersuccess = async () => {
    if(mounted){ 
       dispatch(action_get_countertable());
    }
  }
    mounted && addcashiersuccess();
    return () => {
      mounted = false;
    };
  },[dispatch,rescountertable])
  useEffect(()=>{
    let mounted =true;
    const updatecashier = async () => {
    if(mounted){ 
    setprevcountername(getupdatecashier?.cashier_name);
     setcountername(getupdatecashier?.cashier_name);
     settypeclient(getupdatecashier?.cashier_type);
     setstatus(getupdatecashier?.active);
     console.log('getupdatecashier', getupdatecashier);
    }
  }
    mounted && updatecashier();
    return () => {
      mounted = false;
    };
  },[getupdatecashier])
  const handleCancel = useCallback(() => {
    dispatch(action_tableclick("Add"));
    reset();
  }, [dispatch]);
  return (
    
    <Container fixed>
      
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography style={{ flexGrow: 1, fontSize: 24 }} key="">
            Add Counter
          </Typography>
          <form className={classes.formControl} autoComplete="off">
            <TextField
              id="standard-basic"
              label="Counter Name"
              fullWidth={true}
              value={countername}
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
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Counter Status</InputLabel>
            <Select
              name="activecounter"
              label="Counter Status"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={(e) => handleChangeStatus(e)}
            >
                <MenuItem  value='1'>
                  Active
                </MenuItem>
                <MenuItem value='0'>
                  Inactive
                </MenuItem>
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
              style={{ borderRadius: 15, width: 150, margin:10 }}
              className="submit-btn"
              variant="contained"
              size="large"
              color="primary"
            >
              {setbtntext}
            </Button>
            {setbtntext=== "Update"? 

               <Button
               onClick={reset}
               style={{ borderRadius: 15, width: 150,margin:10 }}
               className="submit-btn"
               variant="contained"
               size="large"
               color="primary"
             >
               Reset
             </Button>
            :
            <Button
              onClick={handleCancel}
              style={{ borderRadius: 15, width: 150,margin:10 }}
              className="submit-btn"
              variant="contained"
              size="large"
              color="primary"
            >
              Cancel
            </Button>
            
          }
            
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
