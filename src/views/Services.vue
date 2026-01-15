<template>
  <div class="services-page">
    <!-- Page Hero -->
    <section class="page-hero gradient-bg">
      <div class="container">
        <h1 class="page-title">{{ $t('services.pageTitle') }}</h1>
        <p class="page-subtitle">{{ $t('services.pageSubtitle') }}</p>
      </div>
    </section>

    <!-- Services Navigation Tabs -->
    <section class="section">
      <div class="container">
        <el-tabs v-model="activeTab" class="services-tabs">
          <!-- Corporate Services -->
          <el-tab-pane :label="$t('services.corporate.title')" name="corporate">
            <div class="service-content">
              <h2 class="service-title">{{ $t('services.corporate.title') }}</h2>
              <p class="service-intro">{{ $t('services.corporate.intro') }}</p>
              
              <div class="service-section">
                <h3>{{ $t('services.corporate.basic.title') }}</h3>
                <el-row :gutter="20">
                  <el-col 
                    v-for="(item, index) in corporateBasicServices" 
                    :key="index"
                    :lg="8" 
                    :md="12" 
                    :sm="24"
                  >
                    <div class="service-item card">
                      <el-icon><OfficeBuilding /></el-icon>
                      <h4>{{ $t(`services.corporate.basic.items.${index}`) }}</h4>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="service-section">
                <h3>{{ $t('services.corporate.banking.title') }}</h3>
                
                <!-- Priority Banking Table -->
                <div class="banking-section">
                  <h4>{{ $t('services.corporate.banking.priority.title') }}</h4>
                  <el-table :data="priorityBankingData" stripe class="banking-table">
                    <el-table-column prop="bank" :label="$t('services.corporate.banking.priority.bank')" />
                    <el-table-column prop="requirement" :label="$t('services.corporate.banking.priority.requirement')" />
                  </el-table>
                </div>

                <!-- Private Banking -->
                <div class="banking-section private-banking">
                  <h4>{{ $t('services.corporate.banking.private.title') }}</h4>
                  <div class="banking-tiers">
                    <div class="tier-card card">
                      <div class="tier-badge tier-top">{{ $t('services.corporate.banking.private.top') }}</div>
                      <p class="tier-requirement">US$30M+</p>
                      <p class="tier-banks">JPM 摩根大通</p>
                    </div>
                    <div class="tier-card card">
                      <div class="tier-badge tier-core">{{ $t('services.corporate.banking.private.core') }}</div>
                      <p class="tier-requirement">US$5M+</p>
                      <p class="tier-banks">UBS, Bank of Singapore, UOB Private, HSBC Private,  SCB Private, Pictet Bank</p>
                    </div>
                    <div class="tier-card card">
                      <div class="tier-badge tier-select">{{ $t('services.corporate.banking.private.select') }}</div>
                      <p class="tier-requirement">US$3M+</p>
                      <p class="tier-banks">LGT Bank, VP 睿盛銀行</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- Asset Management -->
          <el-tab-pane :label="$t('services.asset.title')" name="asset">
            <div class="service-content">
              <h2 class="service-title">{{ $t('services.asset.title') }}</h2>
              <p class="service-intro">{{ $t('services.asset.intro') }}</p>
              
              <el-row :gutter="32">
                <el-col :lg="12" :md="24">
                  <div class="service-section">
                    <h3>{{ $t('services.asset.financial.title') }}</h3>
                    <ul class="service-list">
                      <li v-for="(item, index) in financialServices" :key="index">
                        <el-icon><Check /></el-icon>
                        <span>{{ $t(`services.asset.financial.items.${index}`) }}</span>
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :lg="12" :md="24">
                  <div class="service-section">
                    <h3>{{ $t('services.asset.realestate.title') }}</h3>
                    <ul class="service-list">
                      <li v-for="(item, index) in realestateServices" :key="index">
                        <el-icon><Check /></el-icon>
                        <span>{{ $t(`services.asset.realestate.items.${index}`) }}</span>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>

          <!-- Identity Planning -->
          <el-tab-pane :label="$t('services.identity.title')" name="identity">
            <div class="service-content">
              <h2 class="service-title">{{ $t('services.identity.title') }}</h2>
              <p class="service-intro">{{ $t('services.identity.intro') }}</p>
              
              <el-row :gutter="32">
                <el-col :lg="12" :md="24">
                  <div class="service-section">
                    <h3>{{ $t('services.identity.singapore.title') }}</h3>
                    <ul class="service-list">
                      <li v-for="(item, index) in singaporeIdentity" :key="index">
                        <el-icon><Check /></el-icon>
                        <span>{{ $t(`services.identity.singapore.items.${index}`) }}</span>
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :lg="12" :md="24">
                  <div class="service-section">
                    <h3>{{ $t('services.identity.malaysia.title') }}</h3>
                    <ul class="service-list">
                      <li v-for="(item, index) in malaysiaIdentity" :key="index">
                        <el-icon><Check /></el-icon>
                        <span>{{ $t(`services.identity.malaysia.items.${index}`) }}</span>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>

          <!-- Education -->
          <el-tab-pane :label="$t('services.education.title')" name="education">
            <div class="service-content">
              <h2 class="service-title">{{ $t('services.education.title') }}</h2>
              <p class="service-intro">{{ $t('services.education.intro') }}</p>
              
              <div class="education-services">
                <div class="service-section">
                  <h3>{{ $t('services.education.planning.title') }}</h3>
                  <ul class="service-list">
                    <li v-for="(item, index) in educationPlanning" :key="index">
                      <el-icon><Check /></el-icon>
                      <span>{{ $t(`services.education.planning.items.${index}`) }}</span>
                    </li>
                  </ul>
                </div>
                
                <div class="service-section highlight-section">
                  <h3>{{ $t('services.education.special.title') }}</h3>
                  <p>{{ $t('services.education.special.desc') }}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- Brand & Transformation -->
          <el-tab-pane :label="$t('services.brand.title')" name="brand">
            <div class="service-content">
              <h2 class="service-title">{{ $t('services.brand.title') }}</h2>
              <p class="service-intro">{{ $t('services.brand.intro') }}</p>
              
              <div class="service-section">
                <h3>{{ $t('services.brand.branding.title') }}</h3>
                <ul class="service-list">
                  <li v-for="(item, index) in brandingServices" :key="index">
                    <el-icon><Check /></el-icon>
                    <span>{{ $t(`services.brand.branding.items.${index}`) }}</span>
                  </li>
                </ul>
              </div>

              <div class="service-section">
                <h3>{{ $t('services.brand.value.title') }}</h3>
                <ul class="service-list">
                  <li v-for="(item, index) in valueServices" :key="index">
                    <el-icon><Check /></el-icon>
                    <span>{{ $t(`services.brand.value.items.${index}`) }}</span>
                  </li>
                </ul>
              </div>

              <div class="service-section visit-section">
                <h3>{{ $t('services.brand.visit.title') }}</h3>
                <el-row :gutter="20">
                  <el-col :lg="12" :md="24">
                    <div class="visit-category card">
                      <h4>{{ $t('services.brand.visit.medical') }}</h4>
                      <p>{{ $t('services.brand.visit.medicalDesc') }}</p>
                    </div>
                  </el-col>
                  <el-col :lg="12" :md="24">
                    <div class="visit-category card">
                      <h4>{{ $t('services.brand.visit.tech') }}</h4>
                      <p>{{ $t('services.brand.visit.techDesc') }}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-tab-pane>

          <!-- Tax & Grants -->
          <el-tab-pane :label="$t('services.tax.title')" name="tax">
            <div class="service-content">
              <h2 class="service-title">{{ $t('services.tax.title') }}</h2>
              <p class="service-intro">{{ $t('services.tax.intro') }}</p>
              
              <el-row :gutter="32">
                <el-col :lg="12" :md="24">
                  <div class="service-section">
                    <h3>{{ $t('services.tax.grants.title') }}</h3>
                    <p>{{ $t('services.tax.grants.desc') }}</p>
                  </div>
                </el-col>
                <el-col :lg="12" :md="24">
                  <div class="service-section">
                    <h3>{{ $t('services.tax.taxation.title') }}</h3>
                    <ul class="service-list">
                      <li v-for="(item, index) in taxServices" :key="index">
                        <el-icon><Check /></el-icon>
                        <span>{{ $t(`services.tax.taxation.items.${index}`) }}</span>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { OfficeBuilding, Check } from '@element-plus/icons-vue'

