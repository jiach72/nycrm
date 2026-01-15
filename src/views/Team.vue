<template>
  <div class="team-page">
    <!-- Page Hero -->
    <section class="page-hero gradient-bg">
      <div class="container">
        <h1 class="page-title">我們的團隊</h1>
        <p class="page-subtitle">匯聚金融、法律、教育與稅務領域的頂尖專家，為您的出海之路保駕護航</p>
      </div>
    </section>

    <!-- Team Content -->
    <section class="section team-content">
      <div class="container">
        <!-- 1. 創始人與高管層 -->
        <div class="team-category">
          <h2 class="category-title">FOUNDERS & EXECUTIVES</h2>
          <h3 class="category-subtitle">創始人與高管層</h3>
          <el-row :gutter="32">
            <el-col v-for="member in founders" :key="member.name" :lg="8" :md="12" :sm="24">
              <div class="member-card card">
                <div class="member-image">
                  <el-icon><Avatar /></el-icon>
                </div>
                <div class="member-info">
                  <h4 class="member-name">{{ member.name }}</h4>
                  <p class="member-position">{{ member.position }}</p>
                  <div class="member-tags" v-if="member.tags">
                    <span v-for="tag in member.tags" :key="tag" class="member-tag">{{ tag }}</span>
                  </div>
                  <div class="member-bio">
                    <p v-for="(line, index) in member.bio" :key="index">{{ line }}</p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 2. 行業專家顧問 -->
        <div class="team-category">
          <h2 class="category-title">INDUSTRY ADVISORS</h2>
          <h3 class="category-subtitle">行業專家顧問（法律、金融、物流）</h3>
          <el-row :gutter="32">
            <el-col v-for="member in advisors" :key="member.name" :lg="6" :md="12" :sm="24">
              <div class="member-card card small">
                <div class="member-image mini">
                  <el-icon><Briefcase /></el-icon>
                </div>
                <div class="member-info">
                  <h4 class="member-name">{{ member.name }}</h4>
                  <p class="member-position">{{ member.position }}</p>
                  <p class="member-desc">{{ member.desc }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 3. 商業諮詢與理財團隊 -->
        <div class="team-category">
          <h2 class="category-title">CONSULTING & WEALTH</h2>
          <h3 class="category-subtitle">商業諮詢與理財團隊</h3>
          <el-row :gutter="32">
            <el-col v-for="member in consulting" :key="member.name" :lg="8" :md="12" :sm="24">
              <div class="member-card card">
                <div class="member-image">
                  <el-icon><User /></el-icon>
                </div>
                <div class="member-info">
                  <h4 class="member-name">{{ member.name }}</h4>
                  <p class="member-position">{{ member.position }}</p>
                  <p class="member-desc">{{ member.desc }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 4. 區域負責人 -->
        <div class="team-category">
          <h2 class="category-title">REGIONAL HEADS</h2>
          <h3 class="category-subtitle">區域負責人</h3>
          <el-row :gutter="32">
            <el-col v-for="member in regional" :key="member.name" :lg="8" :md="12" :sm="24">
              <div class="member-card card">
                <div class="member-image">
                  <el-icon><Location /></el-icon>
                </div>
                <div class="member-info">
                  <h4 class="member-name">{{ member.name }}</h4>
                  <p class="member-position">{{ member.position }}</p>
                  <p class="member-desc">{{ member.desc }}</p>
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
          <h2 class="cta-title">諮詢我們的專家團隊</h2>
          <p class="cta-subtitle">點擊下方按鈕，與我們的顧問安排一次深入的診斷會</p>
          <el-button type="primary" size="large" class="cta-button" @click="goToContact">
            預約專家會議
          </el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Avatar, Briefcase, User, Location } from '@element-plus/icons-vue'

const router = useRouter()

const goToContact = () => {
  router.push('/contact')
}

// 創始人與高管層
const founders = [
  {
    name: 'Ada 黃芊惠',
    position: '通海南洋創始人 | CEO',
    tags: ['CFP®', 'WMI 家辦顧問'],
    bio: [
      'Finexis Advisory 總監, BNI 新加坡寶豐分會主席 (2022-2023)',
      '留學移民新加坡18年，專注一站式金融解決方案，包括保險、基金、家族信託、VCC 及銀行開戶等。'
    ]
  },
  {
    name: 'Mars 楊棟',
    position: '聯合創始人 | 跨境商業落地執行官',
    tags: ['北京社科院數學博士'],
    bio: [
      '新加坡文化與教育協會會長 (CEAS), 新加坡文化與教育學院院長',
      '擁有28年國際教育經驗。負責市場考察與落地、身份與教育規劃及本地化運營。'
    ]
  },
  {
    name: 'Wendy 魏文帝',
    position: '跨境商業落地執行官（台灣）',
    tags: ['創投公司 CEO'],
    bio: [
      '擁有超過20年企業顧問經驗, 擅長資源整合與銷售。',
      '具備敏銳的市場分析能力, 為台灣企業家提供專業落地建議。'
    ]
  }
]

// 行業專家顧問
const advisors = [
  {
    name: 'Prof. Dr Thomas Sim',
    position: 'FIATA 主席 | 海聯集團 CEO',
    desc: '新加坡物流學院主席, 世界銀行、聯合國貿發會議資源專家。獲新加坡總統頒發國家獎項。'
  },
  {
    name: 'Gavin 柳達禮',
    position: '東方投融金控集團創始人',
    desc: '30多年金融經驗, 擅長投資及操盤科技企業上市。專注於大健康、AI 經濟及 RWA 技術。'
  },
  {
    name: 'Linus 伍修宏',
    position: '敦升律師事務所大律師',
    desc: '1998年註冊律師, 專注資本市場融資、私募基金、合規諮詢及金融科技法律服務。'
  },
  {
    name: 'Ronald 朱國禎',
    position: '朱國禎律師事務所創始人',
    desc: '全球家辦 (GFO) 協會會員。提供 GIP、PR 申請、家辦設立及遺囑認證服務。'
  }
]

// 商業諮詢與理財團隊
const consulting = [
  {
    name: 'Wendy 劉泳岐',
    position: 'Finnex Pte Ltd 業務發展總監',
    desc: '10年商業顧問經驗, 與超過60間銀行合作。擅長企業融資與市場進軍策略。'
  },
  {
    name: 'Jevon 何建洛',
    position: 'Finnex Pte Ltd 政府津貼顧問',
    desc: '25年經商經驗, KAH 執照持有人。專精政府津貼諮詢、企業策略轉型。'
  },
  {
    name: 'Martin 許岩',
    position: '資深理財規劃師 (Finexis)',
    desc: '英國倫敦大學學士。深耕新加坡金融業多年, 為高淨值客戶提供財富管理服務。'
  }
]

// 區域負責人
const regional = [
  {
    name: '陳利',
    position: '四川辦事處負責人',
    desc: '常駐成都, 協助中國企業家開拓東南亞市場, 提供全鏈路出海解決方案。'
  },
  {
    name: 'May Lee',
    position: '馬來西亞負責人',
    desc: '農先生集團董事長, BNI 巴生資深顧問。專精資產配置、MM2H 申請及戰略規劃。'
  },
  {
    name: 'Andy Chia 謝漢亮',
    position: 'Jalin 家寧 業務發展總監',
    desc: '20年金融服務經驗 (UOB, HSBC)。深厚新馬金融網絡, 提供跨境金融及房產服務。'
  }
]
</script>

<style scoped>
.page-hero {
  padding: var(--spacing-3xl) 0;
  text-align: center;
  color: white;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  color: white;
}

.page-subtitle {
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.9;
}

.team-content {
  background-color: var(--color-bg);
}

.team-category {
  margin-bottom: var(--spacing-3xl);
}

.category-title {
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: var(--color-gold);
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
}

.category-subtitle {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
  position: relative;
  display: inline-block;
}

.category-subtitle::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: var(--color-gold);
}

