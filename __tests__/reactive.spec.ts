import { defineReactive, TObject } from "src/core/observer"

describe('defineReactive', () => {
    test("object", () => {
        const obj: TObject = { foo: 1 }
        defineReactive(obj, 'foo', 1)
        expect(obj.foo).toBe(1)
        obj.foo++
        expect(obj.foo).toBe(2)
    })

    test("object", () => {
        const obj: TObject = { foo: 1, bar: 'text' }
        for (const key in obj) {
            defineReactive(obj, key, obj[key])
        }
        expect(obj.foo).toBe(1)
        obj.foo++
        expect(obj.foo).toBe(2)

        obj.bar = "text + object"
        expect(obj.bar).toBe("text + object")
    })
})
