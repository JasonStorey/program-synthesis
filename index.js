var programSynthesis = {};

programSynthesis.generate = function(testData) {

    function generatedFunction(input) { return false; }

    while(!checkIfSatisfied(generatedFunction, testData)) {
        generatedFunction = function(input) {
            return eval(getRandomToken());
        };
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
