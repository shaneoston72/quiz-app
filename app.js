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
    toggleVisibility($('.game-answer-response'));
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
        toggleVisibility($('.game-answer-response'));
        renderQuestion($('.game-question'));
    }, 2000);
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

// TODO refactor two below into one with toggleClass
function hideElement(element) {
    element.detach();
}

function showElement(element) {
    element.removeClass();
}

function toggleVisibility(element) {
    element.toggleClass('visibility');
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
