import { sortMap } from '@/components/algorithm/sort/map'
import { useRoute } from 'vue-router'

const moduleLoaderMap = {
  sort: () => import('./sort/index.js'),
  binary: () => import('./binary/index.js'),
  search: () => import('./search/index.js'),
}

const titleMapByKey = {
  sort: sortMap,
  binary: new Map([['create', '二叉搜索树']]),
  search: new Map([
    ['binary', '折半查找'],
    ['sequence', '顺序查找'],
  ]),
}

export const import_ = async () => {
  const route = useRoute()
  const { key, algor } = route.query

  const loader = moduleLoaderMap[key]
  if (!loader) {
    throw new Error(`不支持的算法模块: ${String(key)}`)
  }

  const res = await loader()
  const algorFunc = res[algor]
  if (typeof algorFunc !== 'function') {
    throw new Error(`未找到算法实现: ${String(key)}.${String(algor)}`)
  }

  const title = titleMapByKey[key]?.get(algor) || String(algor)
  return { algor: algorFunc, title }
}
