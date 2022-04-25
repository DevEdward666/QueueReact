import { useEffect, useRef } from "react";

const UseInterval = (params) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = params.callbackFunc;
  }, [params.callbackFunc]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current !== "undefined") {
        savedCallback.current();
      }
    }
    if (params.delay !== null) {
      let id = setInterval(tick, params.delay);
      return () => clearInterval(id);
    }
  }, [params.delay]);
};

export default UseInterval;
