import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 开始填充测试数据...')

    // 创建管理员用户
    const adminPassword = await bcrypt.hash('admin123', 12)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@tonghai.com' },
        update: {},
        create: {
            email: 'admin@tonghai.com',
            name: '系统管理员',
            passwordHash: adminPassword,
            role: 'ADMIN',
            department: '管理层',
        },
    })
    console.log(`✅ 创建管理员: ${admin.email}`)

    // 创建销售顾问
    const salesPassword = await bcrypt.hash('sales123', 12)
    const sales1 = await prisma.user.upsert({
        where: { email: 'lisi@tonghai.com' },
        update: {},
        create: {
            email: 'lisi@tonghai.com',
            name: '李四',
            passwordHash: salesPassword,
            role: 'SALES',
            department: '销售部',
        },
    })
    console.log(`✅ 创建销售顾问: ${sales1.email}`)

    const sales2 = await prisma.user.upsert({
        where: { email: 'wangwu@tonghai.com' },
        update: {},
        create: {
            email: 'wangwu@tonghai.com',
            name: '王五',
            passwordHash: salesPassword,
            role: 'SALES',
            department: '销售部',
        },
    })
    console.log(`✅ 创建销售顾问: ${sales2.email}`)

    // 创建交付经理
    const deliveryPassword = await bcrypt.hash('delivery123', 12)
    const delivery = await prisma.user.upsert({
        where: { email: 'zhaoliu@tonghai.com' },
        update: {},
        create: {
            email: 'zhaoliu@tonghai.com',
            name: '赵六',
            passwordHash: deliveryPassword,
            role: 'DELIVERY',
            department: '交付部',
        },
    })
    console.log(`✅ 创建交付经理: ${delivery.email}`)

    // 创建测试客户
    const customerPassword = await bcrypt.hash('customer123', 12)
    const customerUser = await prisma.user.upsert({
        where: { email: 'client@example.com' },
        update: {},
        create: {
            email: 'client@example.com',
            name: '陈大文 (客户)',
            passwordHash: customerPassword,
            role: 'CUSTOMER',
        },
    })
    console.log(`✅ 创建测试客户: ${customerUser.email}`)

    // 创建测试线索
    const leads = await Promise.all([
        prisma.lead.create({
            data: {
                contactName: '张三',
                email: 'zhangsan@example.com',
                phone: '+65 9123 4567',
                companyName: 'ABC Tech Pte Ltd',
                country: 'Singapore',
                serviceTypes: ['Enterprise Setup', 'Visa Planning'],
                budgetRange: '50-100k',
                sourceChannel: 'website_form',
                inquiryMessage: '您好，我们是一家科技公司，想咨询在新加坡设立子公司和员工签证的事宜。',
                status: 'NEW',
                tags: ['hot', 'enterprise'],
                score: 85,
            },
        }),
        prisma.lead.create({
            data: {
                contactName: '李明',
                email: 'liming@startup.io',
                phone: '+86 138 0000 1234',
                companyName: 'Startup IO',
                country: 'China',
                serviceTypes: ['Enterprise Setup'],
                budgetRange: '20-50k',
                sourceChannel: 'referral',
                inquiryMessage: '朋友推荐过来的，想了解新加坡公司注册流程。',
                status: 'CONTACTED',
                tags: ['startup'],
                score: 70,
                assignedToId: sales1.id,
                lastContactedAt: new Date(),
            },
        }),
        prisma.lead.create({
            data: {
                contactName: 'John Chen',
                email: 'john.chen@globalcorp.com',
                phone: '+1 415 555 0123',
                companyName: 'Global Corp Inc',
                country: 'USA',
                serviceTypes: ['Tax Planning', 'Wealth Management'],
                budgetRange: '>100k',
                sourceChannel: 'website_form',
                inquiryMessage: 'Looking for tax optimization strategies for our APAC expansion.',
                status: 'QUALIFIED',
                tags: ['enterprise', 'high-value'],
                score: 95,
                assignedToId: sales2.id,
                lastContactedAt: new Date(),
            },
        }),
        prisma.lead.create({
            data: {
                contactName: '王芳',
                email: 'wangfang@family.com',
                phone: '+86 139 8888 9999',
                country: 'China',
                serviceTypes: ['Visa Planning'],
                budgetRange: '20-50k',
                sourceChannel: 'website_form',
                inquiryMessage: '想了解家庭移居新加坡的方案。',
                status: 'NEW',
                tags: ['family'],
                score: 60,
            },
        }),
    ])
    console.log(`✅ 创建 ${leads.length} 条测试线索`)

    // 创建测试任务
    const tasks = await Promise.all([
        prisma.task.create({
            data: {
                title: '联系张三确认需求',
                description: '首次联系，了解具体需求和时间规划',
                leadId: leads[0].id,
                assignedToId: sales1.id,
                priority: 'HIGH',
                dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 明天
                slaHours: 24,
                status: 'NOT_STARTED',
                tags: ['首次联系'],
            },
        }),
        prisma.task.create({
            data: {
                title: '准备李明公司注册方案',
                description: '根据沟通情况准备初步方案报价',
                leadId: leads[1].id,
                assignedToId: sales1.id,
                priority: 'MEDIUM',
                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3天后
                status: 'IN_PROGRESS',
                tags: ['方案准备'],
            },
        }),
        prisma.task.create({
            data: {
                title: 'John Chen 税务方案评审',
                description: '与合规部门评审税务优化方案的可行性',
                leadId: leads[2].id,
                assignedToId: sales2.id,
                priority: 'HIGH',
                dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2天后
                status: 'IN_PROGRESS',
                tags: ['内部评审', '税务'],
            },
        }),
        prisma.task.create({
            data: {
                title: '整理本周线索跟进报告',
                assignedToId: sales1.id,
                priority: 'LOW',
                dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5天后
                status: 'NOT_STARTED',
                tags: ['报告'],
            },
        }),
    ])
    console.log(`✅ 创建 ${tasks.length} 条测试任务`)

    // 创建关联的客户实体 (关联到第一个线索)
    // 注意: Lead模型中 assignedToId 是销售，Customer 并不直接关联 User 表的账号，通常是通过 email 匹配或业务逻辑关联。
    // 但在 seed 简单处理：我们假定第一个线索转换为了 Customer
    const customerEntity = await prisma.customer.upsert({
        where: { leadId: leads[0].id },
        update: {},
        create: {
            leadId: leads[0].id,
            kycStatus: 'APPROVED',
            riskGrade: 'LOW',
            companyInfo: {
                name: 'ABC Tech Pte Ltd',
                uen: '202401001W'
            },
            familyMembers: [
                { name: 'Wife', relation: 'Spouse' }
            ]
        }
    })
    console.log(`✅ 创建客户实体 (关联线索: ${leads[0].contactName})`)

    // 注意: 目前我们的 User 模型和 Customer 模型没有直接外键关联。
    // 在真实逻辑中，Role=CUSTOMER 的 User.email 应该匹配 Lead.email 或 Customer.contactEmail。
    // 这里我们将 seed 的 customerUser 邮箱设置得和 leads[0] 不一样，
    // 如果需要登录后看到数据，需要确保 backend 逻辑是按 User.email == Lead.email 查询，
    // 或者我们直接修改 leads[0] 的 email 为 client@example.com

    await prisma.lead.update({
        where: { id: leads[0].id },
        data: { email: 'client@example.com', status: 'CONVERTED' } // 匹配测试账号邮箱
    })
    console.log(`🔄 更新线索邮箱以匹配测试账号: ${customerUser.email}`)

    console.log('\n🎉 测试数据填充完成!')
    console.log('\n📋 测试账号:')
    console.log('  - 管理员: admin@tonghai.com / admin123')
    console.log('  - 销售顾问: lisi@tonghai.com / sales123')
    console.log('  - 销售顾问: wangwu@tonghai.com / sales123')
    console.log('  - 交付经理: zhaoliu@tonghai.com / delivery123')
}

main()
    .catch((e) => {
        console.error('❌ 填充数据失败:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
