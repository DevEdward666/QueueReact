import React from "react";
import useStyles from "./mainstyle";
import { Grid, Paper } from "@material-ui/core";
import Regular from "./RegularGenerator";
import Senior from "./SeniorGenerator";
export default function MainGenerator() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            style={{
              display: "grid",
              gridGap: "1em",
              padding: "1em",
              alignSelf: "center",
              justifyContent: "center",
              margin: 0,
            }}
            className={classes.paper}
          >
            <div
              style={{
                fontSize: 40,

                fontWeight: 900,
              }}
            >
              {" "}
              Regular
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Regular />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            style={{
              display: "grid",
              gridGap: "1em",
              padding: "1em",
              alignSelf: "center",
              justifyContent: "center",
              margin: 0,
            }}
            className={classes.paper}
          >
            <div
              style={{
                fontSize: 40,

                fontWeight: 900,
              }}
            >
              {" "}
              Priority
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Senior />
        </Grid>
      </Grid>
    </div>
  );
}
