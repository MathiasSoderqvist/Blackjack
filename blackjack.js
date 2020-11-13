//--------------------------------VARIABLES--------------------------------

//Deck & Suits
var suits = [" ♠", " ♥", " ♦", " ♣"]; //space used to add suit under value on card
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
//random suit/value
let random = "";
//player and dealer cards
let playerCards = document.querySelectorAll(".player");
let dealerCards = document.querySelectorAll(".dealer");
//player and dealer score
let playerScore = document.querySelector(".score2");
let dealerScore = document.querySelector(".score1");
//New Game btn
let resetButton = document.querySelector("#reset");
//Hit Me btn
let hitMeButton = document.querySelector(".hit");
//stand btn
let standButton =document.querySelector(".stand");
//copy element for hit me btn
let elem = document.querySelector(".card4");
//win/lose message
let messageDisplay = document.querySelector(".message");
//win count
let winCount = document.querySelector(".wins");
//h1 top of page
let h1 = document.querySelector("h1");

//disable several buttons on page load
pageLoad();

//--------------------------------"New Game" Button--------------------------------

//After "New Game" button is clicked
resetButton.addEventListener("click", function(){
    //code stored in functions for DRY and cleaner code (found at bottom of doc)
    revertPage();

    //card design, values, avoiding duplicates 
    assignCards();

    //hit me and stand btns enabled
    hitMeButton.disabled = false;
    standButton.disabled = false;

    //check for "blackjack" and stop game and award winner if so
    blackjack();

    //reduce values of ace(s) if applicable
    fixAces();
});

//--------------------------------"Hit Me" Button--------------------------------

//Hit btn clicked
hitMeButton.addEventListener("click", function(){
    //add new card
    addClone();

    //Check for bust and end game if so.
    checkBust();

    //check for blackjack
    blackjack();

    //Otherwise, let it continue
});

//--------------------------------"I'll Stand" Button--------------------------------

standButton.addEventListener("click", function(){
    //disable hit and stand buttons
    hitMeButton.disabled = true;
    standButton.disabled = true;
    //Check and display dealer cards
    displayDealer();

    //check winner and display win/lose message
    checkWinner();

    //check for aces and add to win count if applicable
    finalCheck();
});


//-----------------------------------FUNCTIONS-----------------------------------

//create a random selector function(value and suit) - after use values  and suits arr with it
function randomPick(arr){
    arr.sort(() => Math.random() - 0.5);
    let random =  arr[0];
    return random;
}
//create a card with randomPick()

//Score function: obtain numbers and suits, change letters to 10 unless A, then 11. get sum with reduce
function cardsValue(who) {
    var divs = Array.from(document.querySelectorAll("." + who));
    var values = divs.map(
      currentValue =>
      currentValue
      .textContent
      .split(" ")
      [0] //take values before space(card value, not suit)
    );
    return (
      values.reduce( 
        (accumulator, currentValue) => {
          accumulator +=
          ["J", "Q", "K"].includes(currentValue)?10: //if suit, value is 10
          currentValue == "A"?11: //A at 11 
          +currentValue;
          return accumulator;
        }, 0
      )
    );
  }
  
  //Check scores of dealer and player. example: checkScore("score2") = player score
  function checkScore(who){
     // console.log(typeof(playerScore.textContent)); == string
    let resultArr = playerScore. //only needed for player, not dealer, so no need for variable
    textContent.
    split(" ");
    return resultArr[2];
  }

  //-10 score for ace
  function minusTen(){
      let result = playerScore.
      textContent.
      split(" ")
      [2];
      return parseInt(result) - 10;
  }

  //-20 score for 2 aces
  function minusTwenty(){
    let result = playerScore.
    textContent.
    split(" ")
    [2];
    return parseInt(result) - 20;
}

  //Add to win count
  function addWin(){
    let val  = winCount.
    textContent.
    split(" ")
    [1];
    return parseInt(val) + 1;
  }

  //Ace to 1 point function acePoints("player")
  function acePoints(who){
      //check if there is ace
    var divs = Array.from(document.querySelectorAll("." + who));
    var aces = divs.map(
      currentValue =>
      currentValue
      .textContent
      .split(" ")
      [0] //take values before space(card value, not suit)
    );
    if(aces.indexOf("A") !== -1){ //if A is one of the two cards, return true
        return true;
    }
  }

  function doubleAce(who) {
    var divs = Array.from(document.querySelectorAll("." + who));
    var aces = divs.map(
      currentValue =>
      currentValue
      .textContent
      .split(" ")
      [0]
       //take values before space(card value, not suit)
    );
    if(aces.indexOf("A") !== aces.lastIndexOf("A")){ //if A is one of the two cards, return true
        return true;
    }
  }

  //avoiding duplicate cards, function checks content to compare after
  function cardContent(who){
    var cardArr = Array.from(document.querySelectorAll("." + who));
    var values = cardArr.map(
      currentValue =>
      currentValue
      .textContent
      .split(" ")
    )
    return values;
};


var arraysMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;
    //Check order and items
    for (var i = 0; arr1.length < i; i++) {
		if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};

//---------------------------Functions for DRY & clean code---------------------------

function pageLoad(){
    hitMeButton.disabled = true;
    standButton.disabled = true;
};

function revertPage() {
    //change message color back
    messageDisplay.style.color = "#008000";
    //reset h1 background
    h1.style.backgroundColor = "#008000";
    //reset score back to "?"
        playerScore.innerHTML = "Player Score: ?";
        dealerScore.innerHTML = "Dealer Score: ?";
    //remove win/loss for new game
        messageDisplay.innerHTML = " ";
    //remove extra "hit" cards
    document.querySelectorAll('.extraCard').forEach(e => e.remove());
    //revert dealer card back to backside & remove value
    for(let i = 0; i < dealerCards.length; i++){
        dealerCards[1].style.backgroundColor = "#810202";
        dealerCards[1].style.borderColor = "white"
        //--------remove val
        dealerCards[1].innerHTML = "";
    }
}

function assignCards(){
    //border change to red, bkgrd change to white (player and dealer[0])
    for (let i = 0; i < playerCards.length; i++){
        playerCards[i].style.backgroundColor = "white";
        playerCards[i].style.borderColor = "#810202";
        //insert value & suit to player cards
        playerCards[i].innerHTML = randomPick(values);
        playerCards[i].innerHTML += randomPick(suits);
        //avoiding duplicate cards
        for(let j = 0; j <= 2; j++){
            let card3 = cardContent("card3");
            let card4 = cardContent("card4");
            if(card3[j] == card4[j]){
                playerCards[0].innerHTML = randomPick(values);
                playerCards[0].innerHTML += randomPick(suits)
            }
        };
    };
   
    for(let i = 0; i < dealerCards.length; i++){
        dealerCards[0].style.backgroundColor = "white";
        dealerCards[0].style.borderColor = "#810202";
        //insert value & suit to one dealer card
        dealerCards[0].innerHTML = randomPick(values);
        dealerCards[0].innerHTML += randomPick(suits);
        //avoiding duplicate cards
        for(let j = 0; j <= 2; j++){
            let card1 = cardContent("card1");
            let card3 = cardContent("card3");
            let card4 = cardContent("card4");
            
            if(card1[j] == card4[j] || card1[j] == card3[j]){
                dealerCards[0].innerHTML = randomPick(values);
                dealerCards[0].innerHTML += randomPick(suits)
            }
        };
    }
     //Score for player
     playerScore.innerHTML = "Player Score: "  +cardsValue("player");
}

function blackjack(){
    //if 21 right away, end game with "Blackjack!" message
    if(checkScore("playerScore") == 21){
        messageDisplay.innerHTML = "Blackjack!";
        hitMeButton.disabled = true;
        standButton.disabled = true;
        winCount.innerHTML = "Wins: " +addWin(winCount);
        h1.style.backgroundColor = "#5efc03";
        //show dealer card and score
        for(let i = 0; i < dealerCards.length; i++){
            dealerCards[1].style.backgroundColor = "white";
            dealerCards[1].style.borderColor = "#810202";
            //insert value & suit to one dealer card
            dealerCards[1].innerHTML = randomPick(values);
            dealerCards[1].innerHTML += randomPick(suits);
        }
        //dealer score
        dealerScore.innerHTML = "Dealer Score: "  +cardsValue("dealer");
    }
}

function fixAces(){
    //If double Aces, change one to value 
    if(checkScore("playerScore") > 21){
            if(acePoints("player")){
                playerScore.innerHTML = "Player Score: "  +minusTen();
            }
    }
}

function addClone() {
    //add clone of previous div/card
    let clone = elem.cloneNode(true); // Create a copy 
    clone.classList.add("extraCard"); //Add class
    elem.after(clone);  //add into DOM
    //replace content with new value/suit
    clone.innerHTML = randomPick(values);
    clone.innerHTML += randomPick(suits);
    //add score of hit me card
    playerScore.innerHTML = "Player Score: "  +cardsValue("player");
}

