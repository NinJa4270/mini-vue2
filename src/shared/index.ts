import { TObject } from "src/core/observer"
export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj: TObject | unknown[], key: string): boolean {
    return hasOwnProperty.call(obj, key)
}


export function isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object'
}

const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
export function parsePath(path: string): any {
    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')
    return function (obj: any) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}

export function noop(a?: any, b?: any, c?: any) { }

export function query(el: string | Element): Element {
    if (typeof el === 'string') {
        const selected = document.querySelector(el)
        if (!selected) {
            return document.createElement('div')
        }
        return selected
    } else {
        return el
    }
}
