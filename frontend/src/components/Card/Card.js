import { useState } from "react";

import "./Card.css";
import Cards from "./Cards.png";
import CardBack from "./CardCover.png";

const Card = ({ number, symbol, isFlipped = true }) => {
	const [currentFlip, setCurrentFlip] = useState(isFlipped);

	const onClickCardHandler = () => {
		setCurrentFlip((prevFlip) => !prevFlip);
	};

	const fixedClassName = `card card-${symbol} ${currentFlip ? "flipped" : ""}`;
	const isNumber = !isNaN(number) || number === "A";
	const fixedSize =
		number === "A" || number === "J" || number === "Q" || number === "K"
			? 1
			: number;
	const cardsUrl =
		number === "J" || number === "Q" || number === "K" ? Cards : "";
	const symbolsArray = new Array(parseInt(fixedSize)).fill(symbol);

	return (
		<div
			className={fixedClassName}
			number={number}
			onClick={onClickCardHandler}
		>
			<div
				className="card-front"
				style={{
					backgroundImage: "url(" + cardsUrl + ")",
				}}
			>
				<div className="card-corner top-left">
					<div>{number}</div>
					<div>{symbol}</div>
				</div>
				<div className="symbols">
					{isNumber ? (
						symbolsArray.map((symbol, index) => <div key={index}>{symbol}</div>)
					) : (
						<></>
					)}
				</div>
				<div className="card-corner bottom-right">
					<div>{number}</div>
					<div>{symbol}</div>
				</div>
			</div>
			<div
				className="card-back"
				style={{
					backgroundImage: "url(" + CardBack + ")",
				}}
			></div>
		</div>
	);
};

export default Card;
