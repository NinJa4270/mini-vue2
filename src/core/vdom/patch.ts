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


    function createElm(vnode: VNode, parentElm: any) {
        console.log('%cpatch.ts line:9 vnode', 'color: #007acc;', vnode);
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
            //  h('div',{},[...])sdf
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

    return function patch(oldVnode: any, vnode: VNode) {
        // 首次渲染
        if (isUndef(oldVnode)) {
            // 创建空元素
        } else {
            const isRealElement = isDef(oldVnode.nodeType)
            if (isRealElement) {
                oldVnode = emptyNodeAt(oldVnode)
            }
            const oldElm = oldVnode.elm
            const parentElm = nodeOps.parentNode(oldElm)
            createElm(vnode, parentElm)
        }
    }
}