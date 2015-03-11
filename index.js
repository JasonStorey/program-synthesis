var programSynthesis = {};

programSynthesis.generate = function(testData) {
    var MAX_ITERATIONS = 100000,
        iterationIndex = 0;

    function generatedFunction(input) { return false; }

    while(!checkIfSatisfied(generatedFunction, testData)) {
        if(iterationIndex === MAX_ITERATIONS) {
            throw new Error('Failed to generate a valid hypothesis');
        }

        generatedFunction = generateHypothesis();

        iterationIndex++;
    }

    return generatedFunction;
};

function checkIfSatisfied(hypothesis, testData) {
    return testData.every(function(data) {
        return hypothesis(data.input) === data.output;
    });
}

function generateHypothesis() {
    try {
        eval('function hypothesis(input) { return ' + getRandomExpression() + ';}');
        hypothesis();
    } catch (e) {
        return generateHypothesis();
    }
    return hypothesis;
}

function getRandomExpression() {
    var length = Math.ceil(Math.random() * 3),
        expression = '';

    for(var i = 0; i < length; i++) {
        expression += getRandomToken();
        expression += ' ';
    }

    return expression;
}

function getRandomToken() {
    return TOKENS[Math.floor(Math.random() * TOKENS.length)];
}

var TOKENS = ['input','++','--','10','*'];

module.exports = programSynthesis;
