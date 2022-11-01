import Vue from '../../dist/mini-vue2.esm.js'

const vm = new Vue({
    data() {
        return {
            foo: 1,
            bar: {
                baz: 'mini-vue2'
            }
        }
    },
    render(h) {
        return h('div', { class: 'test', style: "color:#FFF" }, this.foo)
    }
}).$mount('#app')

window.vm = vm
