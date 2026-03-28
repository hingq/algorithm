<script setup>
import { useRoute } from 'vue-router'
import { import_ as getFunc } from '@/components/algorithm/async_import'
import algorithm from './algorithm.vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { init } from '@/util/canvs'

const algor = ref('')
const route = useRoute()

let iterSingle = null
let iterBatch = null

const baseData = [70, 50, 200, 330, 390, 320, 250]
const log = ref([])
const title = ref(undefined)
const errorMessage = ref('')
let resetToken = 0
let unmounted = false

const createIteratorSet = (algorFunc) => {
  iterSingle = algorFunc([...baseData])
  iterBatch = algorFunc([...baseData])
}

const bootstrap = async () => {
  try {
    const { title: t, algor: algorFunc } = await getFunc(route.query)
    title.value = t
    errorMessage.value = ""
    log.value = []
    createIteratorSet(algorFunc)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "算法加载失败"
    iterSingle = null
    iterBatch = null
  }
}

const step = async () => {
  if (!iterBatch) return

  const batch = 20
  for (let i = 0; i < batch; i++) {
    const res = await iterBatch.next()
    if (res.done) {
      break
    }
    if (res.value !== undefined) {
      log.value.push(res.value)
    }
  }
}

const singleStep = async () => {
  if (!iterSingle) return
  const res = await iterSingle.next()
  if (!res.done && res.value !== undefined) {
    log.value.push(res.value)
  }
}

const resetFunc = async () => {
  const token = ++resetToken
  await bootstrap()
  if (unmounted || token !== resetToken) return

  const el = algor.value?.$el?.querySelector('#canvas_container canvas')
  if (el) {
    init(el, { data: [...baseData] })
  }
}

watch(
  () => route.query,
  () => {
    resetFunc()
  }
)

onMounted(async () => {
  await resetFunc()
})


onBeforeUnmount(() => {
  unmounted = true
  resetToken++
})
</script>

<template>
  <algorithm ref="algor">
    <template #header>
      <h2>{{ title }}</h2>
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
      <el-button @click="singleStep">async Start</el-button>
      <el-button @click="step">Start</el-button>
      <el-button @click="resetFunc">reset</el-button>
    </template>
    <template #des-head>
      title
    </template>
    <template #body>
      <el-timeline>
        <TransitionGroup name="list">
          <el-timeline-item
            v-for="(item, index) in log"
            :key="index"
            :timestamp="`step${index}`"
            placement="top"
            :hollow="true"
            type="primary"
          >
            <el-card class="card" shadow="hover">
              <h4>{{ `比较:\t第${item[0]}个 与 第${item[1]}个` }}</h4>
              <p>{{ `索引 ${item[0]} 与 索引 ${item[1]} 发生交换/移动` }}</p>
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
  border-left: 2px solid var(--primary-color);
}

:deep(.el-timeline-item__timestamp) {
  color: #E5EAF3;
  font-size: 14px;
}

.error-msg {
  color: #f56c6c;
  margin: 8px 0;
}

:deep(.el-card__body) {
  letter-spacing: 1px;
}
</style>
