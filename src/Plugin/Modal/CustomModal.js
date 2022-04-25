import React, { useEffect, useState } from "react";
import "./custommodalcss.css";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,

    padding: theme.spacing(2, 4, 3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const CustomModal = ({ opens = false, modalStyle, UI }) => {
  const dispatch=useDispatch();

  const [open, setOpen] = useState(false);
  const base_url = useSelector((state) => state.DefaultReducers.base_url);
  //   const handleOpen = () => {
  //     setOpen(true);
  //   };
  useEffect(() => {
    let mounted = true;
    const index = async () => {
      await setOpen(opens);
    };
    mounted && index();
    return () => (mounted = false);
  }, [dispatch, opens]);
  const handleClose = () => {
    let mounted=true
    if(mounted){

      setOpen(false);
    }
    return()=>{mounted=false}
  };
  const handleOnCLose = () => {
    let mounted=true
    if(mounted){

      setOpen(false);
    }
    return()=>{mounted=false}
  };
  const classes = useStyles();
  return (
    <div>
     
      <Modal
           disableBackdropClick={true}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={modalStyle}
        open={open}
        onClose={()=>handleOnCLose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
      
      >
        <Fade in={open}>{UI}</Fade>
      </Modal>
    </div>
  );
};

export default CustomModal;
