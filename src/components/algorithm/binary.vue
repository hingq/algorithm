<script setup>
import { onMounted, ref } from 'vue'
import algorithm from './algorithm.vue'
import { init, createValues } from '@/components/algorithm/binary'

const canvas = ref('')
const timeline = ref([])
const numbers = ref([])

const play = () => {
  const canvasElement = canvas.value?.$el?.querySelector('#canvas_container canvas')
  if (!canvasElement) return

  timeline.value = []
  numbers.value = createValues()

  init(canvasElement, {
    values: numbers.value,
    onStep: (step) => {
      timeline.value.push(step)
    },
  })
}

onMounted(() => {
  play()
})
</script>

<template>
  <algorithm ref="canvas">
    <template #header>
      <div class="head-container">
        <div>二叉搜索树构建动画</div>
        <el-button size="small" type="primary" plain @click="play">随机生成并重播</el-button>
      </div>
      <div class="source-data">输入序列：{{ numbers.join('、') }}</div>
    </template>

    <template #body>
      <TransitionGroup name="list" tag="div" class="step-list">
        <el-timeline-item
          v-for="item in timeline"
          :key="item.step"
          :timestamp="`Step ${item.step}`"
          placement="top"
          :hollow="true"
          type="primary"
        >
          <el-card class="card" shadow="hover">
            <h4>{{ item.message }}</h4>
          </el-card>
        </el-timeline-item>
      </TransitionGroup>
    </template>
  </algorithm>
</template>

<style scoped>
.head-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.source-data {
  margin-top: 12px;
  color: #5a6577;
}

.step-list {
  padding-bottom: 16px;
}

.card h4 {
  margin: 0;
  font-weight: 500;
}
</style>
