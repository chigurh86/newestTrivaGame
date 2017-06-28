var printToScreen;
var printChoices;
var printAnswer;
var selectedAnswer;
var printImages;
var correctGuesses = 0;
var wrongGuesses = 0;
var gametimer = 0;
var j = 0;
var audio = new Audio("assets/audio/starwars.mp3");
var newaudio = audio.volume = 0.1;
var audio2 = new Audio("assets/audio/wookie2.mp3");
var audio3 = new Audio("assets/audio/lightsaber.mp3");
var audio4 = new Audio("assets/audio/cantina.mp3");
var audio5 = new Audio("assets/audio/march.mp3");
var countDown;
var time = 0;
var converted;
var question;

var questions =

[
	{
		images:"assets/images/leia.jpg",
		question: "Who did Leia kiss first in the Star Wars?",
		choices:["Darth Vader","Emperor Palpatine", "Luke SkyWalker", "Han Solo"],
		answer: 2
	},

	{
		images:"assets/images/greedo.jpg",
		question: "What is this bounty hunters name?",
		choices:["Han Solo","Boba Fett", "Greedo", "Dengar"],
		answer: 2
	},

	{
		images:"assets/images/tusken.jpeg",
		question: "In a New Hope, what is the name of the tribes on Tatooine?",
		choices:["Tusken Raiders","Ewoks", "Seperatists", "Boshudas"],
		answer: 0
	},
	{
		images:"assets/images/figrin.jpg",
		question: "What is the Cantina band's name on Tatooine?",
		choices:["Chewy and the Chewbaccas","The Starlight Band", "Sonny Eclipse", "Figrin D'an and The Modal Nodes"],
		answer: 3
	},
	{
		images:"assets/images/rancor.jpg",
		question: "Where does the Rancor, seen in Return of the Jedi, live?",
		choices:["Beneath Jabba the Hutts Palace","Inside of an asteroid","A Cave on Hoth","The Dagobah System"],
		answer: 0
	},

	{
		images:"assets/images/jawa.jpg",
		question: "What planet do Jawas live on?",
		choices:["Endor","Hoth","Tatooine","Earth"],
		answer: 2
	},
	{
		images:"assets/images/yoda.jpg",
		question: "How old is Yoda when he dies?",
		choices:["900 Years Old","Just reborn","60 Years Old","300 Years Old"],
		answer: 0
	},
	{
		images:"assets/images/jabba.jpg",
		question: "Who killed Jabba the Hutt?",
		choices:["Han Solo","Princess Leia","R2-D2","Luke Skywalker"],
		answer: 1
	}
];

for (var i = 0; i < questions.length; i++){
	printImages = questions[i].images
}

for (var i = 0; i < questions.length; i++){
	printQuestions = questions[i].question
}
for (var i = 0; i < questions.length; i++){
	printChoices = questions[i].choices
}
for (var i = 0; i < questions.length; i++){
	printAnswer = questions[i].answer
}
// functions

countDown = {
  time: 30,
  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  },

  start: function() {
    // DONE: Use setInterval to start the count here.
    intervalId = setInterval(countDown.count, 1000);
  },

  stop: function() {
  		clearInterval(intervalId);
    // DONE: Use clearInterval to stop the count here.
  },

  count: function() {
    countDown.time--;
    if (countDown.time === 0) {
    		$("#question-text").html("Out of time!");
	    	countDown.stop();
	    	setTimeout(nextQuestion, 2000);
	    	wrongGuesses = wrongGuesses + 1;
	    };
    var converted = countDown.timeConverter(countDown.time);
    $("#timer-text").html(converted);
  },
}

