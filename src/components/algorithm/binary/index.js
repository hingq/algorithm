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
// 节点属性
const attr = {
    color: [],
    size: 50,

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
// 保存已绘制的节点和线条
let previousNodes = [];
const drawPreviousNodes = (ctx) => {
    ctx.clearRect(0,0,1400,1400)
    for (const item of previousNodes) {
        if (item.p_x !== null && item.p_y !== null) {
            ctx.beginPath();
            ctx.moveTo(item.p_x, item.p_y+attr.size);
            ctx.lineTo(item.x, item.y);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
        createCircle(ctx, item.node, item.x, item.y);
    }
};
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
    node.width = 700 * 2
    node.height = 500 * 2
    node.style.width = 700 + "px";
    node.style.height = 500 + "px";
    // 绘制二叉树
    initAnimatinQueue(nodes[0], 700, 150, 0);
    previousNodes = [...animationQuene]
    draw(ctx);
    // drawCircle(ctx)
    // line(ctx)
}
//每个新产生的节点初始位置
const drawCircle = (ctx) => {
    const r = attr.size;
    ctx.beginPath();
    ctx.arc(150, 150, r, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
    insertBinary(r, 5);
}

// 插入节点
function insertBinary(root, value) {
    if (!root) return new TreeNode(value);

    if (value < root.value) {
        root.left = insertBinary(root.left, value);
    } else {
        root.right = insertBinary(root.right, value);
    }

    return root;
}