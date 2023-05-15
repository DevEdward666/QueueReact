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
  action_reception_generatenext,
  action_generate_numbers,
  action_get_reception_last_queue,
  action_keep,
  action_served,
  action_reception_waitinglist,
  notifytoserve,
} from "../../Services/Actions/CashierActions";
import {
  action_notify_signal_mobile,
  action_set_notification,
} from "../../Services/Actions/DefaultActions";
import { getserved } from "../../Services/Actions/QueueActions";
import useStyles from "./styles";
import ReceptionWaitingTable from "./ReceptionWaitingTable";
export default function ReceptionCashierUI() {
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
  const reception_generate = useSelector((state) => state.CashierReducers.reception_generatenext);
  const served = useSelector((state) => state.CashierReducers.served);
  const keep = useSelector((state) => state.CashierReducers.keep);

  const receptionlastqueue = useSelector((state) => state.CashierReducers.receptionlastqueue);
  const data = useSelector((state) => state.CashierReducers.data);
  const hubconnectnotify = useSelector(
    (state) => state.DefaultReducers.hubconnectnotify
  );
  const [totalticket, settotalticket] = useState(0);
  const storecountername = window.localStorage.getItem("countername");
  const storecountertype = window.localStorage.getItem("countertype");
  const storecounterno = window.localStorage.getItem("counterno");
  const number_generated_cashier = useSelector(
    (state) => state.CashierReducers.number_generated_cashier
  );
  const [typeclient, settypeclient] = useState("");
  const [manualqueueno, setmanualqueueno] = useState("");
  const [notify, setnotify] = useState("");
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
          if (number_generated_cashier) {
            dispatch(action_reception_waitinglist());
            dispatch(action_reception_generatenext());
            dispatch(action_get_reception_last_queue());
          }
          dispatch(action_reception_waitinglist());
          dispatch(action_reception_generatenext());
          dispatch(action_get_reception_last_queue());
      }
    };
    mounted && alreadysetup();
    return () => {
      mounted = false;
    };
  }, [
    dispatch,
    number_generated_cashier,
    storecountername,
    storecountertype,
    rerenderWaitingList,
    rerenderBilling,
    notify,
  ]);
  useEffect(() => {
    if (storecountername) {
      setnotnull(false);
    }
  }, [storecountername]);
  const ManualNotify = useCallback(() => {
    dispatch(
      action_set_notification(
        true,
        manualqueueno,
        "Reception",
        "CASHIER",
        ''
      )
    );
  },[dispatch, manualqueueno]);
  const Notify = useCallback(
    async (card) => {
      dispatch(action_get_reception_last_queue());
      if (receptionlastqueue.length>0) {
         //------COMMENTED THIS IS FOR MOBILE SMS NOTIFICATION IF THE USERS QUEUE NUMBER IS NEAR
        dispatch(
          action_set_notification(
            true,
            receptionlastqueue[0]?.queueno,
            receptionlastqueue[0]?.counter,
            "CASHIER",
            ''
          )
        );
      }
    },
    [dispatch, receptionlastqueue, storecounterno]
  );
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
      dispatch(action_get_reception_last_queue());
      if (keep) {
        setRerenderBilling((prevBilling) => prevBilling + 1);
        setRerenderWaitingList((prevList) => prevList + 1);
      }
    },
    [dispatch, keep]
  );
  const Served = useCallback(
    async (card) => {
      if(card.queueno !== null || card.countername !== null)
      dispatch(action_served(card.queueno, card.countername, "1"));
      dispatch(notifytoserve(card.queueno, card.countername, "1"));
      dispatch(getserved(card.queueno, card.countername, "1"));
      dispatch(
        action_set_notification(
          true,
          card.queueno,
          card.countername,
          "CASHIER",
          "1"
        )
      );
      //------COMMENTED THIS IS FOR MOBILE SMS NOTIFICATION IF THE USERS QUEUE NUMBER IS NEAR
      dispatch(
        action_notify_signal_mobile(
          true,
          card.queueno,
          card.countername,
          "CASHIER",
          "1"
        )
      );
      if (served) {
        //  await setPlay(true);
        // var utterThis = new SpeechSynthesisUtterance(`Queue Number ${card.queueno}. Please go to ${card.countername} . Counter ${storecounterno}.`);
        //  utterThis.voice = voices[20];

        //  await synth.speak(utterThis);

        await setRerenderBilling((prevBilling) => prevBilling + 1);
        await setRerenderWaitingList((prevList) => prevList + 1);
        var number = phonenumber;
        if (number !== " +63") {
          sendmessage();
        }
      }
    },
    [dispatch, served, phonenumber]
  );
  const handletextChange = (event) => {
    setmanualqueueno(event.target.value);
  };
  return (
    <div style={{ marginTop: 100 }}>
    <Container maxWidth="lg">
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Grid item xs={12}>
          <Grid item xs={8}>
          <Paper
                elevation={3}
                style={{
                  display: "grid",
                  gridGap: "1em",
                  padding: "1em",
                }}
                className={classes.paper}
              >
              
            {reception_generate?.map((card, index) => (
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
                <Grid container spacing={6}>
                  {/* <Grid item xs={4}>
                    <Button
                      variant="contained"
                      style={{ borderRadius: 25, width: "100%" }}
                      onClick={() => Notify(card)}
                    >
                      Notify
                    </Button>
                  </Grid> */}
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: 25, width: "100%",alignContent:"center" }}
                      onClick={() => Keep(card)}
                    >
                      Keep
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      style={{ borderRadius: 25, width: "100%",alignContent:"center" }}
                      color="primary"
                      onClick={() => Served(card)}
                    >
                      Serve
                    </Button>
                  </Grid>
                </Grid>
                </>
            ))}
               {receptionlastqueue?.map((lastqueue, index) => (
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
              >
              
               {lastqueue?.counter}
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
              <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      style={{ borderRadius: 25,alignContent:"center" }}
                      onClick={() => Notify()}
                    >
                      Notify
                    </Button>
                  </Grid>
                </Grid>
                </>
                ))}
            </Paper>
          </Grid>
          <Grid item xs={8}>
          <Paper
                elevation={3}
                style={{
                  display: "grid",
                  gridGap: "1em",
                  padding: "1em",
                  marginTop: "1em",
                }}
                className={classes.paper}
              >
          <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
              
                Notify Number
              </div>
               <div
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                }}
              >
              
              Reception
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                }}
                name="queueno"
              >
             <form className={classes.formControl} autoComplete="off">
              <TextField
              id="standard-basic"
              label="Queue Number"
              fullWidth={true}
              value={manualqueueno}
              onChange={handletextChange}
            />
            </form>
              </div>
              <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      style={{ borderRadius: 25,alignContent:"center" }}
                      onClick={() => ManualNotify()}
                    >
                      Manual Notify
                    </Button>
                  </Grid>
                </Grid>
                </Paper>
                </Grid>
        </Grid>
        
        {/* <Grid item xs={12}>
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
        </Grid> */}
        {/* <Grid item xs={12}>
          <Grid item xs={12}>
            {visible ? <SetUpCounter /> : null}
          </Grid>
        </Grid> */}
      </Grid>
      <Grid item xs={6}>
        <Grid item xs={12}>
          <ReceptionWaitingTable />
        </Grid>
      </Grid>
    </Grid>
    </Container>
    </div>
  );
}
