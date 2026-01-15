<template>
  <div class="contact-page">
    <!-- Page Hero -->
    <section class="page-hero gradient-bg">
      <div class="container">
        <h1 class="page-title">聯絡我們</h1>
        <p class="page-subtitle">讓我們了解您的目標，提供專業的解決方案</p>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="section contact-section">
      <div class="container">
        <el-row :gutter="48">
          <!-- Contact Form -->
          <el-col :lg="14" :md="24">
            <div class="contact-form-wrapper">
              <h2 class="form-title">填寫諮詢表單</h2>
              <p class="form-subtitle">請填寫以下信息，我們的顧問將在24小時內與您聯繫，提供初步評估方案。</p>
              
              <el-form 
                ref="contactFormRef"
                :model="contactForm" 
                :rules="formRules"
                label-position="top"
                class="contact-form"
                @submit.prevent="handleSubmit"
              >
                <el-form-item label="姓名" prop="name">
                  <el-input 
                    v-model="contactForm.name" 
                    placeholder="請輸入您的姓名"
                    size="large"
                  />
                </el-form-item>

                <el-form-item label="公司/家族名稱" prop="company">
                  <el-input 
                    v-model="contactForm.company" 
                    placeholder="請輸入公司或家族名稱（選填）"
                    size="large"
                  />
                </el-form-item>

                <el-form-item label="您感興趣的服務" prop="services">
                  <el-checkbox-group v-model="contactForm.services">
                    <el-checkbox label="corporate">企業出海與銀行開戶</el-checkbox>
                    <el-checkbox label="identity">身份規劃 (EP/PR/MM2H)</el-checkbox>
                    <el-checkbox label="asset">資產與稅務架構 (VCC/信託)</el-checkbox>
                    <el-checkbox label="education">教育留學規劃</el-checkbox>
                    <el-checkbox label="other">其他</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="預計啟動時間" prop="timeline">
                  <el-radio-group v-model="contactForm.timeline">
                    <el-radio label="1month">1個月內急需</el-radio>
                    <el-radio label="3months">3個月內</el-radio>
                    <el-radio label="6months">半年內規劃</el-radio>
                    <el-radio label="exploring">僅先了解/觀望</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="聯絡方式" prop="contactMethod">
                  <el-input 
                    v-model="contactForm.contactMethod" 
                    placeholder="手機/微信/WhatsApp/Email"
                    size="large"
                  />
                </el-form-item>

                <el-form-item label="補充說明" prop="message">
                  <el-input 
                    v-model="contactForm.message" 
                    type="textarea"
                    :rows="4"
                    placeholder="請告訴我們更多關於您的需求..."
                  />
                </el-form-item>

                <el-form-item>
                  <el-button 
                    type="primary" 
                    size="large" 
                    class="submit-button"
                    :loading="submitting"
                    @click="handleSubmit"
                  >
                    送出諮詢
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>

          <!-- Contact Info -->
          <el-col :lg="10" :md="24">
            <div class="contact-info-wrapper">
              <div class="contact-info-card card">
                <h3>聯絡信息</h3>
                
                <div class="info-item">
                  <el-icon class="info-icon"><Location /></el-icon>
                  <div>
                    <h4>地址</h4>
                    <p>新加坡總部（具體地址待補充）</p>
                  </div>
                </div>

                <div class="info-item">
                  <el-icon class="info-icon"><Message /></el-icon>
                  <div>
                    <h4>Email</h4>
                    <p><a href="mailto:contact@tonghainanyang.com">contact@tonghainanyang.com</a></p>
                  </div>
                </div>

                <div class="info-item">
                  <el-icon class="info-icon"><Clock /></el-icon>
                  <div>
                    <h4>工作時間</h4>
                    <p>Mon - Fri, 9:00 AM - 6:00 PM (SGT)</p>
                  </div>
                </div>
              </div>

              <div class="why-contact card">
                <h4>為什麼選擇我們？</h4>
                <ul>
                  <li><el-icon><Check /></el-icon><span>專業團隊，持牌顧問</span></li>
                  <li><el-icon><Check /></el-icon><span>全方位一站式服務</span></li>
                  <li><el-icon><Check /></el-icon><span>透明合規，可追溯</span></li>
                  <li><el-icon><Check /></el-icon><span>長期陪跑，承諾服務</span></li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Location, Message, Clock, Check } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface ContactForm {
  name: string
  company: string
  services: string[]
  timeline: string
  contactMethod: string
  message: string
}

