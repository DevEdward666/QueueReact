import {
  RECEPTION_GENERATED_NEXT_QUEUE_NUMBER,
  GENERATED_NEXT_QUEUE_NUMBER,
  GENERATED_QUEUE_NUMBER,
  GET_CLIENT_MESSAGE,
  GET_LAST_QUEUE,
  SET_CLIENT_PHONE_NUMBER,
  SET_COUNTERS,
  SET_COUNTER_TYPE,
  SET_KEEP,
  SET_MAXNUMBER,
  SET_SELECTED_COUNTERS,
  SET_SERVED,
  SET_WAITINGLIST,
  SET_RECEPTION_WAITINGLIST,
  SET_BASE64TO_PDF,
  GET_RECEPTION_LAST_QUEUE,
  GET_SERVED_KEEP_INFO,
  NUMBER_GENERATED_CASHIER,
  GET_REDIRECTO,
} from "../Types/CashierTypes";
import printJS from "print-js";
import * as signalR from "@microsoft/signalr";
import { GET_SERVED } from "../Types/QueueTypes";
import {
  SIGNALR_CONNECT_NOTIFY,
  SIGNALR_CONNECT_NOTIFY_MOBILE,
} from "../Types/DefaultTypes";
const auth = window.localStorage.getItem("queue_token");
const bearer_token = auth;
const bearer = "Bearer " + bearer_token;

export const action_GET_getcountermaintable = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/getcountermaintable`;
  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const jsonData = await response.json();

  dispatch({
    type: SET_COUNTERS,
    payload: jsonData.data,
  });
};

export const actions_GET_counterlist = (selectCounter) => async (dispatch) => {
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
    type: SET_SELECTED_COUNTERS,
    payload: jsonData.data,
  });
  console.log(jsonData);
};
function printPreview(data) {
  var type = "application/pdf";
  let blob = null;
  const blobURL = URL.createObjectURL(
    pdfBlobConversion(data, "application/pdf")
  );
  const theWindow = window.open(blobURL);
  const theDoc = theWindow.document;
  const theScript = document.createElement("script");
  function injectThis() {
    window.print();
  }
  theScript.innerHTML = `window.onload = ${injectThis.toString()};`;
  theDoc.body.appendChild(theScript);
}
//converts base64 to blob type for windows
function pdfBlobConversion(b64Data, contentType) {
  contentType = contentType || "";
  var sliceSize = 512;
  b64Data = b64Data.replace(/^[^,]+,/, "");
  b64Data = b64Data.replace(/\s/g, "");
  var byteCharacters = window.atob(b64Data);
  var byteArrays = [];

  for (
    var offset = 0;
    offset < byteCharacters.length;
    offset = offset + sliceSize
  ) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
const base64topdf = async (base64url, fileName) => {
  // const pdfContentType = "application/pdf";
  // let pdfWindow = window.open("")
  // var byteCharacters = atob(base64url);
  // var byteNumbers = new Array(byteCharacters.length);
  // for (var i = 0; i < byteCharacters.length; i++) {
  //   byteNumbers[i] = byteCharacters.charCodeAt(i);
  // }
  // var byteArray = new Uint8Array(byteNumbers);
  // var file = new Blob([byteArray], { type: 'application/pdf;base64' });
  // var fileURL = URL.createObjectURL(file);

  var objbuilder = "";
  objbuilder +=
    '<object><embed id="pdfID" type="text/html" width="1200" height="600" src="data:application/pdf;base64,' +
    base64url +
    '" /></object>';
  var win = window.open("#", "_blank");
  // var title = "my tab title";
  // win.document.write('<html><title>'+ title +'</title><body style="margin-top: 0px; margin-left: 0px; margin-right: 0px; margin-bottom: 0px;">');
  win.document.write(objbuilder);
  // win.document.write('</body></html>');
  win.focus();
  win.print();
  win.close();

  // let html = '<html> <body style="margin:0!important"> <embed width="100%" height="100%" src="data:'+pdfContentType+';base64,'+base64url+'" type="application/pdf"/> </body> </html>';

  // link.document.write(html)
  // let pdfWindow = window.open("")
  // setTimeout(() => {
  // pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " +base64url+ "'></iframe>")

  // // await link.document.write('<html> <body style="margin:0!important"> <embed width="100%" height="100%" src="data:'+pdfContentType+';base64,'+base64url+'" type="application/pdf"/> </body> </html>');

  // },0);

  // link.href = `data:${pdfContentType};base64,${base64url}`;
  // link.download = fileName;
  // link.click();
  // const win = window.open("", "PRINT");

  // await win.document.write(html);
  // await win.document.close();
  // await win.focus();
  // await win.print();
  // await win.close();

  // window.open(`data:application/pdf;base64,${base64url}`, 'PRINT')
  // window.focus();
  // window.print();
};

export const action_generate_numbers =
  (queueno, countername, countertype, maxnumber, redirectto, totalticket) =>
  async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/generatenumberwithoutpdf`;
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queueno: queueno,
        generated_counter: countername,
        generated_countertype: countertype,
        maxnumber: maxnumber,
        counter: totalticket,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        dispatch({
          type: NUMBER_GENERATED_CASHIER,
          payload: res.success,
        });
        // dispatch({
        //   type: SET_BASE64TO_PDF,
        //   payload: { base64topdf: res.data, openbackdrop: false },
        // });
        // res.data.map((i)=>{
        //   return printJS({ printable:i, type: 'pdf', base64: true,
        //    onLoadingEnd:()=> dispatch({
        //     type:NUMBER_GENERATED_CASHIER,
        //     payload:res.success
        //   }),
        //   onLoadingStart:()=> dispatch({
        //     type:NUMBER_GENERATED_CASHIER,
        //     payload:false
        //   }),
        // });

        // })
      });
  };

