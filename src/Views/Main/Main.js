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
import annoucement from "../../Assets/Music/announcement.mp3";
import UseModal from "../../Plugin/Modal/UseModal";
import useStyles from "./style";
import Artyom from 'artyom.js';
export default function Main() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedLobby = useSelector(
    (state) => state.QueueReducers.selectedLobby
  );
  const [audio] = useState(new Audio(annoucement));
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
        dispatch(set_counterview(true));
        setOpen(false)
        // setlobbynoexist(counterlist.success);
        // REMOVE THIS IN THE FUTURE IF SOMEONE WANTS TO SELECT DIFFRENT LOBBIES
        if (selectedLobby?.selected?.lobbyinfo[1] === "ALL") {
          dispatch(action_getCounterList(selectedLobby?.selected?.lobbyinfo[0],selectedLobby?.selected?.lobbyinfo[1]));
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
        dispatch(selectedpage(false));
        dispatch(set_counterview(true));
        dispatch(action_getCounterList(0,'ALL'));
      }
    };

    mounted && getinfo();

    return () => {
        mounted = false;
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
      mounted = false;
    };
  }, [dispatch, pagelist]);
  useEffect(() => {
    let mounted = true;
    let i=0;
    var assistant = new Artyom();
    const notifys = () => {
      if(mounted){
        if (notify.from === "CASHIER" &&  notify?.type !== "info") {
          if(notify?.type !== undefined ){
            var queueno =  notify?.Notification.split('|')[2];
            var queuenoCall='';
            if(parseInt(queueno) <= parseInt('0009')) {
              queuenoCall = queueno.substring(3)
            }else if(parseInt(queueno) <= parseInt('0099')){
              queuenoCall = queueno.substring(2)
            }else if(parseInt(queueno) <= parseInt('0999')){
              queuenoCall = queueno.substring(1)
            }else {
              queuenoCall = notify?.Notification
            }
              audio.play();
              if(notify?.type?.toLowerCase() !== 'Reception'.toLowerCase()) {
                  assistant.say( `Queue Number ${queuenoCall}. Please go to ${notify?.type}`, {
                    lang:"en-US",
                   onStart: function() {
                       if(assistant.isSpeaking()){
                        i++;
                        if(i>1){
                          assistant.fatality()
                          audio.pause();
                        }
                       }
                   },
                 });
              } else{
                assistant.say( `Reception Number ${queuenoCall}.`, {
                  lang:"en-US",
                 onStart: function() {
                     if(assistant.isSpeaking()){
                      i++;
                      if(i>1){
                        assistant.fatality()
                        audio.pause();
                      }
                     }
                 },
               });
              }
          }
        } 
        // else if (notifymobile.from === "CASHIER" &&  notify?.type !== "info") {
        //   if(notify?.type !== undefined){
        //   setPlay(true);
        //     assistant.say( `Queue Number ${notify?.Notification}. Please go to ${notify?.type} . Counter ${notify?.to}.`, {
        //       lang:"en-US",
        //      onStart: function() {
        //          if(assistant.isSpeaking()){
        //           i++;
        //           if(i>1){
        //             assistant.fatality()
        //           }
        //          }
        //      },
        //    });
        //   }
        // }
      }
    };

    mounted && notifys();
    return () => {
      assistant.fatality();
      audio.pause();
      mounted = false;
    };
  }, [notify]);
  return (
    <div className={classes.root}>
      {/* <NextTone handlePlay={() => play} /> */}
      <UseModal open={open} handleClose={() => setOpen(false)} />
      <QueueUI />
    </div>
  );
}
