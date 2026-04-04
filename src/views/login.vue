
<script setup>
import { Lock, Hide, View } from '@element-plus/icons-vue'
import { ref } from 'vue';

const rules =
    { required: true, message: '请输入', trigger: 'blur' }

const submit = () => {
    loadingFlag.value = true
    setTimeout(() => {
        loadingFlag.value = false
    }, 2000)
}
const isShow = ref(false)
const password = ref('')
const mouseEvent = (e) => {
    e.preventDefault()
    isShow.value = !isShow.value
    if (isShow.value) {
        password.value.type = 'text'
    } else {
        password.value.type = 'password'
    }
    return false
}
const loadingFlag = ref(false)
</script>

<template>
    <div class="container-root mx-auto block w-full px-6">
        <el-form novalidate class="h-[90vh] w-screen pt-12">
            <div class="layout flex h-[90vh] w-screen flex-col items-center overflow-hidden">
                <div class="title mb-8 mt-12 text-center">
                    <el-avatar :icon="Lock" class="icon ml-2 bg-rose-600 text-2xl" :size="50"></el-avatar>
                    <h2 class="text-2xl font-normal">Sign in</h2>
                </div>
                <div class="container relative mt-[-10px] h-[400px] w-[400px] overflow-hidden">
                    <div class="user absolute left-0 top-0 h-16 w-full mt-5">
                        <el-form-item prop="username">
                            <input class="input w-[370px] border-0 bg-transparent pb-4 pl-1 pt-4 tracking-wide outline-none" type="text" autocomplete="email" required v-verify="rules" />
                            <label>
                                <span>username</span>
                            </label>
                        </el-form-item>
                    </div>
                    <div class="password absolute left-0 mt-[110px] w-full">
                        <el-form-item>
                            <input class="input w-[370px] border-0 bg-transparent pb-4 pl-1 pt-4 tracking-wide outline-none" type="password" required v-verify="rules" ref="password" />
                            <label>
                                <span>password</span>
                            </label>
                            <el-icon class="passIcon myicon absolute right-2.5 cursor-pointer" v-show="isShow === false ? true : false" @mousedown="mouseEvent">
                                <Hide />
                            </el-icon>
                            <el-icon class="passIcon myicon absolute right-2.5 cursor-pointer" v-show="isShow === true ? true : false" @mousedown="mouseEvent">
                                <View />
                            </el-icon>
                        </el-form-item>

                    </div>
                    <div class="submit absolute top-[180px] w-full" @click="submit">
                        <el-button color="#1976d2" v-load="loadingFlag" class="!h-[46px] !w-full">submit</el-button>
                    </div>
                </div>
                <div class="copyright text-slate-500 dark:text-slate-400">
                    @mywebsite
                </div>
            </div>

        </el-form>

    </div>
</template>

<style scoped>
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

.container {
    --color: rgb(25, 118, 210)
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

input[type="password"]::-webkit-credentials-cramble-button {
    appearance: none;
}

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

.dark .el-form-item__content {
    background-color: #0f172a;
    border-bottom-color: #334155;
}
</style>
