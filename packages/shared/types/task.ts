import type { UserRef } from './user'

// 任务状态枚举
export type TaskStatus =
    | 'NOT_STARTED'
    | 'IN_PROGRESS'
    | 'BLOCKED'
    | 'DONE'
    | 'CANCELLED'

// 任务优先级枚举
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

// 任务实体
export interface Task {
    id: string
    title: string
    description?: string
    projectId?: string
    leadId?: string
    assignedTo?: UserRef
    status: TaskStatus
    priority: TaskPriority
    dueDate?: string
    slaHours?: number
    completedAt?: string
    blockingReason?: string
    tags: string[]
    timeSpentHours?: number
    notes?: string
    createdAt: string
    updatedAt: string
}

// 创建任务请求
export interface CreateTaskPayload {
    title: string
    description?: string
    projectId?: string
    leadId?: string
    assignedToId?: string
    priority?: TaskPriority
    dueDate?: string
    slaHours?: number
    tags?: string[]
}

// 更新任务请求
export interface UpdateTaskPayload {
    title?: string
    description?: string
    assignedToId?: string
    status?: TaskStatus
    priority?: TaskPriority
    dueDate?: string
    blockingReason?: string
    tags?: string[]
    timeSpentHours?: number
    notes?: string
    completedAt?: string
}

// 任务过滤参数
export interface TaskFilters {
    status?: TaskStatus
    priority?: TaskPriority
    assignedToId?: string
    projectId?: string
    leadId?: string
    dueBefore?: string
    dueAfter?: string
}
