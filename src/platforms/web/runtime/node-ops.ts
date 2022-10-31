import VNode from "src/core/vdom/vnode"

export function createElement(tagName: string, vnode: VNode): Element {
    const elm = document.createElement(tagName)
    return elm
}

export function appendChild(node: Node, child: Node) {
    node.appendChild(child)
}

export function createTextNode(text: string): Text {
    return document.createTextNode(text)
}

export function parentNode(node: Node): Node | null {
    return node.parentNode
}
export function tagName(node: Element): string {
    return node.tagName
}