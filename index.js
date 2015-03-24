var hypothesisGenerator = require('./lib/hypothesis-generator');

var programSynthesis = {};

programSynthesis.generate = function(testData, maxIterations) {
    var MAX_ITERATIONS = maxIterations || 1000000,
        iterationIndex = 0;

    function generatedFunction(input) {
        return false;
    }

    while(!checkIfSatisfied(generatedFunction, testData)) {
        if(iterationIndex === MAX_ITERATIONS) {
            throw new Error('Failed to generate a valid hypothesis');
        }

        generatedFunction = hypothesisGenerator.generate();

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

module.exports = programSynthesis;
