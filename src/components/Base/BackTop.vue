<script lang="ts" setup>
// import type { BacktopProps } from '@/types';
import { computed, defineProps, withDefaults } from 'vue';
import { useWindowScroll } from '@vueuse/core';

interface BacktopProps {
  left?: number
  top?: number
  right?: number
  bottom?: number
  visibilityHeight?: number  // 多高高度出现该按钮
}

const props = withDefaults(defineProps<BacktopProps>(), {
  visibilityHeight: 200,
  right: 10,
  top: 440
})

const { y : scrollY } = useWindowScroll()

// 位置样式计算
const positionStyle = computed(() => ({
  top: `${props.top}px`,
  right: `${props.right}px`
}));

const isShow = computed(() => scrollY.value > props.visibilityHeight)

const handleScrollTop = () => {
  window.scrollTo({top:0, behavior: 'smooth'})
}

</script>

<template>
  <button v-show="isShow" class="btn btn-soft btn-secondary fixed animate__animated animate__rubberBand" :style="positionStyle" @click="handleScrollTop" >Go Top</button>
</template>