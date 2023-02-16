import { Container, Grid, Paper } from "@material-ui/core";
import React, { useState, useCallback, useEffect } from "react";
import SuccessSnackbar from "../../../Components/Containers/SucessSnackbar";
import { useSelector, useDispatch } from "react-redux";
import {
  action_setsnackbar,
  action_get_countertype,
  action_get_countertable,
} from "../../../Services/Actions/AdminActions";
import AddCashier from "./AddCashier";
import AddCashierTable from "./AddCashierTable";
export default function CashierMain() {
  const [open, setOpen] = useState();
  const dispatch = useDispatch();
  const setsnackbar = useSelector((state) => state.AdminReducers.setsnackbar);
  const handleClose = useCallback(() => {
    dispatch(action_setsnackbar("", "", false));
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const countertypelist = () => {
      if (mounted) {
        dispatch(action_get_countertype());
        dispatch(action_get_countertable());
      }
    };

    mounted && countertypelist();

    return () => {
      mounted = false;
    };
  }, [dispatch]);
  return (
    <div style={{marginTop:100}}>
    <SuccessSnackbar
      message={setsnackbar?.message}
      opens={setsnackbar?.open}
      close={false}
      type={setsnackbar?.type}
      handleClose={() => handleClose()}
    />
    <Container fixed>
      <Paper>
        <Grid container>
          <Grid item xs={6}>
            <AddCashier />
          </Grid>
          <Grid item xs={6}>
            <AddCashierTable />
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </div>
  );
}
