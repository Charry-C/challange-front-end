// 哈希表 启动！

// 1. 有效字母异位词
var isAnagram = function (s, t) {
    let sObj = {}
    let tObj = {}
    if (s.length !== t.length) {
        return false
    }
    for (let i = 0; i < s.length; i++) {
        if (sObj.hasOwnProperty(s[i])) {
            sObj[s[i]] = sObj[s[i]] + 1
        }
        else {
            sObj[s[i]] = 1
        }
        if (tObj.hasOwnProperty(t[i])) {
            tObj[t[i]] = tObj[t[i]] + 1
        }
        else {
            tObj[t[i]] = 1
        }
    }

    for (s in sObj) {
        let flag = false
        for (t in tObj) {
            console.log(`tObj[${t}]`, tObj[t], `sObj[${s}]`, sObj[s]);
            if (tObj[t] == sObj[s]) {
                flag = true
                break
            }
        }
        if (!flag) {
            return false
        }
    }

    return true
}

console.log(isAnagram('cccat', 'catcc'));

// 采用hash的Map写法
let hashIsAnagram = function (a, b) {
    if (a.length !== b.length) return false
    let hashMap = new Map()

    for (let s of a) {
        hashMap.set(s, (hashMap.get(s) || 0) + 1)
    }
    console.log(hashMap);
    for (let s of b) {
        if (!hashMap.get(s)) return false
        hashMap.set(s, hashMap.get(s) - 1)
    }
    return true

}

console.log(hashIsAnagram('asdddd', 'adddsd'));


// 2. 两个数组的交集
// 本题可以直接使用js原生的set方法来做
function arrCross(a, b) {
    let aSet = new Set(a)
    return Array.from(new Set(b.filter(item => aSet.has(item))))
}
console.log(arrCross([4, 9, 5], [9, 4, 9, 8, 4]));


// 3. 快乐数
// Q1：需要解决循环问题(可以使用数组来存出现的数字，如果数字重复出现则会循环，直接返回false)
function happyNum(n) {
    let apperArr = [], appearNum = null
    let numArr = Array.from(n + '', (x) => Number(x))
    function numAdd(numArr) {
        return numArr.reduce((lastSum, curVal) => {
            return lastSum + curVal * curVal
        }, 0)
    }
    while (apperArr.indexOf(appearNum) == -1) {
        apperArr.push(appearNum)
        appearNum = numAdd(numArr)
        if (appearNum == 1) {
            return true
        }
        // 转换
        numArr = Array.from(appearNum + '', (x) => Number(x))
        console.log(numArr);
    }
    return false
}

console.log(happyNum(99));

// 4. 两数之和
function twoNumAdd(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        let num = target - arr[i]
        let index = arr.slice(i + 1, arr.length + 1).findIndex(e => e == num)
        if (index !== -1) {
            return [i, index + (i + 1)]
        }
    }
}
console.log(twoNumAdd([2, 7, 11, 150], 157));

// hash思想
function twoNumAdd_Hash(arr, target) {
    let hash = new Map()
    for (let i = 0; i < arr.length; i++) {
        if (hash.has(target - arr[i])) {
            return [hash.get(target - arr[i]), i]
        }
        hash.set(arr[i], i)
    }
}

console.log('Hash大法', twoNumAdd_Hash([2, 7, 11, 150], 157));





