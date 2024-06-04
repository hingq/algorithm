import { ref } from "vue"
import { defineStore } from 'pinia'



export const usePageHeader=defineStore('header',()=>{
    const pageHeader=ref('')

    const setPage=(to)=>{
        pageHeader.value=to.name
    }

    return {
        pageHeader,setPage
    }
})
