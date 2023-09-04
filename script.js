let deck = [];

// create a deck of cards
function createDeck() {
    const suits = ['C', 'D', 'H', 'S'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10','J', 'Q', 'K', 'A'];
    for (const suit of suits) {
        for (const value of values) {
            deck.push(`${value}-${suit}`);
        }
    }
}

createDeck();

console.log(deck);

