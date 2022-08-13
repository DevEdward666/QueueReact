import React from "react";
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
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
            {counterlist?.data?.map((card,index) => (
              <>
                <Grid item xs={4} key={index}>
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
                      {card.countername}
                    </div>
                  </Paper>
                </Grid>

                <Grid item xs={4}>
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

                <Grid item xs={4}>
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
                      {card.queueno}
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
              <Grid item xs={4} key={index}>
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
                    {card.queueno}
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
