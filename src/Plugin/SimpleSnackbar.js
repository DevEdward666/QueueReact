import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grow from "@material-ui/core/Grow";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SimpleSnackbar = ({
  open = false,
  closes = false,
  handleClose,
  message,
  typeofmessage = "",
  vertical,
  horizontal
}) => {
  const [state, setState] = React.useState({
    Transition: Fade,
  });
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    } else {
      handleClose();
    }
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: vertical,
          horizontal: horizontal,
        }}
        open={open}
        autoHideDuration={5000}
        onClose={()=>{handleClose()}}
        action={
          <React.Fragment>
            <IconButton
              size="large"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={typeofmessage}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

SimpleSnackbar.propTypes = {};

export default SimpleSnackbar;
