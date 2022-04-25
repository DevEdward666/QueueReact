import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";


const SimpleBackDrop = ({ open=false,message }) => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  //   const handleToggle = () => {
  //     setOpen(!open);
  //   };
  const classes = useStyles();
  return (
    <Backdrop
      className={classes.backdrop}
      open={open}
   
    >
      <CircularProgress color="inherit" />

      <Typography variant="h5" component="h2">
     {message}
      </Typography>
    </Backdrop>
  );
};
export default SimpleBackDrop;
