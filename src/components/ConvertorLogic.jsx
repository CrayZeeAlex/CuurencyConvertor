import React, { useEffect, useRef, useState } from "react";
 
const ConvertorTrue = (props) => {
  const [leftInputValue, setLeftInput] = useState();
  const [rightInputValue, setRightInput] = useState();
  const [mostRecentInput, setMostRecentInput] = useState();
 
  const selectLeftRef = useRef();
  const selectRightRef = useRef();
 
  function CalculateValue(value, leftCurrency, rightCurrency) {
    console.log(value, leftCurrency, rightCurrency)
    switch (leftCurrency) {
      case "UAH":
        switch (rightCurrency) {
          case "UAH":
            return parseFloat(value).toFixed(2);
          case "USD":
            return (parseFloat(value) / props.rates.USD).toFixed(2);
          case "EUR":
            return (parseFloat(value) / props.rates.EUR).toFixed(2);
          default:
            break;
        }
        break;
      case "USD":
        switch (rightCurrency) {
          case "UAH":
            return (parseFloat(value) * props.rates.USD).toFixed(2);
          case "USD":
            return parseFloat(value);
          case "EUR":
            return ((parseFloat(value) * props.rates.USD) / props.rates.EUR).toFixed(2);
          default:
            break;
        }
        break;
      case "EUR":
        switch (rightCurrency) {
          case "UAH":
            return (parseFloat(value) * props.rates.EUR).toFixed(2);
          case "USD":
            return ((parseFloat(value) * props.rates.EUR) / props.rates.USD).toFixed(2);
          case "EUR":
            return parseFloat(value);
          default:
            break;
        }
        break;
      default:
        break;
    }
  }
 
  const handleLeftValueChange = (newValue) => {
    setMostRecentInput('left')
    setLeftInput(newValue)
    let selectLeft = selectLeftRef.current.value;
    let selectRight = selectRightRef.current.value;
    setRightInput(CalculateValue(newValue, selectLeft, selectRight))
  };
 
  const handleRightValueChange = (newValue) => {
    setMostRecentInput('right')
    setRightInput(newValue)
    let selectLeft = selectLeftRef.current.value;
    let selectRight = selectRightRef.current.value;
    setLeftInput(CalculateValue(newValue, selectRight, selectLeft))
  };
 
  const decidceProperInput = () => {
    let selectLeft = selectLeftRef.current.value;
    let selectRight = selectRightRef.current.value;
    console.log('most recent input', mostRecentInput)
    if (mostRecentInput === 'left') {
      setRightInput(CalculateValue(leftInputValue, selectLeft, selectRight));
    } else if (mostRecentInput === 'right') {
      setLeftInput(CalculateValue(rightInputValue, selectRight, selectLeft));
    }
  } 
 
  const handleLeftSelectChange = () => {
    decidceProperInput()
  };
 
  const handleRightSelectChange = () => {
    decidceProperInput()
  };
 
  return (
    <div className="convertor__inner">
      <div className="convertor__item">
        <div>Give</div>
        <select
          className="convertor__select"
          id="select_left"
          ref={selectLeftRef}
          onChange={handleLeftSelectChange}
        >
          <option value="UAH">UA Hryvna</option>
          <option value="USD">US Dollar</option>
          <option value="EUR">EUR Euro</option>
        </select>
        <div>
          <input
            className="convertor__input"
            type="text"
            id="left"
            value={leftInputValue}
            onInput={(event) => handleLeftValueChange(event.target.value)}
          />
        </div>
      </div>
 
      <div className="convertor__item">
        <div>Receive</div>
        <select
          className="convertor__select"
          id="select_right"
          ref={selectRightRef}
          onChange={handleRightSelectChange}
        >
          <option value="UAH">UA Hryvna</option>
          <option value="USD">US Dollar</option>
          <option value="EUR">EUR Euro</option>
        </select>
        <div>
          <input
            className="convertor__input"
            type="text"
            id="right"
            value={rightInputValue}
            onInput={(event) => handleRightValueChange(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
 
export default ConvertorTrue;