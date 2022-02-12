import React, { useState } from "react";
import ConvertorTrue from "./ConvertorLogic";

const Convertor = () => {
	const [USDValue, setUSD] = useState()
	const [EURValue, setEUR] = useState()
	const rates = {};

	getCurrencies()

	async function getCurrencies(){
		const responce = await fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
		const data = await responce.json();
		const result = await data;
	
		rates.USD = parseFloat(result[0].sale).toFixed(2)
		rates.EUR = parseFloat(result[1].sale).toFixed(2)

		setUSD(rates.USD)
		setEUR(rates.EUR)
	}

	return (

		<div className="container">
			<div className="header__inner">
				<div className="header__curr">
					<div className="curr_item" id="USD">USD {USDValue}</div>
					<div className="curr_item" id="EUR">EUR {EURValue}</div>
				</div>
				<div className="header__title">Currency convertor</div>
			</div>
			
			<ConvertorTrue rates={{USD: USDValue, EUR: EURValue}}/>
		</div>
		
	);
}

export default Convertor;