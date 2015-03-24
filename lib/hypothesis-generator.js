module.exports = (function() {
    var TOKENS = ['arguments[0]','arguments[1]','arguments[2]','++','--','10','*'];

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
            expression += getRandomToken();
            expression += ' ';
        }

        if(history[expression] === true) {
            expression = getRandomExpression();
        } else {
            history[expression] = true;
        }

        return expression;
    }

    function getRandomToken() {
        return TOKENS[Math.floor(Math.random() * TOKENS.length)];
    }

    return {
        generate: function() {
            history = {};
            return generate();
        }
    }
}());