// Blackjack Game

// Variables
let deck = [], playerHand = [], dealerHand = [], playerHandSplit = [];
let playerScore = 0, dealerScore = 0, playerScoreSplit = 0;
let playerAceCount = 0, dealerAceCount = 0, playerAceCountSplit = 0;
let gameOver = false, isSplit = false, result = 0, message = '', messageSplit = '';
let playerWins = 0, dealerWins = 0, chipCount = 1000, chipWager = 10;

// DOM Elements
const playerScoreElement = document.getElementById('player-score');
const playerScoreSplitElement = document.getElementById('player-score-split');
const dealerScoreElement = document.getElementById('dealer-score');
const messageElement = document.getElementById('message');
const messageSplitElement = document.getElementById('message-split');
const chipWagerElement = document.getElementById('chip-wager');
const chipCountElement = document.getElementById('chip-total');

const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const hitSplitButton = document.getElementById('hit-split-button');
const standButton = document.getElementById('stand-button');
const standSplitButton = document.getElementById('stand-split-button');
const doubleButton = document.getElementById('double-button');
const doubleSplitButton = document.getElementById('double-split-button');
const splitButton = document.getElementById('split-button');

// Initial setup
window.onload = setStart();

function setStart() {
    dealerHand = ["BACK"];
    playerHand = ["BACK"];
    checkDeckShuffle();
    attachEventListeners();
    updateDealerCardImages();
    updatePlayerCardImages();
    messageElement.innerText = "Good luck!";
    messageSplitElement.innerText = "";
    [hitButton, standButton, doubleButton, splitButton, hitSplitButton, standSplitButton, doubleSplitButton].forEach(btn => btn.disabled = true);
}

function createDeck() {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['C', 'D', 'H', 'S'];
    deck = values.flatMap(value => suits.map(suit => `${value}-${suit}`));
    console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        const j = Math.floor(Math.random() * deck.length);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log(deck);
}
    
function checkDeckShuffle() {
        if ((deck.length / 52) <= .25) {  // Check for reshuffle
        alert('Shuffling...');
        createDeck();
        shuffleDeck();
        }
}

function attachEventListeners() {
    dealButton.addEventListener('click', deal);
    hitButton.addEventListener('click', hit);
    standButton.addEventListener('click', stand);
    doubleButton.addEventListener('click', double);
    splitButton.addEventListener('click', split);
    hitSplitButton.addEventListener('click', hitSplit);
    standSplitButton.addEventListener('click', standSplit);
    doubleSplitButton.addEventListener('click', doubleSplit);

}

// Function to get the value of a card
function getValue(card) {
    const value = card.split('-')[0];
    if (value === 'A') {
        return 'A'; // Ace can be 1 or 11, and it will be handled later
    } else if (['K', 'Q', 'J'].includes(value)) {
        return '10'; // Face cards and 10s are worth 10 points
    } else {
        return value; // Other cards are worth their face value
    }
}

// create function to deal initial hand
function deal() {
    gameOver = false; // Set gameOver to false to start a new game
    
    // Draw two cards for the player and one card for the dealer
    dealerHand = []; // Empty the board with the back of the cards and empty array so after deal, only 
    playerHand = []; // show the cards dealt to the dealer and player
                     
    
    playerScoreElement.innerText = 0;
    dealerScoreElement.innerText = 0;
    playerScoreSplitElement.innerText = 0;
    messageSplitElement.innerText = '';   
    chipWager = parseInt(chipWagerElement.value) || 10;
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());   
    playerHand.push(deck.pop());
    
    hitButton.disabled = false;   // Enable the hit and stand buttons
    standButton.disabled = false; 
    doubleButton.disabled = false;

    updateDealerCardImages();
    updatePlayerCardImages();
    calcPlayerScore();
    calcDealerScore();
    
    if (playerScore >= 21) {   
        determineWinner();
    }   
    
    playerScoreElement.innerText = playerScore;
    dealerScoreElement.innerText = dealerScore;
}


