import { initMixin } from "./init"
import { renderMixin } from "./render"

function Vue(this: any, options: any) {
    this._init(options)
}

initMixin(Vue)
renderMixin(Vue)

export default Vue