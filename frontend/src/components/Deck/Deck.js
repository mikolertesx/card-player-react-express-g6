import { useEffect, useState } from "react";

import Card from "../Card/Card";

const createHand = (cards) => {
	//Generate each.
	const cardElements = cards.map((card) => {
		const number = card.card.slice(0, -1);
		const symbol = card.card.slice(-1);
		const flipped = card.flipped;

		// number, symbol, isFlipped = true
		// console.log(number, symbol, flipped);
		return (
			<Card
				key={`${symbol}-${number}`}
				number={number}
				symbol={symbol}
				isFlipped={flipped}
			/>
		);
	});

	console.log(cardElements);

	return cardElements;
};

const Deck = (props) => {
	const [deckCards, setDeckCards] = useState([]);
	const [handCards, setHandCards] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			const response = await fetch("http://localhost:4001/get-deck");
			const data = await response.json();
			console.log(data);
			setDeckCards(data.deck);
			setHandCards(data.hand);
			setError(data.error || null);
			console.log(data.error);
		})();
	}, []);

	return (
		<div>
			<h3>{props.title}</h3>
			<div className="deck">
				<h2>Deck Cards</h2>
				{createHand(deckCards)}
			</div>
			<div className="hand">
				<h2>Mi mano </h2>
				{!error ? createHand(handCards) : <p>{error}</p>}
			</div>
		</div>
	);
};

export default Deck;
