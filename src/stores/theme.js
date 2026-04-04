import { defineStore } from 'pinia'

const THEME_KEY = 'theme'

export const useTheme = defineStore('theme', () => {
  const getTheme = () => {
    const localTheme = localStorage.getItem(THEME_KEY)

    if (localTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (localTheme === 'light') {
      document.documentElement.classList.remove('dark')
    }
  }

  const setTheme = () => {
    const localTheme = localStorage.getItem(THEME_KEY)
    const nextTheme = localTheme === 'dark' ? 'light' : 'dark'

    localStorage.setItem(THEME_KEY, nextTheme)
    getTheme()
  }

  return { getTheme, setTheme }
})
