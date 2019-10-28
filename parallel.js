module.exports = async (tasks, n) => {
    results = []
    executing = []
    while (tasks.length) {
        if (executing.length < n) {
            let task = tasks.shift()
            task = task().then(r => {
                const i = executing.indexOf(task)
                executing.splice(i, 1)
                return r
            })
            executing.push(task)
        } else {
            const next = await Promise.race(executing)
            results.push(next)
        }
    }
    return results
}
