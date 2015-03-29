var hypothesisGenerator = require('./lib/hypothesis-generator');

var programSynthesis = {};

programSynthesis.generate = function(testData, maxIterations) {
    var options = {
        maxIterations: maxIterations || 5000000,
        testData: testData
    };

    hypothesisGenerator.reset();
    hypothesisGenerator.analyse(testData);

    return hypothesisGenerator.generate(options);
};

module.exports = programSynthesis;
