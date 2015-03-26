var TOKENS = require('./tokens');

var GRAMMAR = {
    'ExpressionRules': [
        {
            'getSymbol': function() {
                return TOKENS.getRandom(TOKENS.numeric);
            }
        },
        {
            'getSymbol': function() {
                return TOKENS.getRandom(GRAMMAR.ExpressionRules).getSymbol() + ' ' +
                       TOKENS.getRandom(TOKENS.binaryOperators) + ' ' +
                       TOKENS.getRandom(GRAMMAR.ExpressionRules).getSymbol();
            }
        },
        {
            'getSymbol': function() {
                return TOKENS.getRandom(TOKENS.arrayIdentifiers) + '[' +
                       TOKENS.getRandom(TOKENS.numeric) + ']';
            }
        },
        {
            'getSymbol': function() {
                return TOKENS.getRandom(TOKENS.arrayIdentifiers) + '[' +
                       TOKENS.getRandom(TOKENS.numeric) + ']' +
                       TOKENS.getRandom(TOKENS.unaryOperators);
            }
        }
    ]
};

module.exports = (function() {
    var history = {};

    function generate() {
        var funcString = 'function hypothesis(input) { return ' + getRandomExpression() + ';}';
        eval(funcString);
        return hypothesis;
    }

    function getRandomExpression() {
        return TOKENS.getRandom(GRAMMAR.ExpressionRules).getSymbol();
    }

    return {
        generate: function() {
            history = {};
            return generate();
        }
    }
}());
