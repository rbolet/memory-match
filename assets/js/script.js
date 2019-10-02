$(document).ready(initializeApp);

var firstCardClicked = null, secondCardClicked = null;
var matches = null;

function initializeApp(){
  $(".gamearea").on("click", ".card", cardClicked);
}

function cardClicked(event){
  console.log(this, event);
  var targetCard = $(event.currentTarget);
  targetCard.toggleClass("flipping");
console.log(targetCard)
  if(firstCardClicked === null){
    firstCardClicked = targetCard;
  }else{
    secondCardClicked = targetCard;
    checkforMatch(firstCardClicked, secondCardClicked);
  }

}

function checkforMatch(cardA, cardB){

  console.log("Checking for match", cardA.attr("class"), cardB.attr("class"));
}
