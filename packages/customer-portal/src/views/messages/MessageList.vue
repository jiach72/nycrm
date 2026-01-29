<template>
  <div class="message-list">
    <div class="page-header">
      <div class="header-content">
        <h1>消息中心</h1>
        <p>接收来自顾问团队的通知和提醒</p>
      </div>
      <div class="header-actions">
        <el-badge :value="unreadCount" :hidden="unreadCount === 0">
          <el-button :icon="Bell" circle />
        </el-badge>
        <el-button @click="markAllRead" :loading="markingAll" :disabled="unreadCount === 0">
          全部已读
        </el-button>
      </div>
    </div>

    <!-- 筛选标签 -->
    <el-tabs v-model="activeTab" @tab-change="handleTabChange">
      <el-tab-pane label="全部消息" name="all" />
      <el-tab-pane label="未读" name="unread" />
      <el-tab-pane label="项目相关" name="PROJECT" />
      <el-tab-pane label="系统通知" name="SYSTEM" />
    </el-tabs>

    <!-- 消息列表 -->
    <div v-loading="loading">
      <div v-if="messages && messages.length > 0" class="message-items">
        <div 
          v-for="msg in (messages || [])" 
          :key="msg.id" 
          class="message-item"
          :class="{ unread: !msg.isRead }"
          @click="openMessage(msg)"
        >
          <div class="message-icon" :class="(msg.type || 'default').toLowerCase()">
            <el-icon v-if="msg.type === 'SYSTEM'"><Bell /></el-icon>
            <el-icon v-else-if="msg.type === 'PROJECT'"><Folder /></el-icon>
            <el-icon v-else-if="msg.type === 'DOCUMENT'"><Document /></el-icon>
            <el-icon v-else-if="msg.type === 'PAYMENT'"><CreditCard /></el-icon>
            <el-icon v-else><ChatLineRound /></el-icon>
          </div>
          <div class="message-content">
            <div class="message-header">
              <span class="message-title">{{ msg.title || '无标题消息' }}</span>
              <span class="message-time">{{ formatTime(msg.createdAt) }}</span>
            </div>
            <div class="message-preview">{{ msg.content || '无内容' }}</div>
            <div class="message-meta" v-if="msg.sender || msg.project">
              <span class="sender" v-if="msg.sender">来自: {{ msg.sender.name || '系统' }}</span>
              <el-tag v-if="msg.project" size="small" type="info">{{ msg.project.title || '关联项目' }}</el-tag>
            </div>
          </div>
          <div class="message-status">
            <el-tag v-if="!msg.isRead" size="small" type="danger">未读</el-tag>
          </div>
        </div>
      </div>
      <el-empty v-else description="暂无消息" />

      <!-- 分页 -->
      <div v-if="total > limit" class="pagination">
        <el-pagination
          v-model:current-page="page"
          :page-size="limit"
          :total="total"
          layout="prev, pager, next"
          @current-change="loadMessages"
        />
      </div>
    </div>

    <!-- 消息详情弹窗 -->
    <el-dialog v-model="showDetail" :title="selectedMessage?.title" width="600px">
      <div v-if="selectedMessage" class="message-detail">
        <div class="detail-meta">
          <el-avatar :size="40">{{ selectedMessage.sender?.name?.[0] }}</el-avatar>
          <div class="meta-info">
            <div class="sender-name">{{ selectedMessage.sender?.name }}</div>
            <div class="send-time">{{ formatDateTime(selectedMessage.createdAt) }}</div>
          </div>
          <el-tag :type="getTypeTagType(selectedMessage.type)" size="small">
            {{ getTypeLabel(selectedMessage.type) }}
          </el-tag>
        </div>
        <el-divider />
        <div class="detail-content" v-html="formatContent(selectedMessage.content)"></div>
        <div v-if="selectedMessage.project" class="detail-project">
          <el-button link type="primary" @click="goToProject(selectedMessage.project.id)">
            <el-icon><Folder /></el-icon> 查看相关项目: {{ selectedMessage.project.title }}
          </el-button>
        </div>
      </div>
      <template #footer>
        <el-button @click="deleteMessage" type="danger" plain>删除</el-button>
        <el-button @click="showDetail = false" type="primary">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Bell, Folder, Document, CreditCard, ChatLineRound } from '@element-plus/icons-vue'
import { portalApi } from '@/api'

const router = useRouter()

const loading = ref(false)
const markingAll = ref(false)
const activeTab = ref('all')
const messages = ref<any[]>([])
const page = ref(1)
const limit = ref(20)
const total = ref(0)
const unreadCount = ref(0)

