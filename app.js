/**
 * Created by shane on 5/9/17.
 */
// state
var state = {
    currentAnswer: '',
    score: 0,
    incorrectNum: 0,
    currentQuestion: 0
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

// state modification
function getQuestionAndAnswers(questions, state) {
    console.log('currentQuestion before', state.currentQuestion);

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

// DOM manipulation
function renderGame(gameContainer) {
    showElement(gameContainer);
    renderQuestion($('.game-question'));
}

function renderQuestion(element) {
    var question = getQuestionAndAnswers(questions, state);

    element.html(question.question);

    renderChoices(question.answers);
}

function renderChoices(choices) {
    var radioButtons = [];

    for (var choice in choices) {
        radioButtons.push(renderChoice(choice, choices[choice]));
    }
    $('.game-answer ul').html(radioButtons.join(''));
}

function renderChoice(choiceValue, choice) {
    return '<li>' +
               '<input type="radio" name="answer" value="' + choiceValue + '" required>' +
                '<label>' + choice + '</label>' +
            '</li>';
}

function renderResult(result) {
    if (result === 'correct') {
        $('.correct-answer').html(renderCorrectAnswer());
    } else {
        $('.incorrect-answer').html(renderIncorrectAnswer());
    }
    renderScore(state, $('.score-totals'));
}

function renderCorrectAnswer() {
    return '<p>Your answer is correct.</p>';
}

function renderIncorrectAnswer() {
    return '<p>Your answer is incorrect.</p>';
}

function renderNextQuestion() {
    setTimeout(function() {
        incrementQuestion(state);
        renderQuestion($('.game-question'));
    }, 2500);
}

function renderScore(state, element) {
    showElement($('.game-score'));

    var scoreHTML = '<p>' + state.score + ' correct ' + pluraliseAnswer(state.score, 'answer') + ', ' +
                        state.incorrectNum + ' incorrect ' + pluraliseAnswer(state.incorrectNum, 'answer') + '</p>';

    element.html(scoreHTML);
}

function pluraliseAnswer(number, word) {
    var plural = '';

    if (number === 0 || number > 0 ) {
        plural = word + 's';
    }

    return (number === 1 ? word : plural);
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

function checkAnswer() {
    $("form[name='game-answer']").submit(function(e) {
        e.preventDefault();

        var answer = $("input[name='answer']:checked").val();

        var answerResult = answerQuestion(state, answer);
        renderResult(answerResult);
        renderNextQuestion();
    });
}



$(function() {
    var startButton = $('#game-start'),
        game = $('#game');

    startGame(startButton, game);
    checkAnswer();
});
