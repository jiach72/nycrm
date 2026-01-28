<template>
  <div class="profile">
    <div class="page-header">
      <h1>个人资料</h1>
      <p>管理您的账户信息和偏好设置</p>
    </div>

    <el-row :gutter="24">
      <el-col :span="16">
        <el-card class="profile-card">
          <template #header>
            <span>基本信息</span>
          </template>
          <el-form label-width="100px">
            <el-form-item label="姓名">
              <el-input :value="user?.name" disabled />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input :value="user?.email" disabled />
            </el-form-item>
            <el-form-item label="电话">
              <el-input value="+86 138 0000 1234" />
            </el-form-item>
            <el-form-item label="公司">
              <el-input value="ABC Technology Ltd" />
            </el-form-item>
            <el-form-item label="地址">
              <el-input value="北京市朝阳区建国路88号" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存修改</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="profile-card" style="margin-top: 24px;">
          <template #header>
            <span>修改密码</span>
          </template>
          <el-form label-width="100px">
            <el-form-item label="当前密码">
              <el-input type="password" placeholder="请输入当前密码" show-password />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input type="password" placeholder="请输入新密码" show-password />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input type="password" placeholder="请确认新密码" show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">修改密码</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="avatar-card">
          <div class="avatar-section">
            <el-avatar :size="100">{{ user?.name?.[0] || 'U' }}</el-avatar>
            <div class="avatar-info">
              <h3>{{ user?.name }}</h3>
              <p>客户账户</p>
            </div>
            <el-button size="small">更换头像</el-button>
          </div>
        </el-card>

        <el-card class="notification-card" style="margin-top: 24px;">
          <template #header>
            <span>通知设置</span>
          </template>
          <div class="notification-options">
            <div class="option-item">
              <span>邮件通知</span>
              <el-switch v-model="notifications.email" />
            </div>
            <div class="option-item">
              <span>短信通知</span>
              <el-switch v-model="notifications.sms" />
            </div>
            <div class="option-item">
              <span>项目更新</span>
              <el-switch v-model="notifications.projectUpdate" />
            </div>
            <div class="option-item">
              <span>文档提醒</span>
              <el-switch v-model="notifications.documentReminder" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const notifications = reactive({
  email: true,
  sms: false,
  projectUpdate: true,
  documentReminder: true,
})
</script>

<style scoped>
.profile {
  max-width: 1000px;
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

.profile-card, .avatar-card, .notification-card {
  border-radius: 12px;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px 0;
}

.avatar-info {
  text-align: center;
}

.avatar-info h3 {
  margin: 0;
  color: #333;
}

.avatar-info p {
  margin: 4px 0 0;
  color: #999;
  font-size: 13px;
}

.notification-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #333;
}
</style>