const showDetail = ref(false)
const selectedMessage = ref<any>(null)

// 加载消息列表
async function loadMessages() {
  loading.value = true
  try {
    const params: any = { page: page.value, limit: limit.value }
    
    if (activeTab.value === 'unread') {
      params.isRead = false
    } else if (['PROJECT', 'SYSTEM', 'DOCUMENT', 'PAYMENT'].includes(activeTab.value)) {
      params.type = activeTab.value
    }

    const result = await portalApi.getMessages(params) as any
    messages.value = result.messages || []
    total.value = result.total || 0
  } catch (error: any) {
    ElMessage.error(error.message || '加载消息失败')
  } finally {
    loading.value = false
  }
}

// 加载未读数量
async function loadUnreadCount() {
  try {
    const result = await portalApi.getUnreadCount() as any
    unreadCount.value = result.unreadCount || 0
  } catch {
    // 忽略
  }
}

// 切换标签
function handleTabChange() {
  page.value = 1
  loadMessages()
}

// 打开消息详情
async function openMessage(msg: any) {
  selectedMessage.value = msg
  showDetail.value = true

  // 如果未读，标记为已读
  if (!msg.isRead) {
    try {
      await portalApi.markMessageAsRead(msg.id)
      msg.isRead = true
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    } catch {
      // 忽略
    }
  }
}

// 全部标记为已读
async function markAllRead() {
  markingAll.value = true
  try {
    await portalApi.markAllMessagesAsRead()
    messages.value.forEach(m => m.isRead = true)
    unreadCount.value = 0
    ElMessage.success('已全部标记为已读')
  } catch (error: any) {
    ElMessage.error(error.message || '操作失败')
  } finally {
    markingAll.value = false
  }
}

// 删除消息
async function deleteMessage() {
  if (!selectedMessage.value) return

  try {
    await ElMessageBox.confirm('确定要删除这条消息吗？', '提示', { type: 'warning' })
    await portalApi.deleteMessage(selectedMessage.value.id)
    messages.value = messages.value.filter(m => m.id !== selectedMessage.value.id)
    showDetail.value = false
    ElMessage.success('消息已删除')
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || '删除失败')
    }
  }
}

// 跳转到项目
function goToProject(projectId: string) {
  showDetail.value = false
  router.push(`/projects/${projectId}`)
}

// 格式化时间
function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`
  
  return date.toLocaleDateString('zh-CN')
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('zh-CN')
}

function formatContent(content: string): string {
  return content.replace(/\n/g, '<br>')
}

function getTypeLabel(type: string): string {
  const map: Record<string, string> = {
    SYSTEM: '系统通知',
    PROJECT: '项目相关',
    DOCUMENT: '文档相关',
    PAYMENT: '付款相关',
    REMINDER: '提醒',
    ANNOUNCEMENT: '公告',
  }
  return map[type] || type
}

function getTypeTagType(type: string): 'success' | 'warning' | 'danger' | 'info' {
  const map: Record<string, any> = {
    SYSTEM: 'info',
    PROJECT: 'success',
    DOCUMENT: 'warning',
    PAYMENT: 'danger',
    REMINDER: 'warning',
    ANNOUNCEMENT: 'info',
  }
  return map[type] || 'info'
}

onMounted(() => {
  loadMessages()
  loadUnreadCount()
})
</script>

<style scoped>
.message-list {
  max-width: 900px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
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

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.message-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 20px;
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.message-item:hover {
  border-color: #1a365d;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.message-item.unread {
  background: #f8fafc;
  border-left: 3px solid #1a365d;
}

.message-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.message-icon.system { background: #e8f4fd; color: #1890ff; }
.message-icon.project { background: #e6f7e6; color: #52c41a; }
.message-icon.document { background: #fff7e6; color: #fa8c16; }
.message-icon.payment { background: #fff1f0; color: #ff4d4f; }
.message-icon.reminder { background: #f5f0ff; color: #722ed1; }
.message-icon.announcement { background: #e6fffb; color: #13c2c2; }

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.message-title {
  font-weight: 600;
  color: #333;
  font-size: 15px;
}

.message-time {
  font-size: 12px;
  color: #999;
}

.message-preview {
  color: #666;
  font-size: 13px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}

.message-status {
  flex-shrink: 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.message-detail .detail-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta-info {
  flex: 1;
}

.sender-name {
  font-weight: 600;
  color: #333;
}

.send-time {
  font-size: 12px;
  color: #999;
}

.detail-content {
  line-height: 1.8;
  color: #333;
}

.detail-project {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}
</style>
