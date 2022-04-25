import { useState, useEffect, useRef } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({ data: [], loading: true });
  const isCurrent = useRef(true);
  const auth = window.localStorage.getItem("tokenizer");
  const bearer_token = auth;
  const bearer = "Bearer " + bearer_token;

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState((state) => ({ data: state.data, params: [], loading: true }));
    fetch(url, {
      method: "POST",
      withCredentials: true,
      headers: {
        Authorization: bearer,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({}),
    })
      .then((x) => x.json())
      .then((y) => {
        if (isCurrent.current) {
          setState({ data: y.data, loading: false });
        }
      });
  }, [bearer, url, setState]);
  return state;
};
