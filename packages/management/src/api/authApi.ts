import apiClient from './apiClient'
import type { LoginPayload, LoginResponse, RefreshTokenResponse } from '@tonghai/shared/types'

export const authApi = {
    /**
     * 用户登录
     */
    login(payload: LoginPayload): Promise<LoginResponse> {
        return apiClient.post('/auth/login', payload)
    },

    /**
     * 用户注册
     */
    register(payload: { email: string; password: string; name: string }) {
        return apiClient.post('/auth/register', payload)
    },

    /**
     * 刷新 Token
     */
    refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
        return apiClient.post('/auth/refresh', { refreshToken })
    },

    /**
     * 获取当前用户信息
     */
    getCurrentUser() {
        return apiClient.get('/auth/me')
    },

    /**
     * 用户登出
     */
    logout() {
        return apiClient.post('/auth/logout')
    },
}

export default authApi
