/**
 * Created by shane on 5/9/17.
 */
// state
var state = {
    currentAnswer: '',
    score: 0,
    incorrectNum: 0,
    currentQuestion: 0,
    reset: function() {
        this.currentAnswer = '';
        this.score = 0;
        this.incorrectNum = 0;
        this.currentQuestion = 0;
    }
};

var questions = [
    {
        question: 'Who was George Washington?',
        answers: {
            a: 'First President of the United States',
            b: 'King of England during the Civil War',
            c: 'Second Vice-President of the United States',
            d: 'President Trump\'s Secret Service Director'
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
    }
    ,
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
    },
    {
        question: 'Question 5',
        answers: {
            a: 'answer 1',
            b: 'answer 2',
            c: 'answer 3',
            d: 'answer 4'
        },
        answer: 'a'
    }
];

// state modification
function getQuestionAndAnswers(questions, state) {
    return questionObj = state.currentQuestion === 0 ? questions[0] : questions[state.currentQuestion];
}

function incrementQuestion(state) {
    state.currentQuestion++;
}

function answerQuestion(state, answer) {
    state.currentAnswer = answer;
    if (questions[state.currentQuestion].answer === answer) {
        state.score++;
        return 'correct';
    } else {
        state.incorrectNum++;
        return 'incorrect';
    }
}

function resetGame(state) {
    state.reset();
}

// DOM manipulation
function renderGame(game, newGameBool) {
    if (!newGameBool) {
        showElement(game);
    }

    showElement($('#new-game'));
    renderQuestion($('.game-question'));
}

function updateProgress(state, element) {
    var gameProgress = '<p>' + (state.currentQuestion + 1) + ' of ' + questions.length + '</p>';

    element.html(gameProgress);
}

function renderQuestion(element) {
    var question = getQuestionAndAnswers(questions, state);
    updateProgress(state, $('#game-progress'));
    element.html(question.question);
    renderChoices(question.answers);
}

function renderChoices(choices) {
    var radioButtons = [];
    for (var choice in choices) {
        radioButtons.push(renderChoice(choice, choices[choice]));
    }
    $('.game-choices ul').html(radioButtons.join(''));
}

function renderChoice(choiceValue, choice) {
    return '<li>' +
        '<input type="radio" name="answer" value="' + choiceValue + '" required>' +
        '<label>' + choice + '</label>' +
        '</li>';
}

function renderResult(result) {
    if (result === 'correct') {
        $('.answer-status').html(renderCorrectAnswer());
    } else {
        $('.answer-status').html(renderIncorrectAnswer(state));
    }
    renderScore(state, $('.score-totals'));
}

function renderCorrectAnswer() {
    return '<p>Your answer is correct.</p>';
}

function renderIncorrectAnswer(state) {
    return '<span>Your answer is incorrect. The correct answer is <span>"' + questions[state.currentQuestion].answer + '"</span>.</p>';
}

function renderNextQuestion(state) {
    if (state.currentQuestion === questions.length - 1) {
        endGame(state);
    } else {
        setTimeout(function() {
            incrementQuestion(state);
            $('.answer-status').empty();
            renderQuestion($('.game-question'));
            // TODO enable submit-choice button here
        }, 1750);
    }
}

function endGame(state) {
    $('#game').addClass('visibility');
    $('#game-result').toggleClass('visibility');

    $('#game-result').html(
        'Game Over. Your final score is ' + state.score + ' correct ' + pluraliseAnswer(state.score, 'answer') +
        ' out of ' + questions.length + ' questions.');
}

function renderScore(state, element) {
    showElement($('.game-score'));
    var scoreHTML = '<p>' + state.score + ' correct ' + pluraliseAnswer(state.score, 'answer') + ', ' +
        state.incorrectNum + ' incorrect ' + pluraliseAnswer(state.incorrectNum, 'answer') + '</p>';
    element.html(scoreHTML);
}

function renderNewGame(game, newGameBool) {
    resetGame(state);
    console.log(state);
    renderGame(game, newGameBool);
    renderScore(state, $('.score-totals'));
}

function pluraliseAnswer(number, word) {
    var plural = '';
    if (number === 0 || number > 0 ) {
        plural = word + 's';
    }
    return (number === 1 ? word : plural);
}

// TODO refactor two below into one with toggleClass
function hideElement(element) {
    element.addClass('hidden');
}

function showElement(element) {
    element.removeClass('hidden');
}

// event listeners
function startGame(gameStartButton, game) {
    gameStartButton.click(function() {
        hideElement(gameStartButton);
        renderGame(game);
    });
}

function checkAnswer() {
    $("form[name='game-choices']").submit(function(e) {
        e.preventDefault();

        // TODO disable the submit button between questions to prevent double clicking.
        var answer = $("input[name='answer']:checked").val(),
            answerResult = answerQuestion(state, answer);

        renderResult(answerResult);
        renderNextQuestion(state);
    });
}

function newGame(game) {
    $('#new-game').click(function() {
        renderNewGame(game, true);
    })
}

$(function() {
    var startButton = $('#game-start'),
        game = $('#game');
    startGame(startButton, game);
    checkAnswer();
    newGame();
});