function postgame(){
	countDown.stop();
	$("#question-text").html('<btn id = "restart">Play again?</btn>');
	$("#btn1").hide();
	$("#btn2").hide();
	$("#btn3").hide();
	$("#btn4").hide();
	$("h1").hide();
	$("#timer-text").hide();

	if (correctGuesses > wrongGuesses) {
		audio4.play();
		$("#image-holder").html("<img style= width:80% src = assets/images/luke.jpg>");
		$("#image-holder").append('<div class="final-div"><span class="final-text">YOU WON!!</span></div>');
		$("#image-holder").append('<div class="final-div"><span class="final-text"> Correct Answers: ' + correctGuesses + '</span></div>');
		$("#image-holder").append('<div class="final-div"><span class="final-text"> Incorrect Answers: ' + wrongGuesses + '</span></div>');
	}
	else {
		audio5.play();
		$("#image-holder").html("<img style= width:80% src = assets/images/darth.jpg>");
		$("#image-holder").append('<div class="final-div"><span class="final-text">YOU LOST!!</span></div>');
		$("#image-holder").append('<div class="final-div"><span class="final-text"> Correct Answers: ' + correctGuesses + '</span></div>');
		$("#image-holder").append('<div class="final-div"><span class="final-text"> Incorrect Answers: ' + wrongGuesses + '</span></div>');
	}
	$("#restart").on("click",function(e){
		location.reload();
	});

}

function answerCheck(){
	if (selectedAnswer === printAnswer) {
		audio3.play();
		correctGuesses = correctGuesses + 1;
		$("#question-text").html("Correct!");
		setTimeout(nextQuestion, 1000);

		}

	if (selectedAnswer !== printAnswer){
		audio2.play();
		wrongGuesses = wrongGuesses + 1;
		$("#question-text").html("Incorrect!");
		setTimeout(nextQuestion, 1000);
	}

}

function nextQuestion(){
	i--;
	if (i === 0) {
		postgame();
		return;
	};
	countDown.stop();
	countDown.time = 30;
	countDown.start();
	// var j = i - 1;
	$("#timer-text").html("00:30");
	$("#question-text").html(questions[i-1].question);
	printChoices = questions[i-1].choices
	printImages = questions[i-1].images
	printAnswer = questions[i-1].answer
	$("#choice1").html(printChoices[0]);
	$("#choice2").html(printChoices[1]);
	$("#choice3").html(printChoices[2]);
	$("#choice4").html(printChoices[3]);
	$("#image-holder").html("<img src=" + printImages + " width='50%'>");
}


$(document).ready(function(){
	pregame();
	function pregame(){
	audio4.pause();
	audio5.pause();
	audio.play();
	$("#image-holder").html("<img src = assets/images/Star_Wars_Logo.jpg width='100%'>");
	$("#question-text").html('<btn id = "start">Start Game</btn>');
	$("#btn1").hide();
	$("#btn2").hide();
	$("#btn3").hide();
	$("#btn4").hide();
	$("#timer-text").hide();
	$("h1").hide();
	$("#quiz").css("background-color", "transparent");

};


	function startGame(){
	audio.pause();
	countDown.start();
	$("#timer-text").html("00:30");
	$("#question-text").html(printQuestions);
	$("#btn1").show();
	$("#btn2").show();
	$("#btn3").show();
	$("#btn4").show();
	$("#timer-text").show();
	$("h1").show();
	$("#choice1").html(printChoices[0]);
	$("#choice2").html(printChoices[1]);
	$("#choice3").html(printChoices[2]);
	$("#choice4").html(printChoices[3]);
	$("#timer").html();
	$("#image-holder").html("<img src=" + printImages + " width='50%'>");
	correctGuesses = 0;
	wrongGuesses = 0;
};




// click events

	$("#start").on("click",function(e){
		startGame();
	});

	$("#btn1").on("click",function(e){
		selectedAnswer = 0
		answerCheck();


	});

	$("#btn2").on("click",function(e){
		selectedAnswer = 1
		answerCheck();
	});

	$("#btn3").on("click",function(e){
		selectedAnswer = 2
		answerCheck();

	});

	$("#btn4").on("click",function(e){
		selectedAnswer = 3
		answerCheck();
	});

});
