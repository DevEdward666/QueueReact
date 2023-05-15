import {
  SET_COUNTERS,
  SET_SELECTED_COUNTERS,
  GENERATE_NUMBERS,
  SET_WAITINGLIST,
  SET_RECEPTION_WAITINGLIST,
  SET_MAXNUMBER,
  GENERATED_QUEUE_NUMBER,
  GENERATED_NEXT_QUEUE_NUMBER,
  RECEPTION_GENERATED_NEXT_QUEUE_NUMBER,
  SET_SERVED,
  SET_KEEP,
  GET_CLIENT_MESSAGE,
  SET_CLIENT_PHONE_NUMBER,
  SET_COUNTER_TYPE,
  GET_LAST_QUEUE,
  SET_BASE64TO_PDF,
  GET_SERVED_KEEP_INFO,
  NUMBER_GENERATED_CASHIER,
  GET_REDIRECTO,
  GET_RECEPTION_LAST_QUEUE
} from "../Types/CashierTypes";

const cashier = {
  counters: [],
  selectedcounter: [],
  waitingList: [],
  receptionwaitingList: [],
  maxnumber: { data: [], visible: false },
  generatedqueuenumber: [],
  generatenext: [],
  reception_generatenext: [],
  served: false,
  keep: false,
  message: "",
  phonenumber: "",
  countertype: [],
  lastqueue: [],
  receptionlastqueue:[],
  base64topdf: { base64: [] },
  keepservedinfo: { queueno: "", countername: "", counternumber: "" },
  number_generated_cashier: false,
  data: "",
};
const CashierReducers = (data_state = cashier, actions) => {
  switch (actions.type) {
    case NUMBER_GENERATED_CASHIER:
      return { ...data_state, number_generated_cashier: actions.payload };
    case GET_REDIRECTO:
      return { ...data_state, data: actions.payload };
    case GET_SERVED_KEEP_INFO:
      return { ...data_state, keepservedinfo: actions.payload };
    case SET_BASE64TO_PDF:
      return { ...data_state, base64topdf: actions.payload };
    case GET_LAST_QUEUE:
      return { ...data_state, lastqueue: actions.payload };
    case GET_RECEPTION_LAST_QUEUE:
      return { ...data_state, receptionlastqueue: actions.payload };
    case SET_COUNTER_TYPE:
      return { ...data_state, countertype: actions.payload };
    case SET_CLIENT_PHONE_NUMBER:
      return { ...data_state, phonenumber: actions.payload };
    case GET_CLIENT_MESSAGE:
      return { ...data_state, message: actions.payload };
    case SET_SERVED:
      return { ...data_state, served: actions.payload };
    case SET_KEEP:
      return { ...data_state, keep: actions.payload };
    case GENERATED_NEXT_QUEUE_NUMBER:
      return { ...data_state, generatenext: actions.payload };
    case RECEPTION_GENERATED_NEXT_QUEUE_NUMBER:
      return { ...data_state, reception_generatenext: actions.payload };
    case GENERATED_QUEUE_NUMBER:
      return { ...data_state, generatedqueuenumber: actions.payload };
    case SET_COUNTERS:
      return { ...data_state, counters: actions.payload };
    case SET_SELECTED_COUNTERS:
      return { ...data_state, selectedcounter: actions.payload };
    case SET_WAITINGLIST:
      return { ...data_state, waitingList: actions.payload };
    case SET_RECEPTION_WAITINGLIST:
      return { ...data_state, receptionwaitingList: actions.payload };
    case SET_MAXNUMBER:
      return { ...data_state, maxnumber: actions.payload };
    default:
      return data_state;
  }
};
export default CashierReducers;
