import { h, render } from "vue"
var reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
// 邮箱验证
// const verifyDirective = (app) => {
//     app.directive('verify', {
//         mounted: function (el, binding) {
//             let parentNode = el.parentNode
//             let rules = binding.value
//             // 判断是否为数组
//             /**
//              * Object.prototype.toString.call(rules)  [symbol.toStringTag]:'abe 可以指定toString的行为
//              * Array.isArray(rules) 推荐
//              * rules instanceof Array 原型链判断
//              */
//             if (Array.isArray(rules) === true) {
//                 rules.forEach(item => {
//                     renderElement(item, parentNode, el)
//                 })
//             } else {
//                 renderElement(rules, parentNode, el)
//             }

//         }
//     })

// }
function renderElement(rules, node, el) {
    // object.entries 返回一个key,value的数组

    if(rules['min']&&rules['max']) {
        el.addEventListener('change',(e)=>{
            console.log(e.target.value.length);
            if(e.target.value.length<=rules['min']){
                el.parentNode.children[2].style.display = 'block'
               el.parentNode.children[2].innerHTML='length not match'
            } else if(e.target.value.length>rules['max']) {
                el.parentNode.children[2].style.display = 'block'
                el.parentNode.children[2].innerHTML='length out of range '
            }
             else {
                el.parentNode.children[2].style.display = 'none'

            }
        })
    }
    for (var key in rules) {
        switch (key) {
            case 'required':
                // eslint-disable-next-line no-case-declarations
                const vVerify = h('div', {
                    style: {
                        position: 'absolute',
                        fontSize: '12px',
                        left: '0',
                        top: '40px',
                        color: '#F56C6C',
                        display: 'none'
                    }
                }, rules['message'])
                render(vVerify, node)
                break
            case 'trigger':
                el.addEventListener(rules['trigger'], () => {

                    if (el.value.toString().length === 0) {
                        el.parentNode.lastElementChild.style.display = 'block'
                    } else {
                        if (reg.test(el.value) === true) {
                            // 校验规则
                            el.parentNode.lastElementChild.style.display = 'none'
                        } else {
                            console.log('reg');
                            el.parentNode.lastElementChild.style.display = 'block'
                            el.parentNode.lastElementChild.innerHTML='not allow'
                        }
                    }
                    /**
                     * 强制重绘
                     * 修改元素样式
                     *  requestAnimationFrame
                     *  settimeout
                    * */
                })
                break
            case 'type':

        }
    }
}
// export default verifyDirective

export default {
    mounted: function (el, binding) {
        let parentNode = el.parentNode
        let rules = binding.value
        // 判断是否为数组
        /**
         * Object.prototype.toString.call(rules)  [symbol.toStringTag]:'abe 可以指定toString的行为
         * Array.isArray(rules) 推荐
         * rules instanceof Array 原型链判断
         */
        if (Array.isArray(rules) === true) {
            rules.forEach(item => {
                renderElement(item, parentNode, el)
            })
        } else {
            renderElement(rules, parentNode, el)
        }

    }
}