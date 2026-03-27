const sortObj = {
  buble: '冒泡排序',
  insert: '插入排序',
  select: '选择排序',
  shell: '希尔排序',
  quick: '快速排序',
  heap: '堆排序',
}

const sortArrary = Object.entries(sortObj)
export const sortMap = new Map(sortArrary)