function hit() {
    doubleButton.disabled = true;
    const card = deck.pop(); // Draw one card from the deck
    playerHand.push(card); // Add the card to the player's hand
    updatePlayerCardImages();
    calcPlayerScore();
    calcDealerScore();
    //console.log(playerScore); <-- used for testing
    
    // Check if player's score is greater than or equal to 21 after hitting
    if (playerScore >= 21) {
        determineWinner();
    }
    playerScoreElement.innerText = playerScore;
    dealerScoreElement.innerText = dealerScore;
}

function stand() {
    doubleButton.disabled = true;
    dealButton.disabled = false;
    while (dealerScore < 17) {
        const card = deck.pop();
        dealerHand.push(card);
        calcDealerScore();
        calcPlayerScore();
        updateDealerCardImages();
        playerScoreElement.innerText = playerScore;
        dealerScoreElement.innerText = dealerScore;
        // Check if dealer's score is greater than or equal to 21
        if (dealerScore >= 21) {
            determineWinner();
        }
    }
}

function double() {
    chipWager *= 2;
    hit();
    stand();
}

function split() {
    messageSplitElement.innerText = 'We have a split hand!';
    isSplit = true;
    if (getValue(playerHand[0]) === getValue(playerHand[1])) {
        playerHandSplit.push(playerHand.pop());
        updatePlayerCardImages();
        updatePlayerCardSplitImages();
        calcPlayerScore();
        calcPlayerSplitScore();
        splitButton.disabled = true;
    }
}

function hitSplit() {
    doubleSplitButton.disabled = true;
    const card = deck.pop(); // Draw one card from the deck
    playerHandSplit.push(card); // Add the card to the player's hand
    updatePlayerCardSplitImages();
    calcPlayerSplitScore();
    calcDealerScore();
    playerScoreSplitElement.innerText = playerScoreSplit;
    dealerScoreElement.innerText = dealerScore;
    if (playerScoreSplit >= 21) {
        determineSplitWinner();
    }
}

function standSplit() {
    doubleButton.disabled = true;   
    while (dealerScore < 17) {
        const card = deck.pop();
        dealerHand.push(card);
        calcDealerScore();
        calcPlayerSplitScore();
        updateDealerCardImages();
        playerScoreSplitElement.innerText = playerScoreSplit;
        dealerScoreElement.innerText = dealerScore;
        if (dealerScore >= 21) {    
            determineSplitWinner();
        }
    }
}

