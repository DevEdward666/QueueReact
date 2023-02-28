import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Lobby from "../../Views/Lobby/Lobby";
import Pages from "../../Views/pages/Pages";
import { lobbytable,selectedpage,selectedlobby } from "../../Services/Actions/QueueActions";
import { useCallback } from "react";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const UseModal = ({ handleClose, open }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleCloseDialog = () => {
    handleClose();
  };
  useEffect(() => {
    let mounted = true;
    const lobbylist = () => {
      if (mounted) {
        dispatch(lobbytable());
      }
    };
    mounted && lobbylist();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  const [ishide, setishide] = useState(false);
  const [fullscreen, setfullscreen] = useState("");

  const currenturl = window.location.pathname;

  useEffect(() => {
    if (currenturl === "/Display") {
      setishide(false);
      setfullscreen("fullScreen");
    } else {
      setishide(true);
      setfullscreen("");
    }
  }, [currenturl]);
  return (
    <div>
      <Dialog 
        // {...fullscreen}
        fullScreen
        open={open}
        onClose={()=> handleClose()}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {!ishide ? "Select Lobby" : "Select Page"}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>{!ishide ? <Lobby /> : <Pages />}</List>
      </Dialog>
    </div>
  );
};
export default UseModal;
