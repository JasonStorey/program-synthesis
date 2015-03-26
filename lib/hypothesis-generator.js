var GRAMMAR = require('./grammar'),
    utils = require('./utils');

module.exports = (function() {
    var history = {};

    function generate() {
        var funcString = 'function hypothesis(input) { return ' + getRandomExpression() + ';}';
        eval(funcString);
        return hypothesis;
    }

    function getRandomExpression() {
        return utils.getRandomFromArray(GRAMMAR.ExpressionRules).getSymbol();
    }

    return {
        generate: function() {
            history = {};
            return generate();
        }
    }
}());
