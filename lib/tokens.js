module.exports = (function() {
    var TOKENS = ['arguments[0]','arguments[1]','arguments[2]','++','--','10','*'];

    function getRandom() {
        return TOKENS[Math.floor(Math.random() * TOKENS.length)];
    }

    return {
        getRandom: getRandom
    };
}());
