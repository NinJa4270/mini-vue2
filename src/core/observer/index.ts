import { hasOwn, isObject } from "../../shared";
import { arrayMethods } from "./array";
import { Dep } from "./dep";

export interface TObject extends Object {
    [key: string]: any
}

export function defineReactive(obj: TObject, key: string, val?: any) {
    const dep = new Dep() // 一个key 对应一个 dep 做依赖管理
    const property = Object.getOwnPropertyDescriptor(obj, key)
    const getter = property && property.get
    const setter = property && property.set

    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key]
    }
    let childOb = observe(val)
    Object.defineProperty(obj, key, {
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
            childOb = observe(newVal)
            dep.notify() // 通知更新
        }
    })
}

export function observe(value: any): Observer | undefined {
    if (!isObject(value)) {
        return
    }
    let ob: Observer
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}

export class Observer {
    value: any;
    dep: Dep;
    constructor(value: any) {
        this.value = value
        this.dep = new Dep()
        Object.defineProperty(value, '__ob__', {
            value: this,
            writable: true,
            configurable: true
        })
        if (Array.isArray(value)) {
            protoAugment(value, arrayMethods)
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk(value: TObject) {
        const keys = Object.keys(value)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(value, keys[i])
        }
    }

    observeArray(items: unknown[]) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }
}

function protoAugment(target: any, src: object) {
    target.__proto__ = src
}