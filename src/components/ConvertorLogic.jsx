import React, { useEffect, useState } from "react";

const ConvertorTrue = (props) => {

	const [inputValue, setInput] = useState()
	const [resultValue, setResult] = useState(0)
	const [selectLeft, setLeft] = useState('UAH')
	const [selectRight, setRight] = useState('UAH')

	function setCurrencyValue(){

		if(!Number.isInteger(parseFloat(inputValue))){
			setResult('')
			return
		}

		
		switch(selectLeft){
			case "UAH":
				switch(selectRight){
					case "UAH":
						setResult(parseFloat(inputValue).toFixed(2))
						break
					case "USD":
						setResult((parseFloat(inputValue) * props.rates.USD).toFixed(2))
						break
					case "EUR":
						setResult((parseFloat(inputValue) * props.rates.EUR).toFixed(2))
						break
				}
				break
			case "USD":
				switch(selectRight){
					case "UAH":
						setResult((parseFloat(inputValue) * props.rates.USD).toFixed(2))
						break
					case "USD":
						setResult(parseFloat(inputValue))
						break
					case "EUR":
						setResult((parseFloat(inputValue) * props.rates.USD / props.rates.EUR).toFixed(2))
						break
				}
				break
			case "EUR":
				switch(selectRight){
					case "UAH":
						setResult((parseFloat(inputValue) * props.rates.EUR).toFixed(2))
						break
					case "USD":
						setResult((parseFloat(inputValue) * props.rates.EUR / props.rates.USD).toFixed(2))
						break
					case "EUR":
						setResult(parseFloat(inputValue))
						break
				}
				break
		}
	}

	useEffect(() => {
		setCurrencyValue()
	}, [inputValue])

	useEffect(() => {
		setCurrencyValue()
	}, [selectLeft])

	useEffect(() => {
		setCurrencyValue()
	}, [selectRight])

	

	return(
		<div className="convertor__inner">
			<div className="convertor__item">
				<div>Give</div>
				<select 
					className="convertor__select" 
					id="select_left" 
					onChange={event => setLeft(event.target.value)}
					>
					<option value="UAH">UA Hryvna</option>
					<option value="USD">US Dollar</option>
					<option value="EUR">EUR Euro</option>
				</select>
				<div>
					<input 
						className="convertor__input" 
						type="text" 
						id="input"
						value={inputValue}
						onInput={event => setInput(event.target.value)}
					/>
				</div>
			</div>

			<div className="convertor__item">
				<div>Receive</div>
				<select 
					className="convertor__select" 
					id="select_right" 
					onChange={event => setRight(event.target.value)}
					>
					<option value="UAH">UA Hryvna</option>
					<option value="USD">US Dollar</option>
					<option value="EUR">EUR Euro</option>
				</select>
				<div>
					<input 
						className="convertor__input" 
						type="text" 
						id="input"
						disabled
						value={resultValue}
						onInput={event => setResult(event.target.value)}
					/>
				</div>
			</div>
		</div>
	);
}

export default ConvertorTrue;