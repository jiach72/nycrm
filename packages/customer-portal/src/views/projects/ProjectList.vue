<template>
  <div class="project-list" v-loading="isLoading">
    <div class="page-header">
      <h1>我的项目</h1>
      <p>查看和追踪您所有服务项目的进度</p>
    </div>

    <el-row :gutter="24">
      <el-col :span="8" v-for="project in (projects || [])" :key="project.id" :xs="24" :sm="12" :md="8">
        <el-card class="project-card" shadow="hover" @click="$router.push(`/projects/${project.id}`)">
          <div class="project-type">
            <el-icon size="32" :color="getTypeColor(project.projectType)">
              <component :is="getTypeIcon(project.projectType)" />
            </el-icon>
          </div>
          <div class="project-info">
            <h3>{{ project.title || '无标题项目' }}</h3>
            <p class="project-desc">{{ project.description || '暂无详细描述' }}</p>
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
              <span>{{ project.completionPercentage || 0 }}%</span>
            </div>
            <el-progress 
              :percentage="project.completionPercentage || 0" 
              :stroke-width="8"
              :show-text="false"
              :color="getProgressColor(project.completionPercentage || 0)"
            />
          </div>
          <div class="project-consultant">
            <el-avatar :size="20">{{ project.consultant?.name?.[0] || '管' }}</el-avatar>
            <span>项目负责人: {{ project.consultant?.name || '指派中' }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-empty v-if="!isLoading && (!projects || projects.length === 0)" description="暂无项目" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { OfficeBuilding, Stamp, Tickets, Document } from '@element-plus/icons-vue'
import { useProjectStore } from '@/stores/projectStore'

const projectStore = useProjectStore()
const { projects, isLoading } = storeToRefs(projectStore)

onMounted(() => {
  projectStore.fetchMyProjects()
})

function getTypeIcon(type: string) {
  const map: Record<string, any> = {
    'Enterprise Setup': OfficeBuilding,
    'EP Application': Stamp,
    'Tax Planning': Tickets,
    default: Document,
  }
  return map[type] || map.default
}

function getTypeColor(type: string): string {
  const map: Record<string, string> = {
    'Enterprise Setup': '#1a365d',
    'EP Application': '#059669',
    'Tax Planning': '#d97706',
  }
  return map[type] || '#666'
}

function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    PLANNING: '规划中',
    ACTIVE: '进行中',
    ON_HOLD: '暂停',
    COMPLETED: '已完成',
    ARCHIVED: '归档'
  }
  return map[status] || status
}

function getStatusType(status: string): 'success' | 'warning' | 'danger' | 'info' {
  const map: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
    PLANNING: 'info',
    ACTIVE: 'success',
    ON_HOLD: 'warning',
    COMPLETED: 'success',
    ARCHIVED: 'info'
  }
  return map[status] || 'info'
}

function getProgressColor(progress: number): string {
  if (progress >= 80) return '#52c41a'
  if (progress >= 50) return '#1890ff'
  if (progress > 0) return '#fa8c16'
  return '#d9d9d9'
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
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
