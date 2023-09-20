// Initialize the deck of cards and shuffle the deck
let deck = [];

window.onload = function() {
    setStart();
}

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

// shuffles deck by uniquely swapping out each card with a random card from 
//the deck rather than just picking a random card from the desk and risk getting multiple same cards
function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * deck.length);
    [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}
shuffleDeck(deck);  

// Initialize variables for buttons and calculations in the game    

let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

// Initialize ace counts for dealer and player
let playerAceCount = 0;
let dealerAceCount = 0;

// Initialize score and result message
let result = 0;
let message = '';

function setStart() {
    playerHand = ['BACK'];
    dealerHand = ["BACK"];
    updateDealerCardImages();
    updatePlayerCardImages();
}
// Add event listeners to the deal, hit, and stand button
const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');

dealButton.addEventListener('click', function() {
    deal(); // Call the deal() function when the deal button is clicked
});

hitButton.addEventListener('click', function() {
    hit(); // Call the hit() function when the hit button is clicked
});

standButton.addEventListener('click', function() {
    stand(); // Call the stand() function when the stand button is clicked
});
// create function to deal initial hand
function deal() {
    // Draw two cards for dealer and player
    
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());

    updateDealerCardImages();
    updatePlayerCardImages();
    updateDealerScore();
    updatePlayerScore();
    
    dealerScore = document.getElementById('dealer-score').innerHTML
    playerScore = document.getElementById('player-score').innerHTML
}

function hit() {
    playerHand.push(deck.pop()); // Push the last card in the deck to playerHand
    updatePlayerCardImages();
    calcPlayerScore();
    document.getElementById('player-score').innerHTML = playerScore;
    if (playerScore === 21) {
        determineWinner();
    }
}

function stand() {
    while (dealerScore < 17) {
        dealerHand.push(deck.pop); // Push the last card(s) in the deck to dealerHand 
        calcDealerScore()
        updateDealerCardImages();    
    }                                                                   
}

function updateDealerCardImages() {
    const dealerCardsElement = document.getElementById('dealer-cards');
    dealerCardsElement.innerHTML = '';
    for (const card of dealerHand) {
        const dealerCardImage = document.createElement('img');
        dealerCardImage.src = `assets/images/cards/${card}.png`;
        dealerCardImage.alt = card;
        dealerCardsElement.appendChild(dealerCardImage);
    }
}

function updatePlayerCardImages() {
    const playerCardsElement = document.getElementById('player-cards');
    playerCardsElement.innerHTML = '';
    for (const card of playerHand) {
        const playerCardImage = document.createElement('img');
        playerCardImage.src = `assets/images/cards/${card}.png`;
        playerCardImage.alt = card;
        playerCardsElement.appendChild(playerCardImage);
    }
}

function calcDealerScore() {
//  assign values to cards for scoring
    for (const card of dealerHand) {
        const value = card.charAt(0);
        if (value === 'A') {
        dealerAceCount++;
        dealerScore += 11; // Assume Ace as 11 initially
        } else if (value === 'K' || value === 'Q' || value === 'J') {
        dealerScore += 10; // Face cards are worth 10 points
        } else {
        dealerScore += parseInt(value); // Other cards are worth their face value
        }
    }

    // If score>21 and there are aces, adjust ace value(s) to 1 from 11
    while (dealerScore > 21 && dealerAceCount > 0) {
        dealerScore -= 10; // Converts 11 to 1 by subtracting 10 from the score
        dealerAceCount-- 
    }
    return dealerScore;
}

function calcPlayerScore() {
    for (const card of playerHand) {
        const value = card.charAt(0);
        if (value === 'A') { playerAceCount++;
        playerScore += 11; // Assume Ace as 11 initially 
        } else if (value === 'K' || value === 'Q' || value === 'J') {
        playerScore += 10; // Face cards are worth 10 points
        } else {
        playerScore += parseInt(value); // Other cards are worth their face value
        }
    }
  
    while (playerScore > 21 && playerAceCount > 0) {
        playerScore -= 10; // Converts 11 to 1 by subtracting 10 from the score
        playerAceCount-- 
    }
    return playerScore;
}
// function to determine winner
function determineWinner() {
    if (!gameOver) {
        if (playerScore === 21) {
            result = 1;
            message = 'BlackJack! Player wins!';
        } else if (playerScore > 21) {
            result = 2;
            message = 'Player busts! Dealer wins!';
        } else if (dealerScore === 21) {
            result = 2;
            message = 'Dealer wins with BlackJack!';
        } else if (dealerScore > 21) {
            result = 1;
            message = 'Dealer busts! Player wins!';
        } else if (playerScore > dealerScore) {
            result = 1;
            message = 'Player wins!';
        } else if (playerScore < dealerScore) {
            result = 2;
            message = 'Dealer wins!';
        } else {
            result = 0;
            message = 'Push! Tie!';
        }
    }
    gameOver = true;
    document.getElementById('result').innerHTML = message;
}

console.log(message);   





