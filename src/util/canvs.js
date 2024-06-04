
const util = {
    canvas_: null,
    ctx: null,
    opt: {
        chatZone: [50, 50, 700, 470],//绘图区域
        yAxisLabel: [], //y 轴
        yMax: 400,//max
        xAxisLabel: [],
        data: [],//柱状图数据
        barStyle: {
            width: 50, //宽度
            color: '#3982b4eb'//颜色

        },
        animate: {
            animateDuration: 1500,//ms
            animateStartTime: 0,
            switchTime: 100,
            StartTime: 0,
        },
    },
    style: {
        fillColor: '#353535',
        font: '18px',
        strokeWidth: 4,
        fillStyleGradient: null,
        currentColor: '#198148'
    },
    rectPosition: [],//记录矩形的位置
    creatHiDPI: function (canvas) {
        // 获取ratio
        const PIXEL_RATIO = (function () {
            const c = canvas;
            const ctx = c.getContext("2d");
            const dpr = window.devicePixelRatio || 1;
            const bsr = ctx['webkitBackingStorePixelRatio'] ||
                ctx['mozBackingStorePixelRatio'] ||
                ctx['msBackingStorePixelRatio'] ||
                ctx['oBackingStorePixelRatio'] ||
                ctx['backingStorePixelRatio'] || 1;

            return dpr / bsr;
        })();
        return PIXEL_RATIO
    },
    clear: function () {
        parameter.ctx.clearRect(0, 0, this.canvas_.width, this.canvas_.height)
    }
}
const parameter = {
    ctx: null,
    yAxisLabel: null,
    xAxisLabel: null,
    data: [],
    opt: {}
}

// 代理 及时改变ctx的值
let handler = {
    get: function (target, prop) {
        let ret = Reflect.get(target, prop)
        if (prop === 'opt') {
            parameter[prop] = {}
            return new Proxy(ret, handler)
        }
        return target[prop]
    },
    set: function (target, prop, v) {
        if (prop in parameter) {
            if (prop === 'data') {
                parameter.data = [...v]
            }
            else {
                Reflect.set(parameter, prop, v)
            }
        }
        return Reflect.set(target, prop, v)
    }
}

const utilProxy = new Proxy(util, handler)




let { chatZone: z } = util.opt

const { fillColor, font, strokeWidth } = util.style
// let data = util.opt.data
//对象是引用类型，data变化，opt.data也会改变

let stopFalg = false
let { switchTime, StartTime, animateDuration } = util.opt.animate
let switchData;//保存交换的数据
let primary = undefined;

// 相减
function minus(a, b) {
    return (a - b) / switchTime
}

// 绘制坐标轴
const drawAxis = () => {
    parameter.ctx.strokeWidth = strokeWidth;
    parameter.ctx.strokeStyle = fillColor;
    parameter.ctx.moveTo(z[0], z[1]);
    parameter.ctx.lineTo(z[0], z[3])
    parameter.ctx.lineTo(z[2], z[3])
    parameter.ctx.lineTo(z[2], z[1])
    parameter.ctx.stroke();
}

// 绘制y
const drawYLabel = () => {
    let gap = (z[3] - z[1]) * 0.98 / (parameter.yAxisLabel.length - 1)
    parameter.yAxisLabel.forEach((label, i) => {
        let off = parameter.ctx.measureText(label).width + 20
        parameter.ctx.strokeStyle = fillColor
        parameter.ctx.font = font
        parameter.ctx.fillStyle = fillColor
        parameter.ctx.fillText(label, z[0] - off, z[3] - i * gap);
        if (i > 0) {
            // 绘制短线
            parameter.ctx.beginPath()
            parameter.ctx.strokeStyle = fillColor
            parameter.ctx.moveTo(z[0] - 10, z[3] - i * gap);
            parameter.ctx.lineTo(z[0], z[3] - i * gap)
            parameter.ctx.stroke();
        }
    });

}
//绘制x
const drawXLabel = () => {
    let xlabel = parameter.xAxisLabel
    let gap = (z[2] - z[0]) * 0.9 / xlabel.length
    xlabel.forEach((label, i) => {
        let off = parameter.ctx.measureText(label).width;
        parameter.ctx.strokeStyle = fillColor
        parameter.ctx.font = font
        parameter.ctx.fillText(label, z[0] + (i + 1) * gap - off, z[3] + 20)
        parameter.ctx.beginPath()
        parameter.ctx.moveTo(z[0] + (i + 1) * gap - off / 2, z[3])
        parameter.ctx.lineTo(z[0] + (i + 1) * gap - off / 2, z[3] + 5);
        parameter.ctx.stroke();
        util.opt.offsetXLabel = off / 2
    })
}
//绘制数据

