import { Router } from 'express'
import { body } from 'express-validator'
import { authService } from '../services'
import { validate } from '../middlewares'
import { authMiddleware } from '../middlewares'

const router = Router()

/**
 * POST /auth/login - 用户登录
 */
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('请输入有效的邮箱地址'),
        body('password').notEmpty().withMessage('密码不能为空'),
    ],
    validate,
    async (req, res, next) => {
        try {
            const { email, password } = req.body
            const result = await authService.login({ email, password })
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)

/**
 * POST /auth/register - 用户注册
 */
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('请输入有效的邮箱地址'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('密码至少需要8个字符'),
        body('name').notEmpty().withMessage('姓名不能为空'),
    ],
    validate,
    async (req, res, next) => {
        try {
            const { email, password, name } = req.body
            const result = await authService.register({ email, password, name })
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
)

/**
 * POST /auth/refresh - 刷新 Token
 */
router.post(
    '/refresh',
    [body('refreshToken').notEmpty().withMessage('刷新令牌不能为空')],
    validate,
    async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            const result = await authService.refreshToken(refreshToken)
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
)

/**
 * GET /auth/me - 获取当前用户信息
 */
router.get('/me', authMiddleware, async (req, res, next) => {
    try {
        const user = await authService.getCurrentUser(req.user!.id)
        res.json(user)
    } catch (error) {
        next(error)
    }
})

/**
 * POST /auth/logout - 用户登出
 */
router.post('/logout', authMiddleware, async (req, res) => {
    // 客户端需要删除本地存储的 Token
    // 服务端可以选择加入 Token 黑名单 (需要 Redis)
    res.json({ success: true, message: '已成功登出' })
})

export default router
