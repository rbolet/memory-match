$(document).ready(initializeApp);

var firstCardClicked = null, secondCardClicked = null;
var matches = null;

function initializeApp(){
  $(".gamearea").on("click", ".card", cardClicked);
}

function cardClicked(event) {
  // console.log("This", this,"event", event);
  var targetCard = $(event.currentTarget);
console.log("targetCard", targetCard, "firstCard", firstCardClicked, "secondCard", secondCardClicked);
  if (targetCard.is(firstCardClicked)) { console.log("Same card!");
  return; //exit function w/o storing second card
  }

  targetCard.toggleClass("flipped"); // flip the card

  if(firstCardClicked === null){ console.log("**storing first card");
    firstCardClicked = targetCard;
  } else{ console.log("**storing second card**");
    //store second card, run check for match
    secondCardClicked = targetCard;
console.log("first card", firstCardClicked, "second card", secondCardClicked)
    checkforMatch(firstCardClicked, secondCardClicked);
  }
}


function checkforMatch(cardA, cardB){
console.log("Checking for match");
  var cardAClass = cardA.children().first().attr("class");
  var cardBClass = cardB.children().first().attr("class");

    if(cardAClass == cardBClass){ console.log("Match!", "cards: ", cardA, cardB, "classes: ", cardAClass, cardBClass);

      cardA.addClass("matched").removeClass("card");
      cardB.addClass("matched").removeClass("card");
      matches =+ 1;
    } else{ console.log("no match");
     // setTimeout(resetCards(cardA, cardB), 1500) ;
    setTimeout(resetCards, 2000, cardB, cardA);
    }

}

function resetCards(){
  console.log("running Reset Cards");
  for(var iCard in arguments){
    arguments[iCard].toggleClass("flipped");
    firstCardClicked = null; secondCardClicked = null;

  }
}
