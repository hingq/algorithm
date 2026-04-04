import { covertRect, insertRect, switchRect } from '@/util/canvs'

const defaultAnimator = {
  switchRect,
  covertRect,
  insertRect,
}

const swapData = (data, i, j) => {
  [data[i], data[j]] = [data[j], data[i]]
}

const swapWithAnimation = async (data, i, j, animator = defaultAnimator) => {
  if (i === j) return
  swapData(data, i, j)
  await animator.switchRect(i, j)
}

export const buble = async function* (data, animator = defaultAnimator) {
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = 0; j < data.length - 1 - i; j++) {
      if (data[j] > data[j + 1]) {
        await swapWithAnimation(data, j, j + 1, animator)
        yield [j, j + 1]
      }
    }
  }
}

export const insert = async function* (data, animator = defaultAnimator) {
  for (let i = 1; i < data.length; i++) {
    if (data[i - 1] > data[i]) {
      const temp = data[i]
      let j = i - 1
      while (j >= 0 && data[j] > temp) {
        data[j + 1] = data[j]
        j--
      }
      await animator.covertRect(j + 1, i)
      data[j + 1] = temp
      animator.insertRect(j + 1)
      yield [j + 1, i]
    }
  }
}

export const select = async function* (data, animator = defaultAnimator) {
  for (let i = 0; i < data.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < data.length; j++) {
      if (data[j] < data[minIndex]) {
        minIndex = j
      }
    }

    if (minIndex !== i) {
      await swapWithAnimation(data, i, minIndex, animator)
      yield [i, minIndex]
    }
  }
}

export const shell = async function* (data, animator = defaultAnimator) {
  for (let gap = Math.floor(data.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < data.length; i++) {
      let j = i
      while (j >= gap && data[j] < data[j - gap]) {
        await swapWithAnimation(data, j, j - gap, animator)
        yield [j - gap, j]
        j -= gap
      }
    }
  }
}

async function* quickSortGenerator(data, left, right, animator = defaultAnimator) {
  if (left >= right) return

  const pivot = data[right]
  let i = left

  for (let j = left; j < right; j++) {
    if (data[j] <= pivot) {
      if (i !== j) {
        await swapWithAnimation(data, i, j, animator)
        yield [i, j]
      }
      i++
    }
  }

  if (i !== right) {
    await swapWithAnimation(data, i, right, animator)
    yield [i, right]
  }

  for await (const step of quickSortGenerator(data, left, i - 1, animator)) {
    yield step
  }
  for await (const step of quickSortGenerator(data, i + 1, right, animator)) {
    yield step
  }
}

export const quick = async function* (data, animator = defaultAnimator) {
  for await (const step of quickSortGenerator(data, 0, data.length - 1, animator)) {
    yield step
  }
}

const heapify = async function* (data, heapSize, root, animator = defaultAnimator) {
  let largest = root
  const left = 2 * root + 1
  const right = 2 * root + 2

  if (left < heapSize && data[left] > data[largest]) {
    largest = left
  }
  if (right < heapSize && data[right] > data[largest]) {
    largest = right
  }

  if (largest !== root) {
    await swapWithAnimation(data, root, largest, animator)
    yield [root, largest]
    for await (const step of heapify(data, heapSize, largest, animator)) {
      yield step
    }
  }
}

export const heap = async function* (data, animator = defaultAnimator) {
  for (let i = Math.floor(data.length / 2) - 1; i >= 0; i--) {
    for await (const step of heapify(data, data.length, i, animator)) {
      yield step
    }
  }

  for (let i = data.length - 1; i > 0; i--) {
    await swapWithAnimation(data, 0, i, animator)
    yield [0, i]
    for await (const step of heapify(data, i, 0, animator)) {
      yield step
    }
  }
}
