import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'

// 扩展 Express Request 类型
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                email: string
                role: string
            }
        }
    }
}

export interface JwtPayload {
    sub: string
    email: string
    role: string
    iat: number
    exp: number
}

/**
 * JWT 认证中间件
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            code: 'UNAUTHORIZED',
            message: '未提供认证令牌',
        })
    }

    const token = authHeader.substring(7)

    try {
        const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload

        req.user = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role,
        }

        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                code: 'TOKEN_EXPIRED',
                message: '认证令牌已过期',
            })
        }

        return res.status(401).json({
            code: 'INVALID_TOKEN',
            message: '无效的认证令牌',
        })
    }
}

/**
 * 可选认证中间件 (不强制要求登录)
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7)

        try {
            const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload
            req.user = {
                id: decoded.sub,
                email: decoded.email,
                role: decoded.role,
            }
        } catch {
            // 忽略错误，继续处理请求
        }
    }

    next()
}

/**
 * 角色授权中间件
 */
export function requireRole(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                code: 'UNAUTHORIZED',
                message: '未认证',
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                code: 'FORBIDDEN',
                message: '无权限访问此资源',
            })
        }

        next()
    }
}
