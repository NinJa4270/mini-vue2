import { initLifecycle } from "./lifecycle"
import { initRender } from "./render"
import { initState } from "./state"


export function initMixin(Vue: any) {
    Vue.prototype._init = function (options: any) {
        const vm = this
        vm._isVue = true
        if (options && options._isComponent) {
            // VueComponent 函数
            initInternalComponent(vm, options)
        } else {
            vm.$options = Object.assign(options, vm.constructor.options)
        }

        vm._renderProxy = vm
        initLifecycle(vm)
        initRender(vm)
        initState(vm)
    }
}
export function initInternalComponent(vm: any, options: any) {
    const opts = vm.$options = Object.create(vm.constructor.options)
    const parentVnode = options._parentVnode
    opts.parent = options.parent
    opts._parentVnode = parentVnode
    const vnodeComponentOptions = parentVnode.componentOptions
    opts._renderChildren = vnodeComponentOptions.children
    opts._componentTag = vnodeComponentOptions.tag
}


