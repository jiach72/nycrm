<template>
  <div class="project-list">
    <div class="page-header">
      <h1>我的项目</h1>
      <p>查看和追踪您所有服务项目的进度</p>
    </div>

    <el-row :gutter="24">
      <el-col :span="8" v-for="project in projects" :key="project.id">
        <el-card class="project-card" shadow="hover" @click="$router.push(`/projects/${project.id}`)">
          <div class="project-type">
            <el-icon size="32" :color="getTypeColor(project.type)">
              <component :is="getTypeIcon(project.type)" />
            </el-icon>
          </div>
          <div class="project-info">
            <h3>{{ project.name }}</h3>
            <p class="project-desc">{{ project.description }}</p>
          </div>
          <div class="project-status">
            <el-tag :type="getStatusType(project.status)" size="small">
              {{ getStatusLabel(project.status) }}
            </el-tag>
            <span class="project-date">
              开始日期: {{ formatDate(project.startDate) }}
            </span>
          </div>
          <div class="project-progress">
            <div class="progress-label">
              <span>完成进度</span>
              <span>{{ project.progress }}%</span>
            </div>
            <el-progress 
              :percentage="project.progress" 
              :stroke-width="8"
              :show-text="false"
              :color="getProgressColor(project.progress)"
            />
          </div>
          <div class="project-consultant">
            <el-avatar :size="28">{{ project.consultant?.name?.[0] }}</el-avatar>
            <span>负责顾问: {{ project.consultant?.name }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-empty v-if="projects.length === 0" description="暂无项目" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Building, Passport, Tickets, Document } from '@element-plus/icons-vue'

// 模拟数据
const projects = ref([
  {
    id: '1',
    name: '新加坡公司注册',
    type: 'company',
    description: 'ABC Technology Pte. Ltd.',
    status: 'IN_PROGRESS',
    progress: 65,
    startDate: '2026-01-10',
    consultant: { name: '李四' },
  },
  {
    id: '2',
    name: 'EP 签证申请',
    type: 'visa',
    description: '就业准证申请',
    status: 'PENDING_DOCS',
    progress: 30,
    startDate: '2026-01-20',
    consultant: { name: '王五' },
  },
  {
    id: '3',
    name: '税务规划咨询',
    type: 'tax',
    description: '企业税收优化方案',
    status: 'NOT_STARTED',
    progress: 0,
    startDate: '2026-02-01',
    consultant: { name: '赵六' },
  },
])

function getTypeIcon(type: string) {
  const map: Record<string, any> = {
    company: Building,
    visa: Passport,
    tax: Tickets,
    default: Document,
  }
  return map[type] || map.default
}

function getTypeColor(type: string): string {
  const map: Record<string, string> = {
    company: '#1a365d',
    visa: '#059669',
    tax: '#d97706',
  }
  return map[type] || '#666'
}

function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    NOT_STARTED: '未开始',
    IN_PROGRESS: '进行中',
    PENDING_DOCS: '等待文件',
    UNDER_REVIEW: '审核中',
    COMPLETED: '已完成',
  }
  return map[status] || status
}

function getStatusType(status: string): 'success' | 'warning' | 'danger' | 'info' {
  const map: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
    NOT_STARTED: 'info',
    IN_PROGRESS: 'warning',
    PENDING_DOCS: 'danger',
    UNDER_REVIEW: 'warning',
    COMPLETED: 'success',
  }
  return map[status] || 'info'
}

function getProgressColor(progress: number): string {
  if (progress >= 80) return '#52c41a'
  if (progress >= 50) return '#1890ff'
  if (progress > 0) return '#fa8c16'
  return '#d9d9d9'
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.project-list {
  max-width: 1200px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 28px;
  color: #1a365d;
  margin: 0 0 8px;
}

.page-header p {
  color: #666;
  margin: 0;
}

.project-card {
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.3s;
  margin-bottom: 24px;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.project-type {
  margin-bottom: 16px;
}

.project-info h3 {
  font-size: 18px;
  color: #1a365d;
  margin: 0 0 8px;
}

.project-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 16px;
}

.project-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.project-date {
  font-size: 12px;
  color: #999;
}

.project-progress {
  margin-bottom: 16px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.project-consultant {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}
</style>