const drawData = () => {
    let Xlength = (z[2] - z[0]) * 0.9
    let Ylength = (z[3] - z[1]) * 0.98
    let gap = Xlength / util.opt.xAxisLabel.length
    parameter.data.forEach((item, i) => {
        let x0 = z[0] + (i + 1) * gap - util.opt.barStyle.width / 2 - util.opt.offsetXLabel
        let height = item / util.opt.yMax * Ylength
        let y0 = z[3] - height
        let width = util.opt.barStyle.width
        x0 = Math.floor(x0)
        y0 = Math.floor(y0)
        height = Math.floor(height)
        util.rectPosition[i] = { x: x0, y: y0, width: width, height: height }
        parameter.ctx.fillStyle = util.opt.barStyle.color
        parameter.ctx.fillRect(x0, y0, width, height)
    })
}
//绘制动画
let anfunc; //保存requestAnimationFrame的返回值
let animatefunc = () => {
    let currentTime = performance.now()
    let elapsedTime = currentTime - StartTime
    if (elapsedTime <= animateDuration) {
        let progress = elapsedTime / animateDuration
        for (var i = 0; i < parameter.data.length; i++) {
            parameter.data[i] = util.opt.data[i] * progress
        }
    } else {
        stopFalg = true
        cancelAnimationFrame(anfunc)
    }
    run()
    if (!stopFalg) {
        anfunc = requestAnimationFrame(animatefunc)
    }
}
//整合绘制使用的函数
function drawbase() {
    drawAxis()
    drawYLabel()
    drawXLabel()
}

const run = () => {
    util.clear()
    drawbase()
    drawData()
    switchData = [...util.rectPosition]
    primary = util.rectPosition.map(obj => (obj.x))
}
//柱体交换
let swanimation;

function switchRect(i, j) {
    return new Promise((resolve) => {
        let switchFlag = false
        if (i > j) {
            i = i ^ j
            j = i ^ j
            i = i ^ j
        }
        let maxRange = primary[j] //默认i<j

        if (switchFlag) {
            cancelAnimationFrame(swanimation)
            resolve();
        }
        let dx = minus(switchData[j].x, switchData[i].x)
        function drawSwitch() {
            util.clear()
            if (switchData[i].x <= maxRange) {
                switchData[i].x = Math.ceil(switchData[i].x + dx)
                switchData[j].x = Math.floor(switchData[j].x - dx)
            } else {
                switchFlag = true
            }
            drawbase()
            switchData.forEach((r, index) => {
                if (index === i || index === j) {
                    if (i + 1 !== 6 || j !== 6) {
                        parameter.ctx.fillStyle = util.style.currentColor
                    }
                }
                else {
                    parameter.ctx.fillStyle = util.opt.barStyle.color
                }
                parameter.ctx.fillRect(r.x, r.y, r.width, r.height)
            })

            if (!switchFlag) {
                swanimation = requestAnimationFrame(drawSwitch)
            } else {
                /**
                 * 由于直接在ij计算x坐标的值后发生改变，为了确保下次引用ij时x坐标值是原始的坐标
                 * 
                 * 绘制完成后需要进行一次重新赋值
                 */
                [switchData[i], switchData[j]] = [switchData[j], switchData[i]]
                resolve()
            }
        }
        drawSwitch()
    })
}

