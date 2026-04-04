<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const coreFeatures = [
  {
    title: '排序可视化',
    description: '通过柱状图动画直观观察冒泡、选择等排序过程中的每一步。'
  },
  {
    title: '查找算法',
    description: '对比顺序查找与二分查找，理解时间复杂度差异与适用场景。'
  },
  {
    title: '二叉树演示',
    description: '通过二叉树节点增删与遍历演示，掌握树结构的核心操作。'
  },
  {
    title: '交互动画',
    description: '点击即可触发算法步骤演示，让学习过程更具参与感与反馈性。'
  }
]

const goToAlgorithmDemo = () => {
  router.push('/algorithm')
}

const goToAbout = () => {
  router.push('/about')
}
</script>

<template>
  <main class="flex min-h-[calc(100vh-2rem)] flex-col justify-center gap-8 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 max-md:min-h-auto max-md:justify-start max-md:gap-6 max-md:px-3 max-md:py-6">
    <section class="text-center">
      <h1 class="text-3xl font-bold text-slate-800 dark:text-slate-100">算法演示/学习平台</h1>
      <p class="mt-3 text-slate-500 dark:text-slate-400">聚焦算法理解与交互实践，帮助你高效掌握核心数据结构与算法思维。</p>
    </section>

    <section class="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4 max-md:grid-cols-1">
      <article v-for="feature in coreFeatures" :key="feature.title" class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950">
        <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">{{ feature.title }}</h2>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ feature.description }}</p>
      </article>
    </section>

    <section class="flex flex-wrap justify-center gap-3 max-md:flex-col max-md:items-stretch">
      <button class="cursor-pointer rounded-full bg-sky-700 px-5 py-2 text-sm text-white transition hover:opacity-90 max-md:w-full" @click="goToAlgorithmDemo">进入算法演示</button>
      <button class="cursor-pointer rounded-full border border-slate-300 bg-white px-5 py-2 text-sm text-slate-700 transition hover:opacity-90 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 max-md:w-full" @click="goToAbout">查看介绍 / 关于</button>
    </section>
  </main>
</template>
