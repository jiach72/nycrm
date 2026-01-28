// API 分页响应
export interface PaginatedResponse<T> {
    data: T[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

// API 错误响应
export interface ApiError {
    code: string
    message: string
    details?: Record<string, unknown>
}

// API 成功响应
export interface ApiSuccess<T = unknown> {
    success: true
    data?: T
    message?: string
}

// 分页请求参数
export interface PaginationParams {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

// 登录请求
export interface LoginPayload {
    email: string
    password: string
    rememberMe?: boolean
}

// 登录响应
export interface LoginResponse {
    accessToken: string
    refreshToken: string
    tokenType: string
    expiresIn: number
    user: {
        id: string
        name: string
        email: string
        role: string
        avatarUrl?: string
    }
}

// 刷新 Token 响应
export interface RefreshTokenResponse {
    accessToken: string
    expiresIn: number
}
