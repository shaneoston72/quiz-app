/**
 * Created by shane on 5/9/17.
 */
// state
var state = {

};

var questions = {
    1: {
        question: 'Who was George Washington?',
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'a'
    },
    2: {
        question: 'Question 2',
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'b'
    },
    3: {
        question: 'Question 3',
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'c'
    },
    4: {
        question: 'Question 4',
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'd'
    },
    5: {
        question: 'Question 5',
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'a'
    }
};

// templates
var questionTemplate = '<p class="question"></p>';

// var gameTemplate = [
//     '<div class="game-progress">' +
//         '<p class="game-progress">Question 7 out of 10</p>' +
//     '</div>' +
//     '<div class="game-question">' +
//         '<p class="question">This is a question.</p>' +
//     '</div>' +
//     '<div>' +
//         '<div class="game-answer">' +
//             '<label for="answer">Select your answer</label>' +
//             '<select name="answer">' +
//                 '<option value="a">A</option>' +
//                 '<option value="b">B</option>' +
//                 '<option value="c">C</option>' +
//                 '<option value="d">D</option>' +
//             '</select>' +
//         '</div>' +
//         '<div class="game-answer-response">' +
//             '<div class="incorrect-answer">' +
//                 '<p>Your answer is incorrect.</p>' +
//                 '<p>The correct answer is A.</p>' +
//             '</div>' +
//             '<div class="correct-answer">' +
//                 '<p class="correct-answer">Your answer is correct.</p>' +
//             '</div>' +
//         '</div>' +
//     '</div>' +
//     '<div class="game-score">' +
//         '<p class="game-score">2 correct, 5 incorrect</p>' +
//     '</div>' +
//     '<div class="game-result">' +
//         '<p>Game over. Your score is 5 out of X</p>' +
//     '</div>' +
//     '<section>' +
//         '<button type="button">Start a new game</button>' +
//     '</section>'
// ];

// helper functions
function getQuestion() {
    // TODO add a "randomiser" to get a random question number. +enhancement id:3 gh:1
    return questions[1];
}

// state modification


// DOM manipulation
function renderGame(gameContainer) {
    showElement(gameContainer);
    renderQuestion($('.game-question'));
}

function renderQuestion(element) {
    var question = getQuestion(questions);
    console.log(question);

    element.html(question.question);

}

function hideElement(element) {
    element.detach();
}

function showElement(element) {
    element.removeClass();
}

// event listeners
function startGame(gameStartButton, gameContainer) {
    gameStartButton.click(function() {
        hideElement(gameStartButton);
        renderGame(gameContainer);
    });
}

$(function() {
    var startButton = $('#game-start'),
        game = $('#game');

    startGame(startButton, game);
});
