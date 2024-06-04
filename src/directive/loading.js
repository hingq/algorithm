import { h, render } from "vue"
import loading from '@/components/loading.vue'

export default {
    mounted: function (el) {
        // 元素的大小及其相对于视口的位置。
        const { height } = el.getBoundingClientRect()
        el.style.setProperty('--radius', `${height / 2}px`)
        const renderElement = h(loading)
        render(renderElement, el)
      
    },
    updated: function (el, binding) {
        console.log(binding.value);
        if (typeof binding.value === 'function') {
            const callback = binding.value
            callback()
        }
        // console.log(binding.instance.$refs);
        // console.log(binding.instance.$refs['password'].value);
        //获取ref
        else {
            if (binding.value == true) {
                el.querySelector('span').style.display = 'none'
                el.lastElementChild.style.display = 'block'

            } else {
                el.blur();
                // button 失去焦点
                el.querySelector('span').style.display = 'block'
                el.lastElementChild.style.display = 'none'
            }

        }

    },
    unmounted(el) {
        el.lastElementChild.remove()
    }
}