/**
 * Created by shane on 5/9/17.
 */
// state
var state = {

};

var questions = [
    {
        question: 'Question 1',
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'a'
    },
    {
        question: 'Question 2',
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'b'
    },
    {
        question: 'Question 3',
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'c'
    },
    {
        question: 'Question 4',
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'd'
    }
];

var gameTemplate = [
    '<div class="game-progress">' +
        '<p class="game-progress">Question 7 out of 10</p>' +
    '</div>' +
    '<div class="game-question">' +
        '<p class="question">This is a question.</p>' +
    '</div>' +
    '<div>' +
        '<div class="game-answer">' +
            '<label for="answer">Select your answer</label>' +
            '<select name="answer">' +
                '<option value="a">A</option>' +
                '<option value="b">B</option>' +
                '<option value="c">C</option>' +
                '<option value="d">D</option>' +
            '</select>' +
        '</div>' +
        '<div class="game-answer-response">' +
            '<div class="incorrect-answer">' +
                '<p>Your answer is incorrect.</p>' +
                '<p>The correct answer is A.</p>' +
            '</div>' +
            '<div class="correct-answer">' +
                '<p class="correct-answer">Your answer is correct.</p>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="game-score">' +
        '<p class="game-score">2 correct, 5 incorrect</p>' +
    '</div>' +
    '<div class="game-result">' +
        '<p>Game over. Your score is 5 out of X</p>' +
    '</div>' +
    '<section>' +
        '<button type="button">Start a new game</button>' +
    '</section>'
];

// state modification


// DOM manipulation
function renderGame(gameContainer) {
    gameContainer.html(gameTemplate);
}

// event listeners
function startGame(gameStartButton, gameContainer) {
    gameStartButton.click(function() {
        renderGame(gameContainer);
    });
}

$(function() {
    var startButton = $('#game-start'),
        game = $('#game');
    console.log(startButton, game);

    startGame(startButton, game);
});
