<template>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ collapsed: isCollapsed }">
      <div class="logo">
        <span v-if="!isCollapsed">通海CRM</span>
        <span v-else>TH</span>
      </div>
      
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        router
        class="sidebar-menu"
        background-color="#001529"
        text-color="#a6adb4"
        active-text-color="#fff"
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <template #title>仪表板</template>
        </el-menu-item>
        
        <el-menu-item index="/leads">
          <el-icon><User /></el-icon>
          <template #title>线索管理</template>
        </el-menu-item>
        
        <el-menu-item index="/tasks">
          <el-icon><List /></el-icon>
          <template #title>任务看板</template>
        </el-menu-item>
        
        <el-menu-item index="/settings">
          <el-icon><Setting /></el-icon>
          <template #title>系统设置</template>
        </el-menu-item>
      </el-menu>
    </aside>

    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 顶部栏 -->
      <header class="header">
        <div class="header-left">
          <el-button
            :icon="isCollapsed ? Expand : Fold"
            text
            @click="isCollapsed = !isCollapsed"
          />
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentTitle }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <div class="header-right">
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="user-info">
              <el-avatar :size="32" :src="user?.avatarUrl">
                {{ user?.name?.[0] || 'U' }}
              </el-avatar>
              <span class="user-name">{{ user?.name }}</span>
              <el-icon><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人设置</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'
import {
  Odometer,
  User,
  List,
  Setting,
  Fold,
  Expand,
  ArrowDown,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const isCollapsed = ref(false)

const activeMenu = computed(() => {
  const path = route.path
  // 处理详情页高亮
  if (path.startsWith('/leads/')) return '/leads'
  return path
})

const currentTitle = computed(() => route.meta.title as string || '')

function handleCommand(command: string) {
  if (command === 'logout') {
    authStore.logout()
    router.push('/login')
  } else if (command === 'profile') {
    router.push('/settings')
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-background);
}

.sidebar {
  width: 240px;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 72px;
}

.logo {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-family: 'Lexend', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.03em;
  border-bottom: 1px solid var(--color-border);
}

.sidebar-menu {
  border-right: none;
  background: transparent !important;
  flex: 1;
  padding: 12px 0;
}

:deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
  margin: 4px 12px;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted) !important;
  font-family: 'Source Sans 3', sans-serif;
  font-weight: 500;
}

:deep(.el-menu-item.is-active) {
  background: rgba(8, 145, 178, 0.1) !important; /* Cyan 600 at 10% */
  color: var(--color-primary) !important;
  font-weight: 700;
}

:deep(.el-menu-item:hover) {
  background: var(--color-surface-hover) !important;
  color: var(--color-text) !important;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 72px;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  border-bottom: 1px solid var(--color-border);
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

:deep(.el-breadcrumb__inner) {
  color: var(--color-text-muted) !important;
  font-weight: 400;
}

:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: var(--color-text) !important;
  font-weight: 600;
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
}

.user-info:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.user-name {
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
}

.content {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
