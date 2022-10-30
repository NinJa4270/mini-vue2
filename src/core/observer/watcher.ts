import { e } from "vitest/dist/index-40e0cb97";
import { parsePath } from "../../shared";
import { Dep, popTarget, pushTarget } from "./dep";

export class Watcher {
    cb: any;
    expression: string;
    getter: any;
    vm: any;
    value: any;

    newDeps: Dep[] = []
    deps: never[];
    depIds: Set<number>;
    newDepIds: Set<number>;
    lazy: boolean;
    dirty: boolean;
    constructor(vm: any, expOrFn: string, cb: any, options?: any) {
        this.vm = vm
        this.cb = cb

        // 配置
        if (options) {
            this.lazy = !!options.lazy
        } else {
            this.lazy = false
        }
        this.dirty = this.lazy

        this.expression = expOrFn
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn

        } else {
            this.getter = parsePath(expOrFn)
        }
        // fix 处理重复收集问题
        this.deps = []
        this.newDeps = []
        this.depIds = new Set()
        this.newDepIds = new Set()
        this.value = this.lazy ? undefined : this.get()
    }

    // 当前的 watcher 保存 dep
    // 当前的 dep 保存 watcher
    addDep(dep: Dep) {
        const id = dep.id
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    get() {
        pushTarget(this)
        const vm = this.vm
        const value = this.getter.call(vm, vm)
        popTarget()
        return value
    }

    // 更新操作
    update() {
        this.run()
    }

    // 同步更新
    run() {
        const value = this.get()
        const oldValue = this.value
        this.value = value
        this.cb.call(this.vm, value, oldValue)
    }

    evaluate() {
        this.value = this.get()
        this.dirty = false
    }

    depend() {
        // let i = this.deps.length
        // while (i--) {
        //     this.deps[i].depend()
        // }
    }
}