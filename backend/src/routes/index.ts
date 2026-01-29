import { Router } from 'express'
import authRoutes from './auth'
import leadRoutes from './leads'
import taskRoutes from './tasks'
import projectRoutes from './projects'
import customerRoutes from './customers'
import documentRoutes from './documents'
import portalRoutes from './portal'
import messageRoutes from './messages'
import appointmentRoutes from './appointments'
import inquiryRoutes from './inquiries'
import rbacRoutes from './rbac'
import usersRoutes from './users'

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
            customers: '/api/v1/customers',
            documents: '/api/v1/documents',
            messages: '/api/v1/messages (管理端发送)',
            portal: '/api/v1/portal (客户专用)',
            rbac: '/api/v1/rbac (权限管理)',
            users: '/api/v1/users (用户管理)',
        },
    })
})

// CRM 管理端路由
router.use('/auth', authRoutes)
router.use('/leads', leadRoutes)
router.use('/tasks', taskRoutes)
router.use('/projects', projectRoutes)
router.use('/customers', customerRoutes)
router.use('/documents', documentRoutes)
router.use('/messages', messageRoutes)
router.use('/appointments', appointmentRoutes)
router.use('/inquiries', inquiryRoutes)
router.use('/rbac', rbacRoutes)
router.use('/users', usersRoutes)

// 客户门户专用路由
router.use('/portal', portalRoutes)

export default router
