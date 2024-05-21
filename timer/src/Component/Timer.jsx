import React, { useState, useEffect } from 'react';
import './Timer.css'; 

const Timer = () => {
  const [time, setTime] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [stop, setStop] = useState(true);

  useEffect(() => {
    let interval = null;
    if (!stop) {
      interval = setInterval(() => {
        setTime(prevTime => {
          let { day, hour, minute, second } = prevTime;
          
          second += 1;
          if (second === 60) {
            second = 0;
            minute += 1;
          }
          if (minute === 60) {
            minute = 0;
            hour += 1;
          }
          if (hour === 24) {
            hour = 0;
            day += 1;
          }

          return { day, hour, minute, second };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stop]);

  const onStart = () => {
    setStop(false);
  };

  const onStop = () => {
    setStop(true);
  };

  const onReset = () => {
    setTime({ day: 0, hour: 0, minute: 0, second: 0 });
    setStop(true);
  };

  const splitDigits = (number) => {
    const digits = number < 10 ? `0${number}` : number.toString();
    return digits.split('').map((digit, index) => (
      <div key={index} className="digit">
        {digit}
      </div>
    ));
  };

  return (
    <div>
      <h1 className='head'>Countdown Timer</h1>
      <div className="timer-container">
        <div className="timer-content">
          <div className="timer-label">Days</div>
          <div className="digit-container">
            {splitDigits(time.day)}
          </div>
        </div>
        <div className="timer-content">
          <div className="colon">:</div>
        </div>
        <div className="timer-content">
          <div className="timer-label">Hours</div>
          <div className="digit-container">
            {splitDigits(time.hour)}
          </div>
        </div>
        <div className="timer-content">
          <div className="colon">:</div>
        </div>
        <div className="timer-content">
          <div className="timer-label">Minutes</div>
          <div className="digit-container">
            {splitDigits(time.minute)}
          </div>
        </div>
        <div className="timer-content">
          <div className="colon">:</div>
        </div>
        <div className="timer-content">
          <div className="timer-label">Seconds</div>
          <div className="digit-container">
            {splitDigits(time.second)}
          </div>
        </div>
      </div>
      <div className="button-container">
        <button onClick={onStart}>Start</button>
        <button onClick={onStop}>Stop</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
