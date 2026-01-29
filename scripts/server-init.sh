#!/bin/bash
# ============================================
# 通海南洋 服务器初始化脚本
# 适用于 Ubuntu 22.04 / 24.04
# 服务器: 43.128.68.249
# ============================================

set -e  # 遇到错误立即退出

echo "=========================================="
echo "🚀 通海南洋 服务器初始化脚本"
echo "=========================================="

# ========== 1. 系统更新 ==========
echo ""
echo "📦 [1/7] 更新系统包..."
apt update && apt upgrade -y

# ========== 2. 安装必要工具 ==========
echo ""
echo "🔧 [2/7] 安装必要工具..."
apt install -y \
    curl \
    wget \
    git \
    vim \
    htop \
    unzip \
    ca-certificates \
    gnupg \
    lsb-release \
    ufw

# ========== 3. 安装 Docker ==========
echo ""
echo "🐳 [3/7] 安装 Docker..."

# 添加 Docker 官方 GPG 密钥
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

# 添加 Docker 源
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动 Docker
systemctl enable docker
systemctl start docker

echo "  ✅ Docker 版本: $(docker --version)"

# ========== 4. 安装 Nginx ==========
echo ""
echo "🌐 [4/7] 安装 Nginx..."
apt install -y nginx

systemctl enable nginx
systemctl start nginx

echo "  ✅ Nginx 版本: $(nginx -v 2>&1)"

# ========== 5. 配置防火墙 ==========
echo ""
echo "🔒 [5/7] 配置防火墙..."
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 4000/tcp  # API (可选，如果直接暴露)
ufw --force enable

echo "  ✅ 防火墙状态:"
ufw status

# ========== 6. 创建项目目录 ==========
echo ""
echo "📁 [6/7] 创建项目目录..."
mkdir -p /var/www/tonghai/static/website
mkdir -p /var/www/tonghai/static/management
mkdir -p /var/www/tonghai/static/customer-portal
mkdir -p /var/www/tonghai/ssl
mkdir -p /var/www/tonghai/data

# 设置权限
chown -R www-data:www-data /var/www/tonghai
chmod -R 755 /var/www/tonghai

echo "  ✅ 目录结构已创建"

# ========== 7. 配置 Nginx ==========
echo ""
echo "⚙️ [7/7] 配置 Nginx..."

cat > /etc/nginx/sites-available/tonghai << 'EOF'
# 通海南洋 Nginx 配置

# === 官网 ===
server {
    listen 80;
    server_name thny.sg www.thny.sg;
    root /var/www/tonghai/static/website;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}

# === CRM 管理端 ===
server {
    listen 80;
    server_name crm.thny.sg;
    root /var/www/tonghai/static/management;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}

# === 客户门户 ===
server {
    listen 80;
    server_name portal.thny.sg;
    root /var/www/tonghai/static/customer-portal;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}

# === API 服务 ===
server {
    listen 80;
    server_name api.thny.sg;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # CORS 配置
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
    }
}
EOF

# 启用配置
ln -sf /etc/nginx/sites-available/tonghai /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# 测试配置
nginx -t

# 重载 Nginx
systemctl reload nginx

echo "  ✅ Nginx 配置完成"

# ========== 8. 安装 Certbot (SSL) ==========
echo ""
echo "🔐 [附加] 安装 Certbot (SSL 证书)..."
apt install -y certbot python3-certbot-nginx

echo ""
echo "=========================================="
echo "✅ 服务器初始化完成!"
echo "=========================================="
echo ""
echo "📋 下一步操作:"
echo ""
echo "1. 配置 DNS 解析 (将域名指向 43.128.68.249)"
echo ""
echo "2. 申请 SSL 证书 (DNS 生效后执行):"
echo "   certbot --nginx -d thny.sg -d www.thny.sg -d crm.thny.sg -d portal.thny.sg -d api.thny.sg"
echo ""
echo "3. 创建 docker-compose.yml:"
echo "   cd /var/www/tonghai && vim docker-compose.yml"
echo ""
echo "4. 启动后端服务:"
echo "   docker compose up -d"
echo ""
echo "=========================================="
