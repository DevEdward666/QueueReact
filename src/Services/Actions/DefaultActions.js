import {
  GET_LOGO,
  GET_NAME,
  GET_USER_INFO,
  NOTIFY_QUEUE,
  NOTIFY_QUEUE_MOBILE,
} from "../Types/DefaultTypes";

const auth = window.localStorage.getItem("queue_token");
const bearer_token = auth;
const bearer = "Bearer " + bearer_token;

export const getuserinfo = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/user/getuserinfo`;

  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const jsonData = response.json();
  dispatch({
    type: GET_USER_INFO,
    payload: jsonData,
  });
};

export const getlogo = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/company/company-logo`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_LOGO,
        payload: res.data,
      });
    });
};

export const getname = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/company/company-name`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: GET_NAME,
        payload: res.data,
      });
    });
};
export const action_notify_signal_mobile =
  (open, message, type, from, to) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/notificationmobile`;
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notification: message,
        from: from,
        to: to,
        type: type,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: NOTIFY_QUEUE_MOBILE,
          payload: { open: open, message: message, type: type },
        });
      });
  };
export const action_set_notification =
  (open, message, type, from, to) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/notification`;
    await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notification: message,
        from: from,
        to: to,
        type: type,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: NOTIFY_QUEUE,
          payload: { open: open, message: message, type: type },
        });
      });
  };
export const authenticate = (data) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/user/login`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.success) {
        window.localStorage.setItem("tokenizer", res.data.access_token);
        window.localStorage.setItem("refreshtoken", res.data.refresh_token);
        window.location.href = "/Cashier";
      } else {
        alert("Wrong Username/Password");
      }
    });

  // const parseData = await fetchdata.json();
  // if (parseData.success) {
  //   window.localStorage.setItem("tokenizer", parseData);
  //   window.localStorage.setItem("refreshtoken", parseData.refresh_token);
  //   // window.location.href = "/Cashier";

  // } else {
  //   alert("Wrong Username/Password");
  // }
};
