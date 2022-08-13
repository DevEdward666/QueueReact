import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useStyles from "./style";
import SuccessSnackbar from "./SuccessSnackBar";
import FormDialog from "./FormDialog";
import { useDispatch, useSelector } from "react-redux";
import CustomBackDrop from "../../Plugin/CustomBackDrop";
import { IconButton } from "@material-ui/core";
import {
  generatenumberregular,
  GeneratorRegular,
} from "../../Services/Actions/QueueActions";
import { action_set_notification } from "../../Services/Actions/DefaultActions";
export default function RegularGenerator() {
  const classes = useStyles();
  const number_generated = useSelector(
    (state) => state.QueueReducers.number_generated
  );
  const data = useSelector((state) => state.QueueReducers.regular);
  const dispatch = useDispatch();
  const [openbackdrop, setopenbackdrop] = useState(false);
  const [Dialogopen, setDialogOpen] = useState(false);
  const [message, setmessage] = useState(false);
  const [close, setClose] = useState(false);
  const [open, setOpen] = useState(false);
  const [counter, setcounter] = useState([]);

  const [queueno, setqueueno] = useState([]);
  const generate = useCallback(
    async (card) => {
      dispatch(generatenumberregular(card.countername));
      setopenbackdrop(true);
    },
    [dispatch]
  );
  useEffect(() => {
    let mounted = true;
    const loaded = async () => {
      if (mounted) {
        if (number_generated === true) {
          await setOpen(true);
          await setDialogOpen(true);
          await setmessage("Generated");
          await setopenbackdrop(false);
          dispatch(
            action_set_notification(
              true,
              "GENERATE",
              "info",
              "GENERATE",
              "GENERATE"
            )
          );
        }
      }
    };
    mounted && loaded();
    return () => {
      mounted = false;
    };
  }, [dispatch, number_generated]);
  useEffect(() => {
    let mounted = true;
    const regular_generator = () => {
      if (mounted) {
        dispatch(GeneratorRegular());
      }
    };
    mounted && regular_generator();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
  return (
    <div className="container">
      <CustomBackDrop open={openbackdrop} message="Printing Queue Ticket" />
      <SuccessSnackbar
        message={message}
        opens={open}
        close={close}
        type="success"
        handleClose={() => setOpen(false)}
      />
      ;
      <FormDialog
        opens={Dialogopen}
        handleOpen={() => setDialogOpen(false)}
        queueno={queueno}
        countername={counter}
      />
      ;
      <Grid container spacing={3}>
        {data?.map((card ,index) => (
          <Grid item xs={3} key={index}>
            <IconButton
              className={classes.mainGrid}
              onClick={() => generate(card)}
            >
              <Paper
                elevation={3}
                style={{
                  display: "grid",
                  gridGap: "1em",
                  padding: "1em",
                }}
                className={classes.paper}
              >
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 600,
                  }}
                >
                  {card.countername.replace("_", " ")}
                </div>
              </Paper>
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
