describe('Program Synthesis', function() {

    var programSynthesis = require('../'),
        assert = require('assert');

    describe('generate method', function() {
        it('returns a function that satisfies the list of provided test inputs and expected outputs', function() {
            var testData = [{
                    input: 'hello',
                    output: 'hello'
                },
                {
                    input: 'bye',
                    output: 'bye'
                }];

            var generatedFunction = programSynthesis.generate(testData);

            assert(typeof generatedFunction === 'function');
            assert.deepEqual(generatedFunction('bye'), 'bye', 'Function should return input argument');
        });
    });
});
