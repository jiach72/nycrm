// 用户角色枚举
export type Role =
    | 'ADMIN'
    | 'MANAGER'
    | 'SALES'
    | 'DELIVERY'
    | 'COMPLIANCE'
    | 'FINANCE'
    | 'CUSTOMER'

// 用户状态枚举
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'

// 用户基础信息
export interface User {
    id: string
    email: string
    name: string
    role: Role
    department?: string
    avatarUrl?: string
    status: UserStatus
    createdAt: string
    updatedAt: string
}

// 用户引用（简化版，用于关联）
export interface UserRef {
    id: string
    name: string
    email?: string
    avatar?: string
}

// 创建用户请求
export interface CreateUserPayload {
    email: string
    name: string
    password: string
    role?: Role
    department?: string
}

// 更新用户请求
export interface UpdateUserPayload {
    name?: string
    role?: Role
    department?: string
    status?: UserStatus
    avatarUrl?: string
}
