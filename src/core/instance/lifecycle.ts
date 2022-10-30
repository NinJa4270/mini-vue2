export function mountComponent(vm: any, el?: Element) {
    vm.$el = el
    const render = vm._render()
    return vm
}