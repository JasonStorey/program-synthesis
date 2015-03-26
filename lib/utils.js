module.exports = {
    getRandomFromArray: function(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
};