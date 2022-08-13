import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QueueUI from "./QueueUI";
import {
  action_getCounterList,
  set_counterview,
  selectedpage
} from "../../Services/Actions/QueueActions";
import { getuserinfo } from "../../Services/Actions/DefaultActions";
import NextTone from "./Player/NextTone";
import UseModal from "../../Plugin/Modal/UseModal";
import useStyles from "./style";
export default function Main() {
  const dispatch = useDispatch();
  const classes = useStyles();
  var synth = window.speechSynthesis;
  var voices = synth.getVoices();
  const selectedLobby = useSelector(
    (state) => state.QueueReducers.selectedLobby
  );

  const [play, setPlay] = useState(false);
  const [open, setOpen] = useState(false);
  const [lobbynoexist, setlobbynoexist] = useState("");
  const [notify, setnotify] = useState("");
  const [notifymobile, setnotifymobile] = useState("");
  const hubconnectnotify = useSelector(
    (state) => state.DefaultReducers.hubconnectnotify
  );
  const hubconnectnotifymobile = useSelector(
    (state) => state.DefaultReducers.hubconnectnotifymobile
  );
  const served = useSelector((state) => state.CashierReducers.served);
  const pagelist = useSelector((state) => state.QueueReducers.pagelist);
  
  //   const lastqueue = useSelector((state) => state.CashierReducers.lastqueue);
  useEffect(() => {
    let mounted = true;
    const createHubConnection = async () => {
      try {
        hubconnectnotify.on("notifytoreact", async (data) => {
          await setnotify({
            Notification: data.notification,
            from: data.from,
            type: data.type,
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
  useEffect(() => {
    let mounted = true;
    const createHubConnection = async () => {
      try {
        hubconnectnotifymobile.on("notifyfrommobile", async (data) => {
          await setnotifymobile({
            Notification: data.notification,
            from: data.from,
            type: data.type,
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
  }, [dispatch, hubconnectnotifymobile]);
  useEffect(() => {
    let mounted = true;

    const getallnumbers = async () => {
      if (selectedLobby?.selected?.lobbyinfo) {
        dispatch(action_getCounterList(selectedLobby?.selected?.lobbyinfo[0]));

        // setlobbynoexist(counterlist.success);
        if (selectedLobby?.selected?.lobbyinfo[1] === "ALL") {
          dispatch(set_counterview(true));
        } else {
          dispatch(set_counterview(false));
        }
      }
    };

    mounted && getallnumbers();

    return () => {
      return false;
    };
  }, [dispatch, selectedLobby, served, notify, notifymobile]);
  
  useEffect(() => {
    let mounted = true;

    const getinfo = async () => {
      dispatch(getuserinfo());
      if (!lobbynoexist) {
        setOpen(true);
        dispatch(selectedpage(true));
      }
    };

    mounted && getinfo();

    return () => {
      return false;
    };
  }, [dispatch, lobbynoexist]);
  useEffect(() => {
    let mounted = true;
    const getinfo = async () => {
      if (!pagelist) {
        setOpen(pagelist);
      }
    };
    mounted && getinfo();
    return () => {
      return false;
    };
  }, [dispatch, pagelist]);
  useEffect(() => {
    let mounted = true;

    const notifys = async () => {
      console.log(notify)
      //   if (lastqueue !== [] && lastqueue[0]?.queueno !== undefined) {
      //     var utterThis = new SpeechSynthesisUtterance(
      //       `Queue Number ${lastqueue[0]?.queueno}. Please go to ${notify?.type} . Counter ${notify?.to}.`
      //     );
      //     setPlay(true);
      //     utterThis.voice = voices[20];

      //     await synth.speak(utterThis);
      //   } else
      if (notify.from === "CASHIER") {
        var utterThis2 = new SpeechSynthesisUtterance(
          `Queue Number ${notify?.Notification}. Please go to ${notify?.type} . Counter ${notify?.to}.`
        );
        setPlay(true);
        utterThis2.voice = voices[22];
        await synth.speak(utterThis2);
      } else if (notifymobile.from === "CASHIER") {
        var utterThis3 = new SpeechSynthesisUtterance(
          `Queue Number ${notifymobile?.Notification}. Please go to ${notifymobile?.type} . Counter ${notifymobile?.to}.`
        );
        setPlay(true);
        utterThis3.voice = voices[22];
        await synth.speak(utterThis3);
      }
    };

    mounted && notifys();

    return () => {
      return false;
    };
  }, [notify, synth, voices, notifymobile]);
  return (
    <div className={classes.root}>
      <NextTone handlePlay={() => play} />
      <UseModal open={open} handleClose={() => setOpen(false)} />
      <QueueUI />
    </div>
  );
}
