const randomTips = [
	"Did you know, Poker players are usually pretty smart?",
	"When in doubt, go read the manual!",
	"If you play, play to win!",
	"Don't plan on loosing, plan on winning even if you are loosing!",
	"Is this thing on? ... Oh, Hello there!",
	"Are you even reading this?, sometimes I wonder if this is worth it or not."
];

export default randomTips

export function getRandomTip() {
	return randomTips[Math.floor(Math.random() * randomTips.length)];
}
