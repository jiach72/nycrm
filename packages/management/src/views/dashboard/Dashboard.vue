<template>
  <div class="dashboard">
    <div class="header-section">
      <h2 class="page-title">仪表板概览</h2>
      <p class="page-desc">欢迎回来！这是您的线索和任务中心。</p>
    </div>

    <!-- 统计卡片 -->
    <el-row :gutter="24" class="stat-container">
      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-header">
            <span class="stat-label">总线索</span>
            <el-icon class="stat-icon"><User /></el-icon>
          </div>
          <div class="stat-value">{{ leadStats?.total || 0 }}</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-header">
            <span class="stat-label">新线索</span>
            <el-icon class="stat-icon"><TrendCharts /></el-icon>
          </div>
          <div class="stat-value">{{ leadStats?.byStatus?.NEW || 0 }}</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-header">
            <span class="stat-label">当前任务</span>
            <el-icon class="stat-icon"><List /></el-icon>
          </div>
          <div class="stat-value">{{ taskStats?.total || 0 }}</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="never" class="stat-card">
          <div class="stat-header">
            <span class="stat-label">逾期提醒</span>
            <el-icon class="stat-icon" style="color: #ef4444; background: rgba(239, 68, 68, 0.1);"><Warning /></el-icon>
          </div>
          <div class="stat-value">{{ taskStats?.overdue || 0 }}</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <div class="chart-section">
      <el-row :gutter="24">
        <!-- 线索趋势图 -->
        <el-col :span="16">
          <el-card class="data-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="section-title">
                  <el-icon><TrendCharts /></el-icon> 线索增长趋势
                </span>
                <el-radio-group v-model="trendPeriod" size="small">
                  <el-radio-button label="week">本周</el-radio-button>
                  <el-radio-button label="month">本月</el-radio-button>
                </el-radio-group>
              </div>
            </template>
            <div ref="trendChartRef" class="chart-container"></div>
          </el-card>
        </el-col>

        <!-- 线索来源分布 -->
        <el-col :span="8">
          <el-card class="data-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="section-title">
                  <el-icon><PieChart /></el-icon> 线索来源
                </span>
              </div>
            </template>
            <div ref="sourceChartRef" class="chart-container"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 底部操作与列表 -->
    <div class="bottom-section">
      <el-row :gutter="24">
        <!-- 快捷入口 -->
        <el-col :span="8">
          <el-card class="data-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="section-title">
                  <el-icon><Menu /></el-icon> 快捷入口
                </span>
              </div>
            </template>
            <div class="action-grid">
              <div class="action-item" @click="$router.push('/leads/new')">
                <el-icon><Plus /></el-icon>
                <span>新增线索</span>
              </div>
              <div class="action-item">
                <el-icon><Edit /></el-icon>
                <span>创建任务</span>
              </div>
              <div class="action-item">
                <el-icon><Setting /></el-icon>
                <span>系统设置</span>
              </div>
              <div class="action-item">
                <el-icon><User /></el-icon>
                <span>用户管理</span>
              </div>
              <div class="action-item">
                <el-icon><Document /></el-icon>
                <span>报表中心</span>
              </div>
              <div class="action-item">
                <el-icon><Bell /></el-icon>
                <span>消息通知</span>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- 最近活动 (替代原来的漏斗) -->
        <el-col :span="16">
          <el-card class="data-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="section-title">
                  <el-icon><Timer /></el-icon> 最近活动
                </span>
                <el-button link type="primary">查看全部</el-button>
              </div>
            </template>
            <div class="activity-list">
              <div v-for="activity in displayActivities" :key="activity.id" class="activity-item">
                <div class="activity-icon" :class="activity.type">
                  <el-icon v-if="activity.type === 'lead'"><User /></el-icon>
                  <el-icon v-else-if="activity.type === 'call'"><Phone /></el-icon>
                  <el-icon v-else><Document /></el-icon>
                </div>
                <div class="activity-content">
                  <div class="activity-title">
                    <span class="user">{{ activity.user }}</span> 
                    {{ activity.action }} 
                    <span class="target">{{ activity.target }}</span>
                  </div>
                  <div class="activity-time">{{ activity.time }}</div>
                </div>
                <el-tag size="small" :type="activity.statusType">{{ activity.status }}</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useLeadStore, useTaskStore } from '@/stores'
import * as echarts from 'echarts'
import { 
  TrendCharts, User, List, Warning, Plus, Edit, Setting, Menu, 
  PieChart, Timer, Document, Bell, Phone 
} from '@element-plus/icons-vue'

const leadStore = useLeadStore()
const taskStore = useTaskStore()

const { stats: leadStats, activities } = storeToRefs(leadStore)
const { stats: taskStats } = storeToRefs(taskStore)

const trendPeriod = ref('week')
const trendChartRef = ref<HTMLElement | null>(null)
const sourceChartRef = ref<HTMLElement | null>(null)
let trendChart: echarts.ECharts | null = null
let sourceChart: echarts.ECharts | null = null

const displayActivities = computed(() => {
  return activities.value.map(act => {
    return {
      id: act.id,
      type: getActionIconType(act.actionType),
      user: act.actor?.name || '系统',
      action: formatActionType(act.actionType),
      target: act.lead?.contactName || act.entityId,
      time: formatTimeAgo(act.createdAt),
      status: mapActionToStatus(act.actionType),
      statusType: mapActionToStatusType(act.actionType)
    }
  })
})

