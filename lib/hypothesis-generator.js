var grammar = require('./grammar');

module.exports = (function() {
    var testedExpressions,
        analysis;

    reset();

    function generate(options) {
        var iterationIndex = 0,
            hypothesis = function(){};

        testedExpressions = {};

        while(!testHypothesis(hypothesis, options.testData)) {

            if(iterationIndex === options.maxIterations) {
                throw new Error('Failed to generate a valid hypothesis');
            }

            hypothesis = generateNewHypothesis();

            iterationIndex++;
        }

        return hypothesis;
    }

    function generateNewHypothesis() {
        var expressionString,
            funcString,
            options = {
                maxArguments: analysis.maxArguments
            };

        while(testedExpressions[expressionString]) {
            expressionString = grammar.getRandomExpression(options);
        }

        testedExpressions[expressionString] = true;

        funcString = 'function hypothesis(input) { return ' + expressionString + '; }';

        eval(funcString);
        return hypothesis;
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

    function testHypothesis(hypothesis, testData) {
        return testData.every(function(data) {
            var args = data.input instanceof Array ? data.input : [data.input];
            return hypothesis.apply(null, args) === data.output;
        });
    }

    return {
        generate: generate,
        reset: reset,
        analyse: analyse
    };
}());
