

import { covertRect, switchRect,insertRect } from '@/util/canvs';
function swap(data, i, j) {
    data[i] = data[i] ^ data[j]
    data[j] = data[i] ^ data[j]
    data[i] = data[i] ^ data[j]
    // 使用异或 相同为0，不同为1
}
const buble = async function* (data) {

    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if (data[i] > data[j]) {
                [data[i], data[j]] = [data[j], data[i]]
                await switchRect(i, j);
                yield [i, j]
                // 暂停与恢复
            }
        }
    }
}
export { buble };

// 插入排序
export const insert = async function* (data) {
    let temp = undefined;
    let j;
    for (let i = 1; i < data.length; i++) {
        if (data[i - 1] > data[i]) {
            temp = data[i]

            // 找到合适位置插入
            for (j = i - 1; data[j] > temp; j--) {
                swap(data, j, j + 1)     
            }
            // j:开始位置，i 结束位置
            await covertRect(j+1, i);
            data[j+1] = temp
            insertRect(j+1)
            yield [i, i - 1]
            // 暂停与恢复
        }

    }
}

// 希尔排序
export const shell = async function* (data) {
    let de;
    let tempData = [0, ...data]
    let n = tempData.length
    let j;
    // 下标从1开始，0作为哨兵 
    for (de = de / 2; de >= 1; de = de / 2) {
        for (let i = de + 1; i <= n - 1; i++) {
            // 往后移动 i-de 
            if (tempData[i] < tempData[i - de]) {
                // 升序排列，降序此处写为 >
                tempData[0] = tempData[i]
                for (j = i - de; j > 0 && tempData[j] > tempData[0]; j -= de) {
                    // 依次将间隔为 de 的数往后移动，直到i-de 小于 j
                    // 即找到合适的地方插入
                    tempData[j + de] = tempData[j]
                }
                swap(tempData, 0, j + de);
                yield;
            }
        }
    }
}

// 简单选择排序
export const easeSort = function* (data) {
    let temp = undefined;
    let i;
    for (i = 0; i < data.length; i++) {
        temp = data[i]
        for (let j = i + 1; j < data.length; j++) {
            // 返回最小值的索引 [i+1,n]
            temp = data[j] < data[temp] ? j : temp;
            yield 1;
        }
        if (temp != i) {
            swap(data, data[temp], data[i])
        }
    }
}

//堆排序

//归并排序

//基数排序