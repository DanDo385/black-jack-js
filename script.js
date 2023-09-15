let deck = [];
// create a deck of cards

let dealerScore = 0;
let playerScore = 0;

let dealerHand = [];
let playerHand = [];

let gameOver = false;






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

function shuffleDeck(deck) {
    for (let i=0; i < deck.length; i++) {
        const j = Math.floor(Math.random() * deck.length);
        console.log(j);
        console.log(deck);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// shuffle the deck
shuffleDeck(deck)

console.log(deck);

// not sure if deck needs to be passed in as an argument
function dealCard(deck) {
    const card = deck.pop;
    return card;
}

function initialDeal() {
    for (let i=0; i < 2; i++) {
        dealerHand.push(dealCard(deck));
        playerHand.push(dealCard(deck));
    }
    updateGame()
}

function updateGame() {
    //update player's hand
    const playerCardsElement = document.getElementById('player-cards');
        playerCardsElement.innerHTML = '';
        for (const card of playerHand) {
            const cardImage = document.createElement('div');
            cardImage.src = `assets/images/cards/${card}.png`;
            playerCardsElement.appendChild(cardImage);
        }
    
    const dealerCardsElement = document.getElementById('dealer-cards');
        dealerCardsElement.innerHTML = ''; 
        for (const card of dealerHand) {
            const cardImage = document.createElement('div');
            cardImage.src = `assets/images/cards/${card}.png`;
            dealerCardsElement.appendChild(cardImage);


        }   
}

function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;

    for (const card of hand) {
        const value = card.charAt(0)
        if (value === 'A') {
            aceCount++;
            score += 11;
        }
    }
    else if (value === 'K' || value === 'Q' || value === 'J') {
        score += 10;
    }
    else {
        score += value;
    }        

}