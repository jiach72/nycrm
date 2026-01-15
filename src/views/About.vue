<template>
  <div class="about-page">
    <!-- Page Hero -->
    <section class="page-hero gradient-bg">
      <div class="container">
        <h1 class="page-title">關於我們</h1>
        <p class="page-subtitle">企業主在不確定時代裡的"第二駕駛艙"</p>
      </div>
    </section>

    <!-- Brand Story -->
    <section class="section brand-story">
      <div class="container">
        <h2 class="section-title text-center">品牌故事</h2>
        <div class="story-content">
          <p class="story-text">
            在全球經濟充滿不確定性的當下，企業出海不僅僅是物理空間的轉移，更是戰略視野的升級。<strong>通海南洋 (TongHai Nanyang)</strong> 總部位於新加坡，深耕新馬雙市場。我們不僅僅是您的出海服務商，更是企業主在風浪中的<strong>"第二駕駛艙"</strong>。
          </p>
          <p class="story-text">
            我們匯聚了金融、法律、教育與稅務領域的頂尖專家，致力於為台灣企業家、跨國企業主及高淨值家族提供「企業落地 + 身份規劃 + 資產架構」的一站式跨境解決方案。我們堅持<strong>合規優先</strong>，以<strong>長期陪跑</strong>為承諾，助您在南洋這片熱土上，穩健出海，傳承未來。
          </p>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="section core-values bg-white">
      <div class="container">
        <h2 class="section-title text-center">核心價值觀</h2>
        <el-row :gutter="32">
          <el-col :lg="6" :md="12" :sm="24">
            <div class="value-card card">
              <div class="value-icon"><el-icon><Check /></el-icon></div>
              <h3>合規優先</h3>
              <p>嚴格遵循當地法律法規，確保業務架構穩健安全</p>
            </div>
          </el-col>
          <el-col :lg="6" :md="12" :sm="24">
            <div class="value-card card">
              <div class="value-icon"><el-icon><TrendCharts /></el-icon></div>
              <h3>以終為始</h3>
              <p>量身定制最適合的落地與傳承方案</p>
            </div>
          </el-col>
          <el-col :lg="6" :md="12" :sm="24">
            <div class="value-card card">
              <div class="value-icon"><el-icon><DocumentChecked /></el-icon></div>
              <h3>透明可追溯</h3>
              <p>關鍵節點可追溯，每一次決策都有據可依</p>
            </div>
          </el-col>
          <el-col :lg="6" :md="12" :sm="24">
            <div class="value-card card">
              <div class="value-icon"><el-icon><Connection /></el-icon></div>
              <h3>長期陪跑</h3>
              <p>長期陪伴企業成長與家族傳承</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- Core Team -->
    <section class="section core-team">
      <div class="container">
        <h2 class="section-title text-center">核心團隊</h2>
        
        <div class="team-intro">
          <p>我們的團隊由資深金融專家、律師、教育顧問和商業策略師組成，為您提供全方位專業服務。</p>
        </div>

        <el-row :gutter="32" class="team-grid">
          <el-col :lg="8" :md="12" :sm="24">
            <div class="team-member-card card">
              <div class="member-avatar"><el-icon><Avatar /></el-icon></div>
              <h4>Ada 黃芊惠</h4>
              <p class="member-title">創始人 | CEO</p>
              <p class="member-bio">Finexis Advisory 總監，18年新加坡金融經驗，CFP® 認證顧問</p>
            </div>
          </el-col>
          <el-col :lg="8" :md="12" :sm="24">
            <div class="team-member-card card">
              <div class="member-avatar"><el-icon><Avatar /></el-icon></div>
              <h4>Mars 楊棟</h4>
              <p class="member-title">聯合創始人</p>
              <p class="member-bio">新加坡文化與教育協會會長，28年國際教育經驗</p>
            </div>
          </el-col>
          <el-col :lg="8" :md="12" :sm="24">
            <div class="team-member-card card">
              <div class="member-avatar"><el-icon><Avatar /></el-icon></div>
              <h4>Wendy 魏文帝</h4>
              <p class="member-title">台灣執行官</p>
              <p class="member-bio">創投公司 CEO，20年企業顧問經驗</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section gradient-bg">
      <div class="container">
        <div class="cta-content text-center">
          <h2 class="cta-title">與我們的專家團隊見面</h2>
          <p class="cta-subtitle">預約會議，了解我們如何協助您的業務成長</p>
          <el-button type="primary" size="large" class="cta-button" @click="goToContact">
            預約諮詢
          </el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Avatar, Check, DocumentChecked, Connection, TrendCharts } from '@element-plus/icons-vue'

const router = useRouter()

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

/* Brand Story */
.brand-story {
  background: var(--color-bg);
}

.story-content {
  max-width: 900px;
  margin: 0 auto;
}

.story-text {
  font-size: 1.125rem;
  line-height: 2;
  color: var(--color-text);
  text-align: justify;
}

/* Core Values */
.value-card {
  padding: var(--spacing-2xl);
  text-align: center;
  height: 100%;
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.value-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-gold) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-lg);
  color: white;
  font-size: 2rem;
}

.value-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.value-card p {
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Core Team */
.team-section {
  margin-bottom: var(--spacing-3xl);
}

.team-section-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 3px solid var(--color-accent);
}

.team-member-card {
  padding: var(--spacing-xl);
  height: 100%;
  margin-bottom: var(--spacing-lg);
  transition: all 0.3s ease;
}

.team-member-card:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

.member-header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.member-avatar {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-gold) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
  font-size: 2rem;
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.member-title {
  font-size: 0.9375rem;
  color: var(--color-accent);
  font-weight: 600;
  margin: 0;
}

.member-details {
  color: var(--color-text);
}

.member-other-titles {
  background: var(--color-bg-secondary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-md);
  font-size: 0.875rem;
  line-height: 1.6;
}

.member-bio {
  line-height: 1.7;
  color: var(--color-text-muted);
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

  .story-text {
    font-size: 1rem;
    text-align: left;
  }

  .member-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .cta-title {
    font-size: 1.875rem;
  }
}
</style>
