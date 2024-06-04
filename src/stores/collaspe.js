import { ref, } from 'vue'
import { defineStore } from 'pinia'

export const useCollaspeStore = defineStore('counter', () => {
  const iscollaspe = ref(true)
  const rowOrCol = ref('vertical')
  function change(flag = null) {
    console.log(flag);
    if (flag != null) {
      iscollaspe.value = flag
      console.log(111);
    }
    else {
      iscollaspe.value = !iscollaspe.value
    }
  }
  function changeRow() {
    rowOrCol.value = rowOrCol.value === 'horizontal' ? 'vertical' : 'horizontal'
  }
  return { iscollaspe, change, changeRow, rowOrCol }
})
