import { prisma } from '../config'
import { NotFoundError, ConflictError } from '../middlewares'
import type { LeadStatus, Prisma } from '@prisma/client'

interface CreateLeadInput {
    contactName: string
    email?: string
    phone?: string
    companyName?: string
    country?: string
    serviceTypes?: string[]
    budgetRange?: string
    sourceChannel: string
    inquiryMessage?: string
    tags?: string[]
}

interface UpdateLeadInput {
    contactName?: string
    email?: string
    phone?: string
    companyName?: string
    country?: string
    serviceTypes?: string[]
    budgetRange?: string
    inquiryMessage?: string
    status?: LeadStatus
    tags?: string[]
    score?: number
    lastContactedAt?: string
}

interface LeadFilters {
    status?: LeadStatus
    assignedToId?: string
    sourceChannel?: string
    country?: string
    tags?: string[]
    search?: string
}

interface PaginationOptions {
    page: number
    limit: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

export const leadService = {
    /**
     * 获取线索列表 (分页)
     */
    async getLeads(filters: LeadFilters, pagination: PaginationOptions) {
        const { page, limit, sortBy = 'createdAt', sortOrder = 'desc' } = pagination
        const skip = (page - 1) * limit

        // 构建查询条件
        const where: Prisma.LeadWhereInput = {}

        if (filters.status) {
            where.status = filters.status
        }
        if (filters.assignedToId) {
            where.assignedToId = filters.assignedToId
        }
        if (filters.sourceChannel) {
            where.sourceChannel = filters.sourceChannel
        }
        if (filters.country) {
            where.country = filters.country
        }
        if (filters.tags && filters.tags.length > 0) {
            where.tags = { hasSome: filters.tags }
        }
        if (filters.search) {
            where.OR = [
                { contactName: { contains: filters.search, mode: 'insensitive' } },
                { email: { contains: filters.search, mode: 'insensitive' } },
                { phone: { contains: filters.search } },
                { companyName: { contains: filters.search, mode: 'insensitive' } },
            ]
        }

        const [leads, total] = await Promise.all([
            prisma.lead.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    assignedTo: {
                        select: { id: true, name: true, email: true, avatarUrl: true },
                    },
                },
            }),
            prisma.lead.count({ where }),
        ])

        return {
            data: leads,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        }
    },

    /**
     * 获取单个线索详情
     */
    async getLeadById(id: string) {
        const lead = await prisma.lead.findUnique({
            where: { id },
            include: {
                assignedTo: {
                    select: { id: true, name: true, email: true, avatarUrl: true },
                },
                tasks: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
                activities: {
                    orderBy: { createdAt: 'desc' },
                    take: 20,
                    include: {
                        actor: {
                            select: { id: true, name: true, avatarUrl: true },
                        },
                    },
                },
            },
        })

        if (!lead) {
            throw new NotFoundError('线索不存在')
        }

        return lead
    },

    /**
     * 创建线索
     */
    async createLead(data: CreateLeadInput, creatorId?: string) {
        // 去重检查
        if (data.email || data.phone) {
            const existing = await prisma.lead.findFirst({
                where: {
                    OR: [
                        data.email ? { email: data.email } : {},
                        data.phone ? { phone: data.phone } : {},
                    ].filter(c => Object.keys(c).length > 0),
                },
            })

            if (existing) {
                throw new ConflictError('已存在相同邮箱或电话的线索')
            }
        }

        const lead = await prisma.lead.create({
            data: {
                contactName: data.contactName,
                email: data.email,
                phone: data.phone,
                companyName: data.companyName,
                country: data.country,
                serviceTypes: data.serviceTypes || [],
                budgetRange: data.budgetRange,
                sourceChannel: data.sourceChannel,
                inquiryMessage: data.inquiryMessage,
                tags: data.tags || [],
                status: 'NEW',
            },
            include: {
                assignedTo: {
                    select: { id: true, name: true, email: true },
                },
            },
        })

        // 记录活动
        if (creatorId) {
            await prisma.activity.create({
                data: {
                    actorId: creatorId,
                    actionType: 'CREATED',
                    entityType: 'LEAD',
                    entityId: lead.id,
                    leadId: lead.id,
                    description: `创建了线索: ${lead.contactName}`,
                },
            })
        }

        return lead
    },

    /**
     * 更新线索
     */
    async updateLead(id: string, data: UpdateLeadInput, updaterId?: string) {
        const existing = await prisma.lead.findUnique({ where: { id } })
        if (!existing) {
            throw new NotFoundError('线索不存在')
        }

        const lead = await prisma.lead.update({
            where: { id },
            data: {
                ...(data.contactName && { contactName: data.contactName }),
                ...(data.email !== undefined && { email: data.email }),
                ...(data.phone !== undefined && { phone: data.phone }),
                ...(data.companyName !== undefined && { companyName: data.companyName }),
                ...(data.country !== undefined && { country: data.country }),
                ...(data.serviceTypes && { serviceTypes: data.serviceTypes }),
                ...(data.budgetRange !== undefined && { budgetRange: data.budgetRange }),
                ...(data.inquiryMessage !== undefined && { inquiryMessage: data.inquiryMessage }),
                ...(data.status && { status: data.status }),
                ...(data.tags && { tags: data.tags }),
                ...(data.score !== undefined && { score: data.score }),
                ...(data.lastContactedAt && { lastContactedAt: new Date(data.lastContactedAt) }),
            },
            include: {
                assignedTo: {
                    select: { id: true, name: true, email: true },
                },
            },
        })

        // 记录活动
        if (updaterId) {
            await prisma.activity.create({
                data: {
                    actorId: updaterId,
                    actionType: 'UPDATED',
                    entityType: 'LEAD',
                    entityId: lead.id,
                    leadId: lead.id,
                    changes: data as object,
                    description: `更新了线索: ${lead.contactName}`,
                },
            })
        }

        return lead
    },

    /**
     * 分配线索
     */
    async assignLead(id: string, assignedToId: string, assignerId: string, reason?: string) {
        const lead = await prisma.lead.findUnique({ where: { id } })
        if (!lead) {
            throw new NotFoundError('线索不存在')
        }

        const assignee = await prisma.user.findUnique({ where: { id: assignedToId } })
        if (!assignee) {
            throw new NotFoundError('被分配的用户不存在')
        }

        const previousAssignee = lead.assignedToId

        const updated = await prisma.lead.update({
            where: { id },
            data: { assignedToId },
            include: {
                assignedTo: {
                    select: { id: true, name: true, email: true },
                },
            },
        })

        // 记录活动
        await prisma.activity.create({
            data: {
                actorId: assignerId,
                actionType: 'ASSIGNED',
                entityType: 'LEAD',
                entityId: id,
                leadId: id,
                changes: { previousAssignee, newAssignee: assignedToId, reason },
                description: `将线索分配给 ${assignee.name}`,
            },
        })

        return updated
    },

    /**
     * 删除线索
     */
    async deleteLead(id: string) {
        const lead = await prisma.lead.findUnique({ where: { id } })
        if (!lead) {
            throw new NotFoundError('线索不存在')
        }

        await prisma.lead.delete({ where: { id } })
        return { success: true }
    },

    /**
     * 获取最近活动
     */
    async getRecentActivities(limit = 20) {
        return await prisma.activity.findMany({
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                actor: {
                    select: { id: true, name: true, avatarUrl: true },
                },
                lead: {
                    select: { id: true, contactName: true, companyName: true },
                },
            },
        })
    },

    /**
     * 获取线索统计 (包含趋势和来源)
     */
    async getLeadStats() {
        // 计算过去 30 天的日期范围
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const [total, byStatus, bySource, recentLeads] = await Promise.all([
            prisma.lead.count(),
            prisma.lead.groupBy({
                by: ['status'],
                _count: true,
            }),
            prisma.lead.groupBy({
                by: ['sourceChannel'],
                _count: true,
            }),
            prisma.lead.findMany({
                where: {
                    createdAt: { gte: thirtyDaysAgo },
                },
                select: { createdAt: true },
            }),
        ])

        // 聚合最近 30 天的趋势
        const trendMap: Record<string, number> = {}
        // 初始化过去 30 天的每一天为 0
        for (let i = 0; i < 30; i++) {
            const d = new Date()
            d.setDate(d.getDate() - i)
            const dateStr = d.toISOString().split('T')[0]
            trendMap[dateStr] = 0
        }

        // 填充实际数据
        recentLeads.forEach(lead => {
            const dateStr = lead.createdAt.toISOString().split('T')[0]
            if (trendMap[dateStr] !== undefined) {
                trendMap[dateStr]++
            }
        })

        // 转换为数组格式，按日期升序
        const trend = Object.entries(trendMap)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date))

        return {
            total,
            byStatus: byStatus.reduce((acc, item) => {
                acc[item.status] = item._count
                return acc
            }, {} as Record<string, number>),
            bySource: bySource.reduce((acc, item) => {
                acc[item.sourceChannel] = item._count
                return acc
            }, {} as Record<string, number>),
            trend, // 新增趋势数据
        }
    },
}

export default leadService
