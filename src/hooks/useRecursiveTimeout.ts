import React, { useEffect, useRef } from "react";

function useRecursiveTimeout<T>(
  callback: () => T | (() => void),
  delay: number | null
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id: NodeJS.Timeout;
    function tick() {
      const ret = savedCallback.current();
      if (delay !== null) {
        id = setTimeout(tick, delay);
      }
    }
    if (delay !== null) {
      id = setTimeout(tick, delay);
      return () => id && clearTimeout(id);
    }
  }, [delay]);
}

export default useRecursiveTimeout;
