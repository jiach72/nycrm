# 测试账号信息 (Test Accounts)

以下账号仅供开发与测试环境使用，数据来源参考 `backend/prisma/seed.ts`。

| 角色 | 邮箱 (账号) | 密码 | 权限说明 |
|------|-----------|------|---------|
| **系统管理员** | `admin@tonghai.com` | `admin123` | 拥有所有模块的访问权限 (Admin Access) |
| **销售顾问** | `lisi@tonghai.com` | `sales123` | 负责线索跟进、任务处理 |
| **销售顾问** | `wangwu@tonghai.com` | `sales123` | 负责线索跟进、任务处理 |
| **交付经理** | `zhaoliu@tonghai.com` | `delivery123` | 负责项目交付、文档管理 |
| **客户** | `client@example.com` | `customer123` | 访问客户门户 (Customer Portal) |

> **提示**: 如果无法登录，请确认是否已执行数据库填充命令 `npm run db:seed`。
