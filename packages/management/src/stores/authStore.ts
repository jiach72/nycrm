import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi, apiClient } from '@/api'
import type { LoginPayload } from '@tonghai/shared/types'

interface User {
    id: string
    name: string
    email: string
    role: string       // roleCode
    roleId?: string    // Role 表 ID
    roleName?: string  // 角色名称
    avatarUrl?: string
}

export const useAuthStore = defineStore('auth', () => {
    // 状态
    const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
    const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
    const user = ref<User | null>(null)
    const permissions = ref<string[]>([])
    const loading = ref(false)

    // 计算属性
    const isAuthenticated = computed(() => !!accessToken.value)
    const isAdmin = computed(() => user.value?.role === 'ADMIN')
    const isManager = computed(() => ['ADMIN', 'MANAGER'].includes(user.value?.role || ''))

    // 方法
    async function login(payload: LoginPayload) {
        loading.value = true
        try {
            const data = await authApi.login(payload) as any

            // 检查用户角色 - 客户不能登录管理端
            if (data.user?.role === 'CUSTOMER') {
                throw new Error('客户账号无法登录管理系统，请使用客户门户')
            }

            accessToken.value = data.accessToken
            refreshToken.value = data.refreshToken
            user.value = data.user

            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)

            // 获取用户权限
            await fetchPermissions()

            return data
        } finally {
            loading.value = false
        }
    }

    async function fetchPermissions() {
        if (!accessToken.value || !user.value) return

        try {
            // ADMIN 拥有所有权限
            if (user.value.role === 'ADMIN') {
                permissions.value = ['*']
                return
            }

            // 从后端获取当前用户的权限
            const response = await apiClient.get(`/auth/me/permissions`) as any
            permissions.value = response.data || []
        } catch (error) {
            console.error('获取权限失败:', error)
            permissions.value = []
        }
    }

    async function fetchCurrentUser() {
        if (!accessToken.value) return null

        try {
            const data = await authApi.getCurrentUser() as any
            user.value = {
                ...data,
                role: data.roleCode || data.role?.code || data.role,
            }

            // 获取用户权限
            await fetchPermissions()

            return data
        } catch {
            logout()
            return null
        }
    }

    async function refreshAccessToken() {
        if (!refreshToken.value) {
            throw new Error('No refresh token')
        }

        const data = await authApi.refreshToken(refreshToken.value) as any
        accessToken.value = data.accessToken
        localStorage.setItem('accessToken', data.accessToken)

        return data
    }

    function logout() {
        accessToken.value = null
        refreshToken.value = null
        user.value = null
        permissions.value = []
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    /**
     * 检查是否拥有某权限
     */
    function can(permissionCode: string): boolean {
        if (user.value?.role === 'ADMIN' || permissions.value.includes('*')) {
            return true
        }
        return permissions.value.includes(permissionCode)
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
        permissions,
        loading,
        // 计算属性
        isAuthenticated,
        isAdmin,
        isManager,
        // 方法
        login,
        logout,
        fetchCurrentUser,
        fetchPermissions,
        refreshAccessToken,
        can,
    }
})

