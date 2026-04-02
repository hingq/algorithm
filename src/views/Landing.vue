<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const coreFeatures = [
  {
    title: '算法可视化',
    description: '通过动态演示快速理解排序、搜索与二分等核心算法。'
  },
  {
    title: '课程/考试管理',
    description: '在统一入口中管理课程安排、考试组织与日常教学流程。'
  },
  {
    title: '快速上手',
    description: '简洁导航与清晰模块划分，帮助你在几分钟内开始使用系统。'
  }
]

const goToSystem = () => {
  router.push('/layout/index')
}

const goToAlgorithmDemo = () => {
  router.push('/algorithm')
}
</script>

<template>
  <main class="landing-page">
    <section class="hero">
      <h1 class="title">Persal 教学与算法平台</h1>
      <p class="subtitle">一个集教学管理与算法学习于一体的轻量化工作空间。</p>
    </section>

    <section class="feature-grid">
      <article v-for="feature in coreFeatures" :key="feature.title" class="feature-card">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
      </article>
    </section>

    <section class="actions">
      <button class="btn btn-primary" @click="goToSystem">进入系统</button>
      <button class="btn btn-secondary" @click="goToAlgorithmDemo">查看算法演示</button>
    </section>
  </main>
</template>

<style scoped>
.landing-page {
  min-height: calc(100vh - 2rem);
  padding: 2rem 1rem;
  background: var(--color-background-soft);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}

.hero {
  text-align: center;
}

.title {
  color: var(--color-heading);
  font-size: clamp(1.75rem, 2.6vw, 2.3rem);
  font-weight: 700;
}

.subtitle {
  margin-top: 0.75rem;
  color: var(--vt-c-text-light-2);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
}

.feature-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(44, 62, 80, 0.08);
  padding: 1.2rem;
}

.feature-card h2 {
  color: var(--color-heading);
  font-size: 1.1rem;
  font-weight: 600;
}

.feature-card p {
  margin-top: 0.5rem;
  color: var(--vt-c-text-light-2);
  font-size: 0.95rem;
}

.actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn {
  border: 0;
  border-radius: 999px;
  padding: 0.65rem 1.3rem;
  cursor: pointer;
  font-size: 0.95rem;
  transition: opacity 0.2s ease;
}

.btn:hover {
  opacity: 0.9;
}

.btn-primary {
  background: var(--vt-c-blue);
  color: var(--vt-c-white);
}

.btn-secondary {
  background: var(--color-background);
  color: var(--color-heading);
  border: 1px solid var(--color-borderColor);
}
</style>
