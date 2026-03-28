<script setup>
import router from '@/router';
import { onBeforeUnmount, onMounted } from 'vue';
let openBtn = null
let closeBtn = null

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
})
const closeList = () => {
    const nav = document.querySelectorAll('.nav')
    nav.forEach(nav_el => nav_el.classList.remove('visible'))
}
const openList = () => {
    const nav = document.querySelectorAll('.nav')
    nav.forEach(nav_el => nav_el.classList.add('visible'))
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
    <div class="algorithm-layout">
        <button class="nav-btn open-btn">cilck</button>
        <div class=" nav nav-black">
            <div class="nav nav-red">
                <div class="nav nav-white">
                    <button class="nav-btn close-btn">
                        change
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="side">
                        <div class="link">
                        </div>
                        <el-collapse>
                            <el-collapse-item title="排序" name="1">
                                <div class="link">
                                    <span @click="toUrl('sort', 'buble')">冒泡排序</span>
                                    <span @click="toUrl('sort', 'insert')">插入排序</span>
                                    <span @click="toUrl('sort', 'select')">选择排序</span>
                                    <span @click="toUrl('sort', 'shell')">希尔排序</span>
                                    <span @click="toUrl('sort', 'quick')">快速排序</span>
                                    <span @click="toUrl('sort', 'heap')">堆排序</span>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="查找" name="2">
                                <div class="link">
                                    <span @click="toUrl('search', 'binary')">
                                        折半查找
                                    </span>
                                    <span @click="toUrl('search', 'sequence')">
                                        顺序查找
                                    </span>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="二叉树" name="3">
                                <div class="link">
                                    <span @click="toUrl('binary', 'create')">
                                        二叉搜索树
                                    </span>
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
    z-index: 1300;
}

.nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    overflow: auto;
    z-index: 1200;
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
    margin-top: 7px;
    background: linear-gradient(to right, #737373, #141414) no-repeat left bottom;
    background-size: 0cqh 1px;
    transition: babackground-size 1s ease-in;
}

.nav .link span:hover {
    background-size: 100% 2px;
}

.nav.visible {
    transform: translateX(0);
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
    z-index: 1;
    padding: 16px 24px;
}


:deep(.el-collapse-item__header) {

    font-size: 16px !important;

}
</style>
<style></style>
