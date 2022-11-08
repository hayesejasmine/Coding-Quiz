  //Quiz Questions
  var questionSource = [

    {
        question: "Commonly used data types DO Not Include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "2"
    },
    {
        question: "The condition in an if/else statement is enclosed with _______________.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "2"
    },
    {
        question: "Arrays in JavaScript can be used to store _____________.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "3"
    },
    {
        question: "String values must be enclosed within _____________ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "1"
    },   
];



var introduction = document.querySelector("#introduction");
var startBtn = document.querySelector("#start_quiz");
var initialPage =document.querySelector("#initial_pg");

var questionsPge = document.querySelector("#questions");
var askQtn = document.querySelector("#ask_q");

var choiceBtns = document.querySelectorAll(".choices");
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");

var resultLine = document.querySelector("#result-line");
var submission = document.querySelector("#submission");
var finalScore = document.querySelector("#final_score");
var userInitial =document.querySelector("#initial");

var submitBtn =document.querySelector("#submission-btn");
var highScore =document.querySelector("#high-scores");
var recordScore =document.querySelector("#record-score");
var scoreChk =document.querySelector("#scores_chk");
var allDone =document.querySelector("#all-done");

var gobackBtn =document.querySelector("#goback-btn");
var clearhighBtn=document.querySelector("#clearhigh-btn");

var timeLeft = document.getElementById("timer");

var secondsLeft = 75;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;



//when I click the start button, the timer begins
function countdown() {
        
        var timerInterval = setInterval(function () {

          secondsLeft--;
          timeLeft.textContent = "Time: " + secondsLeft + " seconds";
    
            if (secondsLeft <= 0){
                clearInterval(timerInterval);
                timeLeft.textContent = "Time is up!"; 
                gameOver();

            } else  if(questionCount >= questionSource.length +1) {
                clearInterval(timerInterval);
                gameOver();
                } 
    }, 1000);
}

    //Click the button to start the quiz
function startQuiz () {
        initialPage.style.display = "none";
        questionsPge.style.display = "block";
        questionNumber = 0
        countdown();
        showQuestion(questionNumber);
      
}
    //Display the questions and answers
function showQuestion (n) {
        askQtn.textContent = questionSource[n].question;
        answerBtn1.textContent = questionSource[n].choices[0];
        answerBtn2.textContent = questionSource[n].choices[1];
        answerBtn3.textContent = questionSource[n].choices[2];
        answerBtn4.textContent = questionSource[n].choices[3];
        questionNumber = n;
    }

    //Advise if answer is correct or wrong
function checkAnswer(event) {
    event.preventDefault();
    //make it display
    resultLine.style.display = "block";
    setTimeout(function () {
        resultLine.style.display = 'none';
    }, 1000);

    // answer return
    if (questionSource[questionNumber].answer == event.target.value) {
        resultLine.textContent = "Correct!"; 
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 10;
        resultLine.textContent = "Wrong! The correct answer is " + questionSource[questionNumber].answer + " .";
    }
         //I am then presented with another question
    if (questionNumber < questionSource.length -1 ) {
    // next question when any reactBtn is clicked
        showQuestion(questionNumber +1);
    } else {
    gameOver();
}
questionCount++;
}
    //if all of the questions are answered or the time is up, the game is over
function gameOver() {

        questionsPge.style.display = "none";
        submission.style.display = "block";
        console.log(submission);
        // final score
        finalScore.textContent = "Your final score is :" + totalScore ;
        // clearInterval(timerInterval);  
        timeLeft.style.display = "none"; 
};

// get score from local storage
function getScore () {
    var currentList =localStorage.getItem("ScoreList");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};

// render score to score list
function renderScore () {
    recordScore.innerHTML = "";
    recordScore.style.display ="block";
    var highScore = sort();   
    // only show the top five high scores. 
    var topFive = highScore.slice(0,5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
    // Show the scores on the high score list
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    recordScore.appendChild(li);
    }
};

// sort score and rank the high score list
function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};


// push new score to the local storage
function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore () {
    var scoreItem ={
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}


// startbtn to start the quiz
startBtn.addEventListener("click", startQuiz);

//choosing a button for each question will result in the next page
choiceBtns.forEach(function(click){

    click.addEventListener("click", checkAnswer);
});


//save information and go to next page
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    submission.style.display = "none";
    initialPage.style.display = "none";
    highScore.style.display = "block";
    questionsPge.style.display ="none";
    saveScore();
});

// high score list
scoreChk.addEventListener("click", function(event) {
    event.preventDefault();
    submission.style.display = "none";
    initialPage.style.display = "none";
    highScore.style.display = "block";
    questionsPge.style.display ="none";
    renderScore();
});

//go to initial page
gobackBtn.addEventListener("click",function(event){
        event.preventDefault();
        submission.style.display = "none";
        initialPage.style.display = "block";
        highScore.style.display = "none";
        questionsPge.style.display ="none";
        location.reload();
});

//clear local storage 
clearhighBtn.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});