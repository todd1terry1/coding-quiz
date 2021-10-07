var scoreCount = 0;
var timeLeft = 100;
var questionsArrayIndex = 0;
var timeInterval;
var timerE1 = document.querySelector(".countdown-timer span");
var questionFormation = document.querySelector(".questions h2");
var answerResponse = document.querySelector("#answer-response");
var initialsSubmitBtn = document.querySelector(".submit-btn");
var inputInitial = document.querySelector(".input-initial");
var formEl = document.querySelector("#initial-form");
var totalUserHighScores = [];
var questionsArray = [{
        question: "JavaScript is the same as Java.",
        choices: ["true", "false"],
        answer: "false"
    },
    {
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array? ",
        choices: ["last()", "put()", "push()", "None of the above"],
        answer: "push()"
    },
    {
        question: "Which built-in method returns the string representation of the number's value?",
        choices: ["toValue()", "toNumber()", "toString()", "None of the above."],
        answer: "toString()"
    },
    {
        question: "Inside which HTML <> element do we put the JavaScript?",
        choices: ["scripting", "javascript", "js", "script"],
        answer: "script"
    },
    {
        question: "The external JavaScript file must contain the <script> tag.",
        choices: ["true", "false"],
        answer: "false"
    },
    {
        question: "How do you declare a JavaScript variable?",
        choices: ["variable carName", "String carName", "float carName", "var carName"],
        answer: "var carName"
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choices: ["+", "-", "*", "="],
        answer: "="
    },
    {
        question: "What will the following code return: Boolean(10 > 9)",
        choices: ["false", "true", "undefined", "null"],
        answer: "true"
    },
    {
        question: "Is JavaScript case-sensitive?",
        choices: ["No", "Yes", "only functions", "only variables"],
        answer: "Yes"
    },
    {
        question: "What does DOM stand for?",
        choices: ["Dissolved Organic Matter", "Dissolved Organic Matter", "Document Object Model", "Disk on Module"],
        answer: "Document Object Model"
    },
];

var lettersArray = ["a", "b", "c", "d"];

var quizEnd = function () {
    questionFormation.textContent = "Quiz Session is done 🏁";
    document.querySelector(".questions p").classList.remove("hide");
    document.querySelector(".questions p").textContent = " Your Final Score is: " + scoreCount;
    document.querySelector(".choices-list").innerHTML = "";
    clearInterval(timeInterval);
    timerE1.textContent = 0;
    formEl.classList.remove("hide");
    formEl.classList.add("submit-style");


    formEl.addEventListener("submit", saveScores);
};
// A countdown timer for the quiz.
var countdown = function () {
    timeInterval = setInterval(function () {
        if (timeLeft <= 0) {
            timerE1.textContent = "";
            clearInterval(timeInterval);
            quizEnd();

        } else {
            timerE1.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);
};

// Check the answer of the selected choice.
var checkAnswer = function () {

    // Check the value of the clicked button.
    if (this.value != questionsArray[questionsArrayIndex].answer) {
        // If value picked is incorrect subtract 10 from timer.
        timeLeft = timeLeft - 10;

        if (timeLeft < 0) {
            time = 0;
        }
        // Display new time on the screen.
        timerE1.textContent = timeLeft;

        // Indicate that the selected option is incorrect.
        answerResponse.textContent = "Wrong ❌";
    } else {
        // Indicate that the selected option is correct.
        answerResponse.textContent = "Correct ✅";
        scoreCount = scoreCount + 10;
    }

    // Display the response once after each question.
    answerResponse.setAttribute("class", "answer-response-style");
    setTimeout(function () {
        answerResponse.setAttribute("class", "answer-response-style hide");
    }, 1000);

    // Update the questionsArrayIndexx ++.
    questionsArrayIndex++;

    if (questionsArrayIndex === questionsArray.length) {
        quizEnd();

    } else {
        // Call the createQuestions function.
        createQuestions();
    }

};

// Save the scores of a user to local storage.
var saveScores = function (event) {
    // Prevents webpage from refreshing
    event.preventDefault();
    var initials = inputInitial.value.trim();

    if (initials !== "") {
        // Check to see if an array or value is already stored
        var highscores = JSON.parse(window.localStorage.getItem("high-scores")) || [];

        // Store current user information in an object.
        var currentUserScore = {
            initials: initials,
            score: scoreCount
        };
        // Push object information to an array.
        highscores.push(currentUserScore);
        localStorage.setItem("high-scores", JSON.stringify(highscores));
        location.reload();
    }
};

var loadScores = function () {
    // Check to see if an array or value is already stored
    var storedHighScores = JSON.parse(window.localStorage.getItem("high-scores")) || [];

    // Sort high scores.
    storedHighScores.sort(function (a, b) {
        return b.score - a.score;
    });
    // Loop through each score and print accordingly. 
    storedHighScores.forEach(function (score) {
        // create li tag for each high score
        var liEl = document.createElement("li");
        liEl.classList.add("list-group-item");
        liEl.textContent = score.initials + " - " + score.score;

        // display on page
        var modalBodyEl = document.querySelector(".modal-body");
        modalBodyEl.appendChild(liEl);
    });

};
// Clear the array store in localStorage.
function clearHighscores() {
    window.localStorage.removeItem("high-scores");
    window.location.reload();
}

// A function to form both the questions and corresponding options.
var createQuestions = function () {

    questionFormation.textContent = questionsArray[questionsArrayIndex].question;

    // Clear out any old question choices.
    document.querySelector(".choices-list").innerHTML = "";

    // Alternative Method:
    /*
        for (var i = 0; i < questionsArray[questionsArrayIndex].choices.length; i++) {

            // create button for each choice.
            var optionButton = document.createElement("button");
            optionButton.classList.add("choice-btn", "btn", "btn-primary", );
            optionButton.setAttribute("index-location", "questionsArray[questionsArrayIndex].choices[i]");
            optionButton.textContent = questionsArray[questionsArrayIndex].choices[i];

            // Add event listener to each button.
            optionButton.addEventListener("click", checkAnswer);

            // Append button element to ul.
            document.querySelector(".choices-list").appendChild(optionButton);
        }*/

    questionsArray[questionsArrayIndex].choices.forEach(function (choice, i) {

        // create button for each choice.
        var optionButton = document.createElement("button");
        optionButton.classList.add("choice-btn", "btn", "btn-primary", );
        // optionButton.textContent = choice;
        optionButton.setAttribute("value", choice);
        optionButton.innerHTML = "<span>" + lettersArray[i] + ": </span>" + choice;

        // Add event listener to each button.
        optionButton.addEventListener("click", checkAnswer);

        // Append button element to ul.
        document.querySelector(".choices-list").appendChild(optionButton);
    });

}

var startQuiz = function () {
    document.querySelector(".questions p").classList.add("hide");
    document.querySelector(".start-quiz").remove();

    // Timer starts counting.
    countdown();
    // Generate questions with options.
    createQuestions();
};

document.querySelector(".start-quiz").addEventListener("click", startQuiz);
document.querySelector(".clear-all").onclick = clearHighscores;
loadScores();