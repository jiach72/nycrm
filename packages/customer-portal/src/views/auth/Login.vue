<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-left">
        <div class="brand">
          <h1>通海南洋</h1>
          <p>您的专属服务门户</p>
        </div>
        <div class="features">
          <div class="feature-item">
            <el-icon size="24"><Check /></el-icon>
            <span>实时追踪项目进度</span>
          </div>
          <div class="feature-item">
            <el-icon size="24"><Check /></el-icon>
            <span>安全便捷的文档管理</span>
          </div>
          <div class="feature-item">
            <el-icon size="24"><Check /></el-icon>
            <span>与顾问团队即时沟通</span>
          </div>
        </div>
      </div>

      <div class="login-right">
        <div class="login-box">
          <h2>欢迎回来</h2>
          <p class="subtitle">登录您的客户账户</p>

          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            class="login-form"
            @submit.prevent="handleLogin"
          >
            <el-form-item prop="email">
              <el-input
                v-model="form.email"
                placeholder="邮箱地址"
                size="large"
                :prefix-icon="Message"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="密码"
                size="large"
                :prefix-icon="Lock"
                show-password
                @keyup.enter="handleLogin"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                size="large"
                :loading="loading"
                class="login-button"
                @click="handleLogin"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>

          <div class="login-footer">
            <p>需要帮助？请联系您的客户顾问</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Message, Lock, Check } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
})

const rules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6个字符', trigger: 'blur' },
  ],
}

async function handleLogin() {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    
    loading.value = true
    try {
      await authStore.login({
        email: form.email,
        password: form.password,
      })
      
      ElMessage.success('登录成功，欢迎回来')
      
      // 跳转到目标页面
      const redirect = route.query.redirect as string
      router.push(redirect || '/dashboard')
    } catch (error: any) {
      ElMessage.error(error.message || '登录失败，请检查邮箱和密码')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F8FAFC;
  background-image: 
    radial-gradient(at 0% 0%, rgba(8, 145, 178, 0.03) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(34, 197, 94, 0.03) 0px, transparent 50%);
}

.login-container {
  display: flex;
  width: 900px;
  min-height: 550px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
}

.login-left {
  flex: 1;
  background: #FFF;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--color-border);
}

.brand h1 {
  font-family: 'Lexend', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 12px;
  letter-spacing: -0.02em;
}

.brand p {
  font-size: 16px;
  color: var(--color-text-muted);
  margin: 0 0 48px;
  font-family: 'Source Sans 3', sans-serif;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
  font-family: 'Source Sans 3', sans-serif;
}

.feature-item .el-icon {
  color: var(--color-cta);
  background: rgba(5, 150, 105, 0.1);
  padding: 6px;
  border-radius: 6px;
  border: none;
}

.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: #F8FAFC;
}

.login-box {
  width: 100%;
  max-width: 320px;
}

.login-box h2 {
  font-family: 'Lexend', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 6px;
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 14px;
  margin: 0 0 32px;
  font-family: 'Source Sans 3', sans-serif;
}

:deep(.el-input__wrapper) {
  background-color: #FFF !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
  border: 1px solid var(--color-border) !important;
  border-radius: var(--radius-sm) !important;
  padding: 8px 16px;
}

:deep(.el-input__wrapper.is-focus) {
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 2px rgba(8, 145, 178, 0.1) !important;
}

:deep(.el-input__inner) {
  color: var(--color-text) !important;
  height: 48px;
  font-family: 'Source Sans 3', sans-serif;
}

.login-button {
  width: 100%;
  height: 48px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 12px;
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  border-radius: var(--radius-sm);
}

.login-button:hover {
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
}

.login-footer {
  text-align: center;
  margin-top: 24px;
}

.login-footer p {
  font-size: 13px;
  color: var(--color-text-muted);
  font-family: 'Source Sans 3', sans-serif;
}
</style>
