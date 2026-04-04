<template>
  <el-menu
    default-active="2"
    :collapse="isCollapse"
    :router="true"
    :mode="mode"
    class="h-full border-r-0 bg-sky-700 text-slate-100 dark:bg-slate-900 dark:text-slate-100"
  >
    <el-menu-item index="/layout" class="!text-inherit">
      <el-icon>
        <UserFilled />
      </el-icon>
      <template #title>
        <span>个人信息</span>
      </template>
    </el-menu-item>

    <el-sub-menu index="/layout/test">
      <template #title>
        <el-icon>
          <Document />
        </el-icon>
        <span>考试</span>
      </template>
      <el-menu-item index="/layout/test/arrange">
        <el-icon>
          <List />
        </el-icon>
        <span>考试安排</span>
      </el-menu-item>
      <el-menu-item index="/layout/test/postpone">
        <el-icon>
          <Clock />
        </el-icon>
        <span>缓考申请</span>
      </el-menu-item>
      <el-menu-item index="/layout/test/exemption">
        <el-icon>
          <Tickets />
        </el-icon>
        <span>免考申请</span>
      </el-menu-item>
      <el-menu-item index="/layout/test/evaluate">
        <el-icon>
          <EditPen />
        </el-icon>
        <span>成绩评价</span>
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="4">
      <el-icon>
        <Setting />
      </el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import {
  Clock,
  Document,
  EditPen,
  List,
  Setting,
  Tickets,
  UserFilled,
} from '@element-plus/icons-vue'
import { useCollapse } from '@/stores'

const isCollapse = computed(() => useCollapse.iscollaspe)
const mode = computed(() => useCollapse.rowOrCol)
</script>

<style scoped>
.el-sub-menu__title,
.el-menu-item {
  --el-menu-hover-bg-color: #275880;
}
</style>
