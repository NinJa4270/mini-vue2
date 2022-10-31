import { isPrimitive } from "src/shared";
import VNode, { createTextVNode } from "../vnode";

export function normalizeChildren(children: any): VNode[] | undefined {
    return isPrimitive(children)
        ? [createTextVNode(children)]
        : Array.isArray(children)
            ? normalizeArrayChildren(children)
            : undefined
}

// 处理 children 为数组的情况 h('div',{},['xxx',h('p',{},'mini-vue')])
function normalizeArrayChildren(children: any[]) {
    const res = []
    let i, c
    for (i = 0; i < children.length; i++) {
        c = children[i]
        if (isPrimitive(c)) {
            res.push(createTextVNode(c))
        } else { 
            res.push(c)
        }
    }

    return res
}

