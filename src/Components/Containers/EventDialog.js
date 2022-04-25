import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  Container,
  Grid,
  makeStyles,
  Slide,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import moment from "moment";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
  action_insert_new_events,
  action_update_events,
} from "../../Services/Actions/ManageActions";
import { CirclePicker } from "react-color";
export default function EventDialog({
  getstartdate,
  getstarttime,
  getenddate,
  getendtime,
  gettitle,
  getdescription,
  getimage,
  getevid,
  typeofevent,
  handleOpen,
  opens = false,
}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [eventdesc, seteventdesc] = useState("");
  const [eventvenue, seteventvenue] = useState("");
  const [evid, setevid] = useState("");
  const [defaultconfig, setdefaultconfig] = useState("");
  const [eventStarttime, seteventStarttime] = useState("");
  const [eventEndtime, seteventEndtime] = useState("");
  const [eventEndData, seteventEndData] = useState("");
  const [startDate, setstartDate] = useState("");
  const [imgData, setImgData] = useState(null);
  const [picture, setPicture] = useState(null);
  const [eventscolor, seteventscolor] = useState("");
  const [selectedStartDate, setselectedStartDate] = React.useState(
    defaultconfig
  );
  const [selectedStartTime, setselectedStartTime] = React.useState(
    defaultconfig
  );
  const [selectedEndDate, setselectedEndDate] = React.useState(defaultconfig);
  const [selectedEndTime, setselectedEndTime] = React.useState(defaultconfig);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: 500,
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
    formControl: {
      margin: theme.spacing(1),
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    preview: {
      color: "#e91e63",
    },
  }));
  const handleClickOpen = () => {
    handleOpen();
  };

  const handleClose = () => {
    handleOpen(false);
    setImgData("");
    setTitle("");
    seteventdesc("");
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (getstartdate !== "") {
      setdefaultconfig("");
    } else {
      setdefaultconfig(new Date());
    }
    if (getstartdate !== "") {
      setselectedStartDate(getstartdate);
      setselectedStartTime(getstarttime);
      setselectedEndDate(getenddate);
      setselectedEndTime(getendtime);
      setTitle(gettitle);
      seteventdesc(getdescription);
      setImgData(getimage);
    }
  }, [getenddate, getendtime, getstartdate, getstarttime]);
  const handleStartDateChange = (date) => {
    setselectedStartDate(date);
  };

  const handleStartTimeChange = (date) => {
    setselectedStartTime(date);
  };

  const handleEndDateChange = (date) => {
    setselectedEndDate(date);
  };

  const handleEndTimeChange = (date) => {
    setselectedEndTime(date);
  };
  if (getstartdate === null) {
    var formatted_startdate =
      selectedStartDate.getFullYear() +
      "-" +
      (selectedStartDate.getMonth() + 1) +
      "-" +
      selectedStartDate.getDate();
    var formatted_enddate =
      selectedStartDate.getFullYear() +
      "-" +
      (selectedStartDate.getMonth() + 1) +
      "-" +
      selectedStartDate.getDate();
    var formatted_starttime =
      selectedStartTime.getHours() + ":" + selectedStartTime.getMinutes();

    var formatted_endtime =
      selectedStartTime.getHours() + ":" + selectedStartTime.getMinutes();
  } else {
    var formatted_startdateNew = moment(selectedStartDate, "MM/DD/YYYY").format(
      "YYYY-MM-DD"
    );
    var formatted_enddateNew = moment(selectedEndDate, "MM/DD/YYYY").format(
      "YYYY-MM-DD"
    );
    var formatted_starttimeNew = moment(
      selectedStartTime,
      "MM/DD/YYYY HH:mm"
    ).format("HH:mm");

    var formatted_endtimeNew = moment(
      selectedEndTime,
      "MM/DD/YYYY HH:mm"
    ).format("HH:mm");
  }

  const [authLoading, setauthLoading] = useState(false);

  const handletitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handledescChange = (event) => {
    seteventdesc(event.target.value);
  };
  const handlevenueChange = (event) => {
    seteventvenue(event.target.value);
  };
  const handleSubmitEvents = async () => {
    if (getevid !== 0) {
      await dispatch(
        action_update_events(
          getevid,
          title,
          eventdesc,
          formatted_startdateNew,
          formatted_starttimeNew,
          formatted_enddateNew,
          formatted_endtimeNew,
          eventscolor
        )
      );
    } else {
      if (formatted_startdate !== undefined) {
        await dispatch(
          action_insert_new_events(
            title,
            eventdesc,
            imgData,
            formatted_startdate,
            formatted_starttime,
            formatted_enddate,
            formatted_endtime,
            eventscolor
          )
        );
        console.log(formatted_startdate);
      } else {
        await dispatch(
          action_insert_new_events(
            title,
            eventdesc,
            imgData,
            formatted_startdateNew,
            formatted_starttimeNew,
            formatted_enddateNew,
            formatted_endtimeNew,
            eventscolor
          )
        );
      }
    }
  };
  console.log(getimage);
  const handleChangeColor = (color) => {
    seteventscolor(color.hex);
  };
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={opens}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Container type="fixed">
          <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
          <DialogContent className={classes.root}>
            {/* <DialogContentText>
            We will send a text message to if you're 4 queues left before your
            number.
          </DialogContentText> */}

            <Grid container spacing={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div>
                    <div className="register_profile_image">
                      <input
                        id="profilePic"
                        type="file"
                        onChange={onChangePicture}
                      />
                      {/* <FileBase64 multiple={true} onDone={() => getFiles(this)} /> */}
                    </div>
                    <div className="previewProfilePic">
                      <img style={{ width: 500, height: 300 }} src={imgData} />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <form className={classes.formControl} autoComplete="off">
                    <TextField
                      id="standard-basic"
                      label="Title"
                      fullWidth={true}
                      value={title}
                      onChange={handletitleChange}
                    />
                  </form>
                </Grid>
                <Grid item xs={6}>
                  <form className={classes.formControl} autoComplete="off">
                    <TextField
                      id="standard-basic"
                      label="Description"
                      fullWidth={true}
                      value={eventdesc}
                      onChange={handledescChange}
                    />
                  </form>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <DatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Start Date"
                      format="MM/dd/yyyy"
                      value={selectedStartDate}
                      onChange={handleStartDateChange}
                      keyboardbuttonprops={{
                        "aria-label": "change date",
                      }}
                    />
                    <DatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="End Date"
                      format="MM/dd/yyyy"
                      value={selectedEndDate}
                      onChange={handleEndDateChange}
                      keyboardbuttonprops={{
                        "aria-label": "change date",
                      }}
                    />
                    <TimePicker
                      margin="normal"
                      id="time-picker"
                      label="Start Time"
                      format="hh:mm a"
                      value={selectedStartTime}
                      onChange={handleStartTimeChange}
                      keyboardbuttonprops={{
                        "aria-label": "change time",
                      }}
                    />
                    <TimePicker
                      margin="normal"
                      id="time-picker"
                      label="End Time"
                      format="hh:mm a"
                      value={selectedEndTime}
                      onChange={handleEndTimeChange}
                      keyboardbuttonprops={{
                        "aria-label": "change time",
                      }}
                    />
                    <CirclePicker
                      onChange={(color) => handleChangeColor(color)}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                {/* <Grid item xs={12} style={{ textAlign: "center" }}>
                  <h2>Preview</h2>
                  <Button
                    className="preview"
                    variant="contained"
                    size="large"
                    fullWidth={true}
                  >
                    {title}
                  </Button>
                </Grid> */}
                <Grid item xs={6}>
                  <Button
                    onClick={handleSubmitEvents}
                    className="submit-btn"
                    variant="outlined"
                    size="large"
                    color="primary"
                    fullWidth={true}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={handleClose}
                    className="submit-btn"
                    variant="outlined"
                    size="large"
                    color="secondary"
                    fullWidth={true}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* <PhoneInput
            onlyCountries={["ph"]}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
            country={"ph"}
            value={phone}
            onChange={(phone) => setPhone("+" + phone)}
          /> */}
          </DialogContent>
          {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            No Thanks.
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit Number
          </Button>
        </DialogActions> */}
        </Container>
      </Dialog>
    </div>
  );
}
