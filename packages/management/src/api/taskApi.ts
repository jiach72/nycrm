import apiClient from './apiClient'
import type {
    Task,
    CreateTaskPayload,
    UpdateTaskPayload,
    TaskFilters,
    TaskStatus,
    PaginatedResponse,
    PaginationParams
} from '@tonghai/shared/types'

export const taskApi = {
    /**
     * 获取任务列表
     */
    getList(
        filters?: TaskFilters,
        pagination?: PaginationParams
    ): Promise<PaginatedResponse<Task>> {
        return apiClient.get('/tasks', { params: { ...filters, ...pagination } })
    },

    /**
     * 获取看板数据
     */
    getBoard(assignedToId?: string): Promise<Record<TaskStatus, Task[]>> {
        return apiClient.get('/tasks/board', { params: { assignedToId } })
    },

    /**
     * 获取任务统计
     */
    getStats(assignedToId?: string): Promise<{
        total: number
        overdue: number
        byStatus: Record<string, number>
    }> {
        return apiClient.get('/tasks/stats', { params: { assignedToId } })
    },

    /**
     * 获取任务详情
     */
    getById(id: string): Promise<Task> {
        return apiClient.get(`/tasks/${id}`)
    },

    /**
     * 创建任务
     */
    create(payload: CreateTaskPayload): Promise<Task> {
        return apiClient.post('/tasks', payload)
    },

    /**
     * 更新任务
     */
    update(id: string, payload: UpdateTaskPayload): Promise<Task> {
        return apiClient.put(`/tasks/${id}`, payload)
    },

    /**
     * 删除任务
     */
    delete(id: string): Promise<{ success: boolean }> {
        return apiClient.delete(`/tasks/${id}`)
    },
}

export default taskApi
