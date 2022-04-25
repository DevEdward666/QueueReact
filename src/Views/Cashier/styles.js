import { makeStyles } from "@material-ui/core/styles";
const { innerWidth: width, innerHeight: height } = window;
const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  subcontainer: {
    width: "100%",
    flex: 1,
    float: "left",
  },
  maincontainer: {
    width: width,
  },
  paper: {
    textAlign: "center",
    color: "rgba(0,0,0,.65)",
    textTransform: "uppercase",
    letterSpacing: ".1rem",
    wordSpacing: ".1rem",
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formCounterName: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  formCounterNo: {
    margin: theme.spacing(1),
    minWidth: 30,
  },
  formCounterType: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  centerbtnpanel: {
    borderRadius: 25,
  },
  container: {
    width: "100%",
    height: "50%",
  },
}));

export default useStyles;
