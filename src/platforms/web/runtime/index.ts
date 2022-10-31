import { mountComponent } from 'src/core/instance/lifecycle'
import { query } from 'src/shared'
import Vue from '../../../core'
import { patch } from './patch'


Vue.prototype.__patch__ = patch

Vue.prototype.$mount = function (el?: string | Element) {
    el = el ? query(el) : undefined
    return mountComponent(this, el)
}
export default Vue