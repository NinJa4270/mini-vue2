export default class VNode {
    tag: string | undefined
    data: any
    children: unknown[] | undefined
    text: string | undefined
    elm: Node | undefined
    context: any
    componentOptions: any
    componentInstance: any
    constructor(
        tag?: string,
        data?: any,
        children?: unknown[],
        text?: string,
        elm?: Node,
        context?: any,
        componentOptions?: any,

    ) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
        this.context = context
        this.componentOptions = componentOptions
    }
}
export function createTextVNode(val: string | number) {
    return new VNode(undefined, undefined, undefined, String(val))
}
