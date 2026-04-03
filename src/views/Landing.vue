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
  <main class="landing-page">
    <section class="hero">
      <h1 class="title">算法演示/学习平台</h1>
      <p class="subtitle">聚焦算法理解与交互实践，帮助你高效掌握核心数据结构与算法思维。</p>
    </section>

    <section class="feature-grid">
      <article v-for="feature in coreFeatures" :key="feature.title" class="feature-card">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
      </article>
    </section>

    <section class="actions">
      <button class="btn btn-primary" @click="goToAlgorithmDemo">进入算法演示</button>
      <button class="btn btn-secondary" @click="goToAbout">查看介绍 / 关于</button>
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

@media (max-width: 768px) {
  .landing-page {
    min-height: auto;
    justify-content: flex-start;
    padding: 1.5rem 0.9rem;
    gap: 1.5rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }
}
</style>
