const express = require("express");
const cors = require("cors");
const { Deck, Hand } = require("./app/deck");
const app = express();
const port = process.env.PORT || 4001;
const HANDS_PER_DECK = 2;

app.use(cors());
app.use(express.json());

const deck = new Deck();
const deckCards = deck.dispatchCards(5);

app.get('/all-cards', (req, res) => {
	const newDeck = new Deck();

	const data = {
		hand: [],
		deck: newDeck.cards.map(card => ({
			card,
			flipped: false,
		}))
	}

	return res.json(data)
})

app.get("/get-deck", (req, res) => {
	const fixedDeckCards = deckCards.map((card, index) => ({
		card,
		flipped: index > 1 ? false : true,
	}));

	if (deck.cards.length < HANDS_PER_DECK) {
		return res.json({
			hand: [],
			deck: fixedDeckCards,
			error: "There's no cards left to join.",
		});
	}
	const hand = new Hand(deck, HANDS_PER_DECK);
	const fixedHand = {
		hand: hand.cards.map((card, index) => ({
			card,
			flipped: index > 2 ? false : true,
		})),
		deck: fixedDeckCards,
	};

	return res.json(fixedHand);
});

app.post("/get-cards", (req, res) => {
	// const numPlayers = 5;
	const { numPlayers, cardsPerPlayer } = req.body;

	const deck = new Deck();
	const hands = [];
	for (let _ = 0; _ < numPlayers; _++) {
		hands.push(new Hand(deck, cardsPerPlayer));
	}

	return res.json({
		hands: hands.map((hand) => hand.cards),
		deck: deck.cards,
	});
});

app.use(express.static('dist', {
	immutable: true,
	cacheControl: true,
	maxAge: "30d",
}))

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
