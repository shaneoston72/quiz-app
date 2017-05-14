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
    submittedAnswer: '',
    correctAnswers: 0,
    incorrectAnswers: 0,
    reset: function() {
        this.currentQuestion = 0;
        this.currentAnswer = '';
        this.submittedAnswer = '';
        this.correctAnswers = 0;
        this.incorrectAnswers =  0;
    }
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
                    '<label>' + choiceKey.toUpperCase() + '.  ' + choiceValue + '</label>' +
                '</li>';
    },
    correctAnswer: function () {
        return 'That\'s right';
    },
    incorrectAnswer: function (state, questions) {
        console.log(state);
        return 'Oops. The correct answer is ' + questions[state.currentQuestion - 1].answer.toUpperCase();
    },
    result: function(state, questionsObj) {
        return 'Game Over. <br/> Your final score is ' + state.correctAnswers + ' correct ' + pluralise(state.score, 'answer') +
        ' out of ' + questionsObj.length + ' questions.';
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
    }
    ,
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
    // ,
    // {
    //     question: 'Question 3',
    //     choices: {
    //         a: 'answer 1',
    //         b: 'answer 2',
    //         c: 'answer 3',
    //         d: 'answer 4'
    //     },
    //     answer: 'c'
    // },
    // {
    //     question: 'Question 4',
    //     choices: {
    //         a: 'answer 1',
    //         b: 'answer 2',
    //         c: 'answer 3',
    //         d: 'answer 4'
    //     },
    //     answer: 'd'
    // },
    // {
    //     question: 'Question 5',
    //     choices: {
    //         a: 'answer 1',
    //         b: 'answer 2',
    //         c: 'answer 3',
    //         d: 'answer 4'
    //     },
    //     answer: 'a'
    // }
];

// ---------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
/**
 * getQuestion return a question from questions object after checking state for the current question
 * @param state
 * @param questionsObj
 * @returns {*|object}
 */
function getQuestion(state, questionsObj) {
    return state.currentQuestion === 0 ? questionsObj[0] : questionsObj[state.currentQuestion];
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

function pluralise(number, word) {
    var plural = '';
    if (number === 0 || number > 0 ) {
        plural = word + 's';
    }
    return (number === 1 ? word : plural);
}

// ---------------------------------------------------------------------------------------------------
// State management
function checkSubmittedResponse(state, choice) {
    if (choice === state.currentAnswer) {
        state.correctAnswers++;
        return true;
    }

    state.incorrectAnswers++;

    return false;
}

function setCurrentAnswer(question) {
    state.currentAnswer = question.answer;
}

function incrementQuestion(state) {
    state.currentQuestion++;
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
    hideElement($('#game-answer-response'));
}

        function showProgress(element) {
            element.html(board.progress(state, questions));
            showElement(element);
        }

        function showScore(element) {
            element.html(board.score(state));
            showElement(element);
        }

        function showQuestionAndChoices(questionElement, choicesElement) {
            var question = getQuestion(state, questions),
                choices = question.choices;

            setCurrentAnswer(question);

            questionElement.html(board.question(question));
            choicesElement.html(getChoicesHTML(choices));

            incrementQuestion(state);
        }

function processChoice(choice, submitButton) {
    answerText(choice);

    hideElement(submitButton);

    showElement($('#game-answer-response'));

    showScore($('#game-score'));

    setTimeout(function() {
        nextRound(submitButton, $('#game-answer-response'));
    }, 1500);
}

        function answerText(choice) {
            var result = checkSubmittedResponse(state, choice);

            if (result === true) {
                $('#game-answer-response').html(board.correctAnswer());
            } else {
                $('#game-answer-response').html(board.incorrectAnswer(state, questions));
            }
        }

function nextRound(buttonElement, answerResponseElement) {
    hideElement(answerResponseElement);

    if (state.currentQuestion === questions.length) {
        toggleVisibility($('#game-box'));
        showElement($('#game-result'));
        $('#result').html(board.result(state, questions));
    } else {
        startRoundOfTheGame();
        showElement(buttonElement);
    }
}

function startNewGame(state, gameBox) {
    state.reset();

    hideElement($('#game-result'));

    showElement($('#submit-button'));

    openTheGameBox(gameBox);
}

function hideElement(element) {
    element.hide();
}

function showElement(element) {
    element.show();
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

        processChoice(choice, submitButton);
    });
}

function newGame(newGameButton, gameBox) {
    newGameButton.click(function() {
        startNewGame(state, gameBox);
    });
}

//---------------------------------------------------------------------------------------------------
$(function() {
    var gameBox = $('#game-box'),
        startButton = $('#start-button'),
        submitButton = $('#submit-button'),
        newGameButton = $('#new-game');


    startTheGame(startButton, gameBox);
    handleChoice(submitButton);
    newGame(newGameButton, gameBox);
});