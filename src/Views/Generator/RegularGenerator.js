import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  action_get_last_queue,
} from "../../Services/Actions/CashierActions";
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
  const lastqueue = useSelector((state) => state.CashierReducers.lastqueue);
  const [queueno, setqueueno] = useState([]);
  const [generatenumber, setgenerate] = useState(false);
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
          // await setDialogOpen(true);
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
          dispatch(GeneratorRegular());
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
          <Grid item xs={3} key={card.countername}>
            <IconButton
              className={classes.mainGrid}
              onClick={() => generate(card)}
            >
              <Paper
                elevation={3}
                style={{
                  display: "grid",
                  gridGap: "2em",
                  padding: "1vh",
                }}
                className={classes.paper}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {card.countername.includes('_') ? card.countername.replace("_", " ") : card.countername}
                  
                <p
                  style={{
                    fontSize: 12,
                  }}
                >
                  On Queue: {card.queueno===null? 0 : card.queueno.split('|')[2]  <= parseInt('0009')?
                      card.queueno.split('|')[2].substring(3):
                      card.queueno.split('|')[2]  <= parseInt('0099')?
                      card.queueno.split('|')[2].substring(2):
                      card.queueno.split('|')[2]  <= parseInt('0999')?
                      card.queueno.split('|')[2].substring(1):
                      card.queueno.split('|')[2].substring(2)}
                </p>
                </div>
              </Paper>
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
