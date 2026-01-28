<template>
  <el-dropdown @command="changeLanguage" trigger="click">
    <el-button class="lang-dropdown-btn" text>
      <el-icon class="icon"><Connection /></el-icon>
      <span class="current-lang">{{ localeLabels[currentLocale] }}</span>
      <el-icon class="el-icon--right"><ArrowDown /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh-TW" :disabled="currentLocale === 'zh-TW'">🇹🇼 繁體中文</el-dropdown-item>
        <el-dropdown-item command="zh-CN" :disabled="currentLocale === 'zh-CN'">🇨🇳 简体中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="currentLocale === 'en'">🇺🇸 English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/language'
import { Connection, ArrowDown } from '@element-plus/icons-vue'

type Locale = 'zh-TW' | 'zh-CN' | 'en'

const { locale } = useI18n()
const languageStore = useLanguageStore()

const currentLocale = computed(() => languageStore.currentLocale as Locale)

const localeLabels: Record<Locale, string> = {
  'zh-TW': '🇹🇼',
  'zh-CN': '🇨🇳',
  'en': '🇺🇸'
}

const changeLanguage = (lang: string | number | object): void => {
  const selectedLang = lang as Locale
  locale.value = selectedLang
  languageStore.setLocale(selectedLang)
}
</script>

<style scoped>
.lang-dropdown-btn {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  height: auto;
  color: var(--color-text);
  font-weight: 500;
}

.lang-dropdown-btn:hover {
  background-color: rgba(3, 105, 161, 0.05); /* var(--color-primary) w/ low opacity */
  color: var(--color-primary);
}

.icon {
  font-size: 1.25rem;
  margin-right: 6px;
}

.current-lang {
  margin-right: 4px;
}
</style>
