import {
  GET_MESSAGES,
  GET_USERS,
  SELECTED_USER,
  MESSAGE_COMPOSE,
  NOTIFY_CALLING,
} from "../Types/SignalRType.js";

const signalr = {
  messages: [],
  users: [],
  selected: "",
  composedmessage: "",
  calling: false,
};
const SignalRReducers = (data_state = signalr, actions) => {
  switch (actions.type) {
    case GET_MESSAGES: {
      return { ...data_state, messages: actions.payload };
    }
    case GET_USERS: {
      return { ...data_state, users: actions.payload };
    }
    case SELECTED_USER: {
      return { ...data_state, selected: actions.payload };
    }
    case MESSAGE_COMPOSE: {
      return { ...data_state, composedmessage: actions.payload };
    }
    case NOTIFY_CALLING: {
      return { ...data_state, calling: actions.payload };
    }

    default:
      return data_state;
  }
};

export default SignalRReducers;
