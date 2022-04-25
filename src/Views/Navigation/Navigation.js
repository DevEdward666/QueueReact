import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import React, { useCallback, useEffect, useState } from "react";
// import Clock from "react-live-clock";
import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import UseInterval from "../../Plugin/useInterval";
import { Slide, SwipeableDrawer, Tooltip } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  signalr_connection_notify,
  signalr_connection_notify_mobile,
} from "../../Services/Actions/CashierActions";
import { getlogo, getname } from "../../Services/Actions/DefaultActions";
import { useDispatch } from "react-redux";
import UseModal from "../../Plugin/Modal/UseModal";
import useStyles from "./navstyle";
import { selectedpage } from "../../Services/Actions/QueueActions";
import { useLocation } from "react-router-dom";
export default function Navigation() {
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [info, setInfo] = useState([]);
  const [hospdefaults, sethospdefaults] = useState([]);
  const [isLoggedin, setisLoggedin] = useState("Login");
  const [ishide, setishide] = useState(false);
  const [logosize, setlogosize] = useState("");
  const [namesize, setnamesize] = useState();
  const [open, setOpen] = useState(false);
  const name = useSelector((state) => state.DefaultReducers.name);
  const logo = useSelector((state) => state.DefaultReducers.logo);
  const selectedLobby = useSelector(
    (state) => state.QueueReducers.selectedLobby
  );
  const pagelist = useSelector((state) => state.QueueReducers.pagelist);
  useEffect(() => {
    let mounted = true;
    const name = async () => {
      dispatch(getlogo());
      dispatch(getname());
      dispatch(signalr_connection_notify());
      dispatch(signalr_connection_notify_mobile());
    };
    mounted && name();

    return () => {
      return false;
    };
  }, [dispatch]);
  const currenturl = window.location.href;

  const auth = window.localStorage.getItem("queue_token");

  const logout = () => {
    window.localStorage.removeItem("queue_token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("countername");
    window.localStorage.removeItem("countertype");
    window.localStorage.removeItem("counterno");
    window.location.href = "/";
  };
  var link = document.querySelector("link[rel~='icon']");
  var title = document.querySelector("title[rel~='title']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  link.href = logo;
  const date = new Date();
  useEffect(() => {
    if (auth) {
      if (location.pathname === "/") {
        setishide(true);
        setlogosize("90px");
        setnamesize(36);
      } else {
        setishide(false);
        setlogosize("30px");
        setnamesize(24);
      }
    } else {
      window.location.href = "Login";
    }
  }, [auth, currenturl, dispatch, location.pathname]);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [timer, settimer] = useState(0);
  UseInterval({
    callbackFunc: () => settimer(date),
    delay: 1000,
  });
  const handleClickOpen = useCallback(() => {
    dispatch(selectedpage(true));
  }, [dispatch]);
  const closemodal = () => {
    setOpen(false);
  };
  useEffect(() => {
    let mounted = true;
    setisLoggedin("Logout");
    const isclose = () => {
      if (mounted) {
        setOpen(pagelist);
      }
    };
    mounted && isclose();
    return () => {
      mounted = false;
    };
  }, [pagelist]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <UseModal
        open={pagelist}
        TransitionComponent={Transition}
        handleClose={() => handleClose()}
      />
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={logo} height={logosize} widht={logosize} alt="" />
          </IconButton>
          <Typography style={{ flexGrow: 1, fontSize: namesize }} key="">
            {name}
          </Typography>
          <Typography style={{ fontSize: namesize }} key="">
            <Moment format="h:mm:ss a">{timer}</Moment>
          </Typography>
          {!ishide ? (
            <Tooltip title="Log Out" aria-label="add">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={logout}
              >
                <PowerSettingsNewIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          <Tooltip title="Open Menu" aria-label="add">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleClickOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
