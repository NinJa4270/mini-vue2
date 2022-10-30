import { Observer } from "."

const arrayProto: any = Array.prototype
const methodsToPatch = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse"
]

export const arrayMethods = Object.create(arrayProto)

methodsToPatch.forEach((method) => {
    const original = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
        value: function mutator(this: any, ...args: unknown[]) {
            console.log(`执行了${method}`);
            const result = original.apply(this, args)
            const ob = this.__ob__ as Observer
            let inserted
            switch (method) {
                case 'push':
                case 'unshift':
                    inserted = args
                    break
                case 'splice':
                    inserted = args.slice(2)
                    break
            }
            if (inserted) ob.observeArray(inserted) // 新值继续监听
            ob.dep.notify() // 通知更新
            console.log(`执行了notify`);
            return result
        }
    })
})