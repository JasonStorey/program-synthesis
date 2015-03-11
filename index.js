var programSynthesis = {};

programSynthesis.generate = function(testData) {
    var MAX_ITERATIONS = 1000000,
        iterationIndex = 0;

    function generatedFunction(input) { return false; }

    while(!checkIfSatisfied(generatedFunction, testData)) {
        if(iterationIndex === MAX_ITERATIONS) {
            throw new Error('Failed to generate a valid hypothesis');
        }

        generatedFunction = function(input) {
            return eval(getRandomToken());
        };

        iterationIndex++;
    }

    return generatedFunction;
};

function checkIfSatisfied(func, testData) {
    return testData.every(function(data) {
        return func(data.input) === data.output;
    });
}

function getRandomToken() {
    return 'input';
}

module.exports = programSynthesis;
