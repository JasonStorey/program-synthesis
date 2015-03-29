var grammar = require('./grammar');

module.exports = (function() {
    var testedExpressions,
        analysis;

    reset();

    function generate(options) {
        var iterationIndex = 0,
            hypothesis = function(){},
            hypothesisConfig = {
                maxArguments: analysis.maxArguments
            };

        testedExpressions = {};

        while(!testHypothesis(hypothesis, options.testData) && iterationIndex < options.maxIterations) {
            hypothesis = generateNewHypothesis(hypothesisConfig);
            iterationIndex++;
        }

        if(!testHypothesis(hypothesis, options.testData)) {
            throw new Error('Failed to generate a valid hypothesis');
        }

        return hypothesis;
    }

    function generateNewHypothesis(options) {
        var expressionString;

        while(testedExpressions[expressionString]) {
            expressionString = grammar.getRandomExpression(options);
        }

        testedExpressions[expressionString] = true;

        eval('function hypothesis() { return ' + expressionString + '; }');
        return hypothesis;
    }

    function testHypothesis(hypothesis, testData) {
        return testData.every(function(data) {
            var args = data.input instanceof Array ? data.input : [data.input];
            return hypothesis.apply(null, args) === data.output;
        });
    }

    function reset() {
        analysis = {
            maxArguments: 1
        };
    }

    function analyse(dataset) {
        dataset.forEach(function(item) {
            analysis.maxArguments = item.input.length > analysis.maxArguments ? item.input.length : analysis.maxArguments;
        });
    }

    return {
        generate: generate,
        reset: reset,
        analyse: analyse
    };
}());
