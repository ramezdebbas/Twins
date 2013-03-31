
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/game/cards/cards.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Utilities.query("a").listen("click", linkClickEventHandler, false);
           
        }
    });
})();

function linkClickEventHandler(eventInfo) {
    eventInfo.preventDefault();
    var link = eventInfo.target;
    WinJS.Navigation.navigate(link.href);
}

 
// a global object to hold all global variables related to the game.
var matchingGame = {};

// all possible values for each card in deck
matchingGame.deck = [
	'cardAK', 'cardAK',
	'cardAQ', 'cardAQ',
	'cardAJ', 'cardAJ',
	'cardBK', 'cardBK',
	'cardBQ', 'cardBQ',
	'cardBJ', 'cardBJ',	
];

$(document).ready(function start() {
    ////
    cardnum = 12;
    score = 0;
    combo = 1;
    combo_check = 0;
   
  

	matchingGame.deck.sort(shuffle);
	
	
	for (var i = 0; i < 11; i++)
	{
		$(".card:first-child").clone().appendTo("#cards");
	}
	
	// initialize each card
	$("#cards").children().each(function(index) {		
		// align the cards to be 4x4 ourselves.
		$(this).css({
			"left" : ($(this).width()  + 20) * (index % 4),
			"top"  : ($(this).height() + 20) * Math.floor(index / 4)
		});
		
		// get a pattern from the shuffled deck
		var pattern = matchingGame.deck.pop();
		
		
		$(this).find(".back").addClass(pattern);
		
		// embed the pattern data into the DOM element.
		$(this).attr("data-pattern",pattern);
						
		// listen the click event on each card DIV element.
		$(this).click(selectCard);				
	});	
});

function selectCard() {
	// we do nothing if there are already two card flipped.
	if ($(".card-flipped").size() > 1)
	{
		return;
	}
	
	// add the class "card-flipped".
	// the browser will animate the styles between current state and card-flipped state.
	$(this).addClass("card-flipped");
	
	// check the pattern of both flipped card 0.7s later.
	if ($(".card-flipped").size() == 2)
	{
		setTimeout(checkPattern,700);
	}
}

// a function to return random number between -0.5 to 0.5
function shuffle()
{
	// returning a random number in sort function.
	// the sort function determine by eiter possitive number and negative number.
	// Math.random() range from 0 - 1, 0.5 - Math.random() results eiter possitive or negative number.	
	return 0.5 - Math.random();
}


function checkPattern()
{
	if (isMatchPattern())
	{
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		
		
		$(".card-removed").bind("webkitTransitionEnd", removeTookCards);
		cardnum -= 2;
		score += 10;
		combo_check++;
		if (combo_check > 1) combo += combo_check;
		if (cardnum == 0)
		{
		    combo_check--;
		    clearInterval(matchingGame.timer);
		    $("#cards").fadeOut();
		    $("#cong").fadeIn().html("<BR><BR><BR><BR><BR>Congratulations!<BR>You solved the puzzle<BR>Your Score: ").append(Math.floor((score - matchingGame.elapsedTime)*combo));
		    $("#cong").append("<BR><BR><a href='/pages/game/cards/cards.html'>Play Again</a>  <a href='/pages/home/home.html'>Main Menu</a>");
		}
	}
	else
	{
		$(".card-flipped").removeClass("card-flipped");
	}
}

// a function to delete all removed cards


// a function to check if the flipped card match the pattern.
function isMatchPattern()
{
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}



$(function(){

	// reset the elapsed time to 0.
	matchingGame.elapsedTime = 0;
	// start the timer
	matchingGame.timer = setInterval(countTimer, 1000);
});

function countTimer()
{
	matchingGame.elapsedTime++;
	// calculate the minutes and seconds from elapsed time
	var minute = Math.floor(matchingGame.elapsedTime / 60);
	var second = matchingGame.elapsedTime % 60; 
	// add padding 0 if minute and second is less then 10
	if (minute < 10) minute = "0" + minute;
	if (second < 10) second = "0" + second;
	// display the elapsed time
	$("#elapsed-time").html(minute+":"+second);
	$(".score").html(score);
}

function removeTookCards()
{
    $(".card-removed").remove();	
}




