import {
  GET_DEFAULTS,
  GET_LOGO,
  GET_NAME,
  GET_USER_INFO,
  SIGNALR_CONNECT_NOTIFY,
  SIGNALR_CONNECT_NOTIFY_MOBILE,
  NOTIFY_QUEUE,
  NOTIFY_QUEUE_MOBILE,
} from "../Types/DefaultTypes";

const defaults = {
  defaults: [],
  userinfo: [],
  logo: [],
  name: [],
  hubconnectnotify: "",
  hubconnectnotifymobile: "",
  notify: { open: false, message: "", type: "" },
  notifymobile: { open: false, message: "", type: "" },
};
const DefaultReducers = (data_state = defaults, actions) => {
  switch (actions.type) {
    case NOTIFY_QUEUE_MOBILE:
      return { ...data_state, notifymobile: actions.payload };
    case NOTIFY_QUEUE:
      return { ...data_state, notify: actions.payload };
    case SIGNALR_CONNECT_NOTIFY:
      return { ...data_state, hubconnectnotify: actions.payload };
    case SIGNALR_CONNECT_NOTIFY_MOBILE:
      return { ...data_state, hubconnectnotifymobile: actions.payload };
    case GET_DEFAULTS:
      return { ...data_state, defaults: actions.payload };
    case GET_USER_INFO:
      return { ...data_state, userinfo: actions.payload };
    case GET_LOGO:
      return { ...data_state, logo: actions.payload };
    case GET_NAME:
      return { ...data_state, name: actions.payload };
    default:
      return data_state;
  }
};
export default DefaultReducers;
