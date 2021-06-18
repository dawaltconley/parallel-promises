const assert = require('assert').strict;
const maxAsync = require('./parallel.js');

const max = 4;
const tasks = new Array(100);
const expected = [];
let concurrent = 0;

for (let i = 0; i < tasks.length; i++ ) {
    tasks[i] = () => new Promise(resolve => {
        concurrent++;
        if (concurrent > max)
            throw new Error('More than maximum-allowed functions being executed in parallel.');
        let delay = Math.floor(Math.random() * 1000);
        setTimeout(function () {
            concurrent--;
            resolve(i);
        }, delay);
    });
    expected.push(i);
}

maxAsync(tasks, max)
    .then(results => {
        assert.deepEqual(results, expected);
    });
