import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./style";

export default function SuccessSnackBar({
  message,
  opens = false,
  closes = false,
  type = "",
  handleClose,
}) {
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    } else {
      handleClose();
    }
  };
  setTimeout(() => {
    handleClose();
  }, 5000);
  const classes = useStyles;
  return (
    <div className={classes.snackbarroot}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={opens}
        autoHideDuration={5000}
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
        <MuiAlert onClose={handleCloseSnackbar} severity={type}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
