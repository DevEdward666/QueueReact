import { Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actions_sendmessage,
  action_generatenext,
  action_generate_numbers,
  action_get_last_queue,
  action_keep,
  action_served,
  action_waitinglist,
  notifytoserve,
} from "../../Services/Actions/CashierActions";
import {
  action_notify_signal_mobile,
  action_set_notification,
} from "../../Services/Actions/DefaultActions";
import { getserved } from "../../Services/Actions/QueueActions";
import SetUpCounter from "./SetUpCounter";
import useStyles from "./styles";
import WaitingTable from "./WaitingTable";
export default function CashierUI() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [notnull, setnotnull] = useState(true);

  const [phonenumber, setphonenumber] = useState("");

  const [visible, setvisible] = useState(false);
  const [rerenderBilling, setRerenderBilling] = useState(0);
  const [rerenderWaitingList, setRerenderWaitingList] = useState(0);
  const messageinfo = useSelector((state) => state.CashierReducers.message);
  const messagephonenumber = useSelector(
    (state) => state.CashierReducers.phonenumber
  );

  const maxnumber = useSelector((state) => state.CashierReducers.maxnumber);
  const queueno = useSelector(
    (state) => state.CashierReducers.generatedqueuenumber
  );
  const generate = useSelector((state) => state.CashierReducers.generatenext);
  const served = useSelector((state) => state.CashierReducers.served);
  const keep = useSelector((state) => state.CashierReducers.keep);

  const lastqueue = useSelector((state) => state.CashierReducers.lastqueue);
  const data = useSelector((state) => state.CashierReducers.data);
  const hubconnectnotify = useSelector(
    (state) => state.DefaultReducers.hubconnectnotify
  );
  const [totalticket, settotalticket] = useState(0);
  const [resetcounter, setresetcounter] = useState(false);
  const storecountername = window.localStorage.getItem("countername");
  const storecountertype = window.localStorage.getItem("countertype");
  const storecounterno = window.localStorage.getItem("counterno");
  const number_generated_cashier = useSelector(
    (state) => state.CashierReducers.number_generated_cashier
  );
  const [typeclient, settypeclient] = useState("");
  const [notify, setnotify] = useState("");
  const [notifyCounterName, setnotifyCounterName] = useState("");
  const [notified, setNotified] = useState(false);
  const handleChange = useCallback((event) => {
    settypeclient(event.target.value);
  }, []);
  useEffect(() => {
    let mounted = true;
    const createHubConnection = async () => {
      try {
        hubconnectnotify.on("notifytoreact", async (data) => {
          await setnotify({
            Notification: data.notification,
            from: data.from,
            to: data.to,
          });
        });
      } catch (err) {
        // alert(err);
        // console.log(err);
        console.log("Error while establishing connection: " + { err });
      }
    };
    mounted && createHubConnection();
    return () => (mounted = false);
  }, [dispatch, hubconnectnotify]);
  const sendmessage = () => {
    dispatch(actions_sendmessage(messagephonenumber, messageinfo));
  };
  useEffect(() => {
    let mounted = true;
    const alreadysetup = () => {
      if (mounted) {
        if (storecountername !== null) {
          if (number_generated_cashier) {
            dispatch(action_waitinglist(storecountername, storecountertype));
            dispatch(action_generatenext(storecountername, storecountertype));
            dispatch(action_get_last_queue(storecounterno, storecountername));
            setvisible(false);
          }
          dispatch(action_waitinglist(storecountername, storecountertype));
          dispatch(action_generatenext(storecountername, storecountertype));
          dispatch(action_get_last_queue(storecounterno, storecountername));
          setvisible(false);
        } else {
          setvisible(true);
        }
      }
    };
    mounted && alreadysetup();
    return () => {
      mounted = false;
    };
  }, [
    dispatch,
    lastqueue,
    number_generated_cashier,
    storecountername,
    storecountertype,
    rerenderWaitingList,
    rerenderBilling,
    notify,
    resetcounter,
  ]);
  useEffect(() => {
    if (storecountername) {
      setnotnull(false);
    }
  }, [storecountername]);
  const Notify = useCallback(
    async (card) => {
      dispatch(action_get_last_queue(storecounterno, lastqueue[0].countername));
      setnotifyCounterName(lastqueue[0].counter);
      setNotified(true);
    },
    [dispatch, lastqueue, storecounterno]
  );
  useEffect(() => {
    let mounted =true;
    const notify = () => {
      if(mounted){
        if (lastqueue.length>0 && notified) {
          //------COMMENTED THIS IS FOR MOBILE SMS NOTIFICATION IF THE USERS QUEUE NUMBER IS NEAR
         dispatch(
           action_set_notification(
             true,
             lastqueue[0].queueno,
             notifyCounterName,
             "CASHIER",
             storecounterno.toString()
           )
         );
       }
      }
    };
    mounted && notify();
    return () => {
      mounted = false;
      setnotifyCounterName("");
      setNotified(false);
    };
  }, [dispatch,lastqueue,storecounterno]);
  const Keep = useCallback(
    async (card) => {
      dispatch(action_keep(card.queueno, card.countername, storecounterno));
       //------COMMENTED THIS IS FOR MOBILE SMS NOTIFICATION IF THE USERS QUEUE NUMBER IS NEAR
      dispatch(
        action_set_notification(
          true,
          card.queueno,
          card.countername,
          "CASHIER",
          storecounterno.toString()
        )
      );
       //------COMMENTED THIS IS FOR MOBILE SMS NOTIFICATION IF THE USERS QUEUE NUMBER IS NEAR
      // dispatch(
      //   action_notify_signal_mobile(
      //     true,
      //     card.queueno,
      //     card.countername,
      //     "CASHIER",
      //     storecounterno
      //   )
      // );
      dispatch(action_get_last_queue(storecounterno, card.countername));
      if (keep) {
        setRerenderBilling((prevBilling) => prevBilling + 1);
        setRerenderWaitingList((prevList) => prevList + 1);
      }
    },
    [dispatch, keep, storecounterno]
  );
  const Served = useCallback(
    async (card) => {
      dispatch(action_get_last_queue(storecounterno, card.countername));
      setnotifyCounterName(card.countername);
      dispatch(action_served(card.queueno, card.countername, storecounterno));
      dispatch(notifytoserve(card.queueno, card.countername, storecounterno));
      dispatch(getserved(card.queueno, card.countername, storecounterno));
      dispatch(
        action_set_notification(
          true,
          card.queueno,
          card.countername,
          "CASHIER",
          storecounterno.toString()
        )
      );
      //------COMMENTED THIS IS FOR MOBILE SMS NOTIFICATION IF THE USERS QUEUE NUMBER IS NEAR
      // dispatch(
      //   action_notify_signal_mobile(
      //     true,
      //     card.queueno,
      //     card.countername,
      //     "CASHIER",
      //     storecounterno.toString()
      //   )
      // );
      if (served) {
        //  await setPlay(true);
        // var utterThis = new SpeechSynthesisUtterance(`Queue Number ${card.queueno}. Please go to ${card.countername} . Counter ${storecounterno}.`);
        //  utterThis.voice = voices[20];

        //  await synth.speak(utterThis);

        await setRerenderBilling((prevBilling) => prevBilling + 1);
        await setRerenderWaitingList((prevList) => prevList + 1);

        // var number = phonenumber;
        // if (number !== " +63") {
        //   sendmessage();
        // }
      }
    },
    [dispatch, storecounterno, served, phonenumber]
  );
  const generatenumber = useCallback(async () => {
    dispatch(
      action_generate_numbers(
        queueno?.queueno,
        storecountername,
        typeclient,
        maxnumber?.data.Maxnumber,
        data?.redirectto,
        totalticket
      )
    );
    dispatch(action_waitinglist(storecountername, storecountertype));
    dispatch(action_generatenext(storecountername, storecountertype));
    if (number_generated_cashier) {
      dispatch(action_waitinglist(storecountername, storecountertype));
      dispatch(action_generatenext(storecountername, storecountertype));
    }
  }, [
    dispatch,
    queueno?.queueno,
    storecountername,
    typeclient,
    maxnumber?.data.Maxnumber,
    data?.redirectto,
    totalticket,
    number_generated_cashier,
    storecountertype,
  ]);
  const handletextChange = (event) => {
    settotalticket(event.target.value);
  };
  const resetCounter = useCallback(()=>{
    setvisible(true);
    window.localStorage.removeItem("countername");
    window.localStorage.removeItem("countertype");
    window.localStorage.removeItem("counterno");
    window.location.href = "/Cashier";
    setresetcounter(true);
  },[])
  return (
    <Grid container spacing={8} justify="center">
      <Grid item xs={5}>
        <Grid item xs={12} style={{ marginBottom: 20 }}>
          <Grid item xs={12}>
          <Paper
                elevation={3}
                style={{
                  display: "grid",
                  gridGap: "1em",
                  padding: "1em",
                }}
                className={classes.paper}
              >
            {generate?.map((card, index) => 
             (
              <>
               <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
              
              NEXT TO SERVE
              </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                  key={card.queueno}
                >
                  {card.countername}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                  }}
                  name="queueno"
                >
                  {card.queueno.split('|')[2]  <= parseInt('0009')?
                  card.queueno.split('|')[2].substring(3):
                  card.queueno.split('|')[2]  <= parseInt('0099')?
                  card.queueno.split('|')[2].substring(2):
                  card.queueno.split('|')[2]  <= parseInt('0999')?
                  card.queueno.split('|')[2].substring(1):
                 card.queueno.split('|')[2].substring(2)}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 400,
                  }}
                  name="queueno"
                >
                 
                  Counter: {storecounterno}
                </div>
                <Grid container spacing={6}>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      style={{ borderRadius: 25, width: "100%" }}
                      onClick={() => Notify(card)}
                      disabled={notnull}
                    >
                      Notify
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: 25, width: "100%" }}
                      onClick={() => Keep(card)}
                      disabled={notnull}
                    >
                      Keep
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      style={{ borderRadius: 25, width: "100%" }}
                      color="primary"
                      onClick={() => Served(card)}
                      disabled={notnull}
                    >
                      Served
                    </Button>
                  </Grid>
                </Grid>
                </>
            ))}
            {lastqueue?.map((lastqueue, index) => 
             (
              <>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
              
              NOW SERVING
              </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                  key={lastqueue.queueno}
                >
                  {lastqueue.counter}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                  }}
                  name="queueno"
                >
                  {lastqueue.queueno.split('|')[2]  <= parseInt('0009')?
                  lastqueue.queueno.split('|')[2].substring(3):
                  lastqueue.queueno.split('|')[2]  <= parseInt('0099')?
                  lastqueue.queueno.split('|')[2].substring(2):
                  lastqueue.queueno.split('|')[2]  <= parseInt('0999')?
                  lastqueue.queueno.split('|')[2].substring(1):
                 lastqueue.queueno.split('|')[2].substring(2)}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 400,
                  }}
                  name="queueno"
                >
                 
                  Counter: {storecounterno}
                </div>
                </>
            ))}
             </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            {visible ? null : (
              <Paper
                elevation={3}
                style={{ display: "grid", gridGap: "1em", padding: "1em" }}
                className={classes.paper}
              >
                <div>Generate Ticket</div>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typeclient}
                        onChange={handleChange}
                      >
                        <MenuItem value="Regular">Regular</MenuItem>
                        <MenuItem value="Senior">Priority</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <form
                      className={classes.formControl}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="standard-basic"
                        label="Quantity"
                        onChange={handletextChange}
                      />
                    </form>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={() => generatenumber()}
                    style={{
                      float: "right",
                      borderRadius: 25,
                    }}
                    variant="contained"
                    color="primary"
                    disabled={notnull}
                  >
                    Generate
                  </Button>
                </Grid>
              </Paper>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            {visible ? <SetUpCounter /> : null}
          </Grid>
        </Grid>
        {!visible ?
        <Paper
        elevation={3}
        style={{ display: "grid", gridGap: "1em", padding: "1em",marginBottom: 20 }}
        className={classes.paper}
        >
       <Grid container spacing={3}>
    
          <Grid item xs={12}>
          <Button
          onClick={() => resetCounter()}
          style={{
            float: "left",
            borderRadius: 25,
          }}
          variant="contained"
          color="secondary"
          disabled={notnull}
          >
            Change Counter
            </Button>
          </Grid>
        </Grid>
        </Paper> : null}
      
      </Grid>
      <Grid item xs={7}>
        <Grid item xs={12}>
          <WaitingTable />
        </Grid>
      </Grid>
    </Grid>
  );
}
