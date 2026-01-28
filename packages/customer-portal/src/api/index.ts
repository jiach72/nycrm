import apiClient from './apiClient'

export const authApi = {
    /**
     * 客户登录
     */
    login(payload: { email: string; password: string }) {
        return apiClient.post('/auth/login', payload)
    },

    /**
     * 刷新 Token
     */
    refreshToken(refreshToken: string) {
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

export const projectApi = {
    /**
     * 获取我的项目列表
     */
    getMyProjects() {
        return apiClient.get('/projects/mine')
    },

    /**
     * 获取项目详情
     */
    getProjectById(id: string) {
        return apiClient.get(`/projects/${id}`)
    },

    /**
     * 获取项目进度
     */
    getProjectProgress(id: string) {
        return apiClient.get(`/projects/${id}/progress`)
    },
}

export const documentApi = {
    /**
     * 获取我的文档列表
     */
    getMyDocuments(projectId?: string) {
        return apiClient.get('/documents/mine', { params: { projectId } })
    },

    /**
     * 上传文档
     */
    uploadDocument(formData: FormData) {
        return apiClient.post('/documents/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },

    /**
     * 下载文档
     */
    downloadDocument(id: string) {
        return apiClient.get(`/documents/${id}/download`, { responseType: 'blob' })
    },
}

export const messageApi = {
    /**
     * 获取我的消息列表
     */
    getMyMessages() {
        return apiClient.get('/messages/mine')
    },

    /**
     * 标记消息为已读
     */
    markAsRead(id: string) {
        return apiClient.put(`/messages/${id}/read`)
    },

    /**
     * 获取未读消息数量
     */
    getUnreadCount() {
        return apiClient.get('/messages/unread-count')
    },
}

export { default as apiClient } from './apiClient'
