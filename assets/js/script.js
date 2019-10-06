$(document).ready(initializeApp);

var firstCardClicked = null, secondCardClicked = null;
var matches, maxMatches;
var attempts = 0;
var gamesPlayed = 0;



function initializeApp(){
  clickOn();
  $("#newgame").on("click", resetGame); // New Game button resets Game
  $(".endmodal").addClass("hidden");    // Hide the end modal and the
  $("#newgame").addClass("hidden");     //  New Game button

  resetGame();

  gamesPlayed = 1; updateStats();
}

function clickOn() {
  $(".gamearea").on("click", ".card", cardClicked);
}

function clickOff() {
  $(".gamearea").unbind("click");
}

function cardClicked(event) {
  clickOff();
  var targetCard = $(event.currentTarget);

  if (targetCard.is(firstCardClicked)) {    // if the same card is clicked twice, do nothing
    clickOn();
    return;
  } else{
      targetCard.addClass("flipped");          // flip the card

      if(firstCardClicked === null){           // if this is the first card, store it
        firstCardClicked = targetCard;
        clickOn();
        return;
      } else {                                 //store second card, run check for match

        secondCardClicked = targetCard;
        attempts++;
          setTimeout(checkforMatch,800,firstCardClicked, secondCardClicked);
        }
    }
}


function checkforMatch(cardA, cardB){

  var cardAClass = cardA.children().first().attr("class");
  var cardBClass = cardB.children().first().attr("class");
  firstCardClicked = null; secondCardClicked = null;  //reset the first and second card vars

    if(cardAClass === cardBClass){          //compare the class of the two cards

      cardA.addClass("matched").removeClass("card"); //make matched cards static
      cardB.addClass("matched").removeClass("card");
      matches++;
      //updateStats();                            //record the match
      checkforWin();                        // and check for a win
    } else{
    setTimeout(resetCards, 1000, cardB, cardA);
    }
  updateStats();

}

function checkforWin(){
  if (matches === maxMatches){
    $(".endmodal").removeClass("hidden");
    $("#newgame").removeClass("hidden");
    $(".main").on("click", function (){$(".endmodal").addClass("hidden");})
    return true;

  } else {
      clickOn();
      return false;
    }

}

function resetCards(){

  for(var iCard in arguments){
    arguments[iCard].removeClass("flipped");
  }
  firstCardClicked = null; secondCardClicked = null;
  $(".gamearea").on("click", ".card", cardClicked);
}

function updateStats(){
  $("#games-played").text(gamesPlayed);
  $("#attempts").text(attempts);
  $("#accuracy").text(caclulateAccuracy);
}

function caclulateAccuracy(){
  if (attempts === 0){
    return "--";
  } else {
    return Math.round((matches/attempts)*100) + "%";
  }
}

function resetGame() {
  $(".endmodal").addClass("hidden");
  $("#newgame").addClass("hidden");
  matches = 0;
  maxMatches = 9;


  var matchedCards = $(".matched");
  matchedCards.removeClass("matched").addClass("card")

  resetCards(matchedCards);
  gamesPlayed++;
  createNewCards(createFrontArray());
  updateStats();
}

function createFrontArray(){
  var cardArray = ["html-logo", "css-logo", "docker-logo",
    "git-logo", "js-logo", "mysql-logo", "node-logo",
    "php-logo", "react-logo"]

  var cardDoubleArray = []; // double the amount of cards as fronts
  cardDoubleArray = cardArray.concat(cardArray);
  return cardDoubleArray;
}

function createNewCards(newCardArray){

  $(".row").empty(".card, .cardfront, .cardback");    // remove existing cards
  var cardsPerRow = Math.round(newCardArray.length /3);

  for(var iRows = 1; iRows < 4; ++iRows){             // select a target row
      var queryString = ".row:nth-child("+iRows+")";
      var targetRow = $(queryString);

    for(var iCards = 0; iCards < cardsPerRow && newCardArray.length > 0; ++iCards){
      //generate card
      var newCard = $("<div>").addClass("card")
        .css("left", ($(".row").width() - window.innerWidth *.09)); // set left to right edge of row
        var newFrontClass = newCardArray.splice(Math.floor(Math.random()*newCardArray.length-1), 1)
        var newFront = $("<div>").addClass("cardfront").addClass(newFrontClass);
        var newBack = $("<div>").addClass("cardback");

      newCard.append(newFront);
      newCard.append(newBack);
      targetRow.prepend(newCard);

      var dynamicCardPosition =
        ($(".row").width() * .06)               // left 6%
          + ($(".card").width() * (iCards) + 1)
          + (15 * iCards + 1);  // + width of cards

      setTimeout(
        function(dynamicCardPosition, newCard){
          newCard.css("left", dynamicCardPosition);
        }, 200);
    }
  }
}

function animateCards(){
}

function testMatchAll(){
  $(".card").addClass("flipped").addClass("matched").removeClass("card");

}
