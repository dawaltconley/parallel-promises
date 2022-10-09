type AsyncFunction = (...args: any) => Promise<any>

export default function maxAsync(tasks: AsyncFunction[], n: number): any[]
