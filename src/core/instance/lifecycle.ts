import VNode from "../vdom/vnode"

export function mountComponent(vm: any, el?: Element) {
    vm.$el = el
    vm._update(vm._render())
    return vm
}

export function lifecycleMixin(Vue: any) {
    Vue.prototype._update = function (vnode: VNode) {
        const vm = this
        vm._vnode = vnode
        vm.$el = vm.__patch__(vm.$el, vnode)
    }
}