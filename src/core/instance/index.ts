import { initMixin } from "./init"

function Vue(this: any, options: any) {
    this._init(options)
}

initMixin(Vue)

export default Vue