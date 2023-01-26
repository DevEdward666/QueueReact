import { makeStyles } from "@material-ui/core/styles";
import styles from "styled-components";
const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    marginTop: 110,
    width: "100%",
  },
  subroot: {
    flex: 1,
    marginTop: 150,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",

    // color: theme.palette.text.secondary,
    color: "rgba(0,0,0,.65)",
    textTransform: "uppercase",
    letterSpacing: ".1rem",
    wordSpacing: ".1rem",
    elevation: 50,
    margin: 10,
    borderRadius: 25,
  },
}));

export default useStyles;
