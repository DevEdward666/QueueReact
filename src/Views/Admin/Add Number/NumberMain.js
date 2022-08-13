import { Container, Paper } from "@material-ui/core";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  action_get_countertable,
  getcounters_table,
  action_setsnackbar,
  action_get_countertype
} from "../../../Services/Actions/AdminActions";
import SuccessSnackbar from "../../../Components/Containers/SucessSnackbar";
import AddNumber from "./AddNumber";
const NumberMain = () => {
  const dispatch = useDispatch();
  const setsnackbar = useSelector((state) => state.AdminReducers.setsnackbar);
  useEffect(() => {
    let mounted = true;
    const defaults = () => {
      if (mounted) {
        dispatch(action_get_countertype());
        dispatch(action_get_countertable());
        dispatch(getcounters_table());
      }
    };
    mounted && defaults();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  const handleClose = useCallback(() => {
    dispatch(action_setsnackbar("", "", false));
  }, [dispatch]);
  return (
    <Container fixed>
      <SuccessSnackbar
        message={setsnackbar?.message}
        opens={setsnackbar?.open}
        close={false}
        type={setsnackbar?.type}
        handleClose={() => handleClose()}
      />
      <Paper>
        <AddNumber />
      </Paper>
    </Container>
  );
};
export default NumberMain;
