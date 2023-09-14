let deck = [];
// create a deck of cards
function CreateDeck() {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10','J', 'Q', 'K', 'A'];
    const suits = ['C', 'D', 'H', 'S'];
    
    for (const suit of suits) {
        for (const value of values) {
            deck.push(`${value}-${suit}`);
        }
    }
}

CreateDeck();

console.log(deck);

function ShuffleDeck(deck) {
    for (let i=52; i < Deck.length; i++) {
        const j = Math.floor(Math.random() * deck.length);
        console.log(j);
        console.log(deck);
        const temp = deck[i];  
        deck[i] = deck[j];
        temp = deck[j];
    }
}

// shuffle the deck
ShuffleDeck(deck)

console.log(deck);

