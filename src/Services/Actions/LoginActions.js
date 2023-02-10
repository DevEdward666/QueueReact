export const action_Login_user = (username, password) => async () => {
  var url = `${process.env.REACT_APP_BASE_URL}api/user/login`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      if (res.success) {
        window.localStorage.setItem("queue_token", res.data.access_token);
        window.localStorage.setItem("refreshtoken", res.data.refresh_token);
        window.location.href = "/Cashier";
      } else {
        alert("Wrong Username/Password");
      }
    });
};
