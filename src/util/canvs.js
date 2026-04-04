const DEFAULT_OPTION = {
  chatZone: [50, 50, 700, 470],
  yAxisLabel: ['0', '100', '200', '300', '400'],
  yMax: 400,
  xAxisLabel: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  data: [70, 50, 200, 330, 390, 320, 220],
  barStyle: {
    width: 50,
    color: '#3982b4eb',
    activeColor: '#198148',
  },
  animate: {
    enterDuration: 900,
    moveDuration: 380,
  },
}

const STYLE = {
  axisColor: '#353535',
  font: '18px sans-serif',
  strokeWidth: 2,
}

const getRatio = (canvas) => {
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const bsr =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  return dpr / bsr
}

const normalizeRange = (i, j) => {
  if (i <= j) return [i, j]
  return [j, i]
}

function createCanvasAnimator() {
  const state = {
    canvas: null,
    ctx: null,
    dpr: 1,
    option: structuredClone(DEFAULT_OPTION),
    bars: [],
    baseLayer: null,
    rafId: null,
    insertionCache: null,
    animationChain: Promise.resolve(),
    queueToken: 0,
  }

  const clearRaf = () => {
    if (state.rafId !== null) {
      cancelAnimationFrame(state.rafId)
      state.rafId = null
    }
  }

  const cancelAnimations = () => {
    state.queueToken += 1
    clearRaf()
    state.animationChain = Promise.resolve()
  }

  const copyOption = () => {
    state.option = {
      ...DEFAULT_OPTION,
      ...state.option,
      barStyle: {
        ...DEFAULT_OPTION.barStyle,
        ...(state.option?.barStyle || {}),
      },
      animate: {
        ...DEFAULT_OPTION.animate,
        ...(state.option?.animate || {}),
      },
    }
  }

  const getCanvasDisplaySize = () => ({
    width: state.canvas.width / state.dpr,
    height: state.canvas.height / state.dpr,
  })

  const buildBarsFromData = (data) => {
    const { chatZone, xAxisLabel, yMax, barStyle } = state.option
    const xLength = (chatZone[2] - chatZone[0]) * 0.9
    const yLength = (chatZone[3] - chatZone[1]) * 0.98
    const gap = xLength / xAxisLabel.length

    return data.map((value, index) => {
      const x = Math.floor(chatZone[0] + (index + 1) * gap - barStyle.width / 2 - 12)
      const height = Math.floor((value / yMax) * yLength)
      const y = chatZone[3] - height

      return {
        x,
        y,
        width: barStyle.width,
        height,
        value,
      }
    })
  }

  const drawAxisLayer = () => {
    const { chatZone, yAxisLabel, xAxisLabel } = state.option
    const offscreen = document.createElement('canvas')
    offscreen.width = state.canvas.width
    offscreen.height = state.canvas.height

    const ctx = offscreen.getContext('2d')
    ctx.scale(state.dpr, state.dpr)
    ctx.strokeStyle = STYLE.axisColor
    ctx.fillStyle = STYLE.axisColor
    ctx.lineWidth = STYLE.strokeWidth
    ctx.font = STYLE.font

    ctx.beginPath()
    ctx.moveTo(chatZone[0], chatZone[1])
    ctx.lineTo(chatZone[0], chatZone[3])
    ctx.lineTo(chatZone[2], chatZone[3])
    ctx.lineTo(chatZone[2], chatZone[1])
    ctx.stroke()

    const yGap = (chatZone[3] - chatZone[1]) * 0.98 / (yAxisLabel.length - 1)
    yAxisLabel.forEach((label, i) => {
      const offset = ctx.measureText(label).width + 20
      const y = chatZone[3] - i * yGap

      ctx.fillText(label, chatZone[0] - offset, y)
      if (i > 0) {
        ctx.beginPath()
        ctx.moveTo(chatZone[0] - 10, y)
        ctx.lineTo(chatZone[0], y)
        ctx.stroke()
      }
    })

    const xGap = (chatZone[2] - chatZone[0]) * 0.9 / xAxisLabel.length
    xAxisLabel.forEach((label, i) => {
      const labelWidth = ctx.measureText(label).width
      const x = chatZone[0] + (i + 1) * xGap - labelWidth

      ctx.fillText(label, x, chatZone[3] + 20)
      ctx.beginPath()
      ctx.moveTo(x + labelWidth / 2, chatZone[3])
      ctx.lineTo(x + labelWidth / 2, chatZone[3] + 5)
      ctx.stroke()
    })

    state.baseLayer = offscreen
  }

  const render = (bars = state.bars, highlight = []) => {
    if (!state.ctx || !state.canvas || !state.baseLayer) return

    const { ctx } = state
    const { barStyle } = state.option
    const { width, height } = getCanvasDisplaySize()

    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(state.baseLayer, 0, 0, width, height)

    bars.forEach((bar, idx) => {
      const active = highlight.includes(idx)
      ctx.fillStyle = active ? barStyle.activeColor : barStyle.color
      ctx.fillRect(bar.x, bar.y, bar.width, bar.height)
    })
  }

  const runAnimation = (duration, update) =>
    new Promise((resolve) => {
      clearRaf()
      const start = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        update(progress)

        if (progress < 1) {
          state.rafId = requestAnimationFrame(tick)
        } else {
          state.rafId = null
          resolve()
        }
      }

      state.rafId = requestAnimationFrame(tick)
    })

  const enqueueAnimation = (duration, update) => {
    const currentToken = state.queueToken
    state.animationChain = state.animationChain
      .catch(() => undefined)
      .then(() => {
        if (currentToken !== state.queueToken) return undefined
        return runAnimation(duration, update)
      })
    return state.animationChain
  }

  const init = (canvas, customOption = {}) => {
    cancelAnimations()
    state.canvas = canvas
    state.ctx = canvas.getContext('2d')
    state.dpr = getRatio(canvas)
    state.option = {
      ...structuredClone(DEFAULT_OPTION),
      ...customOption,
      barStyle: {
        ...DEFAULT_OPTION.barStyle,
        ...(customOption.barStyle || {}),
      },
      animate: {
        ...DEFAULT_OPTION.animate,
        ...(customOption.animate || {}),
      },
    }
    copyOption()

    canvas.width = 700 * state.dpr
    canvas.height = 500 * state.dpr
    canvas.style.width = '700px'
    canvas.style.height = '500px'

    state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0)
    drawAxisLayer()

    state.bars = buildBarsFromData(state.option.data)
    state.insertionCache = null

    const zeroBars = state.bars.map((bar) => ({ ...bar, y: state.option.chatZone[3], height: 0 }))
    render(zeroBars)

    enqueueAnimation(state.option.animate.enterDuration, (progress) => {
      const growBars = state.bars.map((bar) => {
        const height = Math.floor(bar.height * progress)
        return {
          ...bar,
          height,
          y: state.option.chatZone[3] - height,
        }
      })
      render(growBars)
    })
  }

  const switchRect = (i, j) =>
    new Promise((resolve) => {
      if (!state.bars.length || i === j) {
        resolve()
        return
      }

      const [leftIndex, rightIndex] = normalizeRange(i, j)
      const startBars = state.bars.map((bar) => ({ ...bar }))
      const leftStartX = startBars[leftIndex].x
      const rightStartX = startBars[rightIndex].x

      enqueueAnimation(state.option.animate.moveDuration, (progress) => {
        const frameBars = startBars.map((bar) => ({ ...bar }))
        frameBars[leftIndex].x = Math.round(leftStartX + (rightStartX - leftStartX) * progress)
        frameBars[rightIndex].x = Math.round(rightStartX + (leftStartX - rightStartX) * progress)
        render(frameBars, [leftIndex, rightIndex])
      }).then(() => {
        const temp = state.bars[leftIndex]
        state.bars[leftIndex] = state.bars[rightIndex]
        state.bars[rightIndex] = temp

        state.bars[leftIndex].x = leftStartX
        state.bars[rightIndex].x = rightStartX
        render(state.bars)
        resolve()
      })
    })

  const covertRect = (i, j) =>
    new Promise((resolve) => {
      if (!state.bars.length) {
        resolve()
        return
      }

      const [leftIndex, rightIndex] = normalizeRange(i, j)
      if (leftIndex === rightIndex) {
        resolve()
        return
      }

      const startBars = state.bars.map((bar) => ({ ...bar }))
      const movingBar = { ...startBars[rightIndex] }

      enqueueAnimation(state.option.animate.moveDuration, (progress) => {
        const frameBars = startBars.map((bar) => ({ ...bar }))

        for (let k = rightIndex; k > leftIndex; k--) {
          const from = startBars[k - 1]
          const to = startBars[k]
          frameBars[k - 1].x = Math.round(from.x + (to.x - from.x) * progress)
        }

        frameBars[rightIndex].height = 0
        frameBars[rightIndex].y = state.option.chatZone[3]
        render(frameBars)
      }).then(() => {
        for (let k = rightIndex; k > leftIndex; k--) {
          state.bars[k] = state.bars[k - 1]
        }

        state.insertionCache = { ...movingBar, x: state.bars[leftIndex].x }
        render(state.bars)
        resolve()
      })
    })

  const insertRect = (index) => {
    if (!state.insertionCache || !state.bars.length) {
      render(state.bars)
      return
    }

    state.bars[index] = { ...state.insertionCache }
    state.insertionCache = null
    render(state.bars)
  }

  const dispose = () => {
    cancelAnimations()
    state.insertionCache = null
  }

  return {
    init,
    switchRect,
    covertRect,
    insertRect,
    dispose,
  }
}

const defaultAnimator = createCanvasAnimator()

const init = (...args) => defaultAnimator.init(...args)
const switchRect = (...args) => defaultAnimator.switchRect(...args)
const covertRect = (...args) => defaultAnimator.covertRect(...args)
const insertRect = (...args) => defaultAnimator.insertRect(...args)
const dispose = () => defaultAnimator.dispose()

export { createCanvasAnimator, init, switchRect, covertRect, insertRect, dispose }
