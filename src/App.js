import React, { useState, useRef, createRef } from "react";
import PomodoroControl from "./components/PomodoroControl"
import {accurateInterval} from "./utils/helpers.js"
import './App.css';


function App() {
  const [displayTime, setDisplayTime] = useState(60*25);
  const [breakTime, setBreakTime] = useState(60*5);
  const [sessionTime, setSessionTime] = useState(60*25);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const myAudio = useRef();
  const displayTimerRef = createRef();
  const timeoutRef = useRef();

  //do the countdown
  const timerControl = () => {
    if (!timerOn) {
      setTimerOn(true);
      beginCountDown();
    } else if (timeoutRef.current.timeoutID) {      
        timeoutRef.current.cancel();
        setTimerOn(false);
    }
  }


  const beginCountDown = () => { 
    let timeOutInfo = accurateInterval(() => {
          phaseControl()
        }, 1000)
    timeoutRef.current = timeOutInfo
    //console.log(timeoutRef.current.timeoutID)
  }
  

  const phaseControl = () => {
      let time = displayTime;      
      
      setDisplayTime((prev) => {
        displayTimerRef.current = prev
        return prev - 1
      });
      
      time = displayTimerRef.current;

      //console.log(time)

      if (time <= 0) {

       if (timeoutRef.current) {
            timeoutRef.current.cancel()
            console.log("canceled")

            setOnBreak((prev) => !prev)

            if (!onBreak) {
              //console.log("breaktime:" + breakTime);
              setDisplayTime(breakTime)
              playBuzzer()
            } else {
              //console.log("sessionTime" + sessionTime);
              setDisplayTime(sessionTime)
              playBuzzer()
            }

            beginCountDown()
        }
      }
  } 

  //Reset Pomodoro
  const resetPomodoro = () => {
    setDisplayTime(60*25);
    setBreakTime(60*5);
    setSessionTime(60*25);
    setOnBreak(false);
    setTimerOn(false);
    if (timeoutRef.current) {
      timeoutRef.current.cancel();
    }
    myAudio.current.pause();
    myAudio.current.currentTime = 0;
  }

//Pomodoro settings function
  const changeTime  = (timeAmmount, type) => {
    if (type === "break") {
      if ((breakTime >= 60*60 && timeAmmount > 0 ) || (breakTime <= 60 && timeAmmount < 0 ) ) {
          return;
        }
       setBreakTime((prev) => prev + timeAmmount)
    } else if (type === "session") {
       if ((sessionTime >= 60*60 && timeAmmount > 0 ) || (sessionTime <= 60 && timeAmmount < 0 ) ) {
          return;
        }
      setSessionTime((prev) => prev + timeAmmount);
      if (!timerOn) {
        setDisplayTime(sessionTime + timeAmmount);
      }
    }
  }

  //Helper function to display time
  const formatTime = (time, type="display") => {
    
    if (type === "display"){ 
    
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

     return (        
         (minutes < 10 ? "0" + minutes : minutes)
          +
          ":"
          +
          (seconds < 10 ? "0" + seconds : seconds)
        )
    } else if (type === "control") {
       let minutes = Math.ceil(time / 60);
       return minutes
    }
  }

  //helper function to play the buzzer
   const playBuzzer = () => {
    myAudio.current.currentTime = 0
    myAudio.current.play()
  }
 

  return (
    <React.Fragment>
    <h1>FreeCodeCamp Pomodoro Clock App</h1>
    <main>
      <header>
        <div className="session">
          <PomodoroControl 
            type = "break"
            length = {formatTime(breakTime, "control")}
            changeTime = {changeTime}
          />
          <PomodoroControl 
            type = "session"
            length = {formatTime(sessionTime, "control")}
            changeTime = {changeTime}
          />
        </div>
      </header>
      <section>
        <div className="timer">
          <p id="timer-label" className="title">{onBreak ? "Break" : "Session"}</p>
          <p id="time-left" ref={displayTimerRef}>{formatTime(displayTime)}</p>
          <span className="fill" ng-style="{'height':fillHeight, 'background':fillColor }"></span>
        </div>
        <div className="timer_controls">
            <button id="start_stop" onClick = {() => timerControl()}>{!timerOn? "Start" : "Pause"}</button> 
            <button id="reset" onClick = {() => resetPomodoro()}>Reset</button>
          </div>
      </section>
    </main>
    <audio
          id="beep"
          preload="auto"
          ref={myAudio} 
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </React.Fragment>
  );
}

export default App;