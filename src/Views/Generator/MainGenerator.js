import React from "react";
import useStyles from "./mainstyle";
import { Grid, Paper } from "@material-ui/core";
import Regular from "./RegularGenerator";
import Senior from "./SeniorGenerator";
export default function MainGenerator() {
  const classes = useStyles();
  return (
    <div style={{ marginTop: 100 }}>
      <Grid>
        <Grid item xs={12}>
          <Regular />
        </Grid>
      </Grid>
    </div>
  );
}
