import { Watcher } from "./watcher";

export class Dep {
    static target: Watcher | null;
    subs: Watcher[];
    constructor() {
        this.subs = []
    }

    // 当前的 watcher 保存 dep
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    // 当前的 dep 保存 watcher
    addSub(sub: Watcher) {
        this.subs.push(sub)
    }

    // 数据改变 通知 watcher 更新
    notify() {
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

Dep.target = null

export function pushTarget(target: Watcher) {
    Dep.target = target
}

export function popTarget() {
    Dep.target = null
}
