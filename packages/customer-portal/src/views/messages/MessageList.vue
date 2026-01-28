<template>
  <div class="message-list">
    <div class="page-header">
      <h1>消息中心</h1>
      <p>与您的顾问团队保持沟通</p>
    </div>

    <el-row :gutter="24">
      <!-- 消息列表 -->
      <el-col :span="8">
        <el-card class="conversation-list">
          <div 
            v-for="conv in conversations" 
            :key="conv.id" 
            class="conversation-item"
            :class="{ active: selectedConversation?.id === conv.id }"
            @click="selectedConversation = conv"
          >
            <el-badge :is-dot="conv.unread > 0">
              <el-avatar :size="40">{{ conv.consultant?.name?.[0] }}</el-avatar>
            </el-badge>
            <div class="conv-info">
              <div class="conv-header">
                <span class="conv-name">{{ conv.consultant?.name }}</span>
                <span class="conv-time">{{ formatTime(conv.lastMessageAt) }}</span>
              </div>
              <div class="conv-preview">{{ conv.lastMessage }}</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 消息详情 -->
      <el-col :span="16">
        <el-card class="message-detail" v-if="selectedConversation">
          <template #header>
            <div class="detail-header">
              <el-avatar>{{ selectedConversation.consultant?.name?.[0] }}</el-avatar>
              <div class="consultant-info">
                <div class="name">{{ selectedConversation.consultant?.name }}</div>
                <div class="project">{{ selectedConversation.project }}</div>
              </div>
            </div>
          </template>

          <div class="message-container">
            <div 
              v-for="msg in selectedConversation.messages" 
              :key="msg.id"
              class="message-bubble"
              :class="{ mine: msg.isMine }"
            >
              <div class="bubble-content">{{ msg.content }}</div>
              <div class="bubble-time">{{ formatTime(msg.createdAt) }}</div>
            </div>
          </div>

          <div class="message-input">
            <el-input
              v-model="newMessage"
              placeholder="输入消息..."
              @keyup.enter="sendMessage"
            />
            <el-button type="primary" @click="sendMessage">发送</el-button>
          </div>
        </el-card>
        
        <el-empty v-else description="选择一个对话开始聊天" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const newMessage = ref('')

// 模拟数据
const conversations = ref([
  {
    id: '1',
    consultant: { name: '李四' },
    project: '新加坡公司注册',
    lastMessage: '请您尽快提供股东护照扫描件',
    lastMessageAt: '2026-01-28T10:30:00',
    unread: 2,
    messages: [
      { id: '1', content: '您好，很高兴为您服务', createdAt: '2026-01-28T09:00:00', isMine: false },
      { id: '2', content: '您好，我想咨询公司注册进度', createdAt: '2026-01-28T09:05:00', isMine: true },
      { id: '3', content: '公司名称已经核准通过，现在需要准备股东资料', createdAt: '2026-01-28T09:10:00', isMine: false },
      { id: '4', content: '请您尽快提供股东护照扫描件', createdAt: '2026-01-28T10:30:00', isMine: false },
    ],
  },
  {
    id: '2',
    consultant: { name: '王五' },
    project: 'EP 签证申请',
    lastMessage: '签证材料已收到，正在整理',
    lastMessageAt: '2026-01-27T16:20:00',
    unread: 0,
    messages: [
      { id: '1', content: '签证材料已收到，正在整理', createdAt: '2026-01-27T16:20:00', isMine: false },
    ],
  },
])

const selectedConversation = ref(conversations.value[0])

function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60 * 1000) return '刚刚'
  if (diff < 60 * 60 * 1000) return `${Math.floor(diff / 60000)} 分钟前`
  if (diff < 24 * 60 * 60 * 1000) return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  return date.toLocaleDateString('zh-CN')
}

function sendMessage() {
  if (!newMessage.value.trim()) return
  
  if (selectedConversation.value) {
    selectedConversation.value.messages.push({
      id: Date.now().toString(),
      content: newMessage.value,
      createdAt: new Date().toISOString(),
      isMine: true,
    })
    selectedConversation.value.lastMessage = newMessage.value
    selectedConversation.value.lastMessageAt = new Date().toISOString()
  }
  
  newMessage.value = ''
  ElMessage.success('消息已发送')
}
</script>

<style scoped>
.message-list {
  max-width: 1200px;
}

.page-header {
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

.conversation-list {
  height: 600px;
  overflow-y: auto;
}

.conversation-list :deep(.el-card__body) {
  padding: 0;
}

.conversation-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.3s;
}

.conversation-item:hover,
.conversation-item.active {
  background: #f5f7fa;
}

.conv-info {
  flex: 1;
  overflow: hidden;
}

.conv-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.conv-name {
  font-weight: 500;
  color: #333;
}

.conv-time {
  font-size: 12px;
  color: #999;
}

.conv-preview {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.message-detail {
  height: 600px;
  display: flex;
  flex-direction: column;
}

.message-detail :deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.consultant-info .name {
  font-weight: 500;
  color: #333;
}

.consultant-info .project {
  font-size: 12px;
  color: #999;
}

.message-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-bubble {
  max-width: 70%;
  align-self: flex-start;
}

.message-bubble.mine {
  align-self: flex-end;
}

.bubble-content {
  padding: 12px 16px;
  background: #f0f0f0;
  border-radius: 16px 16px 16px 4px;
  font-size: 14px;
  color: #333;
}

.message-bubble.mine .bubble-content {
  background: #1a365d;
  color: #fff;
  border-radius: 16px 16px 4px 16px;
}

.bubble-time {
  font-size: 11px;
  color: #999;
  margin-top: 4px;
  text-align: right;
}

.message-input {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

.message-input .el-input {
  flex: 1;
}
</style>
