import { Watcher } from "../observer/watcher";

export function watch(this: any, expOrFn: string, cb: any) {
    const vm = this
    new Watcher(vm, expOrFn, cb)
}