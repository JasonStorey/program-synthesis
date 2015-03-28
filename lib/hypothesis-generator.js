var grammar = require('./grammar');

module.exports = (function() {
    var history = {},
        analysis = {};

    function generate() {
        var expressionString,
            funcString,
            options = {
                maxArguments: analysis.maxArguments || 1
            };

        while(history[expressionString]) {
            expressionString = grammar.getRandomExpression(options);
        }

        history[expressionString] = true;

        funcString = 'function hypothesis(input) { return ' + expressionString + '; }';

        eval(funcString);
        return hypothesis;
    }

    function reset() {
        history = {};
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
