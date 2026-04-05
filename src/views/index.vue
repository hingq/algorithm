<script setup>
import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User,
} from '@element-plus/icons-vue'
import { sectionHeaderClass, shellCardClass, tableSectionClass, mutedTextClass } from '@/styles/twClasses'
</script>

<template>
    <div class="flex flex-col gap-4 text-slate-700 dark:text-slate-100">
        <div :class="shellCardClass" class="p-4">
            <el-descriptions class="margin-top" title="个人信息" :column="3" size="default" border>
                <template #extra>
                    <el-button type="primary">extra</el-button>
                </template>
                <el-descriptions-item>
                    <template #label>
                        <div class="flex items-center gap-1">
                            <el-icon>
                                <user />
                            </el-icon>
                            username
                        </div>
                    </template>
                    kooriookami
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="flex items-center gap-1">
                            <el-icon>
                                <iphone />
                            </el-icon>
                            Telephone
                        </div>
                    </template>
                    18100000000
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="flex items-center gap-1">
                            <el-icon>
                                <location />
                            </el-icon>
                            Place
                        </div>
                    </template>
                    Suzhou
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="flex items-center gap-1">
                            <el-icon>
                                <tickets />
                            </el-icon>
                            Remarks
                        </div>
                    </template>
                    <el-tag size="small">School</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="flex items-center gap-1">
                            <el-icon>
                                <office-building />
                            </el-icon>
                            Address
                        </div>
                    </template>
                    No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
                </el-descriptions-item>
            </el-descriptions>
        </div>

        <div class="mt-1 p-4">
            <el-row justify="space-around" class="resizeRow flex transition-all duration-300">
                <el-col :span="11">
                    <div class="workSpace w-full max-w-none transition-all duration-300">
                        <div :class="tableSectionClass">
                            <div :class="sectionHeaderClass">快捷工作区</div>
                            <div class="grid grid-cols-3 gap-3 p-3">
                                <el-card v-for="card in 6" :key="card" class="!m-0 !rounded-none !border-b-0" shadow="hover">
                                    <div v-for="o in 4" :key="`${card}-${o}`" class="py-1 text-sm text-slate-600 dark:text-slate-300">{{ 'List item ' + o }}</div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="11">
                    <div :class="tableSectionClass" class="table max-h-[330px] transition-all duration-300">
                        <div :class="sectionHeaderClass">classTable</div>
                        <div class="h-[275px] max-h-[280px] border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60">
                            <el-scrollbar max-height="275px">
                                <el-timeline>
                                    <el-timeline-item v-for="idx in 5" :key="idx" timestamp="2018/4/12" placement="top">
                                        <div class="pt-2">
                                            <h4>Update Github template</h4>
                                            <p :class="mutedTextClass">Tom committed 2018/4/12 20:46</p>
                                        </div>
                                    </el-timeline-item>
                                </el-timeline>
                            </el-scrollbar>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div :class="tableSectionClass" class="messageview ml-9 h-[386px] w-[45%] overflow-hidden transition-all duration-300 max-lg:ml-4 max-lg:w-[700px]">
            <div :class="sectionHeaderClass">message <span class="cursor-pointer text-sm transition hover:text-sky-500">more</span></div>
            <div class="max-h-[500px]">
                <el-scrollbar max-height="385" :always="true">
                    <template v-for="item in 20" :key="item">
                        <div class="relative mr-2 h-[55px] border-b border-slate-200 bg-slate-50 px-2 py-2 transition hover:cursor-pointer hover:bg-slate-100 hover:text-sky-500 dark:border-slate-700 dark:bg-slate-800/60 dark:hover:bg-slate-800">
                            <span class="pl-1 text-base">this is a title </span>
                            <span class="absolute right-4 leading-9 text-sm text-slate-500 dark:text-slate-400">yyyy-mm-hh-dd</span>
                        </div>
                    </template>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (max-width:1085px) {
    .resizeRow {
        flex-direction: column;
        width: 750px;
        align-items: stretch;
    }

    .resizeRow .workSpace {
        width: 700px;
        display: flex;
        flex-direction: column;
    }

    .resizeRow .table {
        width: 700px;
        margin-top: 16px;
        max-height: 430px;
    }
}
</style>
