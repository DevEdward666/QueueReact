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
import Artyom from 'artyom.js';
export default function Main() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedLobby = useSelector(
    (state) => state.QueueReducers.selectedLobby
  );

  const [play, setPlay] = useState(false);
  const [open, setOpen] = useState(false);
  const [lobbynoexist, setlobbynoexist] = useState("");
  const [ToSpeak, setToSpeak] = useState("");
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
        dispatch(action_getCounterList(selectedLobby?.selected?.lobbyinfo[0],selectedLobby?.selected?.lobbyinfo[1]));

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
    let i=0;
    var assistant = new Artyom();
    const notifys = async () => {
      if(mounted){
        if (notify.from === "CASHIER" &&  notify?.type !== "info") {
          if(notify?.type !== undefined ){
            setPlay(true);
            assistant.say( `Queue Number ${notify?.Notification}. Please go to ${notify?.type} . Counter ${notify?.to}.`, {
              lang:"en-US",
             onStart: function() {
                 if(assistant.isSpeaking()){
                  i++;
                  if(i>1){
                    assistant.fatality()
  
                  }
                 }
             },
           });
          }
        } else if (notifymobile.from === "CASHIER" &&  notify?.type !== "info") {
          if(notify?.type !== undefined){
          setPlay(true);
            assistant.say( `Queue Number ${notify?.Notification}. Please go to ${notify?.type} . Counter ${notify?.to}.`, {
              lang:"en-US",
             onStart: function() {
                 if(assistant.isSpeaking()){
                  i++;
                  if(i>1){
                    assistant.fatality()
                  }
                 }
             },
           });
          }
        }
      }
    };

    mounted && notifys();
    return () => {
      assistant.fatality();
      setPlay(false);
      mounted = false;
    };
  }, [notify,notifymobile]);
  return (
    <div className={classes.root}>
      <NextTone handlePlay={() => play} />
      <UseModal open={open} handleClose={() => setOpen(false)} />
      <QueueUI />
    </div>
  );
}
