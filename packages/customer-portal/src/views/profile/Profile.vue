<template>
  <div class="profile">
    <div class="page-header">
      <h1>个人资料</h1>
      <p>管理您的账户信息和偏好设置</p>
    </div>

    <el-row :gutter="24">
      <el-col :span="16" :xs="24">
        <el-card class="profile-card" v-loading="profileLoading">
          <template #header>
            <span>基本信息</span>
          </template>
          <el-form :model="profileForm" label-width="100px">
            <el-form-item label="姓名">
              <el-input v-model="profileForm.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input :model-value="user?.email" disabled />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="profileForm.phone" placeholder="请输入电话" />
            </el-form-item>
            <el-form-item label="公司">
              <el-input v-model="profileForm.company" placeholder="请输入公司名称" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSaveProfile" :loading="savingProfile">
                保存修改
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="profile-card" style="margin-top: 24px;">
          <template #header>
            <span>修改密码</span>
          </template>
          <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="100px">
            <el-form-item label="当前密码" prop="currentPassword">
              <el-input 
                v-model="passwordForm.currentPassword" 
                type="password" 
                placeholder="请输入当前密码" 
                show-password 
              />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input 
                v-model="passwordForm.newPassword" 
                type="password" 
                placeholder="请输入新密码（至少8位）" 
                show-password 
              />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input 
                v-model="passwordForm.confirmPassword" 
                type="password" 
                placeholder="请确认新密码" 
                show-password 
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleChangePassword" :loading="changingPassword">
                修改密码
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="8" :xs="24">
        <el-card class="avatar-card">
          <div class="avatar-section">
            <el-avatar :size="100">{{ profileForm.name?.[0] || 'U' }}</el-avatar>
            <div class="avatar-info">
              <h3>{{ profileForm.name || user?.name }}</h3>
              <p>客户账户</p>
            </div>
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
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useAuthStore } from '@/stores'
import { portalApi } from '@/api'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const profileLoading = ref(false)
const savingProfile = ref(false)
const changingPassword = ref(false)
const passwordFormRef = ref<FormInstance>()

// 个人资料表单
const profileForm = reactive({
  name: '',
  phone: '',
  company: '',
})

// 密码表单
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 密码验证规则
const validateConfirmPassword = (_rule: any, value: string, callback: any) => {
  if (value !== passwordForm.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const passwordRules: FormRules = {
  currentPassword: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 8, message: '密码至少8个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
}

// 通知设置
const notifications = reactive({
  email: true,
  sms: false,
  projectUpdate: true,
  documentReminder: true,
})

// 加载个人资料
async function loadProfile() {
  profileLoading.value = true
  try {
    const data = await portalApi.getProfile() as any
    profileForm.name = data.name || ''
    profileForm.phone = data.phone || ''
    profileForm.company = data.company || ''
  } catch (error: any) {
    ElMessage.error(error.message || '加载资料失败')
  } finally {
    profileLoading.value = false
  }
}

// 保存个人资料
async function handleSaveProfile() {
  savingProfile.value = true
  try {
    await portalApi.updateProfile({
      name: profileForm.name,
      phone: profileForm.phone,
      company: profileForm.company,
    })
    ElMessage.success('资料保存成功')
    // 更新本地用户名
    if (user.value) {
      user.value.name = profileForm.name
    }
  } catch (error: any) {
    ElMessage.error(error.message || '保存失败')
  } finally {
    savingProfile.value = false
  }
}

// 修改密码
async function handleChangePassword() {
  if (!passwordFormRef.value) return

  await passwordFormRef.value.validate(async (valid) => {
    if (!valid) return

    changingPassword.value = true
    try {
      await portalApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })
      ElMessage.success('密码修改成功')
      // 重置表单
      passwordForm.currentPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    } catch (error: any) {
      ElMessage.error(error.message || '密码修改失败')
    } finally {
      changingPassword.value = false
    }
  })
}

onMounted(() => {
  loadProfile()
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
