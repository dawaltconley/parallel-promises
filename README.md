# maxAsync

A very simple function for executing async tasks in parallel, with a maximum number of simultaneous tasks.

## Usage

The function takes an array of async functions as its first argument. It's second argument is the maximum number of these functions that should be executed in parallel.

```javascript
const maxAsync = require('@dawaltconley/max-async');

const tasks = [
    async function () { /* do some async stuff */ },
    async function () { /* do some more async stuff */ },
    // etc...
];

maxAsync(tasks, 4) // execute all tasks, maximum 4 at a time
    .then(results => {
        // do something with the results;
    });
```

The function returns a flat array of all async task results, similar to `Promise.all`. The index of each result matches the index of its function in the input array.
