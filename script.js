// Initialize the deck of cards and other variables
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

// Initialize ace counts for dealer and player
let playerAceCount = 0;


// Initialize score and result message
let result = 0;
let message = '';

window.onload = function() {
    setStart();
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

function createDeck() {
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10','J', 'Q', 'K', 'A'];
    const suits = ['C', 'D', 'H', 'S'];
    
    for (const suit of suits) {
        for (const value of values) {
            deck.push(`${value}-${suit}`);
        }
    }
}
//shuffles deck by uniquely swapping out each card with a random card from 
//the deck rather than just picking a random card from the desk and risk getting multiple same cards
function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * deck.length);
    [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

//set starting board
function setStart() {
    playerHand = ["BACK","BACK"];
    dealerHand = ["BACK",];
    updateDealerCardImages();
    updatePlayerCardImages();
}

    // create function to deal initial hand
function deal() {
        for (let i = 0; i < 2; i++) {
            dealerHand.push(dealCard(deck));
            playerHand.push(dealCard(deck));
        }
        updateGame()
        console.log(dealerHand);
        console.log(playerHand);
        updateDealerCardImages();
        updatePlayerCardImages();

}


function updateDealerCardImages() {
    const cardsElement = document.getElementById('dealer-cards');
    cardsElement.innerHTML = '';
    for (const card of dealerHand) {
        const cardImage = document.createElement('img');
        cardImage.src = `assets/images/cards/${card}.png`;
        cardImage.alt = card;
        cardsElement.appendChild(cardImage);
    }
}

function updatePlayerCardImages() {
    const cardsElement = document.getElementById('player-cards');
    cardsElement.innerHTML = '';
    for (const card of playerHand) {
        const cardImage = document.createElement('img');
        cardImage.src = `assets/images/cards/${card}.png`;
        cardImage.alt = card;
        cardsElement.appendChild(cardImage);
    }
}

function updateGame() {
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
  // If score>21 and there are aces, adjust ace value(s) to 1 from 11
while (dealerScore > 21 && dealerAceCount > 0) {
    dealerScore -= 10; // Converts 11 to 1 by subtracting 10 from the score
    dealerAceCount-- }

while (playerScore > 21 && playerAceCount > 0) {
    playerScore -= 10; // Converts 11 to 1 by subtracting 10 from the score
    playerAceCount-- }
}

function hit() {
    playerHand.push(dealCard(deck));
    updateGame();
    updatePlayerCardImages()
}

function stand() {
    if (dealerScore < 17) {
        dealerHand.push(dealCard(deck));
        updateGame();
        updateDealerCardImages();
    }
    determineWinner();
}

// function to determine winner
function determineWinner() {
    if (playerScore === 21) { result = 1; message = 'BlackJack! Player wins!' }
    else if (playerScore > 21) {r esult = 2; message = 'Player busts! Dealer wins!' } 
    else if (dealerScore === 21) { result = 2; message = 'Dealer wins with BlackJack!' } 
    else if (dealerScore > 21) { result = 1; message = 'Dealer busts! Player wins!' } 
    else if (playerScore > dealerScore) { result = 1; message = 'Player wins!' } 
    else if (playerScore < dealerScore) { result = 2; message = 'Dealer wins!' } 
    else { result = 0; message = 'Push! Tie!'; }

    if (result === 1 ){ "Player wins MFuh!" }
    else if (result === 2) { "Dealer wins MFuh!" }
    else { "Push! Tie! You're both losers!"  }
    console.log(message);}
