import {
  LIST_OF_COUNTERS,
  LIST_OF_LOBBY,
  SELECTED_LOBBY,
  NUMBER_GENERATED,
  GET_SERVED,
  GET_GENERATOR_REGULAR,
  GET_GENERATOR_SENIOR,
  SET_COUNTER_VIEW,
  SELECTED_PAGE,
} from "../Types/QueueTypes";

const queue = {
  counterlist: { data: [], success: false },
  lobbylist: { data: [], success: false },
  pagelist: false,
  selectedLobby: { selected: "", close: true },
  number_generated: false,
  serving: { queueno: "", countername: "", counternumber: "" },
  regular: [],
  senior: [],
  counterview: false,
};
const QueueReducers = (data_state = queue, actions) => {
  switch (actions.type) {
    case SELECTED_PAGE:
      return { ...data_state, pagelist: actions.payload };
    case SET_COUNTER_VIEW:
      return { ...data_state, counterview: actions.payload };
    case GET_GENERATOR_REGULAR:
      return { ...data_state, regular: actions.payload };
    case GET_GENERATOR_SENIOR:
      return { ...data_state, senior: actions.payload };
    case GET_SERVED:
      return { ...data_state, serving: actions.payload };
    case LIST_OF_COUNTERS:
      return { ...data_state, counterlist: actions.payload };
    case LIST_OF_LOBBY:
      return { ...data_state, lobbylist: actions.payload };
    case SELECTED_LOBBY:
      return { ...data_state, selectedLobby: actions.payload };
    case NUMBER_GENERATED:
      return { ...data_state, number_generated: actions.payload };
    default:
      return data_state;
  }
};
export default QueueReducers;
