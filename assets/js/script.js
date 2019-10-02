$(document).ready(initializeApp);

var firstCardClicked = null, secondCardClicked = null;
var matches = null;

function initializeApp(){
  $(".gamearea").on("click", ".card", cardClicked);
}

function cardClicked(event){
  console.log("This", this,"event", event);
  var targetCard = $(event.currentTarget);
  targetCard.toggleClass("flipping");

  console.log("targetCard", targetCard)
var cardFront = targetCard.children().first().attr("class");
console.log("cardFront", cardFront)
  if(firstCardClicked === null){
    firstCardClicked = targetCard;
  }else{
    secondCardClicked = targetCard;
    console.log("first card", firstCardClicked, "second card", secondCardClicked)
    checkforMatch(firstCardClicked, secondCardClicked);
  }

}

function checkforMatch(cardA, cardB){

  var cardAClass = cardA.children().first().attr("class");
  var cardBClass = cardB.children().first().attr("class");
  console.log(cardAClass, cardBClass)
}