.member-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl);
  transition: all 0.3s ease;
  margin-bottom: var(--spacing-lg);
}

.member-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.member-card.small {
  padding: var(--spacing-lg);
}

.member-image {
  width: 80px;
  height: 80px;
  background: var(--color-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  color: var(--color-accent);
  font-size: 2rem;
  border: 1px solid var(--color-gold);
}

.member-image.mini {
  width: 50px;
  height: 50px;
  font-size: 1.25rem;
  margin-bottom: var(--spacing-md);
}

.member-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.member-position {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: var(--spacing-md);
}

.member-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.member-tag {
  font-size: 0.75rem;
  background: rgba(3, 105, 161, 0.1);
  color: var(--color-accent);
  padding: 2px 8px;
  border-radius: 4px;
}

.member-bio {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-text);
}

.member-bio p {
  margin-bottom: 8px;
}

.member-desc {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-text);
  margin: 0;
}

/* CTA Section */
.cta-section {
  padding: var(--spacing-3xl) 0;
  color: white;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  color: white;
}

.cta-subtitle {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-2xl);
  opacity: 0.9;
}

.cta-button {
  padding: 24px 64px;
  font-size: 1.125rem;
  font-weight: 700;
  background-color: white;
  color: var(--color-primary);
  border: none;
  box-shadow: var(--shadow-xl);
}

.cta-button:hover {
  background-color: var(--color-bg);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.25rem;
  }
  .category-subtitle {
    font-size: 1.75rem;
  }
}
</style>
