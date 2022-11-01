import { isObject } from "src/shared";
import { activeInstance } from "../instance/lifecycle";
import VNode from "./vnode";


const componentVNodeHooks: any = {
    init(vnode: VNode) {
        const child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance)
        console.log('%ccreate-component.ts line:9 vnode.componentInstance.$el', 'color: #007acc;', vnode.componentInstance.$el);
        child.$mount(undefined)
    }
}
const hooksToMerge = Object.keys(componentVNodeHooks)

function installComponentHooks(data: any) {
    const hooks = data.hook || (data.hook = {})
    for (let i = 0; i < hooksToMerge.length; i++) {
        const key = hooksToMerge[i]
        const toMerge = componentVNodeHooks[key]
        hooks[key] = toMerge
    }
}

export function createComponentInstanceForVnode(vnode: any, parent: any) {
    const options = {
        _isComponent: true,
        _parentVnode: vnode,
        parent
    }
    return new vnode.componentOptions.Ctor(options)
}


export function createComponent(Ctor: any, data: any, context: any, children: VNode[], tag?: string) {
    const baseCtor = context.$options._base
    if (isObject(Ctor)) {
        Ctor = baseCtor.extend(Ctor)
    }

    data = data || {}
    installComponentHooks(data)
    const name = Ctor.options.name || tag
    const vnode = new VNode(`vue-component-${name ? `-${name}` : ''}`, data, undefined, undefined, undefined, context, { Ctor, tag, children })
    return vnode
}