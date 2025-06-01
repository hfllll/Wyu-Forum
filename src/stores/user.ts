import { defineStore } from "pinia";
import type { UserInfo } from "@/types";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user',() => {
  const userInfo = ref< UserInfo | null>(null)

  const isLoggedIn = computed(() => {
    return !!userInfo.value
  })

  const setUserInfo = ( user: UserInfo) => {
    userInfo.value = user
    localStorage.setItem('userInfo', JSON.stringify(user))
  }

  const logout = () => {
    userInfo.value = null
    localStorage.removeItem('userInfo')
  }

  const initUserInfo = () => {
    const storedUser = localStorage.getItem('userInfo')
    if (storedUser) userInfo.value = JSON.parse(storedUser)
  }

  return {
    logout,
    userInfo,
    isLoggedIn,
    setUserInfo,
    initUserInfo
  }
})