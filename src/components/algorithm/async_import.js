
import { sortMap } from "@/components/algorithm/sort/map"
import { useRoute } from "vue-router"


export const import_ = async () => {
    const route = useRoute()
    let { key: key, algor: algor } = route.query

    // 只能以./ 或../ 开头
    const res = await import(`./${key}/index.js`)

    const title = sortMap.get(algor)
    return { algor: res[algor], title: title }
}