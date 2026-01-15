<template>
  <div class="language-switcher">
    <el-button 
      :type="currentLocale === 'zh-TW' ? 'primary' : 'default'"
      @click="changeLanguage('zh-TW')"
      size="small"
      class="lang-button"
    >
      繁中
    </el-button>
    <el-button 
      :type="currentLocale === 'en' ? 'primary' : 'default'"
      @click="changeLanguage('en')"
      size="small"
      class="lang-button"
    >
      EN
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/language'

type Locale = 'zh-TW' | 'en'

const { locale } = useI18n()
const languageStore = useLanguageStore()

const currentLocale = computed(() => languageStore.currentLocale)

const changeLanguage = (lang: Locale): void => {
  locale.value = lang
  languageStore.setLocale(lang)
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 4px;
}

.lang-button {
  min-width: 50px;
  font-weight: 500;
}
</style>
