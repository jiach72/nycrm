<template>
  <div class="project-detail">
    <el-button :icon="ArrowLeft" text @click="$router.back()">返回项目列表</el-button>
    
    <!-- 项目头部 -->
    <div class="project-header">
      <div class="header-info">
        <h1>{{ project.name }}</h1>
        <el-tag :type="getStatusType(project.status)" size="large">
          {{ getStatusLabel(project.status) }}
        </el-tag>
      </div>
      <div class="header-meta">
        <span><el-icon><Calendar /></el-icon> 开始: {{ formatDate(project.startDate) }}</span>
        <span><el-icon><Timer /></el-icon> 预计完成: {{ formatDate(project.estimatedCompletionDate) }}</span>
      </div>
    </div>

    <el-row :gutter="24">
      <!-- 左侧：进度时间线 -->
      <el-col :span="16">
        <el-card class="timeline-card">
          <template #header>
            <span>项目进度</span>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="step in project.steps"
              :key="step.id"
              :type="getStepType(step.status)"
              :hollow="step.status === 'pending'"
              :timestamp="step.completedAt || step.estimatedDate"
              placement="top"
            >
              <div class="step-content">
                <div class="step-title">{{ step.title }}</div>
                <div class="step-desc">{{ step.description }}</div>
                <el-tag v-if="step.status === 'current'" type="primary" size="small">
                  当前阶段
                </el-tag>
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

      <!-- 右侧：信息栏 -->
      <el-col :span="8">
        <el-card class="info-card">
          <template #header>
            <span>负责团队</span>
          </template>
          <div class="consultant-info">
            <el-avatar :size="48">{{ project.consultant?.name?.[0] }}</el-avatar>
            <div class="consultant-detail">
              <div class="name">{{ project.consultant?.name }}</div>
              <div class="title">高级顾问</div>
            </div>
          </div>
          <el-button type="primary" style="width: 100%; margin-top: 16px;">
            <el-icon><ChatDotRound /></el-icon> 联系顾问
          </el-button>
        </el-card>

        <el-card class="info-card" style="margin-top: 16px;">
          <template #header>
            <span>相关文档</span>
          </template>
          <div class="doc-list">
            <div v-for="doc in project.documents" :key="doc.id" class="doc-item">
              <el-icon><Document /></el-icon>
              <span>{{ doc.name }}</span>
            </div>
          </div>
          <el-button style="width: 100%; margin-top: 16px;" @click="$router.push('/documents')">
            查看全部文档
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, Calendar, Timer, ChatDotRound, Document } from '@element-plus/icons-vue'

// 模拟数据
const project = ref({
  id: '1',
  name: '新加坡公司注册',
  status: 'IN_PROGRESS',
  startDate: '2026-01-10',
  estimatedCompletionDate: '2026-02-15',
  consultant: { name: '李四' },
  steps: [
    { id: '1', title: '咨询确认', description: '确认服务范围和费用', status: 'completed', completedAt: '2026-01-10' },
    { id: '2', title: '名称核准', description: '提交公司名称申请', status: 'completed', completedAt: '2026-01-15' },
    { id: '3', title: '文件准备', description: '收集股东和董事资料', status: 'current', estimatedDate: '2026-01-28' },
    { id: '4', title: '提交注册', description: '向 ACRA 提交注册申请', status: 'pending', estimatedDate: '2026-02-01' },
    { id: '5', title: '注册完成', description: '获取公司注册证书', status: 'pending', estimatedDate: '2026-02-10' },
  ],
  documents: [
    { id: '1', name: '服务合同.pdf' },
    { id: '2', name: '公司章程模板.docx' },
  ],
})

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

function getStepType(status: string): 'primary' | 'success' | 'info' {
  const map: Record<string, 'primary' | 'success' | 'info'> = {
    completed: 'success',
    current: 'primary',
    pending: 'info',
  }
  return map[status] || 'info'
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.project-detail {
  max-width: 1200px;
}

.project-header {
  background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%);
  border-radius: 16px;
  padding: 32px;
  color: #fff;
  margin: 16px 0 32px;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.header-info h1 {
  margin: 0;
  font-size: 28px;
}

.header-meta {
  display: flex;
  gap: 24px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.header-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.timeline-card, .info-card {
  border-radius: 12px;
}

.step-content {
  padding: 8px 0;
}

.step-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.step-desc {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.consultant-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.consultant-detail .name {
  font-weight: 600;
  color: #333;
}

.consultant-detail .title {
  font-size: 13px;
  color: #666;
}

.doc-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.doc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
}
</style>
