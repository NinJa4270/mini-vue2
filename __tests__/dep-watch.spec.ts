import { watch } from "src/core/instance/state"
import { observe } from "src/core/observer"

describe('observe', () => {

    test("watch object", () => {
        const component = {
            obj: { foo: 1 }
        }
        observe(component.obj)
        let oldVal, newVal
        const cb = vi.fn((nv, ov) => {
            oldVal = ov
            newVal = nv
        })
        watch.call(component, 'obj.foo', cb)
        component.obj.foo++
        expect(cb).toBeCalledTimes(1)
        expect(oldVal).toBe(1)
        expect(newVal).toBe(2)
    })

    test("collect one times ", () => {
        const component = {
            obj: { foo: 1 }
        }
        observe(component.obj)
        let oldVal, newVal
        const cb = vi.fn((nv, ov) => {
            oldVal = ov
            newVal = nv
        })
        watch.call(component, 'obj.foo', cb)
        component.obj.foo++
        expect(cb).toBeCalledTimes(1)
        expect(oldVal).toBe(1)
        expect(newVal).toBe(2)
        component.obj.foo++
        expect(cb).toBeCalledTimes(2)
        expect(oldVal).toBe(2)
        expect(newVal).toBe(3)
    })
})
