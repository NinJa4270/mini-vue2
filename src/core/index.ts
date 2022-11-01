import Vue from './instance/index'


// 注册 extend 方法

(Vue as any).options = Object.create(null);
(Vue as any).options._base = Vue;

(Vue as any).extend = function (extendOptions: any) {

    const Super = this

    const Sub = function VueComponent(this: any, options: any) {
        this._init(options)
    }

    // 原型继承
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub

    Sub.options = Object.assign(Super.options, extendOptions)

    return Sub
}

export default Vue