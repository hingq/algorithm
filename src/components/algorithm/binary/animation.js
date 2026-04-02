const nodeStyle = {
  radius: 50,
  fillColor: '#eef4ff',
  strokeColor: '#3b82f6',
  strokeWidth: 4,
  textColor: '#1f2937',
  font: 'bold 38px "PingFang SC", "Microsoft YaHei", sans-serif',
}

const lineStyle = {
  width: 3,
  color: '#64748b',
}

export const createCircle = (ctx, node, x, y) => {
  ctx.beginPath()
  ctx.arc(x, y, nodeStyle.radius, 0, 2 * Math.PI)
  ctx.fillStyle = nodeStyle.fillColor
  ctx.fill()
  ctx.lineWidth = nodeStyle.strokeWidth
  ctx.strokeStyle = nodeStyle.strokeColor
  ctx.stroke()

  ctx.fillStyle = nodeStyle.textColor
  ctx.font = nodeStyle.font
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(String(node.value), x, y)
}

export const line = (ctx, x1, y1, x2, y2, progress) => {
  ctx.lineWidth = lineStyle.width
  ctx.beginPath()
  const currentX = x1 + (x2 - x1) * progress
  const currentY = y1 + (y2 - y1) * progress
  ctx.moveTo(x1, y1)
  ctx.lineTo(currentX, currentY)
  ctx.strokeStyle = lineStyle.color
  ctx.stroke()
}

