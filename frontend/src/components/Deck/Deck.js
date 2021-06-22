import "./Deck.css";
import { getRandomTip } from "../../util/randomTip"

import { useEffect, useState } from "react";

import Card from "../Card/Card";

const createHand = (cards, canBeFlipped = true) => {
	//Generate each.
	const cardElements = cards.map((card) => {
		const number = card.card.slice(0, -1);
		const symbol = card.card.slice(-1);
		const flipped = card.flipped;

		return (
			<Card
				key={`${symbol}-${number}`}
				number={number}
				symbol={symbol}
				isFlipped={flipped}
				canBeFlipped={canBeFlipped}
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
			const timeout = setTimeout(() => {
				setDeckCards(data.deck);
				setHandCards(data.hand);
				setError(data.error || null);

				return () => {
					clearTimeout(timeout)
				}
			}, 3000)
		})();
	}, []);

	if (!error && (handCards.length === 0 || deckCards.length === 0)) {
		return <div>
			<h3>{props.title}</h3>
			<h2>Deck Cards</h2>
			<div className="deck">
				<h2>Loading...</h2>
			</div>
			<div className="hand">
				<h2>Loading...</h2>
			</div>
			<div className="hand">
				<h3>{getRandomTip()}</h3>
			</div>
		</div>
	}

	return (
		<div>
			<h3>{props.title}</h3>
			<h2>Deck Cards</h2>
			<div className="deck">{createHand(deckCards, false)}</div>
			<h2>My Hand</h2>
			<div className="hand">
				{!error ? createHand(handCards, true) : <p>{error}</p>}
			</div>
		</div>
	);
};

export default Deck;
