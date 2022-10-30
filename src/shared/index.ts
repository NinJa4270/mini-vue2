import { TObject } from "src/core/observer"

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj: TObject | unknown[], key: string): boolean {
    return hasOwnProperty.call(obj, key)
}


export function isObject(obj: any): boolean {
    return obj !== null && typeof obj === 'object'
}