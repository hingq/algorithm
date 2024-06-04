import { defineStore } from "pinia";
import { dark, light } from "@/styles/dark";
export const useTheme = defineStore('theme', () => {

    const getTheme = () => {
        const localTheme = localStorage.getItem('theme')
        if (localTheme) {
            if (localTheme === 'dark') {
                theme('toDark')
                // localStorage.setItem('theme', 'light')
            } if (localTheme === 'light') {
                // localStorage.setItem('theme', 'dark')
                theme('toLight')
            }
        } else {
            return
        }
    }
    function theme(flag) {
        if (flag === 'toDark') {
            document.documentElement.classList.add('dark')
            for (const [key, value] of Object.entries(dark)) {
                document.documentElement.style.setProperty(key, value)
            }
        } else if (flag === 'toLight') {
            document.documentElement.classList.remove('dark')
            for (const [key, value] of Object.entries(light)) {
                document.documentElement.style.setProperty(key, value)
            }
        }
    }
    const setTheme = () => {
        let localTheme = localStorage.getItem('theme')
        if (!localTheme) {
            localStorage.setItem('theme', 'dark')
            getTheme()
        }
        else {
            localTheme = localTheme === 'dark' ? 'light' : 'dark'
            localStorage.setItem('theme', localTheme)
            getTheme()
        }

    }
    return { getTheme, setTheme }
})