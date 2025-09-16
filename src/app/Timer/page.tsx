"use client";
import { useState } from "react";

const Timer = () => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  //changing minutes based on input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setMinutes(newValue);
  };

  function startTime() {
    let oneSecond = 60;
    let oneMinute = minutes;

    const countDown = setInterval(() => {
      if (oneMinute === 0 && oneSecond === 0) {
        clearInterval(countDown); // 🛑 Stop the timer
        setSeconds(0);
        setMinutes(0);
        return;
      }

      if (oneSecond === 0) {
        oneSecond = 59;
        oneMinute--;
        setMinutes(oneMinute);
      } else {
        oneSecond--;
      }

      setSeconds(oneSecond);
    }, 1000);
  }

  return (
    <>
      <div className="input-time">
        <input type="number" min={1} max={60} onInput={handleInput} />
      </div>
      <div className="timer">
        <h1>
          {minutes}:{seconds}
        </h1>
      </div>

      <button onClick={startTime}>Start</button>
    </>
  );
};

export default Timer;
