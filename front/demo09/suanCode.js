// 编程与算法能力并不是几天就能看到效果的，需要的是日积月累
// 看了很多大佬的文章，觉得自己确实很菜，还得多练呀
// 1. 四数相加（暴力解法->4层for循环）
function fourSumCoun(a, b, c, d) {
    let count = 0
    for (let i = 0; index < a.length; i++) {
        for (let j = 0; index < b.length; j++) {
            for (let k = 0; index < c.length; k++) {
                for (let l = 0; index < d.length; l++) {
                    if (a[i] + b[j] + c[k] + d[l] === 0) {
                        count++
                    }
                }
            }
        }
    }
    return count
}
// hash方法->其实就是利用了空间 换 时间
// 原本时间是O(n^4)，现在利用空间将 时间变为O(n^4)->O(n^2)
// 思路：将a,b数组 在 c,d数组元素相加需要的数 找出来即可
function fourSumCoun_hash(a, b, c, d) {
    let hashMap = new Map()
    let count = 0
    for (let i of a) {
        for (let j of b) {
            let sum = i + j
            hashMap.set(sum, (hashMap.get(sum) || 0) + 1)
        }
    }

    for (let i of c) {
        for (let j of d) {
            let sum = -(i + j)
            if (hashMap.has(sum)) {
                count = count + hashMap.get(sum)
            }
        }
    }
    return count

}

//2. 赎金信
// 字符串A的字符 能由 字符串B的字符组成，且B字符要>=A字符
// 思路，可以创建两个map，但是这里可以创建一个map,当遍历B串时-A出现的字符即可
function canConstruct(a, b) {
    let hashMap = new Map()
    for (let i of b) {
        hashMap.set(i, (hashMap.get(i) || 0) + 1)
    }
    for (let j of a) {
        if (!hashMap.get(j)) {
            return false
        }
        hashMap.set(j, hashMap.get(j) - 1)
    }
    return true
}

//3. 三数之和
// hash的思路：用相加的值作为key，下标作为value
function threeSum_hash(a) {
    const map = new Map()
    let retArr = []
    for (let i = 0; i < a.length - 1; i++) {
        for (let j = i + 1; j < a.length; j++) {
            map.set(new Set().add(a[i]).add(a[j]), a[i] + a[j])
        }
    }
    for (let i = 0; i < a.length; i++) {
        for (let [key, value] of map) {
            if (value + a[i] == 0 && !key.has(a[i])) {
                retArr.push(Array.from(key).concat(a[i]))
                console.log(map.delete(key));
            }
        }
    }

    return retArr
}

// console.log(threeSum_hash([-1, 0, 1, 2, -1, -4]));

// 这题太复杂了，后面有空再来吧，不行，搞定他，就差最后一个去重了
// 主要记住去重的这个思路：如果这个数已经用过了i-1 === i，那么就continue
function threeSum(a) {
    let retArr = []
    let sortArr = mySort(a)
    let slow, fast
    for (let i = 0; i < sortArr.length; i++) {
        slow = i + 1
        fast = sortArr.length - 1
        if (sortArr[i] === sortArr[i - 1]) continue
        while (slow < fast) {
            if (sortArr[i] + sortArr[slow] + sortArr[fast] === 0) {
                retArr.push([sortArr[i], sortArr[slow], sortArr[fast]])
                while (slow < fast && sortArr[slow] === sortArr[slow + 1]) slow++;
                while (slow < fast && sortArr[fast] === sortArr[fast - 1]) fast--;
                slow++;
                fast = sortArr.length - 1
            }
            else if (sortArr[i] + sortArr[slow] + sortArr[fast] > 0) {
                fast--
            } else {
                slow++
            }
        }
    }
    return retArr
}
console.log(threeSum([0, 0, 0, 0]));

// 写一个快排作为辅助
function mySort(arr) {
    let len = arr.length
    if (len <= 1) return arr
    let left = [], right = [], pivot = Math.floor(len / 2)
    for (let i = 0; i < arr.length; i++) {
        if (i === pivot) continue
        if (arr[i] > arr[pivot]) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    return mySort(left).concat(arr[pivot], mySort(right))
}
console.log(mySort([-1, 0, 1, 2, -1, -4]));


var threeSum = function (a) {
    let retArr = [];
    let sortArr = a.sort((x, y) => x - y);
    let n = sortArr.length;

    for (let i = 0; i < n - 2; i++) {
        // 跳过重复元素
        if (sortArr[i] === sortArr[i - 1]) continue;

        let slow = i + 1;
        let fast = n - 1;

        while (slow < fast) {
            let sum = sortArr[i] + sortArr[slow] + sortArr[fast];
            if (sum === 0) {
                retArr.push([sortArr[i], sortArr[slow], sortArr[fast]]);

                // 跳过重复元素
                while (slow < fast && sortArr[slow] === sortArr[slow + 1]) slow++;
                while (slow < fast && sortArr[fast] === sortArr[fast - 1]) fast--;
                // 因为都用过了，所以++和--，我知道你在担心什么，你怕漏掉是吧，实际上是不可能的
                // 如果最后一个数 和 sortArr[i]都确定了，那slow还怕漏？所以不用怕，用过的且加入数组的就不管了
                slow++;
                fast--;
            } else if (sum > 0) {
                fast--;
            } else {
                slow++;
            }
        }
    }
    return retArr;

};