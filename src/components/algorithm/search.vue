<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import algorithm from './algorithm.vue'
import { binary, sequence } from './search'

const dataset = ref([5, 12, 19, 27, 34, 45, 58, 63, 79, 88])
const target = ref(34)
const algor = ref('binary')
const log = ref([])
const running = ref(false)
const result = ref('')

let currentIterator = null
let iteratorMode = null
let iteratorTarget = null

const title = computed(() => (algor.value === 'binary' ? '折半查找' : '顺序查找'))

const getGenerator = () => {
  if (algor.value === 'binary') {
    return binary([...dataset.value], Number(target.value))
  }
  return sequence([...dataset.value], Number(target.value))
}

const reset = () => {
  log.value = []
  result.value = ''
  currentIterator = null
  iteratorMode = null
  iteratorTarget = null
}

const runAll = async () => {
  reset()
  running.value = true
  const iterator = getGenerator()

  try {
    let finished = false
    while (!finished) {
      const { value, done } = await iterator.next()
      if (done) {
        result.value =
          value === -1
            ? `查找结束：目标值 ${target.value} 不在数据集中`
            : `查找结束：目标值 ${target.value} 的下标为 ${value}`
        finished = true
      } else {
        log.value.push(value)
      }
    }
  } catch (error) {
    result.value = error instanceof Error ? `执行失败：${error.message}` : '执行失败'
  } finally {
    running.value = false
  }
}

const runStep = async () => {
  if (running.value) return

  if (!currentIterator || iteratorMode !== algor.value || iteratorTarget !== target.value) {
    reset()
    currentIterator = getGenerator()
    iteratorMode = algor.value
    iteratorTarget = target.value
  }

  const { value, done } = await currentIterator.next()
  if (done) {
    result.value =
      value === -1
        ? `查找结束：目标值 ${target.value} 不在数据集中`
        : `查找结束：目标值 ${target.value} 的下标为 ${value}`
    currentIterator = null
    return
  }

  log.value.push(value)
}

onBeforeUnmount(() => {
  currentIterator = null
})
</script>

<template>
  <algorithm>
    <template #header>
      <h2>{{ title }}</h2>
      <div class="tool-bar">
        <el-select v-model="algor" style="width: 140px" @change="reset">
          <el-option label="折半查找" value="binary" />
          <el-option label="顺序查找" value="sequence" />
        </el-select>
        <el-select v-model="target" style="width: 140px" @change="reset">
          <el-option v-for="item in dataset" :key="item" :label="`目标值 ${item}`" :value="item" />
        </el-select>
        <el-button @click="runStep">单步执行</el-button>
        <el-button type="primary" :loading="running" @click="runAll">完整执行</el-button>
        <el-button @click="reset">清空</el-button>
      </div>
    </template>

    <template #des-head>查找过程</template>

    <template #body>
      <div class="source">数据集：{{ dataset.join(' , ') }}</div>
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in log"
          :key="`${item.type}-${index}`"
          :timestamp="`step ${index + 1}`"
          placement="top"
          type="primary"
          :hollow="true"
        >
          <el-card class="card" shadow="hover">
            <h4>{{ item.type === 'binary' ? `区间 [${item.left}, ${item.right}]` : `检查下标 ${item.index}` }}</h4>
            <p>{{ item.message }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <p v-if="result" class="result">{{ result }}</p>
    </template>
  </algorithm>
</template>

<style scoped>
.tool-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.source {
  margin-bottom: 10px;
  font-size: 14px;
  opacity: 0.9;
}

.card {
  border: 1px solid #e5e5e5;
  text-indent: 1rem;
}

.result {
  margin-top: 12px;
  font-weight: 600;
}
</style>
