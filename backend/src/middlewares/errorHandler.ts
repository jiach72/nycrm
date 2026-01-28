import { Request, Response, NextFunction } from 'express'

// 自定义错误类
export class AppError extends Error {
    statusCode: number
    code: string

    constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR') {
        super(message)
        this.statusCode = statusCode
        this.code = code
        Error.captureStackTrace(this, this.constructor)
    }
}

// 常用错误
export class NotFoundError extends AppError {
    constructor(message = '资源不存在') {
        super(message, 404, 'NOT_FOUND')
    }
}

export class BadRequestError extends AppError {
    constructor(message = '请求参数错误') {
        super(message, 400, 'BAD_REQUEST')
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = '未授权') {
        super(message, 401, 'UNAUTHORIZED')
    }
}

export class ForbiddenError extends AppError {
    constructor(message = '禁止访问') {
        super(message, 403, 'FORBIDDEN')
    }
}

export class ConflictError extends AppError {
    constructor(message = '资源冲突') {
        super(message, 409, 'CONFLICT')
    }
}

/**
 * 全局错误处理中间件
 */
export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) {
    console.error('Error:', err)

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            code: err.code,
            message: err.message,
        })
    }

    // Prisma 错误处理
    if (err.name === 'PrismaClientKnownRequestError') {
        return res.status(400).json({
            code: 'DATABASE_ERROR',
            message: '数据库操作失败',
        })
    }

    // 默认错误
    res.status(500).json({
        code: 'INTERNAL_ERROR',
        message: process.env.NODE_ENV === 'development'
            ? err.message
            : '服务器内部错误',
    })
}
