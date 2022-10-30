import { e } from "vitest/dist/index-40e0cb97";
import { noop } from "../../shared";
import { Dep } from "../observer/dep";
import { Watcher } from "../observer/watcher";
const computedWatcherOptions = { lazy: true }
const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}
export function watch(this: any, expOrFn: string, cb: any) {
    const vm = this
    new Watcher(vm, expOrFn, cb)
}


export function defineComputed(target: any, key: string, userDef: any) {


    const getter = userDef
    const watcher = new Watcher(
        target,
        getter,
        noop,
        computedWatcherOptions
    )
    if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = createComputedGetter(key, watcher)
        sharedPropertyDefinition.set = noop
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter(key: string, watcher: Watcher) {
    return function computedGetter() {
        if (watcher) {
            if (watcher.dirty) {
                watcher.evaluate()
            }
            watcher.depend()
            return watcher.value
        }
    }
}
