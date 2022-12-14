import { isDef, isUndef } from "src/shared";
import VNode from "./vnode";


const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

export function createPatchFunction(backend: any) {

    const { modules, nodeOps } = backend

    const cbs: any = {} // 处理属性相关的 hooks

    for (let i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = []
        for (let j = 0; j < modules.length; ++j) {
            if (isDef(modules[j][hooks[i]])) {
                cbs[hooks[i]].push(modules[j][hooks[i]])
            }
        }
    }

    function createElm(vnode: VNode, parentElm?: any) {
        if (createComponent(vnode, parentElm)) {
            return
        }
        const data = vnode.data
        const children = vnode.children
        const tag = vnode.tag
        if (isDef(tag)) {
            vnode.elm = nodeOps.createElement(tag, vnode)
            createChildren(vnode, children)
            if (isDef(data)) {
                // 处理 data 上的属性
                invokeCreateHooks(vnode)
            }
            insert(parentElm, vnode.elm!)
        } else {
            vnode.elm = nodeOps.createTextNode(vnode.text) as Text
            insert(parentElm, vnode.elm)
        }
    }

    function createChildren(vnode: VNode, children?: unknown[]) {
        if (Array.isArray(children)) {
            for (let i = 0; i < children.length; ++i) {
                createElm(children[i], vnode.elm)
            }
        } else {
            // 一定是文字
            nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
        }
    }

    function insert(parent: Node, elm: Node) {
        if (isDef(parent)) {
            nodeOps.appendChild(parent, elm)
        }
    }

    function emptyNodeAt(elm: any) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function invokeCreateHooks(vnode: VNode) {
        for (let i = 0; i < cbs.create.length; ++i) {
            cbs.create[i](vnode)
        }
    }

    function createComponent(vnode: VNode, parentElm: any) {
        let i = vnode.data
        if (i) {
            if (isDef(i = i.hook) && isDef(i = i.init)) {
                i(vnode)
            }
            if (isDef(vnode.componentInstance)) {
                initComponent(vnode)
                insert(parentElm, vnode.elm!)
                return true
            }
        }

        return false
    }

    // 组件初始化
    function initComponent(vnode: VNode) {
        vnode.elm = vnode.componentInstance!.$el
    }

    return function patch(oldVnode: any, vnode: VNode) {
        // 首次渲染
        if (isUndef(oldVnode)) {
            // 创建空元素
            createElm(vnode)
        } else {
            const isRealElement = isDef(oldVnode.nodeType)
            if (isRealElement) {
                oldVnode = emptyNodeAt(oldVnode)
            }
            const oldElm = oldVnode.elm
            const parentElm = nodeOps.parentNode(oldElm)
            createElm(vnode, parentElm)
        }
        return vnode.elm
    }
}