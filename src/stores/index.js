import { useTheme } from './theme'
import { useCollaspeStore } from './collaspe'
import { usePageHeader } from './pageHeader'
import { createPinia} from 'pinia'
const Pinia=createPinia()
const theme=useTheme(Pinia)
const useCollapse=useCollaspeStore(Pinia)
const pageHeader=usePageHeader(Pinia)

export {theme,useCollapse,pageHeader}