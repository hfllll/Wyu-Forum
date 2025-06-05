import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const loadingCount = ref<number>(0)

  function showLoading() {
    loadingCount.value++
  }

  function hideLoading() {
    if (loadingCount.value > 0) {
      loadingCount.value--
    }
  }

  const isLoading = computed(() => loadingCount.value > 0)

  return {
    showLoading,
    hideLoading,
    isLoading
  }
})