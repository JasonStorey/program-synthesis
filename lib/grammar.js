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
            weight: 3,
            getSymbol: function getExpressionWithBinaryOperator() {
                return getRandomExpression() + ' ' +
                       utils.getRandomFromArray(TOKENS.binaryOperators) + ' ' +
                       getRandomExpression();
            }
        },
        {
            weight: 20,
            getSymbol: function getArgumentsIdentifier() {
                return utils.getRandomFromArray(TOKENS.arrayIdentifiers) + '[' +
                       utils.getRandomFromArray(TOKENS.numeric) + ']';
            }
        },
        {
            weight: 1,
            getSymbol: function getTernaryExpression() {
                return getRandomExpression() + '?' +
                       getRandomExpression() + ':' +
                       getRandomExpression();
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

function getRandomExpression() {
    return utils.getRandomFromArray(weightedRules).getSymbol();
}

module.exports = {
    getRandomExpression: getRandomExpression
};
