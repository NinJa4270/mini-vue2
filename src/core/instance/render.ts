import { createElement } from "../vdom/create-element"

export function initRender(vm: any) {
    vm._vnode = null
    const options = vm.$options
    vm.$vnode = options._parentVnode
    vm.$createElement = (a: any, b: any, c: any) => createElement(vm, a, b, c)
}

export function renderMixin(Vue: any) {
    Vue.prototype._render = function () {
        const vm = this
        const { render, _parentVnode } = vm.$options
        vm.$vnode = _parentVnode

        const vnode = render.call(vm._renderProxy, vm.$createElement)
        vnode.parent = _parentVnode
        return vnode
    }
}