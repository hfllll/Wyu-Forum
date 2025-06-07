<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import { onMounted } from 'vue'
import Swal from 'sweetalert2'
// 
onMounted(() => {
  Swal.fire({
    title: '千万不要这样做！',
    html: '千万不要点击页脚的<strong class="text-red-500">关于我们</strong>，<strong class="text-red-500">联系我们</strong>，<strong class="text-red-500">招聘我们</strong>，<strong class="text-red-500">加入我们</strong>，否则你会后悔的！',
    icon: 'warning',
    confirmButtonText: '确定'
  })
})
</script>

<template>
  <Layout />
</template>
