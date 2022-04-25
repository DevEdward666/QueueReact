import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  action_generatenext,
  action_getUserinfo,
  action_waitinglist,
  get_client_message,
  action_GET_getcountermaintable,
  action_getcountertype,
} from "../../Services/Actions/CashierActions";
import CashierUI from "./CashierUI";
export default function Main() {
  const dispatch = useDispatch();
  const [notify, setnotify] = useState("");
  const storecountername = window.localStorage.getItem("countername");
  const storecountertype = window.localStorage.getItem("countertype");
  const storecounterno = window.localStorage.getItem("counterno");
  const data = useSelector((state) => state.CashierReducers.data);
  const history = useHistory();
  useEffect(() => {
    let mounted = true;

    const getredirect = () => {
      dispatch(action_getUserinfo());

      dispatch(action_generatenext(storecountername, storecountertype));
    };
    mounted && getredirect();
    return () => {
      mounted = false;
    };
  }, [dispatch, storecountername, storecountertype]);
  if (data?.redirectto === "GENERATOR") {
    history.push("/");
  }
  useEffect(() => {
    let mounted = true;
    const getgenerated = async () => {
      if (notify?.from === "GENERATE") {
        dispatch(action_waitinglist(storecountername, storecountertype));
        dispatch(action_generatenext(storecountername, storecountertype));
      }
    };
    mounted && getgenerated();
    return () => {
      mounted = false;
    };
  }, [dispatch, notify, storecountername, storecountertype]);
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
    const counterlists = async () => {
      dispatch(action_GET_getcountermaintable());
      dispatch(action_getcountertype());
    };

    mounted && counterlists();

    return () => {
      mounted = false;
    };
  }, [dispatch]);
  return (
    <div style={{ marginTop: 20 }}>
      <Container>
        <CashierUI />
      </Container>
    </div>
  );
}
