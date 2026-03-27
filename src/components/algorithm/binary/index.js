import { getRandomColor } from "@/util/randomColor";
import { line, createCircle } from './animation'

class TreeNode {
    constructor(v, l, r) {
        this.value = v;
        this.left = l;
        this.right = r;
        this.color = getRandomColor() //随机颜色
    }
}
var nodes = []
let animationQuene = []
let index = 0;

for (let i = 0; i < 7; i++) {
    nodes.push(new TreeNode(parseInt(i)))
}
const enqueue = (node, x, y, p_x, p_y) => {
    animationQuene.push({ node, x, y, p_x, p_y })
};
const draw = (ctx) => {
    if (index >= animationQuene.length) {
        return;
    }
    const { node, x, y, p_x, p_y } = animationQuene[index];
    index++;
    if (p_x !== null && p_y !== null) {
        let progress = 0;

        const drawNode = () => {
            // ctx.clearRect(0, 0, 1400, 1400);

            // drawPreviousNodes(ctx)
            line(ctx, p_x, p_y, x, y, progress);
            if (progress < 1) {
                progress += 0.02
                requestAnimationFrame(drawNode)
            } else {
                createCircle(ctx, node, x, y)
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        draw(ctx)
                    })
                }, 500);
            }
        };
        drawNode()
    } else {
        createCircle(ctx, node, x, y)
        setTimeout(() => {
            requestAnimationFrame(() => draw(ctx))
        }, 500);
    }
}
const initAnimatinQueue = (node, x, y, level, p_x = null, p_y = null) => {
    if (!node) return;
    enqueue(node, x, y, p_x, p_y)

    const offsetX = 250 / Math.pow(2, level)
    const offsetY = 150

    if (node.left) {
        initAnimatinQueue(node.left, x - offsetX, y + offsetY, level + 1, x, y +50) //加上半径长度
    }
    if (node.right) {
        initAnimatinQueue(node.right, x + offsetX, y + offsetY, level + 1, x, y+50)
    }
}

// 构建二叉树结构
nodes[0].left = nodes[1];
nodes[0].right = nodes[2];
nodes[1].left = nodes[3];
nodes[1].right = nodes[4];
nodes[2].left = nodes[5];
nodes[2].right = nodes[6];

export const init = (node) => {
    const ctx = node.getContext('2d');
    animationQuene = []
    index = 0
    node.width = 700 * 2
    node.height = 500 * 2
    node.style.width = 700 + "px";
    node.style.height = 500 + "px";
    // 绘制二叉树
    ctx.clearRect(0, 0, node.width, node.height)
    initAnimatinQueue(nodes[0], 700, 150, 0);
    draw(ctx);
    // drawCircle(ctx)
    // line(ctx)
}
