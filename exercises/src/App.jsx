// import React from 'react'
import { useState } from 'react';
import './App.css'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div >
      button press history: {props.allClicks.join(' ')};
  </div>
  )
};

const Display = props => <p>{props.value}</p>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
};

const App = () => {
  const [ left, setLeft ] = useState(0);
  const [ right, setRight ] = useState(0);
  const [ allClicks, setAll ] = useState([]);
  const [ total, setTotal ] = useState(0);
  const [value, setValue] = useState(10);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    console.log('left before', left);
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    console.log('left after', updatedLeft);
    setTotal(updatedLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  };

  const setToValue = (newValue) => {
    console.log('value now', newValue); // print new value to the console
    setValue(newValue);
  };

  const hello = (who) => () => console.log('hello', who);

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left'/>
      <Button handleClick={handleRightClick} text='right'/>
      {right}
      <History allClicks={allClicks} />
      <p>total {total}</p>
      <button onClick={hello('Catherine')}>button</button>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text='thousand' />
      <Button handleClick={() => setToValue(0)} text='reset'/>
      <Button handleClick={() => setToValue(value + 1)} text='increment'/>

    </div>
  )
}

export default App
