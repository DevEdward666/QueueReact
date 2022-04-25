import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    borderRadius: 25,
    color: "rgba(0,0,0,.65)",
    textTransform: "uppercase",
    letterSpacing: ".1rem",
  },
  formControl: {
    margin: theme.spacing(1),
    fontSize: 12,
    width: "100%",
  },
  counterSelect: {
    fontSize: 12,
  },
  mainGrid: {
    width: "100%",
    padding: 20,
  },
}));

export default useStyles;
