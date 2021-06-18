const maxAsync = require('./parallel.js');

const max = 4;
const tasks = new Array(100);
const results = [];
let concurrent = 0;

for (let i = 0; i < tasks.length; i++ ) {
    tasks[i] = () => new Promise(resolve => {
        concurrent++;
        console.log(concurrent);
        if (concurrent > max)
            throw new Error('More than maximum-allowed functions being executed in parallel.');
        let delay = Math.floor(Math.random() * 1000);
        setTimeout(function () {
            console.log(`resolving ${i}`);
            concurrent--;
            resolve(i);
        }, delay);
    });
    results.push(i);
}

maxAsync(tasks, max)
    .then(results => {
        console.log(results);
        console.log(results.length);
    });
