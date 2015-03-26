var TOKENS = require('./tokens'),
    utils = require('./utils');

var GRAMMAR = {
    'ExpressionRules': [
        {
            'getSymbol': function() {
                return utils.getRandomFromArray(TOKENS.numeric);
            }
        },
        {
            'getSymbol': function() {
                return utils.getRandomFromArray(GRAMMAR.ExpressionRules).getSymbol() + ' ' +
                       utils.getRandomFromArray(TOKENS.binaryOperators) + ' ' +
                       utils.getRandomFromArray(GRAMMAR.ExpressionRules).getSymbol();
            }
        },
        {
            'getSymbol': function() {
                return utils.getRandomFromArray(TOKENS.arrayIdentifiers) + '[' +
                       utils.getRandomFromArray(TOKENS.numeric) + ']';
            }
        },
        {
            'getSymbol': function() {
                return utils.getRandomFromArray(TOKENS.arrayIdentifiers) + '[' +
                       utils.getRandomFromArray(TOKENS.numeric) + ']' +
                       utils.getRandomFromArray(TOKENS.unaryOperators);
            }
        }
    ]
};

module.exports = GRAMMAR;
