var GRAMMAR = require('./grammar'),
    utils = require('./utils');

module.exports = (function() {
    function generate() {
        var history = {},
            expressionString = getRandomExpression(),
            funcString;

        while(history[expressionString]) {
            expressionString = getRandomExpression();
            history[expressionString] = true;
        }

        funcString = 'function hypothesis(input) { return ' + expressionString + ';}';

        eval(funcString);
        return hypothesis;
    }

    function getRandomExpression() {
        return utils.getRandomFromArray(GRAMMAR.ExpressionRules).getSymbol();
    }

    return {
        generate: generate
    };
}());
