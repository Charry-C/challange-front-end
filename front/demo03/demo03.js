// 排序算法

// 单元测试函数
let testArr = [[5,4,4,2,0,5],[0],[4,0,444,3],[],[1,2,3,4,5],[5,4,0,1,2,3]]
function testFn(fn,testArr){
    testArr.forEach(arr => {
        console.log(fn(arr));
    });
}

// 1. 冒泡排序
/**
 * 冒泡排序(正反都可,flag为true即为从大到小，反之小到大)
 * 思路：两两比较，每一轮比较可以确定一个位置
 * @param {Array} arr 
 * @param {Boolean} flag 
 * @returns arr
 */
function Popbabel(arr, flag){
    function change(arr, j){
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
    }
    for (let i = arr.length; i > 0; i--) {
        for(let j = 0; j < i - 1; j++){
            if(arr[j] > arr[j+1] && flag){
                change(arr, j)
            }
            else if(arr[j] < arr[j+1] && !flag){
                change(arr, j)
            }
        }
    }
    return arr
}
(()=>{
    console.log('=============冒泡排序测试=============');
    console.time()
    testFn(Popbabel,testArr)
    console.timeEnd()
})()


// Array.prototype中的sort方法，表达式返回为(正数)true则交换,0不变,false不换
console.log([5,4,4,2,0,5].sort((a,b)=>b-a));


// 2. 快速排序
// 思路:先找一个基准元素，要达到一个效果：左边元素都比基准小，右边都比基准大
function rapidSort(arr){
    if(arr.length<=1){
        return arr
    }

    // 确定基
    let pivot = arr[Math.floor(arr.length / 2)]
    // 划分 左分区 and 右分区
    let left = []
    let right = []

    for (let i = 0; i < arr.length; i++) {
        // 如果 i下标 === 基元素的下标，则继续
        if(i === Math.floor(arr.length / 2)){
            continue
        }

        // 左边放比基元素小的值，右边放大于等于基元素的值
        if(arr[i]<pivot){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }

    // 快排算法精髓，用了这个递归的思想一直往下划分划划分....按照concat这个顺序就能拿到排序结果
    return rapidSort(left).concat(pivot,rapidSort(right))
}


(()=>{
    console.log('=============快速排序测试start=============');
    console.time()
    testFn(rapidSort,testArr)
    console.timeEnd()
})()