const contactFormRef = ref<FormInstance>()
const submitting = ref(false)

const contactForm = reactive<ContactForm>({
  name: '',
  company: '',
  services: [],
  timeline: '',
  contactMethod: '',
  message: ''
})

const formRules: FormRules = {
  name: [
    { required: true, message: '请输入您的姓名', trigger: 'blur' }
  ],
  contactMethod: [
    { required: true, message: '请提供联系方式', trigger: 'blur' }
  ],
  services: [
    { required: true, message: '请至少选择一项服务', trigger: 'change' }
  ]
}

interface ServiceOption {
  value: string
}

interface TimelineOption {
  value: string
}

const serviceOptions: ServiceOption[] = [
  { value: 'corporate' },
  { value: 'identity' },
  { value: 'asset' },
  { value: 'education' },
  { value: 'other' }
]

const timelineOptions: TimelineOption[] = [
  { value: '1month' },
  { value: '3months' },
  { value: '6months' },
  { value: 'exploring' }
]

const whyContactReasons = [0, 1, 2, 3]

const handleSubmit = async (): Promise<void> => {
  if (!contactFormRef.value) return

  await contactFormRef.value.validate((valid) => {
    if (valid) {
      submitting.value = true
      
      // 模拟提交
      setTimeout(() => {
        ElMessage.success(t('contact.form.successMessage'))
        submitting.value = false
        contactFormRef.value?.resetFields()
      }, 1500)

      // TODO: 实际项目中应该调用API提交表单
      console.log('提交表单:', contactForm)
    } else {
      ElMessage.error(t('contact.form.errorMessage'))
    }
  })
}
</script>

<style scoped>
/* Page Hero */
.page-hero {
  padding: var(--spacing-3xl) 0;
  text-align: center;
  color: white;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: var(--spacing-md);
}

.page-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto;
}

/* Contact Section */
.contact-section {
  background: var(--color-bg);
}

.contact-form-wrapper {
  background: white;
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.form-subtitle {
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.6;
}

.contact-form .el-form-item {
  margin-bottom: var(--spacing-lg);
}

.contact-form :deep(.el-form-item__label) {
  font-weight: 600;
  color: var(--color-primary);
}

.contact-form :deep(.el-checkbox) {
  display: block;
  margin-bottom: var(--spacing-sm);
}

.contact-form :deep(.el-radio) {
  display: block;
  margin-bottom: var(--spacing-sm);
}

.submit-button {
  width: 100%;
  padding: 16px;
  font-size: 1.125rem;
  font-weight: 600;
}

/* Contact Info */
.contact-info-wrapper {
  position: sticky;
  top: 100px;
}

.contact-info-card {
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-lg);
}

.contact-info-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
}

.info-item {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-icon {
  width: 48px;
  height: 48px;
  background: rgba(3, 105, 161, 0.1);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  font-size: 1.5rem;
  flex-shrink: 0;
}

.info-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.info-item p {
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}

.info-item a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

.info-item a:hover {
  color: var(--color-accent-hover);
}

/* Why Contact */
.why-contact {
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, rgba(3, 105, 161, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%);
  border-left: 4px solid var(--color-accent);
}

.why-contact h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.why-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.why-contact li {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
  line-height: 1.6;
}

.why-contact li:last-child {
  margin-bottom: 0;
}

.why-contact .el-icon {
  color: var(--color-accent);
  font-size: 1.125rem;
  margin-top: 2px;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-info-wrapper {
    position: static;
    margin-top: var(--spacing-2xl);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .form-title {
    font-size: 1.5rem;
  }

  .contact-form-wrapper {
    padding: var(--spacing-lg);
  }

  .contact-info-card {
    padding: var(--spacing-lg);
  }
}
</style>
