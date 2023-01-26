import {
  GET_SERVED,
  LIST_OF_COUNTERS,
  LIST_OF_LOBBY,
  NUMBER_GENERATED,
  SELECTED_LOBBY,
  GET_GENERATOR_REGULAR,
  GET_GENERATOR_SENIOR,
  SET_COUNTER_VIEW,
  SELECTED_PAGE,
} from "../Types/QueueTypes";

import printJS from "print-js";
const auth = window.localStorage.getItem("queue_token");
const bearer_token = auth;
const bearer = "Bearer " + bearer_token;

export const action_getCounterList = (Selectedlocation,SelectedlocationName) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/getcounterlist`;
  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lobbyno: Selectedlocation,
      lobbyName:SelectedlocationName
    }),
  });
  const jsonData = await response.json();
  dispatch({
    type: LIST_OF_COUNTERS,
    payload: { data: jsonData.data, success: jsonData.success },
  });
  console.log(jsonData);
};

export const lobbytable = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/lobbytable`;
  await fetch(url, {
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
        type: LIST_OF_LOBBY,
        payload: { data: res.data, succes: true },
      });
    });
};
export const selectedlobby = (lobbyselected) => async (dispatch) => {
  dispatch({
    type: SELECTED_LOBBY,
    payload: lobbyselected,
  });
};
export const selectedpage = (selected_page) => async (dispatch) => {
  dispatch({
    type: SELECTED_PAGE,
    payload: selected_page,
  });
};

export const generatenumberregular = (countername) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/generatenumberkiosk`;
  await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      generated_counter: countername,
      generated_countertype: "Regular",
    }),
  })
    .then((response) => response.json())
    .then(async (res2) => {
      if (res2.success) {
        await printJS({
          printable: res2.data,
          type: "pdf",
          base64: true,
          onLoadingEnd: () =>
            dispatch({
              type: NUMBER_GENERATED,
              payload: res2.success,
            }),
          onLoadingStart: () =>
            dispatch({
              type: NUMBER_GENERATED,
              payload: false,
            }),
        });
      } else {
        alert(res2.message);
      }
      var url2 = `${process.env.REACT_APP_BASE_URL}api/queue/generatequeuenumber`;
      fetch(url2, {
        method: "POST",
        withCredentials: true,
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          counter: countername,
        }),
      })
        .then((response) => response.json())
        .then((res) => {});
    });
};

export const generatenumberpriority = (countername) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/generatenumberkiosk`;
  fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      generated_counter: countername,
      generated_countertype: "Senior",
    }),
  })
    .then((response) => response.json())
    .then(async (res) => {
      if (res.success) {
        await printJS({
          printable: res.data,
          type: "pdf",
          base64: true,
          onLoadingEnd: () =>
            dispatch({
              type: NUMBER_GENERATED,
              payload: res.success,
            }),
          onLoadingStart: () =>
            dispatch({
              type: NUMBER_GENERATED,
              payload: false,
            }),
        });
      }
    });
};
export const GeneratorRegular = () => async (dispatch) => {
  console.log("test");
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/getqueuemain`;
  fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: GET_GENERATOR_REGULAR,
        payload: res.data,
      });
    });
};
export const GeneratorSenior = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/getqueuemainsenior`;
  fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (res) => {
      dispatch({
        type: GET_GENERATOR_SENIOR,
        payload: res.data,
      });
    });
};
export const updatephone =
  (phone, queueno, countername) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/updatequeuephone`;
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        phonenumber: phone,
        queueno: queueno,
        countername: countername,
      }),
    });
  };

export const getserved =
  (queueno, countername, storecounterno) => async (dispatch) => {
    dispatch({
      type: GET_SERVED,
      payload: {
        queueno: queueno,
        countername: countername,
        counternumber: storecounterno,
      },
    });
  };
export const set_counterview = (allview) => async (dispatch) => {
  dispatch({
    type: SET_COUNTER_VIEW,
    payload: allview,
  });
};
