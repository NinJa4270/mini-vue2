import VNode from "src/core/vdom/vnode"

function updateStyle(vnode: VNode) {
    const el = vnode.elm as Element
    const data = vnode.data
    el.setAttribute('style', data.style)
}

export default {
    create: updateStyle,
}
