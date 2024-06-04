<script setup>
import Asdie from '@/components/Asdie.vue';
import Header from '@/components/Header.vue'
// import { usePageHeader } from '@/stores/pageHeader';
import { pageHeader } from '@/stores';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const title = computed(() => {
    return pageHeader.pageHeader
})
const backEvent = () => {
    router.go(-1)
    // 等价于 router.back()
}
const el_container = ref(null)
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header :el_con="el_container">
                </Header>
            </el-header>
            <el-container ref="el_container" class="el_container">
                <el-aside class="side">
                    <Asdie>
                    </Asdie>
                </el-aside>
                <el-main>
                    <div>
                        <el-page-header @back="backEvent">
                            <template #content>
                                <span class="pageheader"> {{ title }} </span>
                            </template>
                        </el-page-header>
                    </div>
                    <el-divider border-style="double" />
                    <RouterView />
                </el-main>
            </el-container>
            <el-footer>
                11343
            </el-footer>
        </el-container>
    </div>
</template>
  
<style scoped>
.common-layout {
    width: 97vw;
    height: 100vh;
}

.side {
    width: auto;
    overflow-x: hidden;
    background-color: var(--vt-c-blue);
    height:auto;
}

.el_header {
    height: 10vh;
}

.el_container {
    height: auto;
    transition-delay: 0.3s;
}

.el_container.an {
    animation: el_container 0.5s ease;

}

.pageheader {
    color: var(--el-color-primary-light-3);
    font-size: 18px;
}

.el-divider--horizontal {
    margin: 16px 0;
}
.el-main {
    overflow: visible;
}
</style>
<style>
.el-page-header__title {
    font-size: 18px;
    font-weight: 500;
}

</style>