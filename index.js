var programSynthesis = {
    history: {}
};

var TOKENS = ['arguments[0]','arguments[1]','arguments[2]','++','--','10','*'];

programSynthesis.generate = function(testData) {
    var MAX_ITERATIONS = 10000,
        iterationIndex = 0;

    programSynthesis.history = {};

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
        var args = data.input instanceof Array ? data.input : [data.input];
        return hypothesis.apply(null, args) === data.output;
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
    var length = Math.ceil(Math.random() * 10),
        expression = '';

    for(var i = 0; i < length; i++) {
        expression += getRandomToken();
        expression += ' ';
    }

    //if(programSynthesis.history[expression] === true) {
    //    expression = getRandomExpression();
    //} else {
    //    programSynthesis.history[expression] = true;
    //}

    return expression;
}

function getRandomToken() {
    return TOKENS[Math.floor(Math.random() * TOKENS.length)];
}

module.exports = programSynthesis;
