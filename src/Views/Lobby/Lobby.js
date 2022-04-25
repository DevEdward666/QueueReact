import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  makeStyles,
  Paper,
  IconButton,
  Container,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  lobbytable,
  selectedlobby,
  selectedpage,
} from "../../Services/Actions/QueueActions";
import ButtonBase from "@material-ui/core/ButtonBase";
import useStyles from "./style";
const Lobby = () => {
  const dispatch = useDispatch();
  const lobbylists = useSelector((state) => state.QueueReducers.lobbylist);

  const [lobbySelect, setlobbySelect] = useState([]);
  const classes = useStyles();
  const handleLobbyClick = (card) => {
    dispatch(selectedpage(false));
    dispatch(
      selectedlobby({
        selected: { lobbyinfo: [card.lobbyno, card.location] },
        close: false,
      })
    );
  };

  return (
    <div>
      <Container fixed>
        <Paper style={{ minHeight: 800 }}>
          <Grid container spacing={0}>
            {lobbylists?.data?.map((card) => (
              <Grid item xs={4}>
                <IconButton
                  className={classes.mainGrid}
                  onClick={() => handleLobbyClick(card)}
                >
                  <Paper
                    elevation={3}
                    style={{
                      display: "grid",
                      gridGap: "1em",
                      padding: "1em",
                      width: "100%",
                    }}
                    className={classes.paper}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {card.location}
                    </div>
                  </Paper>
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

Lobby.propTypes = {};

export default Lobby;
