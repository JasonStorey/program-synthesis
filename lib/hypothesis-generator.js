var tokens = require('./tokens');

module.exports = (function() {
    var history = {};

    function generate() {
        try {
            eval('function hypothesis(input) { return ' + getRandomExpression() + ';}');
            hypothesis();
        } catch (e) {
            return generate();
        }

        return hypothesis;
    }

    function getRandomExpression() {
        var length = Math.ceil(Math.random() * 10),
            expression = '';

        for(var i = 0; i < length; i++) {
            expression += tokens.getRandom();
            expression += ' ';
        }

        if(history[expression] === true) {
            expression = getRandomExpression();
        } else {
            history[expression] = true;
        }

        return expression;
    }

    return {
        generate: function() {
            history = {};
            return generate();
        }
    }
}());
