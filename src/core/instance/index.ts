import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./render"

function Vue(this: any, options: any) {
    this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue