var grammar = require('./grammar');

module.exports = (function() {
    var history = {};

    function generate() {
        var expressionString = getRandomExpression(),
            funcString;

        while(history[expressionString]) {
            expressionString = getRandomExpression();
        }

        history[expressionString] = true;

        funcString = 'function hypothesis(input) { return ' + expressionString + ';}';

        eval(funcString);
        return hypothesis;
    }

    function getRandomExpression() {
        return grammar.getRandomExpression();
    }

    function reset() {
        history = {};
    }

    return {
        generate: generate,
        reset: reset
    };
}());
