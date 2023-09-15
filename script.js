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

//run CreateDeck function
createDeck();

console.log(deck);

function shuffleDeck(deck) {
    for (let i=0; i < deck.length; i++) {
        const j = Math.floor(Math.random() * deck.length);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// shuffle the deck
shuffleDeck(deck)

// create function to deal from the deck
function dealCard(deck) {
    const card = deck.pop;
    return card;
}

// create function to deal initial hand
function initialDeal() {
    for (let i=0; i<2; i++) {
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
    //update dealer's hand
    const dealerCardsElement = document.getElementById('dealer-cards');
        dealerCardsElement.innerHTML = ''; 
        for (const card of dealerHand) {
            const cardImage = document.createElement('div');
            cardImage.src = `assets/images/cards/${card}.png`;
            dealerCardsElement.appendChild(cardImage);
        }   
    //assign values to cards    
    for (const card of hand) {
        const value = card.charAt(0);
        if (value === 'A') {
        aceCount++;
        score += 11; // Assume Ace as 11 initially
        } else if (value === 'K' || value === 'Q' || value === 'J') {
        score += 10; // Face cards are worth 10 points
        } else {
        score += parseInt(value); // Other cards are worth their face value
        }
    }   

    // If score>21 and there are aces, adjust ace value(s) to 1 from 11
    while (score > 21 && aceCount > 0) {
        score -= 10; // Converts 11 to 1 by subtracting 10 from the score
        aceCount--;
    }

    if
}
