import React, { useState, useRef } from "react";
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
  const displayTimerRef = useRef();
  const timeoutRef = useRef();
  const onBreakRef = useRef(null);
  const displayVisualTimerRef = useRef();

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
  
  const displayElapsedPercentage = (isBreak, currentTick) => {
    let percentage = "0%"
    if (isBreak) {
      percentage = Math.abs(((currentTick - breakTime) / breakTime) * 100) + '%'
    }else {
      percentage = Math.abs(((currentTick - sessionTime) / sessionTime) * 100) + '%'
    }
    displayVisualTimerRef.current = percentage;
    //console.log(displayVisualTimerRef.current);
  }


  const phaseControl = () => {
      let time;     

      setDisplayTime((prev) => {
        displayTimerRef.current = prev
        return prev - 1
      });
      
      time = displayTimerRef.current;
      //console.log(time)

      if (time <= 0) {

       setOnBreak((prev) => {
        let previousState = prev
        onBreakRef.current = !previousState
        return !prev
       })

       if (timeoutRef.current) {
            timeoutRef.current.cancel()
            //console.log("canceled")

            if (onBreakRef.current === false) {
              //console.log("sessionTime" + sessionTime);
              displayTimerRef.current = sessionTime;
              playBuzzer()
            } else if (onBreakRef.current === true){
              //console.log("breaktime:" + breakTime);
              displayTimerRef.current = breakTime;
              playBuzzer()
            }
            setDisplayTime(displayTimerRef.current)           
            beginCountDown()
        }
      }

      displayElapsedPercentage(onBreakRef.current, time)
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
    displayVisualTimerRef.current = "0%"
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
          <span className="fill" style={{height: displayVisualTimerRef.current}}></span>
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