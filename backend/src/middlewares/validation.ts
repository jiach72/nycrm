import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

/**
 * 验证中间件 - 检查 express-validator 的验证结果
 */
export function validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            code: 'VALIDATION_ERROR',
            message: '请求参数验证失败',
            details: errors.array().map(err => ({
                field: 'path' in err ? err.path : 'unknown',
                message: err.msg,
            })),
        })
    }

    next()
}
