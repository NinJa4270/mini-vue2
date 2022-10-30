import { createElement } from "../vdom/create-element"

export function initRender(vm: any) {
    vm._vnode = null
    vm.$createElement = (a: any, b: any, c: any) => createElement(vm, a, b, c)
}

export function renderMixin(Vue: any) {
    Vue.prototype._render = function () {
        const vm = this
        const { render } = vm.$options
        console.log('%crender.ts line:14 vm.$createElement', 'color: #007acc;', vm);

        const vnode = render.call(vm._renderProxy, vm.$createElement)
        return vnode
    }
}