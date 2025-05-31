<script lang="ts" setup>
import {  defineProps, withDefaults, ref } from 'vue';

interface AlertProps{
  title?: string
  type?: 'error' | 'info' | 'success' | 'warning'
}

const isVisible = ref<boolean>(false)

const props = withDefaults(defineProps<AlertProps>(), {
  title: '早上好啊',
  type: 'info'
})

const timeId = ref<ReturnType<typeof setTimeout> | null>(null)

const show = () => {
  if (isVisible.value && timeId.value) {
    clearInterval(timeId.value)  
    isVisible.value = false  
  }
  isVisible.value = true
  timeId.value = setTimeout(() => {
    isVisible.value = false
    timeId.value = null
  }, 3000)
}
defineExpose({
  show
})
</script>

<template>
  <!-- <div  role="alert"  class="alert  absolute left-1/2 -translate-x-1/2 animate__animated animate__zoomIn" :class="`alert-${props.type || 'info'}`" > -->
    <div v-if="isVisible" role="alert" :class="`alert-${props.type || 'info'}`" class="alert  absolute left-1/2 -translate-x-1/2 animate__animated  animate__zoomIn animate__faster z-9999" >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ props.title }}</span>
  </div>
</template>