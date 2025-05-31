<script lang="ts" setup>
import { defineProps, onMounted } from 'vue';
import type { PaginationData } from '@/types';

interface paginationProps {
    paginationData: PaginationData
}

const props = defineProps<paginationProps>()
onMounted(() => {
    console.log(props.paginationData.total % props.paginationData.size);
    
})
</script>

<template>
    <div class="join flex justify-center mt-8">
        <button class="join-item btn">«</button>
        <button class="join-item btn btn-active">1</button>
        <button class="join-item btn ">2</button>
        <button class="join-item btn">3</button>
        <button class="join-item btn">4</button>
        <!-- <button v-for="number in (props.paginationData.total /props.paginationData.size)"  class="join-item btn" :key="number" >{{ number }}</button> -->
        <button class="join-item btn">»</button>
    </div>
</template>