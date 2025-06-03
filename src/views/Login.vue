<script setup lang="ts">

import type { LoginParams, AlertInstance } from '@/types';
import { goLogin } from '@/api';
import { reactive, ref } from 'vue';
import Alert from '@/components/Base/Alert.vue'
import router from '@/routers';
import { useUserStore } from '@/stores';

const userStore = useUserStore()
const alertRef = ref<AlertInstance | null>(null)
const formData = reactive<LoginParams>({
  phone: '',
  password: ''
});
const logining = ref<boolean>(false)

const login = async () => {
    logining.value = true
    try{
        const res = await goLogin(formData)
        if (res.code === 200) {
            alertRef.value?.show({ title: res.message || '恭喜你 登陆成功！即将前往主页', type: 'success' })
            userStore.setUserInfo(res.data)
            setTimeout(() => {
                router.push('/')
                logining.value = false
            }, 1200)
        }
    }catch(err) {
        logining.value = false
        if (err instanceof Error){
            // alertRef.value?.show({ title: err.message, type: 'error' })
            alertRef.value?.show({ title: err.message, type: 'error' })
        } else {
            alertRef.value?.show({ title: '未知错误', type: 'error' })
        }
    }
};
</script>

<template>
    <div class="hero bg-base-200 min-h-[80vh]">
        <Alert ref="alertRef" />
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">WYU Forum</h1>
                <p class="py-6">
                    最大的WYU论坛！自由的学生社区！无老师无官方！
                </p>
            </div>
            <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div class="card-body">
                    <fieldset class="fieldset">
                        <label class="label">Phone</label>
                        <label class="input validator">
                            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <g fill="none">
                                    <path
                                        d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                                        fill="currentColor" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                                        fill="currentColor" />
                                </g>
                            </svg>
                            <input 
                            v-model="formData.phone" type="text" class="tabular-nums" required placeholder="Phone"
                                pattern="admin" minlength="5" maxlength="5" title="管理员账号">
                        </label>
                        <p class="validator-hint hidden">
                            请输入管理员账号admin
                        </p>
                        <label class="label">Password</label>
                        <label class="input validator">
                            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none"
                                    stroke="currentColor">
                                    <path
                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                                </g>
                            </svg>
                            <input v-model="formData.password" type="password" pattern="1234" required placeholder="Password"
                                minlength="4" title="测试密码1234">
                        </label>
                        <p class="validator-hint hidden">
                            请输入测试密码1234
                        </p>
                        <div class="flex items-center">
                            <fieldset class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
                                <label class="label">
                                    <label class="toggle text-base-content">
                                <input type="checkbox"  />
                                <svg aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    stroke-width="4"
                                    fill="none"
                                    stroke="currentColor"
                                    >
                                    <path d="M20 6 9 17l-5-5"></path>
                                    </g>
                                </svg>
                                <svg
                                    aria-label="disabled"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="4"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                                </label>
                                    记住我
                                </label>
                            </fieldset>
                            <a class="link link-hover">忘记密码</a>
                        
                        </div>
                        <button class="btn btn-neutral mt-4 " :disabled="logining" @click="login"> Login <span v-show="logining" class="loading loading-infinity loading-lg"></span></button>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</template>