export const action_waitinglist =
  (storecountername, storecountertype) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/waitinglist`;

    const response = await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countername: storecountername,
        countertype: storecountertype,
      }),
    });

    const tempRows = [];
    const jsonData = await response.json();
    dispatch({
      type: SET_WAITINGLIST,
      payload: jsonData.data,
    });
  };
  export const action_reception_waitinglist =
  () => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/reception_waitinglist`;
    const response = await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      }
    });
    const jsonData = await response.json();
    dispatch({
      type: SET_RECEPTION_WAITINGLIST,
      payload: jsonData.data,
    });
  };
export const action_getmaxnumber = (storecountername) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/getmaxnumber`;

  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      counter: storecountername,
    }),
  });
  const jsonData = await response.json();
  dispatch({
    type: SET_MAXNUMBER,
    payload: { data: jsonData.data, visible: true },
  });
};

export const action_generatequeuenumber =
  (storecountername) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/generatequeuenumber`;
    const response = await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        counter: storecountername,
      }),
    });

    const jsonData = await response.json();
    dispatch({
      type: GENERATED_QUEUE_NUMBER,
      payload: jsonData.data,
    });
  };

export const action_generatenext =
  (storecountername, storecountertype) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/getqueuno`;
    const response = await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countername: storecountername,
        countertype: storecountertype,
      }),
    });

    const jsonData = await response.json();
    dispatch({
      type: GENERATED_NEXT_QUEUE_NUMBER,
      payload: jsonData.data,
    });
  };
export const action_reception_generatenext = () => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/reception_getqueuno`;
    const response = await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    });

    const jsonData = await response.json();
    
    console.log(response)
    dispatch({
      type: RECEPTION_GENERATED_NEXT_QUEUE_NUMBER,
      payload: jsonData.data,
    });
  };

export const action_keep =
  (queueno, countername, storecounterno) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/updatecounter`;
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queueno: queueno,
        countername: countername,
        counter: storecounterno,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: SET_KEEP,
          payload: true,
        });
      });
  };
export const action_served =
  (queueno, countername, storecounterno) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/updateservedqueue`;
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queueno: queueno,
        countername: countername,
        counter: storecounterno,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        dispatch({
          type: SET_SERVED,
          payload: true,
        });
      });
  };
export const notifytoserve =
  (queueno, countername, storecounterno) => async (dispatch) => {
    dispatch({
      type: GET_SERVED_KEEP_INFO,
      payload: {
        queueno: queueno,
        countername: countername,
        counternumber: storecounterno,
      },
    });
  };
export const get_client_message = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/message`;
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
        type: GET_CLIENT_MESSAGE,
        payload: res?.data?.message,
      });
    });
};

export const nextClienttoText = (storecountername) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/nextclienttotext`;
  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      counter: storecountername,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: SET_CLIENT_PHONE_NUMBER,
        payload: res?.data[0]?.phonenumber,
      });
    });
};

export const actions_sendmessage =
  (phonenumber, message) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/insertmessage`;
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phonenumber: phonenumber,
        msg: message,
      }),
    });
  };

export const signalr_connection_notify = () => async (dispatch) => {
  const hubConnect = new signalR.HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_BASE_URL}api/notif/notify`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })

    .build();
  hubConnect.start();
  dispatch({ type: SIGNALR_CONNECT_NOTIFY, payload: hubConnect });
};
export const signalr_connection_notify_mobile = () => async (dispatch) => {
  const hubConnect = new signalR.HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_BASE_URL}api/notifmobile/notifymobile`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })

    .build();
  hubConnect.start();
  dispatch({ type: SIGNALR_CONNECT_NOTIFY_MOBILE, payload: hubConnect });
};

export const action_getcountertype = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/getcountertype`;

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
    type: SET_COUNTER_TYPE,
    payload: jsonData.data,
  });
};

export const action_get_last_queue =
  (countername, storecounterno) => async (dispatch) => {
    var url = `${process.env.REACT_APP_BASE_URL}api/queue/lastqueueno`;

    const response = await fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countername: countername,
        counter: storecounterno,
      }),
    });
    const jsonData = await response.json();
    dispatch({
      type: GET_LAST_QUEUE,
      payload: jsonData.data,
    });
    console.log(jsonData.data);
  };
  
export const action_get_reception_last_queue = () => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/queue/reception_lastqueueno`;

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
    type: GET_RECEPTION_LAST_QUEUE,
    payload: jsonData.data,
  });
  console.log(jsonData.data);
};
export const action_getUserinfo = (username) => async (dispatch) => {
  var url = `${process.env.REACT_APP_BASE_URL}api/user/getuserinfo`;

  const response = await fetch(url, {
    method: "POST",
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  });
  const jsonData = await response.json();
  dispatch({
    type: GET_REDIRECTO,
    payload: jsonData.data,
  });
};
