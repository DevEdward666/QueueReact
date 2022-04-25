import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Fade } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Container from "@material-ui/core/Container";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const SimpleModal = React.memo(
  ({
    open,
    closes = false,
    handleClose,
    width,
    UI,
    closable,
    onclosemessage,
  }) => {
    const useStyles = makeStyles((theme) => ({
      paper: {
        position: "absolute",
        width: width,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }));
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [message, setmessage] = useState("");
    const body = (
      <div style={modalStyle} className={classes.paper}>
        {UI}
      </div>
    );
    const handleCloseDialog = () => {
      handleClose();
    };
    const handlemessage = () => {
      setmessage(onclosemessage);
    };
    return (
      <Container maxWidth="md">
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            disableEscapeKeyDown={closable}
            disableBackdropClick={closable}
            onBackdropClick={handlemessage}
            onEscapeKeyDown={handlemessage}
            onClose={handleCloseDialog}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>{body}</Fade>
          </Modal>
        </div>
      </Container>
    );
  }
);
export default SimpleModal;
