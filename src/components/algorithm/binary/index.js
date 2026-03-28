import { getRandomColor } from '@/util/randomColor'
import { line, createCircle } from './animation'

class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
    this.color = getRandomColor()
  }
}

const CANVAS_WIDTH = 1400
const CANVAS_HEIGHT = 1000
const DISPLAY_WIDTH = 700
const DISPLAY_HEIGHT = 500
const ROOT_X = 700
const ROOT_Y = 130
const BASE_OFFSET_X = 260
const OFFSET_Y = 150

let animationQueue = []
let animationIndex = 0

const enqueue = (node, x, y, pX, pY) => {
  animationQueue.push({ node, x, y, pX, pY })
}

const insertWithSteps = (root, value, steps) => {
  if (!root) {
    steps.push({
      type: 'create-root',
      value,
      message: `创建根节点 ${value}`,
    })
    return new TreeNode(value)
  }

  let current = root
  while (current) {
    if (value === current.value) {
      steps.push({
        type: 'duplicate',
        value,
        compare: current.value,
        message: `${value} 与节点 ${current.value} 相同，跳过插入`,
      })
      return root
    }

    if (value < current.value) {
      steps.push({
        type: 'compare-left',
        value,
        compare: current.value,
        message: `${value} < ${current.value}，向左子树继续查找`,
      })
      if (!current.left) {
        current.left = new TreeNode(value)
        steps.push({
          type: 'insert-left',
          value,
          compare: current.value,
          message: `左子节点为空，插入 ${value}`,
        })
        return root
      }
      current = current.left
      continue
    }

    steps.push({
      type: 'compare-right',
      value,
      compare: current.value,
      message: `${value} > ${current.value}，向右子树继续查找`,
    })
    if (!current.right) {
      current.right = new TreeNode(value)
      steps.push({
        type: 'insert-right',
        value,
        compare: current.value,
        message: `右子节点为空，插入 ${value}`,
      })
      return root
    }
    current = current.right
  }

  return root
}

const buildTree = (values) => {
  const steps = []
  let root = null
  values.forEach((value) => {
    root = insertWithSteps(root, value, steps)
  })
  return { root, steps }
}

const initAnimationQueue = (node, x, y, level, pX = null, pY = null) => {
  if (!node) return

  enqueue(node, x, y, pX, pY)

  const offsetX = BASE_OFFSET_X / Math.pow(2, level)
  if (node.left) {
    initAnimationQueue(node.left, x - offsetX, y + OFFSET_Y, level + 1, x, y + 50)
  }
  if (node.right) {
    initAnimationQueue(node.right, x + offsetX, y + OFFSET_Y, level + 1, x, y + 50)
  }
}

const draw = (ctx) => {
  if (animationIndex >= animationQueue.length) {
    return
  }

  const { node, x, y, pX, pY } = animationQueue[animationIndex]
  animationIndex += 1

  if (pX !== null && pY !== null) {
    let progress = 0

    const drawNode = () => {
      line(ctx, pX, pY, x, y, progress)
      if (progress < 1) {
        progress += 0.02
        requestAnimationFrame(drawNode)
        return
      }

      createCircle(ctx, node, x, y)
      setTimeout(() => {
        requestAnimationFrame(() => {
          draw(ctx)
        })
      }, 450)
    }

    drawNode()
    return
  }

  createCircle(ctx, node, x, y)
  setTimeout(() => {
    requestAnimationFrame(() => {
      draw(ctx)
    })
  }, 450)
}

export const createValues = (count = 8, min = 1, max = 99) => {
  const values = []
  while (values.length < count) {
    const value = Math.floor(Math.random() * (max - min + 1)) + min
    if (!values.includes(value)) {
      values.push(value)
    }
  }
  return values
}

export const init = (canvasNode, options = {}) => {
  const { values = createValues(), onStep } = options
  const ctx = canvasNode.getContext('2d')

  animationQueue = []
  animationIndex = 0

  canvasNode.width = CANVAS_WIDTH
  canvasNode.height = CANVAS_HEIGHT
  canvasNode.style.width = `${DISPLAY_WIDTH}px`
  canvasNode.style.height = `${DISPLAY_HEIGHT}px`
  ctx.clearRect(0, 0, canvasNode.width, canvasNode.height)

  const { root, steps } = buildTree(values)
  steps.forEach((step, stepIndex) => {
    onStep?.({ ...step, step: stepIndex + 1 })
  })

  initAnimationQueue(root, ROOT_X, ROOT_Y, 0)
  draw(ctx)

  return {
    values,
    steps,
  }
}
