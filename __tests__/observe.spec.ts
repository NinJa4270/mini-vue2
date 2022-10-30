import { observe, Observer, TObject } from "src/core/observer"

describe('observe', () => {

    test("observe object", () => {
        const obj: TObject = { foo: 1, bar: 'text' }
        const observeOb = observe(obj)
        const ob = obj.__ob__
        // 第一次 observe 给obj挂载__ob__ Observer实例
        expect(obj.__ob__ instanceof Observer).toBe(true)
        expect(observeOb instanceof Observer).toBe(true)
        // 已被监听的obj 再次监听 直接返回__ob__
        observe(obj)
        expect(obj.__ob__).toBe(ob)
    })

    test("observe value", () => {
        const value = 100
        const observeOb = observe(value)
        expect(observeOb).toBe(undefined)
    })

    test("observe reactive object", () => {
        const obj: TObject = { foo: 1, bar: 'text' }
        const observeOb = observe(obj)
        expect(observeOb instanceof Observer).toBe(true)
        expect(obj.foo).toBe(1)
        obj.foo++
        expect(obj.foo).toBe(2)
        obj.bar = "text + object"
        expect(obj.bar).toBe("text + object")
    })

    test.only("observe reactive nested object", () => {
        const obj: TObject = {
            baz: {
                count: 100
            }
        }
        observe(obj)
        obj.baz.count++
        expect(obj.baz.count).toBe(101)
    })
})
