import apiClient from './apiClient'

// 简单的客户类型（仅用于选择器）
export interface ProjectCustomerOption {
    id: string
    companyInfo?: {
        name: string
        uen?: string
    }
    lead: {
        contactName: string
        companyName?: string
        email?: string
    }
}

export const customerApi = {
    // 获取客户选项
    getOptions(search?: string): Promise<ProjectCustomerOption[]> {
        return apiClient.get('/customers/options', { params: { search } })
    }
}