function checkBust() {
    //if score is higher than 21 end game! disable hit/stand, display "Bust" message
    if(checkScore("playerScore") > 21){
        //check for Ace in .player divs, if so -10 pts. else, do the bust code
        if(doubleAce("player")){
            playerScore.innerHTML = "Player Score: "  +minusTen();
        } 
        //check for Ace in .player divs, if so -10 pts. else, do the bust code
        if(acePoints("player")){
            playerScore.innerHTML = "Player Score: "  +minusTen();
            //check again if over 21
            if(checkScore("playerScore") > 21){
                messageDisplay.innerHTML = "Bust!";
                messageDisplay.style.color = "#810202"
                h1.style.backgroundColor = "#810202";
                hitMeButton.disabled = true;
                standButton.disabled = true;
                for(let i = 0; i < dealerCards.length; i++){
                    dealerCards[1].style.backgroundColor = "white";
                    dealerCards[1].style.borderColor = "#810202";
                    //insert value & suit to one dealer card
                    dealerCards[1].innerHTML = randomPick(values);
                    dealerCards[1].innerHTML += randomPick(suits);
                } 
                //dealer score
                dealerScore.innerHTML = "Dealer Score: "  +cardsValue("dealer");
            } 
        } else {
            messageDisplay.innerHTML = "Bust!";
            messageDisplay.style.color = "#810202"
            h1.style.backgroundColor = "#810202";
            hitMeButton.disabled = true;
            standButton.disabled = true;
            for(let i = 0; i < dealerCards.length; i++){
                dealerCards[1].style.backgroundColor = "white";
                dealerCards[1].style.borderColor = "#810202";
                //insert value & suit to one dealer card
                dealerCards[1].innerHTML = randomPick(values);
                dealerCards[1].innerHTML += randomPick(suits);
            }
            //dealer score
            dealerScore.innerHTML = "Dealer Score: "  +cardsValue("dealer");
        }
    }
}

function displayDealer() {
    //add second dealer card
    for(let i = 0; i < dealerCards.length; i++){
        dealerCards[1].style.backgroundColor = "white";
        dealerCards[1].style.borderColor = "#810202";
        //insert value & suit to one dealer card
        dealerCards[1].innerHTML = randomPick(values);
        dealerCards[1].innerHTML += randomPick(suits);
    }
    //dealer score
    dealerScore.innerHTML = "Dealer Score: "  +cardsValue("dealer");

    //check if dealer has two aces = 22
    if(checkScore("dealerScore") > 21){
        //check for Ace in .player divs, if so -10 pts. else, do the bust code
        if(doubleAce("dealer")){
            dealerScore.innerHTML = "Dealer Score: "  +minusTen();
        } 
            //check for Ace in .player divs, if so -10 pts. else, do the bust code
            if(acePoints("dealer")){
                 dealerScore.innerHTML = "Dealer Score: "  +minusTen();
             }
    }
}

function checkWinner() {
    //check winner and display win/lose message
    if(cardsValue("player") > cardsValue("dealer")){
        //win message
        messageDisplay.innerHTML = "Win!";
        //wins +1
        winCount.innerHTML = "Wins: " +addWin(winCount);
        //change backgrounnd h1
        h1.style.backgroundColor = "#5efc03";
    } else if (cardsValue("dealer") > cardsValue("player")) {
        messageDisplay.innerHTML = "Lose!";
        messageDisplay.style.color = "#810202"
        //h1 background to red
        h1.style.backgroundColor = "#810202";
    } else {
        messageDisplay.innerHTML = "Tie!";
    }
}

function finalCheck() {
    //check for ace in cardsValue calculation
    if(cardsValue("player") > 21){
        //change ace value from 11 to 1 by deducting 10
        let val = cardsValue("player") - 10;
        if(val > cardsValue("dealer")){
            //win message
            messageDisplay.innerHTML = "Win!";
            //wins +1
            winCount.innerHTML = "Wins: " +addWin(winCount);
            //change background h1
            h1.style.backgroundColor = "#5efc03";
        } else if (cardsValue("dealer") > val) {
            messageDisplay.innerHTML = "Lose!";
            messageDisplay.style.color = "#810202"
            //h1 background to red
            h1.style.backgroundColor = "#810202";
        } else {
            messageDisplay.innerHTML = "Tie!";
        }
    }
}