<!-- eslint-disable vue/no-mutating-props -->

<script setup>
import { useCollaspeStore, useTheme } from '@/stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const span_collapse = ref('')
const theme=useTheme()
const collapseStore = useCollaspeStore()
let flag=true
//展开与折叠
const collapse = () => {
    if(flag===true){
        console.log(collapseStore);
        collapseStore.change() //展开与折叠
    }
}
const changeMode = async () => {
    props.el_con.$el.classList.add('an')
    setTimeout(() => {
        props.el_con.$el.classList.remove('an')
    }, 1000)
    props.el_con.$el.style.flexDirection = props.el_con.$el.style.flexDirection === `column` ? `row` : `column`
   
    collapseStore.changeRow() //改变菜单模式
    collapseStore.change(false)
    var span=span_collapse.value
    if (collapseStore.rowOrCol === 'horizontal') {
        span.style.cursor=` not-allowed`
        flag=false
    } else {
        span.style.cursor = 'pointer'
        flag = true

    }
}
const props = defineProps({
    el_con: {
        default: null
    }
})
const toUrl = (url) => {
    router.push(url)
}
const toggle = () => {
    theme.setTheme()
}
</script>
<template>
    <div class="flex flex-wrap items-center gap-2 border-b border-sky-200 bg-white px-3 py-2 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
        <span @click="collapse" class="relative bottom-[-2px] mr-1 inline-flex w-9 cursor-pointer items-center justify-center rounded-md p-1 transition hover:bg-slate-100 dark:hover:bg-slate-800" ref="span_collapse">
            <el-icon :size="25">
                <i-ep-Operation />
            </el-icon>
        </span>
        <span @click="changeMode" class="relative bottom-[-2px] mr-2 inline-flex w-9 cursor-pointer items-center justify-center rounded-md p-1 transition hover:bg-slate-100 dark:hover:bg-slate-800">
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
