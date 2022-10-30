import { observe } from "src/core/observer"
import { watch } from "src/core/instance/state"

describe('array', () => {

    test("array", () => {

        const component = {
            obj: {
                x: 1,
                array: ['a', 'b', 'c']
            }
        }
        observe(component.obj)


        let newVal
        const cb = vi.fn((nv) => {
            newVal = nv
        })
        watch.call(component, 'obj.array', cb)
        component.obj.array.push('newVal')
        expect(cb).toBeCalledTimes(1)
        expect(newVal).toStrictEqual(['a', 'b', 'c', 'newVal'])
    })
})
