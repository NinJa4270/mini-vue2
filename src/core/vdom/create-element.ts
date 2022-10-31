import { normalizeChildren } from "./helper /normalize-children";
import VNode from "./vnode";

export function createElement(context: any, tag: any, data: any, children: any) {
    return _createElement(context, tag, data, children)
}


function _createElement(context: any, tag: any, data: any, children: any) {

    data = data || {}
    // 创建普通节点
    // 处理chidren
    children = normalizeChildren(children)
    const vnode = new VNode(tag, data, children, undefined, undefined, context)
    return vnode
}