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
        console.log('%cmain.js line:13 h', 'color: #007acc;', h);
        // return h('div', {}, 'abc')
    }
}).$mount('#app')

console.log('%cmain.js line:14 vm', 'color: #007acc;', vm);