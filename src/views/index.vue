
<script setup>
import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User,
} from '@element-plus/icons-vue'
</script>

<template>
    <div class="maindiv">
        <div>
            <el-descriptions class="margin-top" title="个人信息" :column="3" size="default" border>
                <template #extra>
                    <el-button type="primary">extra</el-button>
                </template>
                <el-descriptions-item>
                    <template #label>
                        <div>
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
                        <div>
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
                        <div class="cell-item">
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
                        <div class="cell-item">
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
                        <div class="cell-item">
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

        <div>
            <div class="workcontainer">
                <el-row justify="space-around" style="" class="resizeRow">
                    <el-col :span="11">
                        <!-- 快捷工作区 -->
                        <span class="workSpace">
                            <el-row :gutter="24">
                                <el-col>
                                    <div class="text_container header">快捷工作区</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-card class="box-card" shadow="hover">
                                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o
                                        }}
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="8">
                                    <el-card class="box-card" shadow="hover">
                                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o
                                        }}
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="8">
                                    <el-card class="box-card" shadow="hover">
                                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o
                                        }}
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8" :xs="8" :sm="8" :md="8" :lg="8">
                                    <el-card class="box-card" shadow="hover">
                                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o
                                        }}
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="8" :xs="8" :sm="8" :md="8" :lg="8">
                                    <el-card class="box-card" shadow="hover">
                                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o
                                        }}
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="8" :xs="8" :sm="8" :md="8" :lg="8">
                                    <el-card class="box-card" shadow="hover">
                                        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o
                                        }}
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </span>
                    </el-col>
                    <el-col :span="11">
                        <!-- 课表区域 -->
                        <div class="table">
                            <el-row :gutter="24">
                                <el-col>
                                    <div class="text_container">classTable</div>
                                </el-col>
                            </el-row>
                            <div class="classtable">
                                <el-scrollbar max-height="275px">
                                    <el-timeline>
                                        <el-timeline-item timestamp="2018/4/12" placement="top">
                                            <div class="content">
                                                <h4>Update Github template</h4>
                                                <p>Tom committed 2018/4/12 20:46</p>
                                            </div>
                                        </el-timeline-item>
                                        <el-timeline-item timestamp="2018/4/12" placement="top">
                                            <h4>Update Github template</h4>
                                            <p>Tom committed 2018/4/12 20:46</p>
                                        </el-timeline-item>
                                        <el-timeline-item timestamp="2018/4/12" placement="top">
                                            <h4>Update Github template</h4>
                                            <p>Tom committed 2018/4/12 20:46</p>
                                        </el-timeline-item>
                                        <el-timeline-item timestamp="2018/4/12" placement="top">
                                            <h4>Update Github template</h4>
                                            <p>Tom committed 2018/4/12 20:46</p>
                                        </el-timeline-item>
                                        <el-timeline-item timestamp="2018/4/12" placement="top">
                                            <h4>Update Github template</h4>
                                            <p>Tom committed 2018/4/12 20:46</p>
                                        </el-timeline-item>
                                    </el-timeline>
                                </el-scrollbar>
                            </div>
                        </div>


                    </el-col>
                </el-row>
            </div>
            <div class="messageview">
                <el-row :gutter="24">
                    <el-col>
                        <div class="text_container header">message <span class="moreMessage">more</span></div>
                    </el-col>
                </el-row>
                <div class="messagebox">
                    <el-scrollbar max-height="385" :always="true">
                        <template v-for="item in 20" :key="item">
                            <div class="message">
                                <span class="title ">this is a title </span>
                                <span class="time">yyyy-mm-hh-dd</span>
                            </div>
                        </template>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<style> .workcontainer {
     /* background-color: #F2F3F5; */
     margin-top: 16px;
     padding: 16px;
 }

 .maindiv {
     display: flex;
     flex-direction: column;
 }

 .workSpace {
     width: 45%;
     transition: width 0.3s ease;
     border-bottom: var(--color-borderColor);
 }

 .workcontainer .header {
     border: 0.5px solid var(--color-borderColor);
     border-bottom: 0;
     background-color: var(--color-card);
 }


 .table {
     /* overflow-y: auto; */
     max-height: 330px;
     transition: width 0.3s ease;
     border: 1px var(--color-borderColor) solid;
     border-bottom: 0;
 }


 .table .classtable {
     height: 275px;
     max-height: 280px;
     border-top: 1px var(--color-borderColor) solid;
     background-color:var(--color-table-background) ;
 }

 .table .classtable::-webkit-scrollbar {
     display: none;
 }

 .table .content {
     padding-top: 7px;
 }

 .text_container {
     background-color: var(--color-card);
     padding-left: 16px;
     flex: 1;
     overflow: hidden;
     white-space: nowrap;
     font-size: 16px;
     text-overflow: ellipsis;
     height: 55px;
     text-align: left;
     line-height: 57px;
     color: #CFD3DC;
 }

 .messageview {
     overflow: hidden;
     height: 386px;
     margin-left: 36px;
     margin-top: 16px;
     width: 45%;
     border: 1px var(--color-borderColor) solid;
     transition: color 0.5s ease, background-color 0.5s ease,width 0.3s ease-in;
 }

 .messageview .header {
     border-bottom: 1px var(--color-borderColor) solid;

 }

 .messageview .moreMessage {
     position: absolute;
     right: 32px;
     cursor: pointer;
 }

 .messageview .moreMessage:hover {
     color: #fff;
 }

 .messageview .messagebox {
     max-height: 500px;
     /* height: 330px; */

 }


 .messageview .message {
    height: 55px;
     overflow-x: hidden;
     /* height: auto; */
     padding: 7px;
     width: inherit;
     border-bottom: var(--color-borderColor) 1px solid;
     background-color:var(--color-table-background) ;
     position: relative;
     /* color:#fff; */
     margin-right: 7px;
 }

 .messageview .message:hover {
     background-color: var(--color-table-background-hover);
     color: #33a4f5;
     cursor: pointer;
 }

 .messageview .message .title {
     font-size: 16px;
     padding-left: 7px;
     line-height: 35px;
 }

 .messageview .message .time {
     right: 16px;
     position: absolute;
     line-height: 35px;
 }

 .el-card {
     border-radius: 0;
     margin: 0;
     border-bottom: 0;
 }

 .resizeRow {
     display: flex;
     flex-direction: row;
     transition: width 0.3s ease;
 }

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

     .messageview {
         width: 700px;
         margin-left: 16px;
     }

 }

 @keyframes el_container {
     0% {
         opacity: 0;
         /* flex-direction: row; */
     }

     50% {
         opacity: 0.3;
     }

     75% {
         opacity: 0.7;
     }

     100% {
         opacity: 1;
         /* flex-direction: column; */
     }
 }</style>