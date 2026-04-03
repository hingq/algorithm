<script setup>
import router from '@/router';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Sort, Search, Share, Top, Download, Operation, DataAnalysis, Histogram, CollectionTag, Pointer, Tickets, Menu, Close } from '@element-plus/icons-vue'
let openBtn = null
let closeBtn = null
let prevBodyOverflow = ''
const isNavOpen = ref(false)

const setBodyScrollLock = (isLocked) => {
    if (isLocked) {
        prevBodyOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return
    }
    document.body.style.overflow = prevBodyOverflow
}

const handleOpen = () => openList()
const handleClose = () => closeList()

onMounted(() => {
    openBtn = document.querySelector('.open-btn')
    closeBtn = document.querySelector('.close-btn')
    openBtn?.addEventListener('click', handleOpen)
    closeBtn?.addEventListener('click', handleClose)
})

onBeforeUnmount(() => {
    openBtn?.removeEventListener('click', handleOpen)
    closeBtn?.removeEventListener('click', handleClose)
    setBodyScrollLock(false)
})
const closeList = () => {
    const nav = document.querySelectorAll('.nav')
    nav.forEach(nav_el => nav_el.classList.remove('visible'))
    isNavOpen.value = false
    setBodyScrollLock(false)
}
const openList = () => {
    const nav = document.querySelectorAll('.nav')
    nav.forEach(nav_el => nav_el.classList.add('visible'))
    isNavOpen.value = true
    setBodyScrollLock(true)
}
const toUrl = (key, url) => {
    router.push({
        path: `/algorithm/${key}`,
        query: { key: key, algor: url }
    })
    closeList()

}
</script>

<template>
    <div class="algorithm-layout" :class="{ 'nav-open': isNavOpen }">
        <button class="nav-btn open-btn" aria-label="打开导航">
            <el-icon><Menu /></el-icon>
        </button>
        <div class=" nav nav-black">
            <div class="nav nav-red">
                <div class="nav nav-white">
                    <button class="nav-btn close-btn" aria-label="关闭导航">
                        <el-icon><Close /></el-icon>
                    </button>
                    <div class="side">
                        <div class="link">
                        </div>
                        <el-collapse>
                            <el-collapse-item name="1">
                                <template #title>
                                    <el-icon><Sort /></el-icon>
                                    <span class="collapse-title">排序</span>
                                </template>
                                <div class="link">
                                    <span @click="toUrl('sort', 'buble')"><el-icon><Top /></el-icon>冒泡排序</span>
                                    <span @click="toUrl('sort', 'insert')"><el-icon><Download /></el-icon>插入排序</span>
                                    <span @click="toUrl('sort', 'select')"><el-icon><Operation /></el-icon>选择排序</span>
                                    <span @click="toUrl('sort', 'shell')"><el-icon><DataAnalysis /></el-icon>希尔排序</span>
                                    <span @click="toUrl('sort', 'quick')"><el-icon><Histogram /></el-icon>快速排序</span>
                                    <span @click="toUrl('sort', 'heap')"><el-icon><CollectionTag /></el-icon>堆排序</span>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item name="2">
                                <template #title>
                                    <el-icon><Search /></el-icon>
                                    <span class="collapse-title">查找</span>
                                </template>
                                <div class="link">
                                    <span @click="toUrl('search', 'binary')"><el-icon><Pointer /></el-icon>折半查找</span>
                                    <span @click="toUrl('search', 'sequence')"><el-icon><Tickets /></el-icon>顺序查找</span>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item name="3">
                                <template #title>
                                    <el-icon><Share /></el-icon>
                                    <span class="collapse-title">二叉树</span>
                                </template>
                                <div class="link">
                                    <span @click="toUrl('binary', 'create')"><el-icon><Share /></el-icon>二叉搜索树</span>
                                </div>
                                <div>

                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </div>
        </div>
        <main class="algorithm-content">
            <router-view></router-view>
        </main>
    </div>

</template>

<style scoped>
.algorithm-layout {
    --algorithm-content-z: 1;
    --algorithm-nav-z: 1200;
    --algorithm-open-btn-z: 1300;
}

.nav-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 20px;
}

.open-btn {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: var(--algorithm-open-btn-z);
    transition: opacity 0.2s ease;
}

.algorithm-layout.nav-open .open-btn {
    opacity: 0;
    pointer-events: none;
}

.nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    overflow: auto;
    z-index: var(--algorithm-nav-z);
    pointer-events: none;
}

.nav .link {
    width: 50%;
    line-height: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    letter-spacing: 1px;
}

.nav .link span {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 7px;
    background: linear-gradient(to right, #737373, #141414) no-repeat left bottom;
    background-size: 0cqh 1px;
    transition: background-size 1s ease-in;
}

.nav .link span:hover {
    background-size: 100% 2px;
}

.nav.visible {
    transform: translateX(0);
    pointer-events: auto;
}

.nav-black {
    background-color: rgb(34, 31, 31);
    width: 25%;
    max-width: 480px;
    min-width: 320px;
    transition-delay: 0.4s;
}

.nav-black.visible {
    transition-delay: 0s;
}

.nav-red {
    background-color: rgb(73 140 186);
    width: 95%;
    transition-delay: 0.2s;
}

.nav-red.visible {
    transition-delay: 0.2s;
}

.nav-white {
    background-color: #ffffff;
    width: 95%;
    padding: 40px;
    position: relative;
    transition-delay: 0s;
}

.nav-white.visible {
    transition-delay: 0.4s;
}

.close-btn {
    opacity: 0.3;
    position: absolute;
    top: 40px;
    right: 30px;
}

.side {
    margin-top: 50px;
}

.algorithm-content {
    position: relative;
    z-index: var(--algorithm-content-z);
    padding: 16px 24px;
}


.collapse-title {
    margin-left: 6px;
}

:deep(.el-collapse-item__header) {
    font-size: 16px !important;
    gap: 4px;
}

</style>
<style></style>
