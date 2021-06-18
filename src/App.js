import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [timeis, setTimeis] = useState(0);
  const [timePausedis, setTimePausedis] = useState(true);
  const [startTimeis, setStartTimeis] = useState(null);
  const [splitListis, setSplitListis] = useState([]);
  const Hour_mSec = 60 * 60 * 1000;
  const Min_mSec = 60 * 1000;
  const Sec_mSec = 1000;

  useEffect(() => {
    if (!timePausedis) {
      let timer = setInterval(() => {
        setTimeis(() => {
          const elapsedTime = Date.now() - startTimeis;
          return elapsedTime;
        });
      }, 4);
      return () => clearInterval(timer);
    }
  }, [timePausedis, startTimeis]);

  // For reference
  // https://www.npmjs.com/package/react-timer-hook

  const formatTime = (mSec) => {
    let left = mSec;
    const h = Math.floor(left / Hour_mSec);
    left -= h * Hour_mSec;
    const m = Math.floor(left / Min_mSec);
    left -= m * Min_mSec;
    const s = Math.floor(left / Sec_mSec);
    left -= s * Sec_mSec;
    const ms = left % 1000;

    const digitMilisec = ms.toString().padStart(3, "0");
    const digitSec = s.toString().padStart(2, "0");
    const digitMint = m.toString().padStart(2, "0");
    const digitHour = h.toString().padStart(2, "0");

    return `${digitHour}:${digitMint}:${digitSec}.${digitMilisec}`;
  };
  // export const formatTime = (timer) => {
  //   const getSeconds = `0${(timer % 60)}`.slice(-2)
  //   const minutes = `${Math.floor(timer / 60)}`
  //   const getMinutes = `0${minutes % 60}`.slice(-2)
  //   const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

  //   return `${getHours} : ${getMinutes} : ${getSeconds}`
  // }




  const resetTime = () => {
    setTimeis(0);
    setTimePausedis(true);
    setSplitListis([]);
  };
  const splitTime = () => {
    addSpltVal("split");
  };
  const startTime = () => {
    setStartTimeis(Date.now() - timeis);
    setTimePausedis((p) => !p);
    if (!timePausedis) addSpltVal("pause");
  };
  const addSpltVal = (reason) => {
    setSplitListis((split) => [...split, { timeis, reason }]);
  };

  const crntInt = () => {
    const { length, [length - 2]: last2nd, [length - 1]: last } = splitListis;
    if (isReset) return "SPLIT TIME";

    if (!last) return formatTime(timeis);



    return formatTime(timeis - last.timeis);
  };

  const isReset = timeis === 0;
  const timerState = !timePausedis ? "Pause" : "Start";
  const timeFormat = formatTime(timeis);
  return (
    <div className="App">
      <div className="displayApp">
        <span>{timeFormat.slice(0, -2)}</span>
        <span className="milisec">{timeFormat.slice(-2)}</span>
      </div>
      <div className="Csplit">{crntInt()}</div>
      <div>
        <button className={timePausedis ? "start" : "pause"} onClick={startTime}>
          {timerState}
        </button>
        <button
          className="split"
          disabled={isReset || timePausedis}
          onClick={splitTime}
        >
          Split
        </button>
        <button
          className="reset"
          disabled={isReset || !timePausedis}
          onClick={resetTime}
        >
          Reset
        </button>
      </div>
      {splitListis.length > 0 && <hr />}
      <div>
        {splitListis.map((x, i, arr) => {
          const { timeis, reason } = x;
          const interval = i > 0 ? timeis - arr[i - 1].timeis : timeis;
          return (
            <div className="itemSplit" key={timeis}>
              <div>#{i + 1}</div>
              <div className={reason}>{formatTime(interval)}</div>
              <div>{reason}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
