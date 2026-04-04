<!-- eslint-disable vue/no-mutating-props -->

<script setup>
import { useCollapse } from '@/stores';
import { useTheme } from '@/stores/theme';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const span_collapse = ref('')
const theme = useTheme()
let flag = true
const collapse = () => {
    if (flag === true) {
        useCollapse.change()
    }
}
const changeMode = async () => {
    props.el_con.$el.classList.add('an')
    setTimeout(() => {
        props.el_con.$el.classList.remove('an')
    }, 1000)
    props.el_con.$el.style.flexDirection = props.el_con.$el.style.flexDirection === 'column' ? 'row' : 'column'

    useCollapse.changeRow()
    useCollapse.change(false)
    const span = span_collapse.value
    if (useCollapse.rowOrCol === 'horizontal') {
        span.style.cursor = 'not-allowed'
        flag = false
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
