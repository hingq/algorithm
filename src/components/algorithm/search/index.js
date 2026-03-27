const wait = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms))

export const sequence = async function* (data, target) {
  for (let i = 0; i < data.length; i++) {
    await wait()
    const found = data[i] === target
    yield {
      type: 'sequence',
      index: i,
      value: data[i],
      target,
      found,
      message: found
        ? `顺序查找命中：下标 ${i} 的值 ${data[i]} 等于目标值 ${target}`
        : `顺序查找：检查下标 ${i} 的值 ${data[i]}，继续向后查找`,
    }

    if (found) {
      return i
    }
  }

  return -1
}

export const binary = async function* (data, target) {
  let left = 0
  let right = data.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    await wait()

    if (data[mid] === target) {
      yield {
        type: 'binary',
        left,
        right,
        mid,
        value: data[mid],
        target,
        found: true,
        message: `折半查找命中：mid=${mid}，值 ${data[mid]} 等于目标值 ${target}`,
      }
      return mid
    }

    const goRight = data[mid] < target
    yield {
      type: 'binary',
      left,
      right,
      mid,
      value: data[mid],
      target,
      found: false,
      direction: goRight ? 'right' : 'left',
      message: goRight
        ? `mid=${mid} 的值 ${data[mid]} 小于 ${target}，移动到右半区间`
        : `mid=${mid} 的值 ${data[mid]} 大于 ${target}，移动到左半区间`,
    }

    if (goRight) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  yield {
    type: 'binary',
    left,
    right,
    mid: -1,
    target,
    found: false,
    message: `区间为空，未找到目标值 ${target}`,
  }
  return -1
}
