import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api'
import type { LoginPayload } from '@tonghai/shared/types'

interface User {
    id: string
    name: string
    email: string
    role: string
    avatarUrl?: string
}

export const useAuthStore = defineStore('auth', () => {
    // 状态
    const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
    const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
    const user = ref<User | null>(null)
    const loading = ref(false)

    // 计算属性
    const isAuthenticated = computed(() => !!accessToken.value)
    const isAdmin = computed(() => user.value?.role === 'ADMIN')
    const isManager = computed(() => ['ADMIN', 'MANAGER'].includes(user.value?.role || ''))

    // 方法
    async function login(payload: LoginPayload) {
        loading.value = true
        try {
            const response = await authApi.login(payload)

            accessToken.value = response.accessToken
            refreshToken.value = response.refreshToken
            user.value = response.user

            localStorage.setItem('accessToken', response.accessToken)
            localStorage.setItem('refreshToken', response.refreshToken)

            return response
        } finally {
            loading.value = false
        }
    }

    async function fetchCurrentUser() {
        if (!accessToken.value) return null

        try {
            const userData = await authApi.getCurrentUser()
            user.value = userData
            return userData
        } catch {
            logout()
            return null
        }
    }

    async function refreshAccessToken() {
        if (!refreshToken.value) {
            throw new Error('No refresh token')
        }

        const response = await authApi.refreshToken(refreshToken.value)
        accessToken.value = response.accessToken
        localStorage.setItem('accessToken', response.accessToken)

        return response
    }

    function logout() {
        accessToken.value = null
        refreshToken.value = null
        user.value = null
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    // 初始化获取用户信息
    if (accessToken.value && !user.value) {
        fetchCurrentUser()
    }

    return {
        // 状态
        accessToken,
        refreshToken,
        user,
        loading,
        // 计算属性
        isAuthenticated,
        isAdmin,
        isManager,
        // 方法
        login,
        logout,
        fetchCurrentUser,
        refreshAccessToken,
    }
})
