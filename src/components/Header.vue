<!-- eslint-disable vue/no-mutating-props -->

<script setup>
import { useCollapse } from '@/stores';
import { useTheme } from '@/stores/theme';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router=useRouter()
const span_collapse = ref('')
const theme=useTheme()
let flag=true
//展开与折叠
const collapse = () => {
    if(flag===true){
        console.log(useCollapse);
        useCollapse.change() //展开与折叠
    }
}
//改变mode
const changeMode = async () => {
    props.el_con.$el.classList.add("an") //添加样式
    setTimeout(() => {
        props.el_con.$el.classList.remove("an")
    }, 1000)
    props.el_con.$el.style.flexDirection = props.el_con.$el.style.flexDirection === `column` ? `row` : `column`
   
    useCollapse.changeRow() //改变菜单模式
    useCollapse.change(false)
    var span=span_collapse.value
    if (useCollapse.rowOrCol === 'horizontal') {
        span.style.cursor=` not-allowed`
        flag=false
    } else {
        span.style.cursor='pointer'
        flag=true

    }
}
const props = defineProps({
    el_con: {
        default: null
    }
})
const toUrl=(url)=>{
    router.push(url)
}
// change the theme
const toggle=()=>{
    theme.setTheme()
}
</script>
<template>
    <div class="header">
        <span @click="collapse" class="icon" ref="span_collapse">
            <el-icon :size="25">
                <i-ep-Operation />
            </el-icon>
        </span>
        <span @click="changeMode" class="icon" >
            <el-icon :size="25">
                <i-ep-Expand />
            </el-icon>
        </span>

        <el-button @click="toUrl('/login')">logo</el-button>
        <el-button @click="toUrl('/login')">登出</el-button>
        <el-button type="primary">时间</el-button>
        <el-button>用户</el-button>
        <el-button>语言切换</el-button>
        <el-button @click="toggle">toggle</el-button>
    </div>
</template>


<style scoped>
.header {
    width: auto;
    height: auto;
    border-bottom: 1px solid skyblue !important;
}

.icon {
    position: relative;
    bottom: -10px;
    width: 38px;
    margin-right: 7px;
    cursor: pointer;
}
</style>