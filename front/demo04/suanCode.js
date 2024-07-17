/*
 * @Author: Charryc 1121716938@qq.com
 * @Date: 2024-07-17 09:23:34
 * @LastEditors: Charryc 1121716938@qq.com
 * @LastEditTime: 2024-07-17 18:09:38
 * @FilePath: \手撕代码\front\demo04\suanCode.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 单元测试函数
let testArr = [[5, 4, 4, 2, 0, 5], [0], [4, 0, 444, 3], [], [1, 2, 3, 4, 5], [5, 4, 0, 1, 2, 3]]
function testFn(fn, testArr) {
    testArr.forEach(arr => {
        console.log(fn(arr));
    });
}

// 排序算法
// 3. 插入排序
function insertSort(arr) {
    if (arr.length === 0) {
        return arr
    }
    let sortedArr = [arr[0]]
    for (let i = 1; i < arr.length; i++) {
        for (let j = sortedArr.length - 1; j >= 0; j--) {
            // 由于sortedArr是已经排好序的了
            // 如果arr[i]比最后一个sortArr元素大，那就直接push
            if (sortedArr[j] <= arr[i]) {
                sortedArr.push(arr[i])
                break
            }
            // 比sortArr的前项大也可直接插入
            if (sortedArr[j - 1] < arr[i] || sortedArr[j - 1] === undefined) {
                sortedArr.splice(j, 0, arr[i])
                break
            }
        }
    }
    return sortedArr
}
console.time()
testFn(insertSort, testArr)
console.timeEnd()

// 4. 归并排序（不太好理解（可以理解递归的规律，主要是这个写法很难想），但是大致的思想就是分而治之）

function mergeSort(arr) {
    let len = arr.length
    if (len <= 1) {
        return arr
    }

    let middle = Math.floor(len / 2)
    let left = arr.slice(0, middle)
    let right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
}

// 排序的逻辑
function merge(left, right) {
    let arr = []
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            // 将左边的出队，加入到新数组的第一个
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }

    // 特殊情况：右边数组为空 or 左边数组为空
    while (left.length) {
        arr.push(left.shift())
    }
    while (right.length) {
        arr.push(right.shift())
    }
    return arr
}

console.time()
testFn(mergeSort, testArr)
console.timeEnd()

// 5. 选择排序





// 斐波那契数列 
function fn(n) {
    if (n == 0 || n == 1) {
        return n
    }
    return fn(n - 1) + fn(n - 2)
}

// 很喜欢的一种解法，可读性也较强，提供一种空间复杂度为O(1)的算法,这个比递归快dollar
function fib(n) {
    let fb = [0, 1]
    for (let i = 2; i <= n; i++) {
        fb[i] = fb[i - 1] + fb[i - 2]
    }
    return fb[n]
}

// -> 爬楼梯算法(其实要解出该题就是找到“数字变化规律”即可)
// 1->1   2->2   3->3   4->5  5->8 
function climbLadder(n) {
    let method = [1, 2]
    for (let i = 2; i <= n; i++) {
        method[i] = method[i - 1] + method[i - 2]
    }
    return method[n - 1]
}
console.log(climbLadder(10));



