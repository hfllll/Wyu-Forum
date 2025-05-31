<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import type { PaginationData } from '@/types';

const emit = defineEmits(['paginationClick'])

interface paginationProps {
    paginationData: PaginationData
}

const props = defineProps<paginationProps>()

const handleClick = (index: number) => {
    emit('paginationClick', index)
}
</script>

<template>
    <div class="join flex justify-center mt-8">
         <button class="join-item btn" @click="handleClick(-1)">«</button>
        <button v-for="(index) in (props.paginationData.pages)"  class="join-item btn" :class="{'btn-active':index === props.paginationData.current}" :key="index" @click="handleClick(index)">{{ index }}</button>
        <button class="join-item btn" @click="handleClick(9999)">»</button>
    </div>
</template>