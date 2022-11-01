import { noop } from "src/shared"
import { Watcher } from "../observer/watcher"
import VNode from "../vdom/vnode"

export let activeInstance: any = null
export function setActiveInstance(vm: any) {
    const prevActiveInstance = activeInstance
    activeInstance = vm
    return () => {
        activeInstance = prevActiveInstance
    }
}


export function mountComponent(vm: any, el?: Element) {
    vm.$el = el
    const updateComponent = () => vm._update(vm._render())
    new Watcher(vm, updateComponent, noop, {}, true)
    return vm
}

export function lifecycleMixin(Vue: any) {
    Vue.prototype._update = function (vnode: VNode) {
        const vm = this
        vm._vnode = vnode
        const restoreActiveInstance = setActiveInstance(vm)
        vm.$el = vm.__patch__(vm.$el, vnode)
        restoreActiveInstance()

        if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
            vm.$parent.$el = vm.$el
        }
    }
}

export function initLifecycle(vm: any) {
    const options = vm.$options
    let parent = options.parent

    if (parent) {
        while (parent.$parent) {
            parent = parent.$parent
        }
        parent.$children.push(vm)
    }

    vm.$parent = parent
    vm.$root = parent ? parent.$root : vm
    vm.$children = []

    vm._watcher = null // 保存组件watcher
}