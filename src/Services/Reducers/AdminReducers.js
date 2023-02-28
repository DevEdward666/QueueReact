import {
  GET_COUNTER_TABLE,
  GET_COUNTER_TYPE,
  SET_SUCCESS,
  SET_COUNTER_TABLE,
  SET_COUNTER_NUMBER,
  GENERATE_COUNTER_NUMBER,
  GET_COUNTER_NUMBER,
  ADD_LOBBY_CALLBACK,
  ADD_LOBBY_CALLBACK_MAIN,
  LOBBY_TABLE,
  SET_SNACKBAR,
  SET_TABLE_CLICK,
  USERLIST,
  TABLE_USERLIST,
  UPDATE_CASHIER
} from "../Types/AdminTypes";
const admin = {
  countertable: [],
  countertype: [],
  add_counter_success: { message: "", success: false },
  setcountertable: [],
  add_counter_NUMBER_success: { message: "", success: false },
  generate_number: [],
  addcallback: false,
  setcallback: { message: "", success: false },
  getcounternumber: [],
  lobbytable: [],
  setsnackbar: { message: "", type: "", open: false },
  setbtntext: "Add",
  userlists: [],
  userlistselect: [],
  update_cashier:{cashierid:0,cashierName: "", counterType:"",active:""}
};

const AdminReducers = (data_state = admin, actions) => {
  switch (actions.type) {
    case TABLE_USERLIST:
      return { ...data_state, userlists: actions.payload };
    case USERLIST:
      return { ...data_state, userlistselect: actions.payload };
    case SET_TABLE_CLICK:
      return { ...data_state, setbtntext: actions.payload };
    case SET_SNACKBAR:
      return { ...data_state, setsnackbar: actions.payload };
    case ADD_LOBBY_CALLBACK_MAIN:
      return { ...data_state, setcallback: actions.payload };
    case LOBBY_TABLE:
      return { ...data_state, lobbytable: actions.payload };
    case GET_COUNTER_NUMBER:
      return { ...data_state, getcounternumber: actions.payload };
    case ADD_LOBBY_CALLBACK:
      return { ...data_state, addcallback: actions.payload };
    case GENERATE_COUNTER_NUMBER:
      return { ...data_state, generate_number: actions.payload };
    case SET_COUNTER_NUMBER:
      return { ...data_state, add_counter_NUMBER_success: actions.payload };
    case SET_COUNTER_TABLE:
      return { ...data_state, setcountertable: actions.payload };
    case GET_COUNTER_TABLE:
      return { ...data_state, countertable: actions.payload };
    case GET_COUNTER_TYPE:
      return { ...data_state, countertype: actions.payload };
    case SET_SUCCESS:
      return { ...data_state, add_counter_success: actions.payload };
    case UPDATE_CASHIER:
      return { ...data_state, update_cashier: actions.payload };

    default:
      return data_state;
  }
};
export default AdminReducers;
