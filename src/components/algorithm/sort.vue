<script setup>
import { useRoute, } from 'vue-router';
import { import_ as getFunc } from '@/components/algorithm/async_import';
import algorithm from './algorithm.vue';
import { onMounted, ref, watch } from 'vue'
import { init } from '@/util/canvs';
// 事件总线
const algor=ref('')
const route = useRoute()

let iter_single = null;
let iter = null;

let data = [70, 50, 200, 330, 390, 320, 250]
/**
 * 根据变量 @param algor 动态匹配算法 
 */
const log = ref([])
const title = ref(undefined)


const import_ = async () => {
    const { title: t, algor: algorFunc } = await getFunc()
    title.value = t
    iter_single = algorFunc(data)
    iter = algorFunc(data)
}

const step = async () => {
    let temp = [];
    for (let i = 0; i < 7; i++) {
        await iter.next().then(res => {
            if (res.value !== undefined) {
                temp.push(res.value)
            }
        })
    }
    log.value = temp
}
const single_step = () => {
    iter_single.next().then(res => {
        let data = res.value
        console.log(res.value);
        if (data === undefined) {
            return;
        } else {
            log.value.push(res.value)
        }
    });
}
const resetFunc = () => {
    // 重新加载网页 右侧资源会丢失
    window.location.reload();
}
watch(() => route.query,
    // 监听query变化，更新
    () => {
        import_()
        resetFunc()
    })
import_()

onMounted(()=>{
    const el=algor.value.$el.querySelector('#canvas_container canvas')
    init(el)
})
</script>

<template>

    <algorithm ref="algor">
        <template #header>
            <h2>{{ title }}</h2>
            <el-button @click="single_step">async Start</el-button>
            <el-button @click="step">Start</el-button>
            <el-button @click="resetFunc">reset</el-button>
        </template>
        <template #des-head>
            title
        </template>
        <template #body >
            <el-timeline>
                <TransitionGroup name="list">
                    <el-timeline-item :timestamp="`step${index}`" placement="top" :hollow="true" type="primary"
                        v-for="(item, index) in log" :key="index">
                        <el-card class="card" shadow="hover">
                            <h4>{{ `比较:\t第${item[0]}个 与 第${item[1]}个` }}</h4>
                            <p>{{ `${data[item[0]]} > ${data[item[1]]}，交换值` }}</p>
                        </el-card>
                    </el-timeline-item>
                </TransitionGroup>
            </el-timeline>
        </template>

    </algorithm>

</template>

<style scoped>
.container .card {
    white-space: pre-line;
    border: 1px solid var(--primary-color);
    line-height: 1.5rem;
    background: transparent;
    color: #E5EAF3;
    text-indent: 2rem;
}

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active {
    transition: all 0.5s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.list-enter-to {
    opacity: 1;
    transform: translateY(0px);
}


:deep(.el-timeline-item__tail) {
    /* 时间线颜色 */
    border-left: 2px solid var(--primary-color);
}

:deep(.el-timeline-item__timestamp) {
    color: #E5EAF3;
    font-size: 14px;
}

:deep(.el-card__body) {
    letter-spacing: 1px;

}
</style>