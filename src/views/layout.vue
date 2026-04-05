<script setup>
import Asdie from '@/components/Asdie.vue';
import Header from '@/components/Header.vue'
// import { usePageHeader } from '@/stores/pageHeader';
import { usePageHeader } from '@/stores';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const pageHeaderStore = usePageHeader()
const title = computed(() => {
    return pageHeaderStore.pageHeader
})
const backEvent = () => {
    router.go(-1)
}
const el_container = ref(null)
</script>

<template>
    <div class="h-screen w-[97vw] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
        <el-container class="h-full">
            <el-header class="!h-auto border-b border-slate-200 bg-white/80 p-0 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
                <Header :el_con="el_container" />
            </el-header>
            <el-container ref="el_container" class="el_container h-full min-h-0">
                <el-aside class="side !w-auto overflow-x-hidden border-r border-slate-200 bg-sky-700 dark:border-slate-700 dark:bg-slate-900">
                    <Asdie />
                </el-aside>
                <el-main class="!overflow-visible bg-slate-50 p-4 dark:bg-slate-950">
                    <div class="rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                        <el-page-header @back="backEvent">
                            <template #content>
                                <span class="text-lg text-sky-600 dark:text-sky-300"> {{ title }} </span>
                            </template>
                        </el-page-header>
                    </div>
                    <el-divider border-style="double" class="!my-4 !border-slate-300 dark:!border-slate-700" />
                    <RouterView />
                </el-main>
            </el-container>
            <el-footer class="!h-auto border-t border-slate-200 bg-white px-4 py-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                11343
            </el-footer>
        </el-container>
    </div>
</template>
  
<style scoped>
.el_container {
    transition-delay: 0.3s;
}

.el_container.an {
    animation: el_container 0.5s ease;
}
</style>
<style>
.el-page-header__title {
    font-size: 18px;
    font-weight: 500;
}

</style>
