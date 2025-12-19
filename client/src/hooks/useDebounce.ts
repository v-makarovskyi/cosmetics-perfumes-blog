import React, { useState, useEffect } from "react";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDeboncedValue] = useState<string>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (value === "") return;
      setDeboncedValue(value);
      console.log("Effect сработал UseBebonce");
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debouncedValue;
}

export { useDebounce };
