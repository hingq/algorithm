<script setup>

var table = [
    // 1-2
    {
        day: [{
            startTime: "08:00", //开始时间
            endTime: "09:30", //结束时间
            subject: "物理", //学科
            major: "计算机科学与技术", //专业
            class: "1702班" //班级
        },
        {

        },
        {
            day: [],
        }, {
            day: [],
        }, {

        }, {
            day: [],
        }, {
            day: [],
        }, {
            day: []
        }]
    },
    {
        day: [
            {

            },
            {

            }, {
                day: [],
            }, {

            }, {
                day: [],
            }, {
                day: [],
            }, {
                day: []
            }]
    },

    // 3-4
    {
        day: [
            {

            },
            {
                startTime: "08:00", //开始时间
                endTime: "09:30", //结束时间
                subject: "物理", //学科
                major: "计算机科学与技术", //专业
                class: "1702班" //班级,
            },
            {
                startTime: "08:00", //开始时间
                endTime: "09:30", //结束时间
                subject: "物理", //学科
                major: "计算机科学与技术", //专业
                class: "1702班" //班级,
            }, {
                day: [],
            }, {

            }, {
                day: [],
            }, {
                day: [],
            }, {
                day: []
            }]
    },
    {
        day: [{
        },
        {
            day: [],
        },
        {
            day: [],
        }, {
            day: [],
        }, {

        }, {
            day: [],
        }, {
            day: [],
        }, {
            day: []
        }]
    },
    // 5-6
    {
        day: [{
        },
        {
            startTime: "08:00", //开始时间
            endTime: "09:30", //结束时间
            subject: "物理", //学科
            major: "计算机科学与技术", //专业
            class: "1702班" //班级,
        },
        {
            day: [],
        }, {
            startTime: "08:00", //开始时间
            endTime: "09:30", //结束时间
            subject: "物理", //学科
            major: "计算机科学与技术", //专业
            class: "1702班" //班级,
        }, {

        }, {
            day: [],
        }, {
            day: [],
        }, {
            day: []
        }]
    },
    {
        day: [{
        },
        {
            day: [],
        },
        {
            day: [],
        }, {
            day: [],
        }, {

        }, {
            day: [],
        }, {
            day: [],
        }, {
            day: []
        }]
    },
    {
        day: [{
        },
        {
            day: [],
        },
        {
            day: [],
        }, {
            day: [],
        }, {

        }, {
            day: [],
        }, {
            startTime: "08:00", //开始时间
            endTime: "09:30", //结束时间
            subject: "物理", //学科
            major: "计算机科学与技术", //专业
            class: "1702班" //班级,
        }, {
            day: []
        }]
    },
    {
        day: [{
        },
        {
            day: [],
        },
        {
            day: [],
        }, {
            day: [],
        }, {

        }, {
            day: [],
        }, {
            startTime: "08:00", //开始时间
            endTime: "09:30", //结束时间
            subject: "物理", //学科
            major: "计算机科学与技术", //专业
            class: "1702班" //班级,
        }, {
            day: []
        }]
    },
]
var rowspanfunc = (index) => {
    if (index === 6) {
        return 1
    } else {
        return 2

    }
}
</script>

<template>
    <!-- 学生课表 -->
    <h2>学生课表</h2>
    <div class="table-container">
        <table class="timetable-content">
            <colgroup>
                <col style="width:60px;height: 60px;" />
              
            </colgroup>
            <thead>
                <th> </th>
                <th>周一</th>
                <th>周二</th>
                <th>周三</th>
                <th>周四</th>
                <th>周五</th>
                <th>周六</th>
                <th>周七</th>
            </thead>
            <tbody>
                <tr v-for="(item, index) in table" :key="index">
                    <td>
                        第{{index+1}}节
                    </td>

                    <template v-for="i in item.day" :key="i">
                        <td :rowspan="rowspanfunc(index)" v-if="i.startTime">
                            <div class="card">
                                <p>{{ ` ${i.startTime}---${i.endTime} ` }}</p>
                                <p>{{ i.subject }}</p>
                                <p>{{ i.major }}</p>
                                <p>{{ i.class }}</p>
                            </div>
                        </td>
                        <td v-else>
                        </td>
                    </template>

                </tr>
            </tbody>
        </table>

    </div>
</template>

<style scoped>
.table-container {
    width: 100%;
    height: 1024px;
    overflow: hidden;
}

.timetable-content {
    height: 90%;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    /* 设置表格的边框是否被合并为一个单一的边框 */
    text-align: center;
    /* color: #333333; */
    /* transition: color 0.2s !important; */
    font-weight: 400;
    font-size: 16px;    
}

.timetable-content thead {
    height: 10px;
    width: inherit;
}

.timetable-content thead th {
    border: 1px solid var(--color-class-border);
    width: calc((100%)/7);
    background-color: var(--color-classTable);
}

tbody {
    height: 90%;
}

tbody tr {
    height: calc(100%/7);
}

tbody tr td {
    padding: 0;
    border: 1px solid var(--color-class-border);
    width: auto;
    height: 30px;
}

tbody .card {
    background-color: var(--color-class-background);
    /* background-color: #2b4259; */
    width: inherit;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>