const router = useRouter()
const activeTab = ref('corporate')

// Corporate Services
const corporateBasicServices = [0, 1, 2, 3, 4]

interface BankingData {
  bank: string
  requirement: string
}

const priorityBankingData: BankingData[] = [
  { bank: 'OCBC 華僑銀行', requirement: 'S$350,000' },
  { bank: 'UOB 大華銀行', requirement: 'S$350,000' },
  { bank: 'DBS 星展銀行', requirement: 'S$350,000' },
  { bank: 'HSBC 匯豐銀行', requirement: 'S$350,000' },
  { bank: 'Maybank 馬來亞銀行', requirement: 'S$350,000' },
  { bank: 'Citibank 花旗銀行', requirement: 'S$280,000' },
  { bank: 'CIMB 聯昌銀行', requirement: 'S$250,000' },
  { bank: 'Standard Chartered 渣打銀行', requirement: 'US$200,000' }
]

// Asset Management
const financialServices = [0, 1, 2, 3]
const realestateServices = [0, 1]

// Identity Planning
const singaporeIdentity = [0, 1, 2, 3]
const malaysiaIdentity = [0]

// Education
const educationPlanning = [0, 1]

// Brand & Transformation
const brandingServices = [0, 1, 2]
const valueServices = [0, 1, 2, 3]

