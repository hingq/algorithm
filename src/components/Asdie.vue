<template>
  <el-menu default-active="2" :collapse="isCollapse" background-color="var(--vt-c-blue)" :router="true" :mode=mode>
    <el-menu-item index="/layout">
      <el-icon>
        <UserFilled />
      </el-icon>
      <template #title>
        <span>个人信息</span>
      </template>
    </el-menu-item>

    <el-sub-menu index="/layout/course">
      <template #title>
        <el-icon>
          <Reading />
        </el-icon>
        <span>课程信息</span>
      </template>
      <el-menu-item index="/layout/course/student">
        <el-icon>
          <Calendar />
        </el-icon>
        <span>学生课表</span>
      </el-menu-item>
      <el-menu-item index="/layout/course/taken">
        <el-icon>
          <Checked />
        </el-icon>
        <span>已修课程</span>
      </el-menu-item>
      <el-menu-item index="/layout/course/select">
        <el-icon>
          <Select />
        </el-icon>
        <span>学生选课</span>
      </el-menu-item>
    </el-sub-menu>

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
  Calendar,
  Checked,
  Clock,
  Document,
  EditPen,
  List,
  Reading,
  Select,
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

.el-menu {
  border-right: 0;
}
</style>
