import { noop } from "../../shared";
import { observe } from "../observer";
import { popTarget, pushTarget } from "../observer/dep";
import { Watcher } from "../observer/watcher";
const computedWatcherOptions = { lazy: true }
const sharedPropertyDefinition: PropertyDescriptor & ThisType<any> = {
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

// 初始化状态
export function initState(vm: any) {
    vm._watchers = []
    const opts = vm.$options

    if (opts.data) {
        initData(vm)
    }
}

// 初始化 data 选项
function initData(vm: any) {
    let data = vm.$options.data
    data = vm._data = typeof data === 'function'
        ? getData(data, vm)
        : data || {}

    const keys = Object.keys(data)
    let i = keys.length
    while (i--) {
        const key = keys[i]
        // 将data中的值 通过 实例访问
        proxy(vm, `_data`, key)
    }
    observe(data,)
}

// 如果data选项是函数 执行获取data选型 并禁止收集依赖
export function getData(data: Function, vm: any): any {
    pushTarget()
    try {
        return data.call(vm, vm)
    } catch (e) {
        console.log('%cstate.ts line:71 e', 'color: #007acc;', e);
    } finally {
        popTarget()
    }
}

export function proxy(target: Object, sourceKey: string, key: string) {
    sharedPropertyDefinition.get = function proxyGetter(this: any) {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(this: any, val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}
