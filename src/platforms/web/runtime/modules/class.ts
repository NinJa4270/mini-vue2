import VNode from "src/core/vdom/vnode";

function updateClass(vnode: VNode) {
    const el = vnode.elm as Element
    const data = vnode.data
    el.setAttribute('class', data.class)
}
export default {
    create: updateClass,
}
