import { useState, useEffect } from "react";

const CurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Set up an interval to update the time every second
    const timerId = setInterval(() => {
      setTime(new Date());
      console.log("Timer tick");
    }, 1000);

    // This is the cleanup function
    return () => {
      clearInterval(timerId);
      console.log("Timer cleared! The component has unmounted.");
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className="time-widget">
      <h3>Live Clock (Cleanup Function Demo)</h3>
      <p>
        This clock updates every second. When you hide this component, the
        cleanup function in `useEffect` will clear the interval, stopping the
        timer and preventing a memory leak. Check the console log.
      </p>
      <p>Current Time: {time.toLocaleTimeString()}</p>
    </div>
  );
};

export default CurrentTime;
