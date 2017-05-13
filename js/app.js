/**
 * Created by shane on 5/13/17.
 */
//---------------------------------------------------------------------------------------------------
/**
 * state represents a round of the game game
 * @type {{currentQuestion: number, currentAnswer: string, correctAnswers: number, incorrectAnswers: number}}
 */
var state = {
    currentQuestion: 0,
    currentAnswer: '',
    correctAnswers: 0,
    incorrectAnswers: 0
};

var board = {
    progress: function (state, questionsObj) {
        return '<p>Question ' + (state.currentQuestion + 1) +
                    ' of ' + questionsObj.length + ' questions</p>';
    },
    score: function (state) {
        return '<p id="score">' + state.correctAnswers + ' correct, ' +
                    state.incorrectAnswers + ' incorrect</p>';
    },
    question: function(question) {
        return '<p>' + question.question + '</p>';
    },
    choice: function(choiceKey, choiceValue) {
        return '<li>' +
                    '<input type="radio" name="choice" value="' + choiceKey + '" required>' +
                    '<label>' + choiceValue + '</label>' +
                '</li>';
    },
    correctAnswer: function () {
        return 'That\'s right';
    },
    incorrectAnswer: function (state, questions) {
        return 'Oops. The correct answer is '
    }
};
/**
 * questions represents questions, choices and answers
 * @type {[*|object]}
 */
var questions = [
    {
        question: 'Who was George Washington?',
        choices: {
            a: 'First President of the United States',
            b: 'King of England during the Civil War',
            c: 'Second Vice-President of the United States',
            d: 'President Trump\'s Secret Service Director'
        },
        answer: 'a'
    },
    {
        question: 'Question 2',
        choices: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'b'
    }
    ,
    {
        question: 'Question 3',
        choices: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'c'
    },
    {
        question: 'Question 4',
        choices: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'd'
    },
    {
        question: 'Question 5',
        choices: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'a'
    }
];

// ---------------------------------------------------------------------------------------------------
// State management

/**
 * getQuestion return a question from questions object after checking state for the current question
 * @param state
 * @param questionsObj
 * @returns {*|object}
 */
function getQuestion(state, questionsObj) {
    return state.currentQuestion === 0 ? questionsObj[0] : questionsObj[state.currentQuestion + 1];
}

function getChoicesHTML(choices) {
    var choicesRadioButtons = [];

    for (var choice in choices) {
        if (choices.hasOwnProperty(choice)) {
            choicesRadioButtons.push(board.choice(choice, choices[choice]));
        }
    }

    return choicesRadioButtons.join('');
}

function checkSubmittedResponse(state, choice, questions) {
    if (choice === questions[state.currentQuestion].answer) {
        state.correctAnswers++;
        return true;
    }

    state.incorrectAnswers++;

    return false;
}

// ---------------------------------------------------------------------------------------------------
// DOM Manipulators

// Helper functions -------------------------------------------------------------------
/**
 * toggleVisibility does just that -- toggles the css class 'visibility'
 * @param element
 */
function toggleVisibility(element) {
    element.toggleClass('visibility');
}

// Primary manipulators ---------------------------------------------------------------
/**
 * openTheGameBox exposes the game box and start a round of the game
 * @param gameBox
 */
function openTheGameBox(gameBox) {
    toggleVisibility(gameBox);

    startRoundOfTheGame();
}

/**
 * startRoundOfTheGame sets game board and displays a question
 * @param state
 * @param questionsObj
 */
function startRoundOfTheGame() {
    showProgress($('#game-progress'));
    showScore($('#game-score'));
    showQuestionAndChoices($('#game-question'), $('#game-choices ul'));
}

        function showProgress(element) {
            element.html(board.progress(state, questions));
        }

        function showScore(element) {
            element.html(board.score(state));
        }

        function showQuestionAndChoices(questionElement, choicesElement) {
            var question = getQuestion(state, questions),
                choices = question.choices;

            questionElement.html(board.question(question));
            choicesElement.html(getChoicesHTML(choices));
        }

function processChoice(choice) {
    var result = checkSubmittedResponse(state, choice, questions);


    console.log(state);
}


// ---------------------------------------------------------------------------------------------------
// EVENT LISTENERS

/**
 * startTheGame hides the start button and opens the game box
 * @param startButton
 * @param gameBox
 */
function startTheGame(startButton, gameBox) {
    startButton.click(function () {
        toggleVisibility(startButton);

        openTheGameBox(gameBox);
    });
}

function handleChoice(submitButton) {
    submitButton.click(function(event) {
        event.preventDefault();

        var choice = $("input[name='choice']:checked").val();

        toggleVisibility(submitButton);

        processChoice(choice);
    });
}

//---------------------------------------------------------------------------------------------------
$(function() {
    var gameBox = $('#game-box'),
        startButton = $('#start-button'),
        submitButton = $('#submit-button');


    startTheGame(startButton, gameBox);
    handleChoice(submitButton);
});