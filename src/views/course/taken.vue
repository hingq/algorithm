<!-- 已修课程 -->
<script setup>
import { ref,} from 'vue';
const tableRef=ref('')
const tableData = [
    {
        teachYear: '2016-05-03',
        teachprop: '初修',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
    {
        teachYear: '2016-05-03',
        teachprop: '正常修读',
        way: '正常修读',
        number: '123',
        name: '456',
        class: '789',
        courseNature: '专业必修课',
        teacher: 'Mr.li',
        site: 'chengdu ',
        credit: '0.4'
    },
]
const data = [{
    prop: 'teachYear',
    label: '学期学年'
},
{
    label: '修读性质',
    prop: 'teachprop'
},
{
    label: '修读方式',
    prop: 'way'
},
{
    label: '课程编号',
    prop: 'number'
},
{
    label: '课程名称',
    prop: 'name',
},
{
    label: '教学班级',
    prop: 'class',
},
{
    label: '课程性质',
    prop: 'courseNature',
},
{
    label: '任课教师',
    prop: 'teacher',
},
{
    label: '上课地点',
    prop: 'site',
},
{
    label: '学分',
    prop: 'credit'
}
]
let propData = ref(data)
const options = data
const selectValue = ref('')
const changeEvent = (v) => {
    propData.value = data.filter(item => {
        if (item.prop != v) {
            return item
        }

    })
    console.log(propData);
}
const reset = () => {
    tableRef.value.doLayout()
    propData.value = data
}
</script>
<template>
    <h2>已修课程</h2>
    待完成：排序，自定义列属性
    <div class="search">
        <el-select v-model="selectValue" style="width: 300px" @change="changeEvent">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.prop" />
        </el-select> <el-button type="primary" class="input" @click="reset">重置</el-button>
    </div>
    <div class="tablecontainer">
        <el-table :data="tableData" :border="true"  stripe :highlight-current-row="true" max-height="500" ref="tableRef">
            <el-table-column :prop=item.prop :label=item.label v-for="(item, index) in propData" :key="index"
                align="center">
                <template #header="{ column }">
                    <span style="color: black; font-weight: 700;font-size: 14px;">{{ column.label }}</span>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<style scoped>
h2 {
    color: #606266;
    font-size: 1.65rem;
    font-weight: 600;
}

.search {
    margin-bottom: 7px;
}

.input {
    background-color: #5797cf;
    margin-left: 10px;
}

.tablecontainer {
    width: 1300px;
    overflow-x: auto;
}
.tablecontainer table th,
.tablecontainer table tr,
.tablecontainer table td {
    transition:  all 0.5s ease;
}
@media screen and (max-width:1100px) {

}
</style>
<style>
.el-table th.el-table__cell {
    background-color: #5797cf;
}
</style>