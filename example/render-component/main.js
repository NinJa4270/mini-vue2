import Vue from '../../dist/mini-vue2.esm.js'

const Children = {
    name: 'children',
    data() {
        return {
            message: 'children component'
        }
    },
    render(h) {
        return h('div', { style: "background:#007acc" }, this.message)
    }
}

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
        return h('div', { class: 'test', style: "color:#FFF" }, [h(Children), this.bar.baz, h('p', {}, 'helow')])
    }
}).$mount('#app')

window.vm = vm

console.log('%cmain.js line:14 vm', 'color: #007acc;', vm);