// Tax Services
const taxServices = [0, 1, 2, 3]

const goToContact = (): void => {
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

/* Services Tabs */
.services-tabs {
  margin-top: var(--spacing-2xl);
}

.service-content {
  padding: var(--spacing-2xl) 0;
}

.service-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.service-intro {
  font-size: 1.125rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.7;
}

.service-section {
  margin-bottom: var(--spacing-2xl);
}

.service-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
}

.service-section h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

/* Service Items */
.service-item {
  padding: var(--spacing-xl);
  text-align: center;
  margin-bottom: var(--spacing-md);
  transition: all 0.3s ease;
  cursor: pointer;
}

.service-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.service-item .el-icon {
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
}

.service-item h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
}

/* Service List */
.service-list {
  list-style: none;
  padding: 0;
}

.service-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
  color: var(--color-text);
}

.service-list .el-icon {
  color: var(--color-accent);
  font-size: 1.25rem;
  margin-top: 2px;
  flex-shrink: 0;
}

/* Banking Tables */
.banking-section {
  margin-bottom: var(--spacing-2xl);
}

.banking-table {
  margin-top: var(--spacing-lg);
  box-shadow: var(--shadow-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.private-banking {
  background: var(--color-bg-secondary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
}

.banking-tiers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.tier-card {
  padding: var(--spacing-xl);
  text-align: center;
}

.tier-badge {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: var(--spacing-md);
  color: white;
}

.tier-top {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);
}

.tier-core {
  background: linear-gradient(135deg, #0369A1 0%, #0284C7 100%);
}

.tier-select {
  background: linear-gradient(135deg, #334155 0%, #475569 100%);
}

.tier-requirement {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.tier-banks {
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Highlight Section */
.highlight-section {
  background: linear-gradient(135deg, rgba(3, 105, 161, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--color-accent);
}

.highlight-section h3 {
  color: var(--color-accent);
}

.highlight-section p {
  line-height: 1.7;
  color: var(--color-text);
}

/* Visit Section */
.visit-section {
  background: var(--color-bg-secondary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
}

.visit-category {
  padding: var(--spacing-xl);
  height: 100%;
}

.visit-category h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.visit-category p {
  color: var(--color-text-muted);
  line-height: 1.6;
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
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .service-title {
    font-size: 1.75rem;
  }

  .banking-tiers {
    grid-template-columns: 1fr;
  }
  
  .cta-title {
    font-size: 1.875rem;
  }
}
</style>
