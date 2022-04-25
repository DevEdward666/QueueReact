import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    margin: 30,
    width: "100%",
    height: 204,
  },
  rootcalendar: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    width: "100%",
    height: 300,
  },
  // rootStepper: {
  //   width: "100%",
  //   height: 500,
  // },
  large: {
    alignSelf: "center",
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
  tabs: {
    margin: 0,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(1),
  },
  resetContainer: {
    marginTop: -150,
    padding: theme.spacing(20),
  },
  multilineColor: {
    color: "black",
    fontSize: 12,
    width: 300,
    fontWeight: "bold",
  },
  multilineColorDesc: {
    color: "black",
    fontSize: 12,
    width: 700,
    fontWeight: "bold",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  list: {
    flexGrow: 1,
    border: `1px solid`,
    overflow: `auto`,
  },
  rootList: {
    width: "100%",
    maxWidth: "70ch",
    backgroundColor: theme.palette.background.paper,
    maxHeight: 500,
    overflow: "auto",
  },
  paper: {
    width: "100%",
    // color: theme.palette.text.secondary,
    color: "rgba(0,0,0,.65)",
  },
  paperinfo: {
    textAlign: "center",
    height: 80,
    // color: theme.palette.text.secondary,
    color: "rgba(0,0,0,.65)",
  },
}));

export default useStyles;
