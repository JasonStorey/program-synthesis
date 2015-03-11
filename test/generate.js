describe('Program Synthesis', function() {

    var programSynthesis = require('../'),
        assert = require('assert');

    this.timeout(5000);

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

        it('throws an error if it cannot satisfy in/out pairs', function() {
            var testData = [{
                    input: 'hello',
                    output: 'bye'
                },
                {
                    input: 'hello',
                    output: 'bye'
                }];

            assert.throws(function(){ programSynthesis.generate(testData)}, /Failed to generate a valid hypothesis/g);
        });

        it('returns a function that increments input', function() {
            var testData = [{
                    input: 1,
                    output: 2
                },
                {
                    input: 4,
                    output: 5
                }];

            var generatedFunction = programSynthesis.generate(testData);

            assert(typeof generatedFunction === 'function');
            assert.deepEqual(generatedFunction(10), 11, 'Function should increment input argument');
        });
    });
});
