import apiClient from './apiClient'

export interface SendMessagePayload {
    recipientId: string
    title: string
    content: string
    type?: 'SYSTEM' | 'PROJECT' | 'DOCUMENT' | 'PAYMENT' | 'REMINDER' | 'ANNOUNCEMENT'
    projectId?: string
}

export interface SendBulkMessagePayload {
    recipientIds: string[]
    title: string
    content: string
    type?: 'ANNOUNCEMENT' | 'SYSTEM'
}

export const messageApi = {
    /**
     * 发送站内消息
     */
    send(payload: SendMessagePayload) {
        return apiClient.post('/messages/send', payload)
    },

    /**
     * 批量发送消息
     */
    sendBulk(payload: SendBulkMessagePayload) {
        return apiClient.post('/messages/send-bulk', payload)
    },

    /**
     * 获取已发送的消息列表
     */
    getSentMessages(page = 1, limit = 20) {
        return apiClient.get('/messages/sent', { params: { page, limit } })
    },

    /**
     * 获取可发送消息的客户列表
     */
    getCustomers() {
        return apiClient.get('/messages/customers')
    },
}

export default messageApi
