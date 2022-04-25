import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { updatephone } from "../../Services/Actions/QueueActions";
export default function FormDialog({
  handleOpen,
  opens = false,
  queueno,
  countername,
}) {
  const dispatch = useDispatch();
  const handleClose = () => {
    handleOpen(false);
  };
  const [phone, setPhone] = useState("");
  const handleSubmit = useCallback(async () => {
    dispatch(updatephone(phone, queueno, countername));
    handleOpen(false);
  }, [countername, dispatch, handleOpen, phone, queueno]);
  return (
    <div>
      <Dialog
        open={opens}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Get Notified</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We will send a text message if there are 4 queues left before your
            number.
          </DialogContentText>
          <PhoneInput
            onlyCountries={["ph"]}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
            country={"ph"}
            value={phone}
            onChange={(phone) => setPhone("+" + phone)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No Thanks.
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit Number
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
