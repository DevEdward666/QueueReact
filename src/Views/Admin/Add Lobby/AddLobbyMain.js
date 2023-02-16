import { Container, Paper } from "@material-ui/core";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  action_lobbytable,
  action_get_countertable,
  action_getcounternumber,
  action_setsnackbar,
} from "../../../Services/Actions/AdminActions";
import SuccessSnackbar from "../../../Components/Containers/SucessSnackbar";
import AddLobby from "./AddLobby";
export default function AddLobbyMain() {
  const dispatch = useDispatch();
  const setsnackbar = useSelector((state) => state.AdminReducers.setsnackbar);
  useEffect(() => {
    let mounted = true;
    const lobbylist = async () => {
      if (mounted) {
        dispatch(action_lobbytable());
        dispatch(action_get_countertable());
      }
    };

    mounted && lobbylist();

    return () => {
      mounted = false;
    };
  }, [dispatch]);
  const handleClose = useCallback(() => {
    dispatch(action_setsnackbar("", "", false));
  }, [dispatch]);
  return (
    <div style={{marginTop:100}}>
    <Container fixed>
      <SuccessSnackbar
        message={setsnackbar?.message}
        opens={setsnackbar?.open}
        close={false}
        type={setsnackbar?.type}
        handleClose={() => handleClose()}
      />
      <Paper>
        <AddLobby />
      </Paper>
    </Container>
    </div>
  );
}
