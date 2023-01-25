import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  requirePropFactory,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import admin from "../../Assets/Icon/admin.jpg";
import cashier from "../../Assets/Icon/csahier.png";
import display from "../../Assets/Icon/display.jpg";
import generator from "../../Assets/Icon/generator.png";
import logout from "../../Assets/Icon/logout.jpg";
import { useDispatch } from "react-redux";
import useStyles from "./style";
import { selectedpage } from "../../Services/Actions/QueueActions";
const Lobby = ({ location, handleSetLocation = [] }) => {
  const auth = window.localStorage.getItem("tokenizer");
  const bearer_token = auth;
  const bearer = "Bearer " + bearer_token;
  const dispatch = useDispatch();
  const [lobbySelect, setlobbySelect] = useState([]);
  const classes = useStyles();

  let history = useHistory();

  const handleRoute = useCallback(
    (e) => {
      dispatch(selectedpage(false));
      history.push(`${e}`);
    },
    [dispatch, history]
  );
  return (
    <div>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper
              elevation={3}
              style={{
                display: "grid",
                gridGap: "1em",
                padding: "1em",
              }}
              className={classes.paper}
              onClick={() => handleRoute("/")}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                <img
                  alt=""
                  style={{ objectFit: "contain" }}
                  height="200"
                  width="100%"
                  src={display}
                />
                Queue Display
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
              onClick={() => handleRoute("/Generator")}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                <img
                  alt=""
                  style={{ objectFit: "contain" }}
                  height="200"
                  width="100%"
                  src={generator}
                />
                Queue Generator
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
              onClick={() => handleRoute("/Cashier")}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                <img
                  alt=""
                  style={{ objectFit: "contain" }}
                  height="200"
                  width="100%"
                  src={cashier}
                />
                Counter
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
              onClick={() => handleRoute("/MainAdmin")}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                <img
                  alt=""
                  style={{ objectFit: "contain" }}
                  height="200"
                  width="100%"
                  src={admin}
                />
                Administrator
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

Lobby.propTypes = {};

export default Lobby;
