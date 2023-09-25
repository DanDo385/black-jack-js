// Initialize the deck of cards and shuffle the deck
let deck = [];

// Initialize variables for the game
let playerHand = ["BACK"];
let dealerHand = ["BACK"];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

// Initialize ace counts for dealer and player
let playerAceCount = 0;
let dealerAceCount = 0;

// Initialize playerScore and dealerScore elements so not to repeat code
let playerScoreElement = document.getElementById('player-score');
let dealerScoreElement = document.getElementById('dealer-score');
let messageElement = document.getElementById('message');    

// Initialize score and result message
let result = 0;

//Initialize the total decks and player and dealer scores
let totalDecks = 3;
let playerWins = 0;
let dealerWins = 0;

//Initialize the board
window.onload = function() {
    setStart();
}

function setStart() {
    updateDealerCardImages();
    updatePlayerCardImages();
    messageElement.innerText = 'Good luck! (Even though there is no such thing)';
}

function createDeck() {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10','J', 'Q', 'K', 'A'];
    const suits = ['C', 'D', 'H', 'S'];
    
    for (let i = 0; i < totalDecks; i++) {
        for (const suit of suits) {
            for (const value of values) {
                deck.push(`${value}-${suit}`);
            }
        }
    }
}
createDeck();

// Check if 75% of deck has been drawn and shuffle if so
function checkShuffle() {
    if (deck.length <= 0.25 * totalDecks * 52) {
        createDeck();
        shuffleDeck(deck);
    }
}
checkShuffle();

// shuffles deck by uniquely swapping out each card with a random card from 
// the deck rather than just picking a random card from the desk and risk getting multiple same cards
function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * deck.length);
    [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}
shuffleDeck(deck);  

// Initialize variables for buttons and calculations in the game    


// Add event listeners to the deal, hit, and stand button
const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const doubleButton = document.getElementById('double-button');  

dealButton.addEventListener('click', function() {
    deal(); // Call the deal() function when the deal button is clicked
});

hitButton.addEventListener('click', function() {
    hit(); // Call the hit() function when the hit button is clicked
});

standButton.addEventListener('click', function() {
    stand(); // Call the stand() function when the stand button is clicked
});

doubleButton.addEventListener('click', function() {
    stand(); // Call the stand() function when the stand button is clicked
});
// create function to deal initial hand
function deal() {
    gameOver = false; // Set gameOver to false to start a new game
    
    hitButton.disabled = false;   // Enable the hit and stand buttons
    standButton.disabled = false;
    // Draw two cards for dealer and player
    dealerHand = []; // Empty the board with the back of the cards and empty array with back of cards to only 
                     // show the cards dealt to the dealer and player
    playerHand = [];
    
    playerScoreElement.innerText = 0;
    dealerScoreElement.innerText = 0;

    messageElement.innerText = 'Good luck! (Even though there is no such thing...)';   
    
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    updateDealerCardImages();
    updatePlayerCardImages();
    calcPlayerScore();
    calcDealerScore();
    if (playerScore === 21) {   
        determineWinner();
    }   
    playerScoreElement.innerText = playerScore;
    dealerScoreElement.innerText = dealerScore;
}

function hit() {
    const card = deck.pop(); // Draw one card from the deck
    playerHand.push(card); // Add the card to the player's hand
    updatePlayerCardImages();
    calcPlayerScore();
    calcDealerScore();
    console.log(playerScore);
    playerScoreElement.innerText = playerScore;
    dealerScoreElement.innerText = dealerScore;

    // Check if player's score is greater than or equal to 21 after hitting
    if (playerScore >= 21) {
        determineWinner();
    }
}

function stand() {
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
            break;
        }
    }
    determineWinner();
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
// function to calculate dealer score
function calcDealerScore() {
//  assign values to cards for scoring
    dealerScore = 0;
    for (const card of dealerHand) {
        const value = card.charAt(0);
        if (value === 'A') {
        dealerAceCount++;
        dealerScore += 11; // Assume Ace as 11 initially
        } else if (value === 'K' || value === 'Q' || value === 'J' || value === '1') {
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
// same as above (calcDealerScore) but for player
function calcPlayerScore() {
    playerScore = 0;
    for (const card of playerHand) {
        const value = card.charAt(0);
        if (value === 'A') { playerAceCount++;
        playerScore += 11; // Assume Ace as 11 initially 
        } else if (value === 'K' || value === 'Q' || value === 'J' || value === '1') {
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
// function to determine winner of the game
function determineWinner() {
    if (gameOver) {
        return;  // If game is already over, don't continue
    }

    let messageElement = document.getElementById('message');
    let playerScoreElement = document.getElementById('player-score');
    let dealerScoreElement = document.getElementById('dealer-score');
    
    playerScoreElement.innerText = playerScore;
    dealerScoreElement.innerText = dealerScore;

    if (playerScore === 21) {
        result = 1;
        message = 'BlackJack! Player wins!';
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
    } else { // This is sufficient to handle the case when playerScore === dealerScore
        result = 0;
        message = 'Tie! Nobody Wins! (Duh)';
        gameOver = true; // Set the game as over when there is a tie
    }

    setStart();
    messageElement.innerText = message;
    hitButton.disabled = true;
    standButton.disabled = true;
    if (result == 1) {
        playerWins++;
        document.getElementById('player-wins-count').innerText = playerWins;
    } else if (result == 2) {
        dealerWins++;
        document.getElementById('dealer-wins-count').innerText = dealerWins;
    }
}
