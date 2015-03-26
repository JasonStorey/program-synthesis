var TOKENS = require('./tokens'),
    utils = require('./utils');

var GRAMMAR = {
    'ExpressionRules': [
        {
            'getSymbol': function getNumeric() {
                return utils.getRandomFromArray(TOKENS.numeric);
            }
        },
        {
            'getSymbol': function getExpressionWithBinaryOperator() {
                return utils.getRandomFromArray(GRAMMAR.ExpressionRules).getSymbol() + ' ' +
                       utils.getRandomFromArray(TOKENS.binaryOperators) + ' ' +
                       utils.getRandomFromArray(GRAMMAR.ExpressionRules).getSymbol();
            }
        },
        {
            'getSymbol': function getArgumentsIdentifier() {
                return utils.getRandomFromArray(TOKENS.arrayIdentifiers) + '[' +
                       utils.getRandomFromArray(TOKENS.numeric) + ']';
            }
        }
    ]
};

module.exports = GRAMMAR;
