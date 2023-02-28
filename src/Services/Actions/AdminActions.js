import {
  ADD_LOBBY_CALLBACK,
  GENERATE_COUNTER_NUMBER,
  GET_COUNTER_NUMBER,
  GET_COUNTER_TABLE,
  GET_COUNTER_TYPE,
  SET_COUNTER_NUMBER,
  SET_COUNTER_TABLE,
  SET_SUCCESS,
  LOBBY_TABLE,
  ADD_LOBBY_CALLBACK_MAIN,
  SET_SNACKBAR,
  SET_TABLE_CLICK,
  USERLIST,
  TABLE_USERLIST,
  UPDATE_CASHIER
} from "../Types/AdminTypes";

const auth = window.localStorage.getItem("queue_token");
const bearer_token = auth;
const bearer = "Bearer " + bearer_token;
export const action_get_countertable = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/getcountermaintable`;

  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  });
  const jsonData = await response.json();
  console.log(jsonData);
  dispatch({
    type: GET_COUNTER_TABLE,
    payload: jsonData.data,
  });
};

export const action_get_countertype = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/getcountertype`;
   fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
  .then((response) => response.json())
  .then((res) => {
    dispatch({
      type: GET_COUNTER_TYPE,
      payload: res.data,
    });
  });
};

  export const insert_user_queue =
  (users, counternumber, counter, type) => async (disaptch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/user/insertqueueuser`;
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: users,
        accnt_type: counternumber,
        redirectto: counter,
        type: type,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        disaptch({
          type: SET_SUCCESS,
          payload: { success: res.success, message: res.message },
        });
      });
  };
export const action_add_counter =
  (countername, typeclient,status) => async (disaptch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/getcounterexist`;
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countername: countername,
        countertype: typeclient,
        active:status,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        disaptch({
          type: SET_SUCCESS,
          payload: { success: res.success, message: res.message },
        });
      });
  };
  export const action_update_counter =
  (counterid,countername, typeclient,prevcountername,status) => async (disaptch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/getcounterexistandupdate`;
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        counterid:counterid,
        countername: countername,
        countertype: typeclient,
        prev_counter_name:prevcountername,
        active:status
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        disaptch({
          type: SET_SUCCESS,
          payload: { success: res.success, message: res.message },
        });
      });
  };
export const getcounters_table = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/getcounters_table`;

  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  });
  const jsonData = await response.json();
  dispatch({
    type: SET_COUNTER_TABLE,
    payload: jsonData.data,
  });
};

export const addcounter_number =
  (counterno, selectCounter, typeclient) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/addnewcounternumber`;
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        counter_name: counterno,
        displayedto: selectCounter,
        type: typeclient,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_COUNTER_NUMBER,
          payload: { message: res.message, success: res.success },
        });
      });
  };

export const action_geno = (selectCounter, typeclient) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/generatecounterno`;

  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      displayedto: selectCounter,
      type: typeclient,
    }),
  });
  const jsonData = await response.json();
  dispatch({
    type: GENERATE_COUNTER_NUMBER,
    payload: jsonData.data,
  });
};

export const action_addlobby = (location) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/addlobby`;
  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location: location,
    }),
  });
  const jsonData = await response.json();
  dispatch({
    type: ADD_LOBBY_CALLBACK_MAIN,
    payload: { message: jsonData.message, success: jsonData.success },
  });
};
export const addlobbydtls =
  (lobbySelected, selectCounter, selectCounterNo) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/addlobbydtls`;
    const response = await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lobbyno: lobbySelected,
        countername: selectCounter,
        counterno: selectCounterNo,
      }),
    });
    const jsonData = await response.json();
    dispatch({
      type: ADD_LOBBY_CALLBACK,
      payload: jsonData.success,
    });
  };

export const action_getcounternumber = (selectCounter) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/getcounternumber`;
  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      displayedto: selectCounter,
    }),
  });
  const jsonData = await response.json();
  dispatch({
    type: GET_COUNTER_NUMBER,
    payload: jsonData.data,
  });
};

export const action_lobbytable = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/lobbytable`;
  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  });
  const jsonData = await response.json();
  dispatch({ type: LOBBY_TABLE, payload: jsonData.data });
  console.log(jsonData.data)
};
export const action_userlists_select = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/user/getselectusers`;
  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  });

  const jsonData = await response.json();
  console.log(jsonData.data);
  dispatch({
    type: USERLIST,
    payload: jsonData.data,
  });
};
export const action_userlists = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/user/gettableusers`;
  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  });

  const jsonData = await response.json();

  dispatch({
    type: TABLE_USERLIST,
    payload: jsonData.data,
  });
};
export const action_setsnackbar = (message, type, open) => async (dispatch) => {
  dispatch({
    type: SET_SNACKBAR,
    payload: { message: message, type: type, open: open },
  });
};
export const action_tableclick = (btntext) => async (dispatch) => {
  dispatch({
    type: SET_TABLE_CLICK,
    payload: btntext,
  });
};
export const set_update_cashier =(cashier_id,cashier_name,cashier_type,active) =>async (dispatch) => {
  dispatch({
    type: UPDATE_CASHIER,
    payload: { cashier_id:cashier_id,cashier_name: cashier_name, cashier_type: cashier_type,active },
  });
}