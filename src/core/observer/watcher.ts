import { parsePath } from "src/shared";
import { Dep, popTarget, pushTarget } from "./dep";

export class Watcher {
    cb: any;
    expression: string;
    getter: any;
    vm: any;
    value: any;
    newDeps: Dep[] = []
    constructor(vm: any, expOrFn: string, cb: any) {
        this.vm = vm
        this.cb = cb
        this.expression = expOrFn
        this.getter = parsePath(expOrFn)
        this.value = this.get()
    }

    // 当前的 watcher 保存 dep
    // 当前的 dep 保存 watcher
    addDep(dep: Dep) {
        this.newDeps.push(dep)
        dep.addSub(this)
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
}