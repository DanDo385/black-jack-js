let deck = [];

window.onload = CreateDeck;
window.onload = ShuffleDeck;


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
    for (let i = 0; i < deck.length; i++) {
        // pick a random card from the deck
        const j = Math.floor(Math.random() * (i + 1));
        console.log(j);
        // swap the current card with the random card using a temporary variable
        const temp = deck[i];
        // console.log(deck);
        deck[i] = deck[j];
        // console.log(deck);
        deck[j] = temp;
        // console.log(deck);
    }
}

// shuffle the deck
ShuffleDeck(deck);

console.log(deck);

