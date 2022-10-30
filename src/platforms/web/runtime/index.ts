import { mountComponent } from 'src/core/instance/lifecycle'
import { query } from 'src/shared'
import Vue from '../../../core'

Vue.prototype.$mount = function (el?: string | Element) {
    el = el ? query(el) : undefined
    return mountComponent(this, el)
}
export default Vue