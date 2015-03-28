var TOKENS = require('./tokens'),
    utils = require('./utils');

var weightedRules = [];

var GRAMMAR = {
    'ExpressionRules': [
        {
            weight: 20,
            getSymbol: function getNumeric() {
                return utils.getRandomFromArray(TOKENS.numeric);
            }
        },
        {
            weight: 10,
            getSymbol: function getExpressionWithBinaryOperator(options) {
                return getRandomExpression(options) + ' ' +
                       utils.getRandomFromArray(TOKENS.binaryOperators) + ' ' +
                       getRandomExpression(options);
            }
        },
        {
            weight: 10,
            getSymbol: function getArgumentIdentifier(options) {
                return TOKENS.arrayIdentifiers[0] + '[' + (Math.floor(Math.random() * options.maxArguments)) + ']';
            }
        },
        {
            weight: 1,
            getSymbol: function getTernaryExpression(options) {
                return getRandomExpression(options) + ' ? ' +
                       getRandomExpression(options) + ' : ' +
                       getRandomExpression(options);
            }
        }
    ]
};

GRAMMAR.ExpressionRules.forEach(function(rule) {
    var numOfWeightedRules = weightedRules.length,
        i;

    for(i = numOfWeightedRules; i < numOfWeightedRules + rule.weight; i++) {
        weightedRules.push(rule);
    }
});

function getRandomExpression(options) {
    return utils.getRandomFromArray(weightedRules).getSymbol(options);
}

module.exports = {
    getRandomExpression: getRandomExpression
};
