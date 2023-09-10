let deck = [];

// create a deck of cards
function createDeck() {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10','J', 'Q', 'K', 'A'];
    const suits = ['C', 'D', 'H', 'S'];
    
    for (const suit of suits) {
        for (const value of values) {
            deck.push(`${value}-${suit}`);
        }
    }
}

createDeck();

console.log(deck);

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        const j = Math.floor(Math.random() * deck.length);
        const temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

shuffleDeck();

console.log(deck);

