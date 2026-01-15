<template>
  <div class="industries-page">
    <!-- Page Hero -->
    <section class="page-hero gradient-bg">
      <div class="container">
        <h1 class="page-title">{{ $t('industries.pageTitle') }}</h1>
        <p class="page-subtitle">{{ $t('industries.pageSubtitle') }}</p>
      </div>
    </section>

    <!-- Industry Cards Section -->
    <section class="section industries-content">
      <div class="container">
        <div v-for="item in industryItems" :key="item.id" class="industry-card card">
          <el-row :gutter="48" align="middle">
            <el-col :lg="8" :md="24">
              <div class="industry-header">
                <div class="industry-icon">
                  <component :is="getIcon(item.id)" />
                </div>
                <h2 class="industry-title">
                  {{ locale === 'zh-TW' ? item.title : item.titleEn }}
                </h2>
                <div class="industry-divider"></div>
              </div>
            </el-col>
            <el-col :lg="16" :md="24">
              <div class="industry-details">
                <div class="detail-block pain-points">
                  <h3 class="detail-label">
                    <el-icon><Warning /></el-icon>
                    {{ $t('industries.labels.painPoints') }}
                  </h3>
                  <p class="detail-text">{{ item.painPoint }}</p>
                </div>
                <div class="detail-block solution">
                  <h3 class="detail-label">
                    <el-icon><SuccessFilled /></el-icon>
                    {{ $t('industries.labels.solutions') }}
                  </h3>
                  <p class="detail-text">{{ item.solution }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section gradient-bg">
      <div class="container">
        <div class="cta-content text-center">
          <h2 class="cta-title">{{ $t('services.cta.title') }}</h2>
          <p class="cta-subtitle">{{ $t('services.cta.subtitle') }}</p>
          <el-button type="primary" size="large" class="cta-button" @click="goToContact">
            {{ $t('services.cta.button') }}
          </el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { 
  Dish, 
  FirstAidKit, 
  TrendCharts, 
  ShoppingCart, 
  GoldMedal,
  Warning,
  SuccessFilled
} from '@element-plus/icons-vue'

const { t, tm, locale } = useI18n()
const router = useRouter()

const industryItems = computed(() => {
  return tm('industries.items')
})

const getIcon = (id: string) => {
  switch (id) {
    case 'food': return Dish
    case 'pharma': return FirstAidKit
    case 'fintech': return TrendCharts
    case 'ecommerce': return ShoppingCart
    case 'familyoffice': return GoldMedal
    default: return TrendCharts
  }
}

const goToContact = () => {
  router.push('/contact')
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

/* Industry Cards */
.industries-content {
  background: var(--color-bg);
}

.industry-card {
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
  transition: all 0.3s ease;
  border: 1px solid rgba(15, 23, 42, 0.05);
}

.industry-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-accent);
}

.industry-header {
  text-align: center;
}

.industry-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-gold) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  color: white;
  font-size: 2.5rem;
  box-shadow: 0 8px 20px rgba(3, 105, 161, 0.2);
}

.industry-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  line-height: 1.3;
}

.industry-divider {
  width: 40px;
  height: 4px;
  background: var(--color-gold);
  margin: 0 auto;
  border-radius: 2px;
}

.industry-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.detail-block {
  padding-left: var(--spacing-md);
}

.pain-points {
  border-left: 3px solid #EF4444; /* Alert/Warning Red */
}

.solution {
  border-left: 3px solid #10B981; /* Success Green */
}

.detail-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--color-primary);
}

.pain-points .detail-label {
  color: #EF4444;
}

.solution .detail-label {
  color: #10B981;
}

.detail-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0;
}

/* CTA Section */
.cta-section {
  padding: var(--spacing-3xl) 0;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: var(--spacing-md);
}

.cta-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.7;
}

.cta-button {
  padding: 16px 48px;
  font-size: 1.125rem;
  font-weight: 600;
  background: white;
  color: var(--color-primary);
  border-color: white;
  box-shadow: var(--shadow-xl);
}

.cta-button:hover {
  background: var(--color-bg);
  border-color: var(--color-bg);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 991px) {
  .industry-header {
    margin-bottom: var(--spacing-xl);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.25rem;
  }
  
  .industry-title {
    font-size: 1.5rem;
  }
  
  .cta-title {
    font-size: 1.875rem;
  }
}
</style>
