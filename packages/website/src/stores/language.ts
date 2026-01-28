import { defineStore } from 'pinia'
import { ref } from 'vue'

type Locale = 'zh-TW' | 'zh-CN' | 'en'

export const useLanguageStore = defineStore('language', () => {
    const currentLocale = ref<Locale>((localStorage.getItem('locale') as Locale) || 'zh-TW')

    function setLocale(locale: Locale): void {
        currentLocale.value = locale
        localStorage.setItem('locale', locale)
    }

    return {
        currentLocale,
        setLocale
    }
})
