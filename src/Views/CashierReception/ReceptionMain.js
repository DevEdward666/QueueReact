import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  action_reception_generatenext,
  action_getUserinfo,
  action_reception_waitinglist,
  get_client_message,
  action_GET_getcountermaintable,
  action_getcountertype,
} from "../../Services/Actions/CashierActions";
import ReceptionCashierUI from "./ReceptionCashierUI";
export default function ReceptionMain() {
  const dispatch = useDispatch();
  const [notify, setnotify] = useState("");
  const data = useSelector((state) => state.CashierReducers.data);
  const history = useHistory();
  useEffect(() => {
    let mounted = true;
    const getredirect = () => {
      if(mounted) {
        dispatch(action_getUserinfo());
        dispatch(action_reception_waitinglist());
        dispatch(action_reception_generatenext());
      }
    };
    mounted && getredirect();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  if (data?.redirectto === "GENERATOR") {
    history.push("/");
  }
  useEffect(() => {
    let mounted = true;
    const getgenerated = async () => {
      if (notify?.from === "GENERATE") {
        dispatch(action_reception_waitinglist());
        dispatch(action_reception_generatenext());
      }
    };
    mounted && getgenerated();
    return () => {
      mounted = false;
    };
  }, [dispatch, notify]);
  useEffect(() => {
    let mounted = true;
    const getclienttsendmessage = async () => {
      if (mounted) {
        dispatch(get_client_message());
      }
    };

    mounted && getclienttsendmessage();

    return () => {
      mounted = false;
    };
  }, [dispatch]);
  useEffect(() => {
    let mounted = true;
    const counterlists = () => {
      if(mounted) {
      dispatch(action_reception_generatenext());
      dispatch(action_GET_getcountermaintable());
      dispatch(action_getcountertype());
      dispatch(action_reception_waitinglist());
      }
    };

    mounted && counterlists();

    return () => {
      mounted = false;
    };
  }, [dispatch]);
  return (
    <div style={{ marginTop: 100 }}>
      <Container maxWidth="sm">
        <ReceptionCashierUI />
      </Container>
    </div>
  );
}
