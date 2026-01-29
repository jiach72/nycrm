-- RBAC System Migration
-- 此迁移将 Role 从枚举改为数据表，并迁移现有用户数据

-- 1. 先创建 roles 表
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_system" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- 2. 创建 permissions 表
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- 3. 创建 role_permissions 表
CREATE TABLE "role_permissions" (
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- 4. 创建索引
CREATE UNIQUE INDEX "roles_code_key" ON "roles"("code");
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");
CREATE INDEX "permissions_resource_idx" ON "permissions"("resource");

-- 5. 插入默认角色 (使用 cuid 格式的 ID)
INSERT INTO "roles" ("id", "code", "name", "description", "is_system", "created_at", "updated_at") VALUES
    ('role_admin', 'ADMIN', '管理员', '系统管理员，拥有所有权限', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('role_manager', 'MANAGER', '经理', '部门经理', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('role_sales', 'SALES', '销售', '销售人员', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('role_delivery', 'DELIVERY', '交付', '交付团队成员', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('role_compliance', 'COMPLIANCE', '合规', '合规人员', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('role_finance', 'FINANCE', '财务', '财务人员', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('role_customer', 'CUSTOMER', '客户', '客户账户', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 6. 添加 role_id 列 (允许 NULL，用于迁移)
ALTER TABLE "users" ADD COLUMN "role_id" TEXT;

-- 7. 迁移现有用户数据：根据原 role 枚举值设置 role_id
UPDATE "users" SET "role_id" = 'role_admin' WHERE "role" = 'ADMIN';
UPDATE "users" SET "role_id" = 'role_manager' WHERE "role" = 'MANAGER';
UPDATE "users" SET "role_id" = 'role_sales' WHERE "role" = 'SALES';
UPDATE "users" SET "role_id" = 'role_delivery' WHERE "role" = 'DELIVERY';
UPDATE "users" SET "role_id" = 'role_compliance' WHERE "role" = 'COMPLIANCE';
UPDATE "users" SET "role_id" = 'role_finance' WHERE "role" = 'FINANCE';
UPDATE "users" SET "role_id" = 'role_customer' WHERE "role" = 'CUSTOMER';

-- 8. 将 role_id 设为 NOT NULL
ALTER TABLE "users" ALTER COLUMN "role_id" SET NOT NULL;

-- 9. 删除原 role 列
ALTER TABLE "users" DROP COLUMN "role";

-- 10. 删除旧的 Role 枚举
DROP TYPE IF EXISTS "Role";

-- 11. 创建索引和外键
CREATE INDEX "users_role_id_idx" ON "users"("role_id");

ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" 
    FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" 
    FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" 
    FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
