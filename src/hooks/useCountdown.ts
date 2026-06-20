import { useEffect, useState } from "react";

export default function useCountdown() {
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds === 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const reset = () => {
    setSeconds(15);
  };

  return {
    seconds,
    reset,
  };
}
