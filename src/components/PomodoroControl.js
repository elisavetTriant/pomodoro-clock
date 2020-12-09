import React from "react";

function PomodoroControl({ type, length, changeTime }) {

return (
	<div className={`${type}Ctrl`}>
		<p id={`${type}-label`}>{type} length</p>
		<button id={`${type}-decrement`} className="minus" onClick = {()=> changeTime(-60, type)}>-</button>
		<span id={`${type}-length`} className="time">{length}</span>
		<button id={`${type}-increment`} className="plus" onClick = {()=> changeTime(60, type)}>+</button>
	 </div>
  )

}

export default PomodoroControl;