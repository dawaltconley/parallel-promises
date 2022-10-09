type AsyncFunction = (...args: any[]) => Promise<any>

type ResolvedAsync<Fn extends AsyncFunction> = Awaited<ReturnType<Fn>>

type ResolvedAsyncs<Fns extends AsyncFunction[]> = [
  ... {
    [K in keyof Fns]: Awaited<ReturnType<Fns[K]>>
  }
]


type Fn = (...args: any[]) => any;
type RT<A extends ReadonlyArray<Fn>> =
  A extends [infer H, ...infer R]
    ? H extends Fn
      ? R extends Fn[]
        ? [ReturnType<H>, ...RT<R>]
        : []
      : []
    : []

// should connect function args with parallel args somehow...
type P = (tasks: AsyncFunction[], n: number) => Promise<ResolvedAsyncs<typeof tasks>>

const parallel: P = async (tasks, n) => {
    const results = new Array(tasks.length);
    const executing: Promise<void>[] = [];
    let index = 0;
    while (index < tasks.length || executing.length) {
        if (index < tasks.length && executing.length < n) {
            let task = tasks[index];
            let taskIndex = index;
            let ex = task().then(r => {
                const i = executing.indexOf(ex);
                executing.splice(i, 1);
                results[taskIndex] = r;
            });
            executing.push(ex);
            index++;
        } else {
            await Promise.race(executing);
        }
    }
    return results;
};

export default parallel
