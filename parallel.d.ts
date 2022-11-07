type AsyncFunction<T> = () => Promise<T>

export default function maxAsync<T>(tasks: AsyncFunction<T>[], n: number): Promise<T[]>
