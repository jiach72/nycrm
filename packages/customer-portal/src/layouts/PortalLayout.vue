<template>
  <div class="portal-layout">
    <!-- 顶部导航 -->
    <header class="portal-header">
      <div class="header-container">
        <div class="logo">
          <span class="logo-text">通海南洋</span>
          <span class="logo-sub">客户门户</span>
        </div>
        
        <nav class="nav-menu">
          <router-link to="/dashboard" class="nav-item" active-class="active">
            <el-icon><HomeFilled /></el-icon>
            <span>主页</span>
          </router-link>
          <router-link to="/projects" class="nav-item" active-class="active">
            <el-icon><Folder /></el-icon>
            <span>我的项目</span>
          </router-link>
          <router-link to="/documents" class="nav-item" active-class="active">
            <el-icon><Document /></el-icon>
            <span>文档中心</span>
          </router-link>
          <router-link to="/messages" class="nav-item" active-class="active">
            <el-badge :value="unreadCount" :hidden="unreadCount === 0">
              <el-icon><Bell /></el-icon>
            </el-badge>
            <span>消息</span>
          </router-link>
        </nav>

        <div class="header-right">
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="user-info">
              <el-avatar :size="36" :src="user?.avatarUrl">
                {{ user?.name?.[0] || 'U' }}
              </el-avatar>
              <span class="user-name">{{ user?.name }}</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon>个人资料
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <el-icon><SwitchButton /></el-icon>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>

    <!-- 页面内容 -->
    <main class="portal-content">
      <router-view />
    </main>

    <!-- 底部 -->
    <footer class="portal-footer">
      <p>© 2026 通海南洋. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'
import { messageApi } from '@/api'
import {
  HomeFilled,
  Folder,
  Document,
  Bell,
  ArrowDown,
  User,
  SwitchButton,
} from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const unreadCount = ref(0)

onMounted(async () => {
  try {
    const result = await messageApi.getUnreadCount()
    unreadCount.value = result.count || 0
  } catch {
    // 忽略错误
  }
})

function handleCommand(command: string) {
  if (command === 'logout') {
    authStore.logout()
    router.push('/login')
  } else if (command === 'profile') {
    router.push('/profile')
  }
}
</script>

<style scoped>
.portal-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
}

.portal-header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  font-family: 'Lexend', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.05em;
  text-transform: uppercase;
}

.logo-sub {
  font-size: 11px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  padding-left: 12px;
  border-left: 1px solid var(--color-border);
  font-family: 'Source Sans 3', sans-serif;
}

.nav-menu {
  display: flex;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  color: var(--color-text-muted);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 15px;
  font-family: 'Source Sans 3', sans-serif;
  font-weight: 600;
}

.nav-item:hover {
  color: var(--color-text);
  background: var(--color-surface-hover);
}

.nav-item.active {
  color: var(--color-primary);
  background: rgba(8, 145, 178, 0.1);
  font-weight: 700;
}

.nav-item :deep(.el-icon) {
  font-size: 18px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: all 0.2s;
  color: var(--color-text);
}

.user-info:hover {
  background: #FFFFFF;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.user-name {
  font-size: 14px;
  font-weight: 600;
}

.portal-content {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 40px;
}

.portal-footer {
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  background: var(--color-surface);
  text-align: center;
  padding: 32px;
  font-size: 13px;
  font-family: 'Source Sans 3', sans-serif;
}
</style>