// 插入
let tempobj = {
    obj: undefined,
    index: undefined
};

function covertRect(i, j) {
    // i<j

    let maxRange = []
    let insertFalg = false;
    if (i > j) {
        i = i ^ j
        j = i ^ j
        i = i ^ j
    }
    return new Promise(resolve => {


        let dx = minus(switchData[i + 1].x, switchData[i].x)
        let min = i
        let max = j
        function drawSwitch() {
            i = min
            j = max
            while (j > i) {
                maxRange[j] = primary[j] //保存横坐标
                if (switchData[j - 1].x <= maxRange[j]) {
                    switchData[j - 1].x = Math.ceil(switchData[j - 1].x + dx)
                    // switchData[j].x = Math.floor(switchData[j].x - dx)
                } else {
                    insertFalg = true
                }
                j--
            }
            util.clear()
            drawbase()
            switchData.forEach((r, index) => {
                if (index === i || index === j) {
                    if (i + 1 !== 6 || j !== 6) {
                        parameter.ctx.fillStyle = util.style.currentColor
                    }
                }
                else {
                    parameter.ctx.fillStyle = util.opt.barStyle.color
                }
                parameter.ctx.fillRect(r.x, r.y, r.width, r.height)
            })
            if (!insertFalg) {
                swanimation = requestAnimationFrame(drawSwitch)
            } else {
                /**
                 * 由于直接在ij计算x坐标的值后发生改变，为了确保下次引用ij时x坐标值是原始的坐标
                 * 
                 * 绘制完成后需要进行一次重新赋值
                 */
                tempobj.obj = Object.assign({}, switchData[max]);
                tempobj.index = max
                tempobj.obj.x = primary[min]

                while (max > min) {
                    switchData[max] = switchData[max - 1]
                    max--;
                }

                resolve()
            }
        }
        drawSwitch()
    })

}

function insertRect(index) {

    switchData[index] = tempobj.obj


    switchData.forEach(r => {
        parameter.ctx.fillStyle = util.opt.barStyle.color
        parameter.ctx.fillRect(r.x, r.y, r.width, r.height)
    })

    //   let insertflag = false
    // const key=tempobj.index
    // const dx=minus(switchData[key].x,switchData[index].x)

    // let anmiation=undefined


    // function draw() {
    //     util.clear()
    //     drawbase()
    //     switchData.forEach((r,i) => {
    //         if(index===i){
    //             if(switchData[i].x>=primary[i]){
    //                 switchData[i].x=Math.floor(switchData[i].x-dx)
    //             }else {
    //                 insertflag=true
    //             }
    //         }
    //         parameter.ctx.fillStyle = util.opt.barStyle.color
    //         parameter.ctx.fillRect(r.x, r.y, r.width, r.height)
    //     })

    //     if(insertflag===true){
    //         cancelAnimationFrame(anmiation)
    //     }
    //     anmiation=requestAnimationFrame(draw)
    // }
    // draw()

}
function init(canvas_) {
    let data = [70, 50, 200, 330, 390, 320, 220]
    let yAxisLabel = ['0', '100', '200', '300', '400']
    let xAxisLabel = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    let radio = util.creatHiDPI(canvas_)

    if (arguments.length > 1) {

        // data , y ,x 
        ({ data, yAxisLabel, xAxisLabel } = arguments[1])
    }
    utilProxy.ctx = canvas_.getContext('2d');
    utilProxy.canvas_ = canvas_

    utilProxy.opt.yAxisLabel = yAxisLabel
    utilProxy.opt.xAxisLabel = xAxisLabel
    utilProxy.opt.data = data

    canvas_.width = 700 * radio
    canvas_.height = 500 * radio
    canvas_.style.width = 700 + "px";
    canvas_.style.height = 500 + "px";
    parameter.ctx.scale(2, 2)
    animatefunc()
}

export { init, switchRect, covertRect, insertRect }



