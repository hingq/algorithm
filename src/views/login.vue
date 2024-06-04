
<script setup>
import { Lock, Hide, View } from '@element-plus/icons-vue'
import {  ref } from 'vue';
// 表单校验

const rules =
    { required: true, message: '请输入', trigger: 'blur' }

const submit = () => {
    console.log('callback');
    // ruleFormRef.value.validate((valid) => {
    //     console.log(valid);
    // })
    loadingFlag.value=true
    setTimeout(()=>{
        loadingFlag.value=false
    },2000)
}
const isShow = ref(false)
const password = ref('')
const mouseEvent=(e) => {
    // 使用mousedown 不使用click，mousedown优先级高于blur，使用click会先触发blur事件
            e.preventDefault()
            isShow.value = !isShow.value
            if (isShow.value) {
                // 阻止事件冒泡
                password.value.type = 'text'
            } else {
                password.value.type = 'password'

            }
            return false
}
const loadingFlag=ref(false)
</script>

<template>
    <div class="container-root">
        <el-form novalidate>
            <div class="layout">
                <div class="title">
                    <el-avatar :icon="Lock" class="icon" :size="50"></el-avatar>
                    <h2>Sign in</h2>
                </div>
                <div class="container">
                    <div class="user">
                        <el-form-item prop="username">
                            <input class="input" type="text" autocomplete="email" required v-verify="rules" />
                            <label for="">
                                <span>username</span>
                            </label>
                        </el-form-item>
                    </div>
                    <div class="password" prop="password">
                        <el-form-item>
                            <input class="input" type="password" required v-verify="rules" ref="password" />
                            <label for="">
                                <span>password</span>
                            </label>
                            <el-icon class="passIcon myicon" v-show="isShow === false ? true : false" @mousedown="mouseEvent">
                                <Hide />
                            </el-icon>
                            <el-icon class="passIcon myicon" v-show="isShow === true ? true : false" @mousedown="mouseEvent">
                                <View />
                            </el-icon>
                        </el-form-item>

                    </div>
                    <div class="submit" @click="submit" >
                        <el-button color="#1976d2" v-load="loadingFlag" >submit</el-button>
                    </div>
                </div>
                <div class="copyright">
                    @mywebsite
                </div>
            </div>

        </el-form>

    </div>
</template>

<style scoped>
form {
    width: 100vw;
    height: 90vh;
    padding-top: 50px;
}

form label {
    position: absolute;
    top: 7px;
    left: 0;
    pointer-events: none;
}

form label span {
    font-size: 16px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(5px);
    transition: all 0.3s ease;
}

h2 {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.334;
    letter-spacing: 0em;
}

.container-root {
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
}

.layout {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 90vh;
    align-items: center;
    overflow: hidden;
}

.item {
    width: inherit;
}

.title {
    margin-bottom: 30px;
    margin-top: 50px;
}

.title .icon {
    margin-left: 7px;
    background-color: rgb(220, 0, 78);
    font-size: 1.5rem;
}

.container {
    width: 400px;
    height: 400px;
    overflow: hidden;
    position: relative;
    margin-top: -10px;
    --color: rgb(25, 118, 210)
}

.container .user {
    margin-top: 20px;
    position: absolute;
    left: 0;
    top: 0;
    width: inherit;
    height: 4rem;
}

.container .password {
    position: absolute;
    width: inherit;
    height: auto;
    left: 0;
    margin-top: 110px;
    /* height: 4rem; */
}

.container .password .passIcon {
    position: absolute;
    right: 10px;
    cursor: pointer;
    background-color: inherit;
}

.container .input {
    width: 370px;
    font: inherit;
    border: 0;
    height: 3rem;
    border: none;
    padding-top: 1rem;
    /* border-bottom: 0.1rem solid #CDD0D6; */
    outline: none;
    letter-spacing: 1px;
    padding-bottom: 16px;
    padding-left: 3px;
}

.submit {
    position: absolute;
    top: 180px;
    width: inherit;
}

.submit button {
    width: inherit;
    height: 46px;
}

.container label::after {
    content: " ";
    height: 3rem;
    width: 400px;
    position: absolute;
    top: -7px;
    left: 0;
    border-bottom: 0.2rem solid var(--color);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}



form .input:focus+label span,
form .input:valid+label span {
    transform: translateY(-120%);
    font-size: 1.2rem;
    color: var(--color);
}

form .input:focus+label::after,
form .input:valid+label::after {
    transform: translateX(0);
}

/* 用于Webkit内核 */
input[type="password"]::-webkit-credentials-cramble-button {
    appearance: none;
}

/* Microsoft Edge浏览器 */
input[type="password"]::-ms-reveal {
    display: none;
}

input[type="password"]::-ms-clear {
    display: none;
}


</style>
<style>
.el-form-item__content {
    background-color: #fff;
    border-bottom: 0.1rem solid #CDD0D6;
}
</style>