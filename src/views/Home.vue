<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container hero-content">
        <div class="hero-text">
          <h1 class="hero-title fade-in">
            {{ $t('home.hero.title') }}
          </h1>
          <p class="hero-subtitle fade-in">
            {{ $t('home.hero.subtitle') }}
          </p>
          <p class="hero-description fade-in">
            {{ $t('home.hero.description') }}
          </p>
          <div class="hero-buttons fade-in">
            <el-button type="primary" size="large" class="hero-button" @click="goToServices">
              <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
              {{ $t('home.hero.btn1') }}
            </el-button>
            <el-button size="large" class="hero-button-secondary" @click="goToContact">
              <svg class="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              {{ $t('home.hero.btn2') }}
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Do Section -->
    <section class="section what-we-do">
      <div class="container">
        <h2 class="section-title text-center">
          {{ $t('home.whatWeDo.title') }}
        </h2>
        <div class="services-grid">
          <div 
            v-for="(service, index) in services" 
            :key="index"
            class="service-card card cursor-pointer"
            @click="goToServices"
          >
            <div class="service-icon-wrapper">
              <component :is="service.icon" class="service-icon" />
            </div>
            <h3 class="service-title">
              {{ $t(`home.whatWeDo.service${index + 1}.title`) }}
            </h3>
            <p class="service-desc">
              {{ $t(`home.whatWeDo.service${index + 1}.desc`) }}
            </p>
            <a href="#" class="service-link" @click.prevent>
              {{ $t('home.whatWeDo.learnMore') }}
              <svg class="link-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- How We Work Section -->
    <section class="section how-we-work bg-white">
      <div class="container">
        <h2 class="section-title text-center">
          {{ $t('home.howWeWork.title') }}
        </h2>
        <div class="steps-grid">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="step-card"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <h3 class="step-title">
              {{ $t(`home.howWeWork.step${index + 1}.title`) }}
            </h3>
            <p class="step-desc">
              {{ $t(`home.howWeWork.step${index + 1}.desc`) }}
            </p>
            <!-- Connection Arrow -->
            <div v-if="index < 3" class="step-arrow">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Us Section -->
    <section class="section why-us">
      <div class="container">
        <h2 class="section-title text-center">
          {{ $t('home.whyUs.title') }}
        </h2>
        <div class="reasons-grid">
          <div 
            v-for="(reason, index) in reasons" 
            :key="index"
            class="reason-card card"
          >
            <div class="reason-icon-wrapper">
              <component :is="reason.icon" class="reason-icon" />
            </div>
            <h3 class="reason-title">
              {{ $t(`home.whyUs.reason${index + 1}.title`) }}
            </h3>
            <p class="reason-desc">
              {{ $t(`home.whyUs.reason${index + 1}.desc`) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section gradient-bg">
      <div class="container">
        <div class="cta-content text-center">
          <h2 class="cta-title">
            {{ $t('home.cta.title') }}
          </h2>
          <p class="cta-subtitle">
            {{ $t('home.cta.subtitle') }}
          </p>
          <el-button type="primary" size="large" class="cta-button" @click="goToContact">
            {{ $t('home.cta.button') }}
          </el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { 
  OfficeBuilding, 
  User, 
  TrendCharts, 
  House,
  Connection,
  Document,
  Service,
  Message
} from '@element-plus/icons-vue'
import type { Component } from 'vue'

const router = useRouter()

interface ServiceItem {
  icon: Component
}

interface StepItem {
  step: number
}

interface ReasonItem {
  icon: Component
}

const services: ServiceItem[] = [
  { icon: OfficeBuilding },
  { icon: User },
  { icon: TrendCharts },
  { icon: House }
]

const steps: StepItem[] = [
  { step: 1 },
  { step: 2 },
  { step: 3 },
  { step: 4 }
]

const reasons: ReasonItem[] = [
  { icon: Connection },
  { icon: Document },
  { icon: Service },
  { icon: Message }
]

const goToServices = (): void => {
  router.push('/services')
}

const goToContact = (): void => {
  router.push('/contact')
}
</script>

<style scoped>
/* Hero Section */
.hero {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 50%, var(--color-secondary) 100%);
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(3, 105, 161, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: var(--spacing-3xl) 0;
}

.hero-text {
  max-width: 800px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: var(--spacing-lg);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: var(--spacing-md);
  font-weight: 600;
}

.hero-description {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: var(--spacing-2xl);
  line-height: 1.7;
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.hero-button,
.hero-button-secondary {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 16px 32px;
  font-weight: 600;
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
}

.hero-button:hover,
.hero-button-secondary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.hero-button-secondary {
  background: white;
  color: var(--color-primary);
  border-color: white;
}

.button-icon {
  width: 20px;
  height: 20px;
}

/* Section Styles */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-2xl);
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
}

.service-card {
  padding: var(--spacing-2xl);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.service-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.service-icon-wrapper {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-gold) 100%);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  color: white;
  font-size: 2rem;
}

.service-icon {
  width: 32px;
  height: 32px;
}

.service-title {
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.service-desc {
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.service-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: none;
  transition: gap 0.2s ease;
}

.service-link:hover {
  gap: var(--spacing-sm);
}

.link-arrow {
  width: 16px;
  height: 16px;
}

/* Steps Grid */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--spacing-lg);
  position: relative;
}

.step-card {
  text-align: center;
  position: relative;
  padding: var(--spacing-xl);
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-gold) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  margin: 0 auto var(--spacing-lg);
  box-shadow: var(--shadow-md);
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.step-desc {
  color: var(--color-text-muted);
  line-height: 1.6;
}

.step-arrow {
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  color: var(--color-accent);
  opacity: 0.3;
}

.step-arrow svg {
  width: 24px;
  height: 24px;
}

/* Reasons Grid */
.reasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--spacing-xl);
}

.reason-card {
  padding: var(--spacing-2xl);
  text-align: center;
}

.reason-icon-wrapper {
  width: 56px;
  height: 56px;
  background: rgba(3, 105, 161, 0.1);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  color: var(--color-accent);
  font-size: 1.75rem;
}

.reason-icon {
  width: 28px;
  height: 28px;
}

.reason-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.reason-desc {
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  position: relative;
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
@media (max-width: 1024px) {
  .hero-title {
    font-size: 2.75rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .step-arrow {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 500px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: flex-start;
  }

  .services-grid,
  .steps-grid,
  .reasons-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .section-title {
    font-size: 1.75rem;
  }

  .cta-title {
    font-size: 1.875rem;
  }
}
</style>
