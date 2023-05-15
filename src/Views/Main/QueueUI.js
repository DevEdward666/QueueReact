import React,{useState} from "react";
import useStyles from "./style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
const QueueUI = () => {
  const classes = useStyles();
  const counterview = useSelector((state) => state.QueueReducers.counterview);

  const counterlist = useSelector((state) => state.QueueReducers.counterlist);
  return (
    <div className={classes.root}>
      {counterview ? (
        <>
          <Paper>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <div
                  elevation={3}
                  style={{
                    display: "grid",
                    gridGap: "1em",
                    padding: "1em",
                  }}
                  className={classes.paper}
                >
                  <Grid item xs={12}>
                    <div
                      style={{
                        fontSize: 50,
                        fontWeight: 900,
                      }}
                    >
                      Counter Name
                    </div>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div
                  elevation={3}
                  style={{
                    display: "grid",
                    gridGap: "1em",
                    padding: "1em",
                  }}
                  className={classes.paper}
                >
                  <Grid item xs={12}>
                    <div
                      style={{
                        fontSize: 50,
                        fontWeight: 900,
                      }}
                    >
                      Counter No.
                    </div>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div
                  elevation={3}
                  style={{
                    display: "grid",
                    gridGap: "1em",
                    padding: "1em",
                  }}
                  className={classes.paper}
                >
                  <Grid item xs={12}>
                    <div
                      style={{
                        fontSize: 50,
                        fontWeight: 900,
                      }}
                    >
                      Queue No.
                    </div>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Paper>
          <Divider variant={"fullWidth"} classes={{ fontWeight: 900 }} />
          <Divider variant={"fullWidth"} classes={{ fontWeight: 900 }} />
          <Divider variant={"fullWidth"} classes={{ fontWeight: 900 }} />
          <Divider variant={"fullWidth"} classes={{ fontWeight: 900 }} />
          <Divider variant={"fullWidth"} classes={{ fontWeight: 900 }} />
          <Grid container spacing={12}>
            {counterlist?.data?.map((card,index) =>  (
              <>
                <Grid item xs={6} key={card.countername}>
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
                        fontSize: 50,
                        fontWeight: 600,
                        textAlign: "left",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        wordWrap: "break-word",
                        // overflow: 'hidden',
                        // textOverflow: 'ellipsis',
                        // whiteSpace: 'nowrap',
                      }}
                    >
                      {card.countername}
                    </div>
                  </Paper>
                </Grid>

                <Grid item xs={3}>
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
                        fontSize: 50,
                        fontWeight: 600,
                      }}
                    >
                      {card.counter}
                    </div>
                  </Paper>
                </Grid>

                <Grid item xs={3}>
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
                        fontSize: 50,
                        fontWeight: 600,
                      }}
                    >
                      {card.queueno.split('|')[2]  <= parseInt('0009')?
                      card.queueno.split('|')[2].substring(3):
                      card.queueno.split('|')[2]  <= parseInt('0099')?
                      card.queueno.split('|')[2].substring(2):
                      card.queueno.split('|')[2]  <= parseInt('0999')?
                      card.queueno.split('|')[2].substring(1):
                      card.queueno.split('|')[2].substring(2)}
                    </div>
                  </Paper>
                </Grid>
              </>
            ))}
          </Grid>
        </>
      ) : (
        <div className={classes.subroot}>
          <Grid container spacing={3}>
            {counterlist?.data?.map((card, index) => (
              <Grid item xs={4} key={card.countername}>
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
                    {card.countername}
                  </div>
                  <div
                    style={{
                      fontSize: 50,
                      fontWeight: 900,
                    }}
                  >
                      {card.queueno.split('|')[2]  <= parseInt('0009')?
                      card.queueno.split('|')[2].substring(3):
                      card.queueno.split('|')[2]  <= parseInt('0099')?
                      card.queueno.split('|')[2].substring(2):
                      card.queueno.split('|')[2]  <= parseInt('0999')?
                      card.queueno.split('|')[2].substring(1):
                      card.queueno.split('|')[2].substring(2)}
                  </div>
                  <div
                    style={{
                      fontSize: 30,
                      fontWeight: 600,
                    }}
                  >
                    Counter {card.counter}{" "}
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};
export default QueueUI;
