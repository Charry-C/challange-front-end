// 代码随想录 -- 正式启动！
/**
 * 数组系列：
 * 1. 移除元素
 * 要求：不能创建新空间，只能操作原数组
 * 思想：
 */
function deleteItem(arr, target) {
    // 传统方法（双循环）
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            for (let j = i; j < arr.length; j++) {
                arr[j] = arr[j + 1]
                if (j + 1 === arr.length) {
                    arr = arr.slice(0, j)
                }
            }
        }
    }
    return arr
}

// 双指针
// 我的原来的思考过程：我总想着如何去一个一个地用快指针去覆盖慢指针地下标，然后再一步步加加
// 但是这个双指针的思路实际上是 把slow走过的路就当作是新数组了(截取的思想,上面是覆盖的思想)，甚妙！
function deleteItemDoublePoint(arr, target) {
    let slow = 0
    for (let quick = 0; quick < arr.length; quick++) {
        if (arr[quick] != target) {
            arr[slow] = arr[quick]
            slow++
        }
    }
    return arr.slice(0, slow)
}

console.log(deleteItemDoublePoint([3, 3, 3, 3, 3, 3, 3, 3], 3));

// 使用js数组方法,虽然有原生的方法，算法思想还是很酷的
function arrOrigin(arr, target) {
    return arr.filter((e) => e !== target)
}
console.log(arrOrigin([3, 3, 1, 3, 6, 2, 3, 3], 3));



// 2. 有序数组的平方
let testArr = [[-4, -1, 0, 3, 10], [-7, -3, 2, 3, 11], [-1, 0, 0], [-1, -10, 100, 300, 5, 3]]
let testFn = (fn, testArr) => {
    console.log('=====2. 有序数组的平方=======');
    testArr.forEach(e => {
        console.log(fn(e));
    });
}

// 原生js数组方法,这个可以保证数组即使开始不是有序的也可以
function OrderArrSquared(arr) {
    return arr.map(e => Math.pow(e, 2)).sort((a, b) => a - b)
}
testFn(OrderArrSquared, testArr)

// 双指针法,首先需要发现题目的客观规律(最大值要么在左 要么在右)
function OrderArrSquared_DoublePoint(arr) {
    let L = 0
    let R = arr.length - 1
    let newArr = []
    let i = arr.length - 1
    while (i >= 0) {
        if (Math.pow(arr[L], 2) > Math.pow(arr[R], 2)) {
            newArr.unshift(Math.pow(arr[L], 2))
            L++
        } else if (Math.pow(arr[L], 2) <= Math.pow(arr[R], 2)) {
            newArr.unshift(Math.pow(arr[R], 2))
            R--
        }
        i--
    }
    return newArr
}
testFn(OrderArrSquared_DoublePoint, testArr)

// 3. 长度最小子数组(题目已经隐含了条件，子数组->连续)

// 这个算法写出来确实有点那个味，“滑蛋川口”的独家风味~
function minLongSubArr(arr, sum) {
    let targetArr = []
    for (let i = 1; i <= arr.length; i++) {
        let left = 0
        let right = i
        while (right <= arr.length) {
            let newArr = arr.slice(left, right)
            if (sum == newArr.reduce((a, b) => a + b)) {
                targetArr.push(newArr)
                break
            }
            left++
            right++
        }
    }
    if (targetArr.length === 0) {
        return '没有符合的子项'
    }
    return targetArr.sort((a, b) => a.length - b.length)[0]
}

console.log(minLongSubArr([2, 2, 1, 5, 2, 1, 3], 10));

// TODO 螺旋矩阵