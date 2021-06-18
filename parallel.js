module.exports = async (tasks, n) => {
    const queue = tasks;
    const results = [];
    const executing = [];
    while (queue.length) {
        if (executing.length < n) {
            let task = queue.shift();
            task = task().then(r => {
                const i = executing.indexOf(task);
                executing.splice(i, 1);
                return r;
            });
            executing.push(task);
        } else {
            const next = await Promise.race(executing);
            results.push(next);
        }
    }
    return results;
};
