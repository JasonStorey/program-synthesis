var programSynthesis = {};

programSynthesis.generate = function(testInput, expectedOutput) {

    function generatedFunction(input) { return false; }

    while(generatedFunction(testInput) !== expectedOutput) {
        generatedFunction = function(input) {
            return input;
        };
    }

    return generatedFunction;
};

function getRandomToken() {

}

module.exports = programSynthesis;
