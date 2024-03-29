import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: "center",
    margin: 1,
    // color: theme.palette.text.secondary,
    color: "rgba(0,0,0,.65)",
    textTransform: "uppercase",
    letterSpacing: ".1rem",
    wordSpacing: ".1rem",
    width: "100%",
    overflow: "hidden"
    
  },
  mainGrid: {
    width: "100%",
    padding: 5,
  },
  snackbarroot: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default useStyles;
