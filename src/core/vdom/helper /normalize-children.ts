import { isPrimitive } from "src/shared";
import VNode, { createTextVNode } from "../vnode";

export function normalizeChildren(children: any): VNode[] | undefined {
    return isPrimitive(children)
        ? [createTextVNode(children)]
        : undefined
}

