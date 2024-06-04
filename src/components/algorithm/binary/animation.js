import { getRandomColor } from "@/util/randomColor"

// 节点属性
const attr = {
    color: [],
    size: '50',

}
// 线条属性
const lineAttr = {
    width: 3,
}
export const createCircle = (ctx, node, x, y) => {
    // const { x: x, y: y } = c.axis()
    const r = attr.size //半径

    ctx.fillStyle = attr.color
    // 颜色
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = node.color;
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.font = "bold 48px serif";
    const text = node.value
    let off = ctx.measureText(node.value).width;
    ctx.fillText(text, x - off / 2, y + off / 2);
}

export const line = (ctx, x1, y1, x2, y2,progress) => {
    ctx.lineWidth = lineAttr.width;
    const color=getRandomColor()

    ctx.beginPath();
    const currentX = x1 + (x2 - x1) * progress;
    const currentY = y1 + (y2 - y1) * progress;
    ctx.moveTo(x1, y1);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}


