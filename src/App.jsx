// import the react hook useState
// - that we use to create state variables
//   (state variables are special variables watched by React)
// and also import the effect hook 
// - used to run code only once when to component mounts
import { useState, useEffect } from 'react';

export default function App() {

  // Creating a new state variable called startTime
  // and a setter for startTime called setStartTime
  // and settings its initial value to milliseconds 
  // since the new year 1970 in GMT - Date.getTime()
  const [startTime, setStartTime] = useState(Date.now());

  // And another state variable containing the present time
  // that we update once a second
  const [nowTime, setNowTime] = useState(Date.now());

  // And yet another state variable - countdown from what?
  const [countdownFromSeconds, setCountdownFromSeconds] = useState(null);

  // Ask the user ONCE when the component mounts for
  // countdownFromSeconds
  useEffect(() => {
    // In order to cirumvent React.strictmode
    // and be abel to use the old school prompt command in JS
    // without running prompt twice use a global window variable
    if (!window.countdownSeconds) {
      window.countdownSeconds = +prompt('Countdown from seconds?');
      // To get the countdown values correct set the startTime to 'now'
      setStartTime(Date.now());
    }
    setCountdownFromSeconds(window.countdownSeconds);
  }, []);

  // Update nowTime once a second by calling its setter
  // inside a 'setInterval'-'loop'
  setInterval(() => setNowTime(Date.now()), 1000);

  // Time since start (ordinary variable not state variable)
  let totalSecondsLeft = countdownFromSeconds
    - Math.round((nowTime - startTime) / 1000);
  totalSecondsLeft = Math.max(0, totalSecondsLeft);
  let minutesLeft = Math.floor(totalSecondsLeft / 60);
  let secondsLeft = totalSecondsLeft % 60;

  // in React a component returns its output as jsx (with a html-like syntax)
  return <div>
    <h1>Countdown</h1>
    <p>
      Time left:&nbsp;
      {/* (variable + '') converts a numeric variable to a string
          padStart is a string method that fills the start of a string
          with characters until it reaches a certain length
          - used here to get zeros before one digit numbers */}
      {(minutesLeft + '').padStart(2, '0')}:
      {(secondsLeft + '').padStart(2, '0')}
    </p>
  </div>;
}