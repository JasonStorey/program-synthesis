module.exports = (function() {
    var Tokens = {
        numeric: ['0','1','2','3','4','5','6','7','8','9','10'],
        binaryOperators: ['+','-','*','/'],
        unaryOperators: ['++','--'],
        arrayIdentifiers: ['arguments']
    };

    Tokens.getRandom = function(tokens) {
        return tokens[Math.floor(Math.random() * tokens.length)];
    };

    return Tokens;
}());
