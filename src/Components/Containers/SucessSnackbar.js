import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SuccessSnackbar = ({
  message,
  opens = false,
  closes = false,
  type = "",
  handleClose,
}) => {
  const classes = useStyles();
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    } else {
      handleClose();
    }
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={opens}
        autoHideDuration={10000}
        onClose={closes}
        action={
          <React.Fragment>
            <IconButton
              size="large"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default SuccessSnackbar;
