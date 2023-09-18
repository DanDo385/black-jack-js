// create a deck of cards
let deck = [];
let hand = [];

let score = 0;
let aceCount = 0;


// set dealer and player scores to 0
let dealerScore = 0;
let playerScore = 0;

// set playerHand and dealerHand equal to empty arrays
let dealerHand = [];
let playerHand = [];

let gameOver = false;

window.onload = function() {
    setStart(); 
}


// Add event listeners to the deal, hit, and stand button
const dealButton = document.getElementById('deal-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');

dealButton.addEventListener('click', function() {
    createDeck();
    shuffleDeck(deck);
    initialDeal();
     
});

hitButton.addEventListener('click', function() {
    hit(); // Call the hit() function when the hit button is clicked
});

standButton.addEventListener('click', function() {
    stand();
     // Call the stand() function when the stand button is clicked
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

function setStart() {
    playerHand = ["BACK","BACK"];
    dealerHand = ["BACK",];
    updateDealerCardImages();
    updatePlayerCardImages();
}

// create function to deal initial hand
function initialDeal() {
        for (let i = 0; i < 2; i++) {
            dealerHand.push(dealCard(deck));
            playerHand.push(dealCard(deck));
        }
        updateGame()
        console.log(dealerHand);
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
}   

    // If score>21 and there are aces, adjust ace value(s) to 1 from 11
    while (score > 21 && aceCount > 0) {
        score -= 10; // Converts 11 to 1 by subtracting 10 from the score
        aceCount--;
    }
    // Set scores to player and dealer hands, respectively
    if (hand === playerHand) {
        playerScore = score;
        }
    else if (hand === dealerHand) {
        dealerScore = score;
        }

    function deal() {
        createDeck();
        shuffleDeck(deck);
        initialDeal();
        updateGame();
        updateCardImages();

    }

    function hit() {
        playerHard.push(dealCard(deck));
        updateGame();
    }

function stand() {
    if (dealerScore < 17) {
        dealerHand.push(dealCard(deck));
        }
    updateGame();
    endGame();
    determineWinner();
}

// function to determine winner
function determineWinner() {

    // declare variable result with value of 0
    let result = 0;

    // declare variable message with value of empty string
    let message = '';

    function determineWinner() {
        let result = 0;
        let message = '';
    
        // Use If/Else statements to determine winner
        if (playerScore === 21) {
            result = 1;
            message = 'BlackJack! Player wins!';
        } else if (playerScore > 21) {
            result = 2;
            message = 'Player busts! Dealer wins!';
        } else if (playerScore === 21 && playerHand.length === 2) {
            result = 1;
            message = 'Player Wins with BlackJack!';
        } else if (playerScore != 21 && playerHand.length === 2 && dealerScore === 21 && dealerHand.length === 2) {
            result = 2;
            message = 'Dealer wins with BlackJack!';
        } else if (playerScore != 21 && dealerScore > 21) {
            result = 1;
            message = 'Dealer busts! Player wins!';
        } else if (playerScore > dealerScore) {
            result = 1;
            message = 'Player wins!';
        } else if (playerScore < dealerScore) {
            result = 2;
            message = 'Dealer wins!';
        } else if (playerScore === dealerScore) {
            result = 0;
            message = 'Push! Tie!';
        }
    
        alert(message);
        console.log(message);
        gameOver = true;
    }
    
    // alert message
    alert(message);
    }

