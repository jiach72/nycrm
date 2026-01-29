import { Router } from 'express'
import { authMiddleware } from '../middlewares'
import { documentService } from '../services/documentService'

const router = Router()

router.use(authMiddleware)

// 客户获取自己的文档列表
router.get('/mine', async (req, res, next) => {
    try {
        const documents = await documentService.getMyDocuments(req.user!.id, req.query.projectId as string)
        res.json(documents)
    } catch (error) {
        next(error)
    }
})

export default router
