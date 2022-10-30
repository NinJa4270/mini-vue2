import { watch } from "src/core/instance/state"
import { observe } from "src/core/observer"

describe('observe', () => {

    test("observe object", () => {
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
})
