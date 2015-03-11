describe('Program Synthesis', function() {

    var programSynthesis = require('../'),
        assert = require('assert');

    describe('generate method', function() {
        it('returns a function that satisfies the provided test input and expected output arguments', function() {
            var generatedFunction = programSynthesis.generate('hello', 'hello');

            assert(typeof generatedFunction === 'function');
            assert.deepEqual(generatedFunction('bye'), 'bye', 'Function should return input argument');
        });
    });
});