function doubleSplit() {
    chipWager *= 2;
    hitSplit();
    standSplit();
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

function updatePlayerCardSplitImages() {
    const playerCardsSplitElement = document.getElementById('player-cards-split');
    playerCardsSplitElement.innerHTML = '';
    for (const card of playerHandSplit) {
        const playerCardSplitImage = document.createElement('img');
        playerCardSplitImage.src = `assets/images/cards/${card}.png`;
        playerCardSplitImage.alt = card;
        playerCardsSplitElement.appendChild(playerCardSplitImage);
    }
}
// function to calculate dealer score
function calcDealerScore() {
    dealerScore = 0;
    for (const card of dealerHand) {
        const value = getValue(card);
        if (value === 'A') {
            dealerAceCount++;
            dealerScore += 11; // Assume Ace as 11 initially
        } else if (value === 'K' || value === 'Q' || value === 'J' || value === '10') {
            dealerScore += 10; // Face cards are worth 10 points
        } else {
            dealerScore += parseInt(value); // Other cards are worth their face value
        }
    }
    // If score>21 and there are aces, adjust ace value(s) to 1 from 11
    while (dealerScore > 21 && dealerAceCount > 0) {
        dealerScore -= 10; // Converts 11 to 1 by subtracting 10 from the score
        dealerAceCount--;
    }
    return dealerScore;
}

// same as above (calcDealerScore) but for player
function calcPlayerScore() {
    playerScore = 0;
    for (const card of playerHand) {
        const value = getValue(card);
        if (value === 'A') {
            playerAceCount++;
            playerScore += 11; // Assume Ace as 11 initially 
        } else if (value === 'K' || value === 'Q' || value === 'J' || value === '10') {
            playerScore += 10; // Face cards are worth 10 points
        } else {
            playerScore += parseInt(value); // Other cards are worth their face value
        }
    }

    while (playerScore > 21 && playerAceCount > 0) {
        playerScore -= 10; // Converts 11 to 1 by subtracting 10 from the score
        playerAceCount--;
    }
    return playerScore;
}

function calcPlayerSplitScore() {
    playerScoreSplit = 0;
    for (const card of playerHandSplit) {
        const value = getValue(card);
        if (value === 'A') {
            playerAceCountSplit++;
            playerScoreSplit += 11; // Assume Ace as 11 initially 
        } else if (value === 'K' || value === 'Q' || value === 'J' || value === '10') {
            playerScoreSplit += 10; // Face cards are worth 10 points
        } else {
            playerScoreSplit += parseInt(value); // Other cards are worth their face value
        }
    }

    while (playerScoreSplit > 21 && playerAceCountSplit > 0) {
        playerScoreSplit -= 10; // Converts 11 to 1 by subtracting 10 from the score
        playerAceCountSplit--;
    }
    return playerScoreSplit;
}

// function to determine winner of the game
function determineWinner() {
    if (gameOver) {
        return; //Return to the hand if no winner found to keep playing
    }
        // Determine the winner for the main hand
        if (playerScore === 21) {
            result = 1;
            message = 'BlackJack! Player wins!';
            chipWager *= 1.5;
            gameOver = true;
        } else if (playerScore > 21) {
            result = 2;
            message = 'Player busts! Dealer wins!';
            gameOver = true;
        } else if (dealerScore === 21) {
            result = 2;
            message = 'Dealer wins with BlackJack!';
            gameOver = true;
        } else if (dealerScore > 21) {
            result = 1;
            message = 'Dealer busts! Player wins!';
            gameOver = true;
        } else if (playerScore > dealerScore) {
            result = 1;
            message = 'Player wins!';
            gameOver = true;
        } else if (playerScore < dealerScore) {
            result = 2;
            message = 'Dealer wins!';
            gameOver = true;
        } else {
            result = 0;
            message = 'Tie! Nobody Wins!';
            gameOver = true;
        }
        
        hitButton.disabled = true;
        standButton.disabled = true;
        splitButton.disabled = true;
        calcChipsAndWins();
        messageElement.innerText = message;
        
}

function determineSplitWinner() {
        // Determine the winner for the split hand
    if (playerScoreSplit === 21) {
        result = 1;
        messageSplit = 'BlackJack! Player wins the split hand!';
        chipWager *= 1.5;
        gameOver = true;
    } else if (playerScoreSplit > 21) {
        result = 2;
        messageSplit = 'Player busts on the split hand! Dealer wins!';
        gameOver = true;
    } else if (dealerScore === 21) {
        result = 2;
        messageSplit = 'Dealer wins the split hand with BlackJack!';
        gameOver = true;
    } else if (dealerScore > 21) {
        result = 1;
        messageSplit = 'Dealer busts on the split hand! Player wins!';
        gameOver = true;
    } else if (playerScoreSplit > dealerScore) {
        result = 1;
        messageSplit = 'Player wins the split hand!';
        gameOver = true;
    } else if (playerScoreSplit < dealerScore) {
        result = 2;
        messageSplit = 'Dealer wins the split hand!';
        gameOver = true;
    } else {
        result = 0;
        messageSplit = 'Tie on the split hand! Nobody wins!';
        gameOver = true;
    }
    messageSplitElement.innerText = messageSplit;
    hitSplitButton.disabled = true;
    standSplitButton.disabled = true;
    calcChipsAndWins();
}   

function calcChipsAndWins() {
    if (result == 1) {
        playerWins++;
        chipCount += chipWager;  
        document.getElementById('chip-total').innerText = chipCount;  
        document.getElementById('player-wins-count').innerText = playerWins;
    } else if (result == 2) {
        dealerWins++;
        chipCount -= chipWager;  
        document.getElementById('chip-total').innerText = chipCount;
        document.getElementById('dealer-wins-count').innerText = dealerWins;
    }
}


