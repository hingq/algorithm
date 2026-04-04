<script setup>
// import { init } from '@/util/canvs';
import { onBeforeUnmount, onMounted } from 'vue';
import { useObserve } from '@/util/useObserve'


let cleanupObserve = () => {}

const init_func = () => {
    // const canvas_ = document.querySelector('#canvas_container canvas')
    // init(canvas_)
}
const scrollToEnd = function (node) {
    const maxHeight=400
    const height = window.getComputedStyle(node.firstElementChild).getPropertyValue ('height');
    // getPropertyValue 返回 带单位的数字的字符串，使用prasetInt() 转数字 
    if (parseInt(height) >= parseInt(maxHeight)) {
        // 基于当前位置进行滚动
        const h=node.scrollHeight
        node.scrollTo({
            top: h,
            behavior: "smooth",
        });
    //    setTimeout(()=>{requestAnimationFrame(()=>{ node.scrollTop=node.scrollHeight})},500)
    }
}
onMounted(() => {
    init_func()
    const des = document.querySelector('#describle .des-body')
    // 该观察器用于在描述面板内容变更时自动滚动到底部
    cleanupObserve = useObserve(des, () => scrollToEnd(des))
    
})

onBeforeUnmount(() => {
    cleanupObserve()
})
</script>

<template>

    <div class="container">
        <div class="head">
            <slot name="header"></slot>
        </div>
        <div id="canvas_container">
            <canvas></canvas>
            <div class="describle" id="describle">
                <div class="des-head">
                    <slot name="des-head">
                        步骤解析
                    </slot>
                </div>
                <div class="des-body">
                    <slot name="body">
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.container {
    --primary-color: #e5e5e5;
    min-width: 1200px;
    margin-top: 50px;
    letter-spacing: 1px;
}

button {
    letter-spacing: 0.7px;
}

.container h2 {
    color: #606266;
    font-size: 1.65rem;
    font-weight: 600;
}

.container .head {
    margin-left: 100px;
}

#canvas_container {
    display: grid;
    /* grid-template-columns:repeat(auto-fit,100px); */
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    /** gap of row and col; expect two value  or one */
    gap: 50px;
    min-width: 1200px;

    /* grid-template-areas: 'a a ' 'b  c'; */
    align-items: center;
    justify-content: space-around;
    justify-items: center;
}

.describle {
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 10px;
    color: #E5EAF3;
    background: linear-gradient(135deg, var(--vt-c-blue) 0%, var(--vt-c-black) 100%);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
}



.des-head {
    width: 100%;
    padding: 7px;
    padding-left: 17px;
    background: rgba(0, 0, 0, 0.18);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    font-weight: 600;
}

.des-body {
    padding-right: 7px;
    overflow-y: auto;
    overflow-x: hidden;

    min-width: 500px;
    max-width: 600px;

    min-height: 30px;
    max-height: 400px;
    /* min-height: 300px; */
    margin: 7px 20px 0;
    transition: all 0.5s ease;
    color: #EAF2FF;
    line-height: 1.7;
}

.des-body::-webkit-scrollbar {
    border-radius: 25px;
    height: 5px;
    width: 7px;
    background-color: rgba(255, 255, 255, 0.08);
}

.des-body::-webkit-scrollbar-thumb {
    height: 10px;
    background-color: rgba(120, 170, 210, 0.65);
    border-radius: 5px;
}

.des-body::-webkit-scrollbar-thumb:hover {
    background-color: rgba(140, 190, 232, 0.82);
}


</style>
