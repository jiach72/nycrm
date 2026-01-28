import { Router } from 'express'
import authRoutes from './auth'
import leadRoutes from './leads'
import taskRoutes from './tasks'
import projectRoutes from './projects'

const router = Router()

// 健康检查
router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API 版本信息
router.get('/', (req, res) => {
    res.json({
        name: 'TongHai CRM API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/v1/auth',
            leads: '/api/v1/leads',
            tasks: '/api/v1/tasks',
            projects: '/api/v1/projects',
        },
    })
})

// 挂载路由
router.use('/auth', authRoutes)
router.use('/leads', leadRoutes)
router.use('/tasks', taskRoutes)
router.use('/projects', projectRoutes)

export default router
