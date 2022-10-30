import { defineComputed } from "src/core/instance/state"
import { observe } from "src/core/observer"

describe('computed', () => {
    test("computed", () => {
        const component: any = {
            obj: {
                x: 1,
            }
        }
        observe(component.obj)
        const cb = vi.fn(() => {
            console.log('执行');
            return component.obj.x + 1000
        })

        defineComputed(component, 'computedFn', cb)
        expect(cb).toBeCalledTimes(0)
        component.computedFn
        expect(cb).toBeCalledTimes(1)
        component.computedFn
        component.computedFn
        component.computedFn
        expect(cb).toBeCalledTimes(1)
        component.obj.x++
        expect(cb).toBeCalledTimes(2)
        component.obj.x++
        expect(cb).toBeCalledTimes(3)
    })
})
