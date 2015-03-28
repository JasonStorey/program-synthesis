describe('Program Synthesis', function() {
    var programSynthesis = require('../'),
        assert = require('assert');

    this.timeout(30000);

    describe('generate method', function() {
        it('throws an error if it cannot satisfy in/out pairs', function() {
            var testData = [{
                    input: 'hello',
                    output: 'bye'
                },
                {
                    input: 'hello',
                    output: 'bye'
                }];

            assert.throws(function(){ programSynthesis.generate(testData, 10)}, /Failed to generate a valid hypothesis/g);
        });

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

            assert.deepEqual(generatedFunction(10), 11, 'Function should increment input argument');
        });

        it('returns a function that decrements input', function() {
            var testData = [{
                    input: 1,
                    output: 0
                },
                {
                    input: 4,
                    output: 3
                },
                {
                    input: 2,
                    output: 1
                }];

            var generatedFunction = programSynthesis.generate(testData);

            assert.deepEqual(generatedFunction(10), 9, 'Function should decrement input argument');
        });

        it('returns a function that multiplies input by 10', function() {
            var testData = [{
                    input: 10,
                    output: 100
                },
                {
                    input: 9,
                    output: 90
                }];

            var generatedFunction = programSynthesis.generate(testData);

            assert.deepEqual(generatedFunction(1), 10, 'Function should multiply input argument by 10');
        });

        it('returns a function that multiplies input args', function() {
            var testData = [{
                    input: [2,3,5],
                    output: 30
                },
                {
                    input: [4,5,6],
                    output: 120
                }];

            var generatedFunction = programSynthesis.generate(testData);

            assert.deepEqual(generatedFunction(2,2,2), 8, 'Function should multiply input args');
        });

        it('returns a function that performs equality check', function() {
            var testData = [{
                    input: [5,10],
                    output: false
                },
                {
                    input: [100,100],
                    output: true
                },
                {
                    input: ['buddy','please'],
                    output: false
                }];

            var generatedFunction = programSynthesis.generate(testData);

            assert.deepEqual(generatedFunction('egg','egg'), true, 'Function should return true');
        });

        it('returns a function that depends on conditionals', function() {
            var testData = [{
                    input: [true,'Richard','Feynman'],
                    output: 'Richard'
                },
                {
                    input: [false,'Ken','Dodd'],
                    output: 'Dodd'
                }];

            var generatedFunction = programSynthesis.generate(testData);

            assert.deepEqual(generatedFunction(true,'Luther','Vandross'), 'Luther', 'Function should return second name');
        });

        it('returns a function that converts celsius to fahrenheit', function() {
            var testData = [{
                    input: 30,
                    output: 86
                },
                {
                    input: 10,
                    output: 50
                }];

            var generatedFunction = programSynthesis.generate(testData);

            assert.deepEqual(generatedFunction(20), 68, 'Function should convert celsius to fahrenheit');
        });
    });
});
