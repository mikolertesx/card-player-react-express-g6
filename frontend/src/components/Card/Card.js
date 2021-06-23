import { useState } from "react";

import "./Card.scss";
import "./Card-Types.scss";
import CardsImage from "./Cards.png";
import CardBackImage from "./CardCover.png";

const nonNumbers = ["A", "J", "Q", "K"]

const getFixedSize = (number) => {
	return nonNumbers.findIndex(inNumber => number === inNumber) !== -1 ? 1 : +number
}

const getCardUrl = (number) => {
	return number === "J" || number === "Q" || number === "K" ? CardsImage : ""
}

const Card = ({ number, symbol, canBeFlipped = true, isFlipped = true }) => {
	const [currentFlip, setCurrentFlip] = useState(isFlipped);

	const onClickCardHandler = () => {
		if (canBeFlipped === false) return;
		setCurrentFlip((prevFlip) => !prevFlip);
	};

	const fixedClassName = `card card-${symbol} ${currentFlip ? "flipped" : ""}`;
	const isNumber = !isNaN(number) || number === "A";
	const fixedSize = getFixedSize(number)
	const cardsUrl = getCardUrl(number);
	const symbolsArray = new Array(parseInt(fixedSize)).fill(symbol);

	const mappedSymbols = 
		symbolsArray.map((symbol, index) => <div key={index}>{symbol}</div>)


	const cardFrontStyles = {
		backgroundImage: `url(${cardsUrl})`
	}

	const cardBackStyles = {
		backgroundImage: `url(${CardBackImage})`,
	}

	return (
		<div
			className={fixedClassName}
			number={number}
			onClick={onClickCardHandler}
		>
			<div
				className="card-front"
				style={cardFrontStyles}
			>
				<div className="card-corner top-left">
					<div>{number}</div>
					<div>{symbol}</div>
				</div>
				<div className="symbols">
					{isNumber && mappedSymbols}
				</div>
				<div className="card-corner bottom-right">
					<div>{number}</div>
					<div>{symbol}</div>
				</div>
			</div>
			<div
				className="card-back"
				style={cardBackStyles}
			></div>
		</div>
	);
};

export default Card;
