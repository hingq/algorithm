<template>
  <el-menu default-active="2" :collapse="isCollapse" background-color="var(--vt-c-blue)" :router="true" :mode=mode>
    <!-- <template v-for="i in 3" :key="i">
      <el-menu-item></el-menu-item>
      <el-sub-menu v-for="i in 2" :key=i index="i">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>课程信息</span>
        </template>
<template v-for="j in 2" :key="j">
          <el-menu-item>j{{ j }}</el-menu-item>
        </template>
</el-sub-menu>
</template> -->

    <el-menu-item index="/layout">
      <el-icon>
        <location />
      </el-icon>
      <template #title>
        <span>个人信息</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="/layout/course">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>课程信息</span>
      </template>
      <el-menu-item index="/layout/course/student">学生课表</el-menu-item>
      <el-menu-item index="/layout/course/taken">已修课程</el-menu-item>
      <el-menu-item index="/layout/course/select">学生选课</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/layout/test">

      <template #title>
        <el-icon>
          <document />
        </el-icon>
        <span>考试</span>
      </template>
      <el-menu-item index="/layout/test/arrange">考试安排</el-menu-item>
      <el-menu-item index="/layout/test/postpone">缓考申请</el-menu-item>
      <el-menu-item index="/layout/test/exemption">免考申请</el-menu-item>
      <el-menu-item index="/layout/test/evaluate">evaluate</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { computed, } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
// import { useCollaspeStore } from '@/stores/collaspe';
import { useCollapse } from '@/stores';
const isCollapse = computed(() => useCollapse.iscollaspe)
const mode = computed(() => useCollapse.rowOrCol)

// const handleOpen = (key, keyPath) => {
//   // console.log(key, keyPath)
// }
// const handleClose = (key, keyPath) => {
//   // console.log(key, keyPath)
// }
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