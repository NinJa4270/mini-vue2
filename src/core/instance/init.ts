import { initState } from "./state"


export function initMixin(Vue: any) {
    Vue.prototype._init = function (options: any) {
        const vm = this
        vm._isVue = true
        vm.$options = options
        initState(vm)
    }
}


