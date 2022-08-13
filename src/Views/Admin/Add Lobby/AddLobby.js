import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  action_setsnackbar,
  action_addlobby,
  action_lobbytable
} from "../../../Services/Actions/AdminActions";
import AddLobbyDtls from "./AddLobbyDtls";
import LobbyTable from "./LobbyTable";
export default function AddLobby() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [location, setlocation] = useState("");
  const [RerenderLobbyList, setRerenderLobbyList] = useState(0);
  
  const setcallback = useSelector((state) => state.AdminReducers.setcallback);
  const handletextChange = (event) => {
    setlocation(event.target.value);
  };
  const handleSubmit = useCallback(() => {
    if (location === "") {
      dispatch(action_setsnackbar("Please Fill Location ", "warning", true));
    } else {
      dispatch(action_addlobby(location));
      dispatch(action_lobbytable());
      setRerenderLobbyList((prevList) => prevList + 1);
    }
  }, [dispatch, location]);
  useEffect(()=>{
    let mounted =true;
    const addlobbysuccess = async () => {
    if(mounted){  
       dispatch(action_lobbytable());
    }
  }
    mounted && addlobbysuccess();
    return () => {
      return false;
    };
  },[dispatch,setcallback])
  return (
    <Grid container spacing={12}>
      <Grid item xs={6} style={{ padding: 20 }}>
        <form className={classes.formControl} autoComplete="off">
          <TextField
            id="standard-basic"
            label="Lobby Location"
            onChange={handletextChange}
            fullWidth={true}
          />
        </form>
        <Grid item xs={6} style={{ padding: 20, float: "right" }}>
          <Button
            onClick={handleSubmit}
            className="submit-btn"
            variant="contained"
            style={{ borderRadius: 25 }}
            size="small"
            color="primary"
            fullWidth={true}
          >
            <AddIcon /> Add Lobby Location
          </Button>
        </Grid>
        <Grid item lg={12} style={{ padding: 20, marginTop: 30 }}>
          <AddLobbyDtls />
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <LobbyTable />
      </Grid>
    </Grid>
  );
}
