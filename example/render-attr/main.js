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
        return h('div', { class: 'test', style: "color:#FFF" }, 'abc')
    }
}).$mount('#app')

console.log('%cmain.js line:14 vm', 'color: #007acc;', vm);