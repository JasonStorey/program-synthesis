var grammar = require('./grammar');

module.exports = (function() {
    var history = {};

    function generate() {
        var expressionString,
            funcString;

        while(history[expressionString]) {
            expressionString = grammar.getRandomExpression();
        }

        history[expressionString] = true;

        funcString = 'function hypothesis(input) { return ' + expressionString + '; }';

        eval(funcString);
        return hypothesis;
    }

    function reset() {
        history = {};
    }

    return {
        generate: generate,
        reset: reset
    };
}());
