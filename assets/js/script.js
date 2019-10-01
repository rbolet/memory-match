$(document).ready(initializeApp);

function initializeApp(){
  $(".gamearea").on("click", ".card", cardClicked);
}

function cardClicked(event){
  console.log(this, event);
  var targetCard = $(event.currentTarget);
  targetCard.toggleClass("flipping");

}