function getActionIconType(type: string): string {
  if (['CREATED', 'ASSIGNED', 'CONVERTED'].includes(type)) return 'lead'
  if (type === 'CALL') return 'call'
  return 'doc'
}

function formatActionType(type: string): string {
  const map: Record<string, string> = {
    CREATED: '创建了线索',
    UPDATED: '更新了状态',
    ASSIGNED: '分配了线索',
    CONVERTED: '转化了客户'
  }
  return map[type] || '执行了操作'
}

function mapActionToStatus(type: string): string {
  const map: Record<string, string> = {
    CREATED: '新线索',
    UPDATED: '跟进中',
    ASSIGNED: '已分配',
    CONVERTED: '已成交'
  }
  return map[type] || '记录'
}

function mapActionToStatusType(type: string): string {
  const map: Record<string, string> = {
    CREATED: 'primary',
    UPDATED: 'warning',
    ASSIGNED: 'info',
    CONVERTED: 'success'
  }
  return map[type] || 'info'
}

function formatTimeAgo(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins}分钟前`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}小时前`
  return `${Math.floor(diffHours / 24)}天前`
}

const initCharts = () => {
  if (!leadStats.value) return 

  if (trendChartRef.value) {
    if (trendChart) trendChart.dispose()
    trendChart = echarts.init(trendChartRef.value)
    
    const dates = leadStats.value.trend?.map(t => t.date.slice(5)) || []
    const counts = leadStats.value.trend?.map(t => t.count) || []

    trendChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { top: '10%', right: '3%', bottom: '10%', left: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: dates.length ? dates : ['无数据'],
        axisLine: { lineStyle: { color: '#E2E8F0' } },
        axisLabel: { color: '#64748B' }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { type: 'dashed', color: '#E2E8F0' } },
        axisLabel: { color: '#64748B' },
        minInterval: 1
      },
      series: [
        {
          name: '新增线索',
          type: 'line',
          smooth: true,
          data: counts.length ? counts : [0],
          itemStyle: { color: '#0891B2' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(8, 145, 178, 0.2)' },
              { offset: 1, color: 'rgba(8, 145, 178, 0)' }
            ])
          }
        }
      ]
    })
  }

  if (sourceChartRef.value) {
    if (sourceChart) sourceChart.dispose()
    sourceChart = echarts.init(sourceChartRef.value)
    
    // 过滤掉值为0的数据，或保留
    const sourceData = Object.entries(leadStats.value.bySource || {}).map(([name, value]) => ({
      name, value
    })).filter(item => item.value > 0)

    sourceChart.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: '0%', left: 'center', itemWidth: 10, itemHeight: 10, textStyle: { color: '#64748B' } },
      series: [
        {
          name: '线索来源',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: { show: false },
          data: sourceData.length ? sourceData : [{ name: '无数据', value: 0 }]
        }
      ]
    })
  }
}

const handleResize = () => {
  trendChart?.resize()
  sourceChart?.resize()
}

onMounted(async () => {
  await Promise.all([
    leadStore.fetchStats(),
    leadStore.fetchRecentActivities(),
    taskStore.fetchStats()
  ])
  
  nextTick(() => {
    initCharts()
    window.addEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  trendChart?.dispose()
  sourceChart?.dispose()
})
</script>

<style scoped>
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
}

.header-section {
  margin-bottom: 32px;
}

.page-title {
  font-family: 'Lexend', 'PingFang SC', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: var(--color-text);
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}

.page-desc {
  color: var(--color-text-muted);
  font-size: 16px;
}

.stat-container {
  margin-bottom: 24px;
}

.stat-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border) !important;
  background: var(--color-surface) !important;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  padding: 8px;
  box-shadow: var(--shadow-sm);
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-primary) !important;
  box-shadow: var(--shadow-md);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stat-label {
  font-size: 15px;
  color: var(--color-text-muted);
  font-weight: 600;
  white-space: nowrap;
}

.stat-icon {
  font-size: 20px;
  color: var(--color-primary);
  background: rgba(8, 145, 178, 0.05);
  padding: 8px;
  border-radius: 10px;
}

.stat-value {
  font-family: 'Lexend', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.data-card {
  height: 100%;
  background: var(--color-surface) !important;
  border: 1px solid var(--color-border) !important;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}

:deep(.el-card__header) {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
}

:deep(.el-card__body) {
  padding: 24px;
  flex: 1;
}

.chart-section {
  margin-bottom: 24px;
}

.bottom-section {
  margin-bottom: 32px;
}

.chart-container {
  height: 320px;
  width: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.section-title {
  font-family: 'Lexend', 'PingFang SC', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

/* 快捷入口优化 */
.action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 8px 0;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.action-item:hover {
  background-color: var(--color-surface-hover);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.action-item .el-icon {
  font-size: 24px;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.action-item span {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
}

/* 活动列表 */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
}

.activity-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.activity-item:first-child {
  padding-top: 0;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
}

.activity-icon.lead { background: rgba(8, 145, 178, 0.1); color: #0891B2; }
.activity-icon.call { background: rgba(5, 150, 105, 0.1); color: #059669; }
.activity-icon.doc { background: rgba(139, 92, 246, 0.1); color: #8B5CF6; }

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 14px;
  color: var(--color-text);
  margin-bottom: 4px;
}

.activity-title .user {
  font-weight: 700;
  color: var(--color-primary);
}

.activity-title .target {
  font-weight: 600;
}

.activity-time {
  font-size: 12px;
  color: var(--color-text-muted);
}

:deep(.el-progress-bar__outer) {
  background-color: var(--color-surface-hover) !important;
}
</style>
