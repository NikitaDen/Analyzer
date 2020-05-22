export type ActionCreator<T> = {
    type: T,
    [key: string]: any
}