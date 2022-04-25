import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    margin: 10,
    // color: theme.palette.text.secondary,
    color: "rgba(0,0,0,.65)",
    textTransform: "uppercase",
    letterSpacing: ".1rem",
    wordSpacing: ".1rem",
  },
  container: {
    flexGrow: 1,
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 380,
  },
  formCounter: {
    margin: theme.spacing(1),
    minWidth: 190,
  },
  formControlType: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formCounterNo: {
    margin: theme.spacing(1),
    minWidth: 55,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default useStyles;
