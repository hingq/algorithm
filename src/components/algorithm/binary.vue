<script setup>
import { onMounted,ref } from 'vue';
import algorithm from './algorithm.vue';
import { init } from '@/components/algorithm/binary';
const canvas=ref('')

onMounted (()=>{

    init(canvas.value.$el.querySelector('#canvas_container canvas'))
    

})
</script>

<template>
    <algorithm ref="canvas">
        <template #header>
            二叉搜索树构建动画
        </template>
        <template #body>
            <TransitionGroup name="list">
                    <el-timeline-item :timestamp="`step${1}`" placement="top" :hollow="true" type="primary"
                        >
                        <!-- <el-card class="card" shadow="hover">
                            <h4>{{ `比较:\t第${item[0]}个 与 第${item[1]}个` }}</h4>
                            <p>{{ `${data[item[0]]} > ${data[item[1]]}，交换值` }}</p>
                        </el-card> -->
                    </el-timeline-item>
                </TransitionGroup>
        </template>
    </algorithm>
</template>

<style scoped></style>