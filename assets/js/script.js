$(document).ready(initializeApp);

var firstCardClicked = null, secondCardClicked = null;
var matches, maxMatches;
var attempts =0;
var gamesPlayed = 0;

resetGame();

function initializeApp(){
  gamesPlayed = 1;
  clickOn();
  $(".newgame").on("click", resetGame);
  $(".endmodal").addClass("hidden");
  updateStats();
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
    // $(".main").on("click", Function {$(".endmodal").addClass("hidden");})
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
  matches = 0;
  maxMatches = 9;


  var matchedCards = $(".matched");
  matchedCards.removeClass("matched").addClass("card")

  resetCards(matchedCards);
  gamesPlayed++; updateStats();
}
