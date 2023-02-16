import { Container } from "@material-ui/core";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsermanageUI from "./UsermanageUI";
import {
  action_setsnackbar,
  addcounter_number,
  action_get_countertable,
  action_get_countertype
} from "../../../Services/Actions/AdminActions";
import SuccessSnackbar from "../../../Components/Containers/SucessSnackbar";
export default function MainUserManage() {
  const dispatch = useDispatch();
  const setsnackbar = useSelector((state) => state.AdminReducers.setsnackbar);
  useEffect(()=>{
    let mounted = true;
      const getcounters = () => {
        if(mounted){
            dispatch(action_get_countertable());
            dispatch(action_get_countertype());
        }
      };
      mounted && getcounters();
      return () => {
        mounted = false;
      };
  },[dispatch])
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
      <UsermanageUI />
    </Container>
    </div>
  );
}
