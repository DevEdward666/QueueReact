import { makeStyles } from "@material-ui/core/styles";
const { innerWidth: width, innerHeight: height } = window;
const useStyles = makeStyles((theme) => ({
  root: {
    width: width,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  time: {},
}));
export default useStyles;
