<!-- 
  使用说明
  传参：
  title：标题内容
  type： 类型 只有四种 info | success | error | warning
  
  方法：
  show：通过实例调用 打开弹窗
-->


<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { AlertData } from '@/types';


const alertData = reactive<AlertData>({
  title: '你好', // 默认标题
  type: 'info'   // 默认类型
})

const isVisible = ref<boolean>(false)

const timeId = ref<ReturnType<typeof setTimeout> | null>(null)

const show = (data: AlertData = {title:'你好', type: 'info'}) => {
  if ( isVisible.value && timeId.value ) {
    clearTimeout(timeId.value)  
    isVisible.value = false  
  }
  alertData.title = data.title
  alertData.type = data.type
  isVisible.value = true
  timeId.value = setTimeout(() => {
    isVisible.value = false
    timeId.value = null
  }, 1500)
}
defineExpose({
  show
})
</script>

<template>
    <div v-if="isVisible" role="alert" :class="{ alert: true, [`alert-${alertData.type}`]: true }" class="absolute left-1/2 -translate-x-1/2 animate__animated  animate__zoomIn animate__faster z-9999 top-20"  >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path v-if="alertData.type == 'info'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          <path v-else-if="alertData.type == 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path v-else-if="alertData.type == 'warning'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ alertData.title }}</span>
    </div>
</template>