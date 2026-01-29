# 通海南洋 CI/CD 部署指南

## 📋 项目架构概览

```
tonghai-nanyang/
├── packages/
│   ├── website/          # 官网 (Vue3 + Vite) → thny.sg
│   ├── management/       # CRM 管理端 (Vue3 + Element Plus) → crm.thny.sg
│   └── customer-portal/  # 客户门户 (Vue3) → portal.thny.sg
├── backend/              # API 服务 (Express + Prisma) → api.thny.sg
└── docker/               # Docker 配置
```

---

## 🚀 方案一：GitHub Actions + VPS 部署

### 1. 创建 GitHub Actions 工作流

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # ========== 构建前端 ==========
  build-frontend:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        package: [website, management, customer-portal]
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build ${{ matrix.package }}
        run: npm run build:${{ matrix.package }}
        env:
          VITE_API_URL: ${{ secrets.API_URL }}
      
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.package }}-dist
          path: packages/${{ matrix.package }}/dist

  # ========== 构建后端 Docker 镜像 ==========
  build-backend:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: ./backend
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/backend:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/backend:${{ github.sha }}

  # ========== 部署到服务器 ==========
  deploy:
    needs: [build-frontend, build-backend]
    runs-on: ubuntu-latest
    steps:
      - name: Download all artifacts
        uses: actions/download-artifact@v4
        with:
          path: dist
      
      - name: Deploy to server via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/tonghai
            docker compose pull
            docker compose up -d --force-recreate
            
      - name: Upload frontend files via SCP
        uses: appleboy/scp-action@v0.1.4
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: "dist/*"
          target: "/var/www/tonghai/static"
```

### 2. 创建后端 Dockerfile

创建 `backend/Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

COPY . .
RUN npm run build
RUN npx prisma generate

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

EXPOSE 4000

CMD ["npm", "run", "start"]
```

### 3. 生产环境 Docker Compose

创建 `docker/docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: tonghai-postgres
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - tonghai-network

  redis:
    image: redis:7-alpine
    container_name: tonghai-redis
    restart: always
    volumes:
      - redis_data:/data
    networks:
      - tonghai-network

  backend:
    image: ghcr.io/your-org/tonghai-nanyang/backend:latest
    container_name: tonghai-backend
    restart: always
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    depends_on:
      - postgres
      - redis
    networks:
      - tonghai-network

  nginx:
    image: nginx:alpine
    container_name: tonghai-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./static:/var/www/html:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend
    networks:
      - tonghai-network

volumes:
  postgres_data:
  redis_data:

networks:
  tonghai-network:
    driver: bridge
```

### 4. Nginx 配置

创建 `docker/nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # 官网
    server {
        listen 80;
        server_name thny.sg www.thny.sg;
        
        location / {
            root /var/www/html/website;
            try_files $uri $uri/ /index.html;
        }
    }

    # CRM 管理端
    server {
        listen 80;
        server_name crm.thny.sg;
        
        location / {
            root /var/www/html/management;
            try_files $uri $uri/ /index.html;
        }
        
        location /api {
            proxy_pass http://backend:4000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }

    # 客户门户
    server {
        listen 80;
        server_name portal.thny.sg;
        
        location / {
            root /var/www/html/customer-portal;
            try_files $uri $uri/ /index.html;
        }
        
        location /api {
            proxy_pass http://backend:4000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }

    # API 服务
    server {
        listen 80;
        server_name api.thny.sg;
        
        location / {
            proxy_pass http://backend:4000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

---

## 🔐 GitHub Secrets 配置

在 GitHub 仓库 → Settings → Secrets and variables → Actions 中添加：

| Secret 名称 | 说明 | 示例值 |
|------------|------|--------|
| `SERVER_HOST` | 服务器 IP | `xxx.xxx.xxx.xxx` |
| `SERVER_USER` | SSH 用户名 | `root` |
| `SSH_PRIVATE_KEY` | SSH 私钥 | `-----BEGIN...` |
| `API_URL` | 生产环境 API 地址 | `https://api.thny.sg` |
| `DB_USER` | 数据库用户名 | `crm_user` |
| `DB_PASSWORD` | 数据库密码 | `强密码` |
| `DB_NAME` | 数据库名 | `crm_db` |
| `JWT_SECRET` | JWT 密钥 | `随机生成的强密钥` |

---

## 📦 方案二：Vercel + Railway 部署

### 前端部署 (Vercel)

1. **连接 GitHub 仓库到 Vercel**
2. **配置三个项目**:

| 项目 | 根目录 | 构建命令 | 输出目录 |
|------|--------|----------|----------|
| Website | `packages/website` | `npm run build` | `dist` |
| Management | `packages/management` | `npm run build` | `dist` |
| Portal | `packages/customer-portal` | `npm run build` | `dist` |

3. **设置环境变量**: `VITE_API_URL=https://api.thny.sg`

### 后端部署 (Railway)

1. **创建 Railway 项目**
2. **添加 PostgreSQL 和 Redis 插件**
3. **配置环境变量**:
   ```
   DATABASE_URL=postgresql://...
   REDIS_URL=redis://...
   JWT_SECRET=xxx
   ```
4. **设置启动命令**: `npm run start`

---

## ✅ 部署检查清单

- [ ] 配置 DNS 解析 (thny.sg → 服务器 IP)
- [ ] 配置 SSL 证书 (Let's Encrypt)
- [ ] 设置数据库备份策略
- [ ] 配置日志收集 (可选: Sentry, LogRocket)
- [ ] 运行数据库迁移: `npx prisma migrate deploy`
- [ ] 初始化种子数据: `npm run db:seed`

---

## 🛠️ 常用命令

```bash
# 本地构建测试
npm run build:all

# 查看生产日志
docker compose logs -f backend

# 数据库迁移
docker compose exec backend npx prisma migrate deploy

# 重启服务
docker compose restart backend
```
