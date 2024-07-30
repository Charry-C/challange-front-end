// 1. 整数拆分 
// 获得最大的乘积
// 思路：当数与数之间的差越小时，乘积越大
// 所以本题的本质就是寻找数差最小，比较组合大小即可
// 外层函数传递的是除以几，内层只负责提供分好的Arr
var integerBreak = function (n) {
    let max = 0, i = 2
    while (true) {
        let newMax = getArr(n, i).reduce((a, b) => a * b)
        if (newMax > max) max = newMax
        else break
        i++
    }
    return max
}

/**
 * 
 * @param {Number} n 需要拆分的整数数值
 * @param {Number} k 需要划分的份数
 * @returns 
 */
var getArr = function (n, k) {
    let arr = []
    for (let i = k; i > 1; i--) {
        if (n % i === 0) {
            arr.push(...new Array(i).fill(n / i))
            return arr
        }
        else {
            let cur = Math.floor(n / i)
            arr.push(cur)
            n = n - cur
        }
    }
    arr.push(n)
    return arr
}

console.log(integerBreak(10));


// 2. 不同二叉搜索树
var numTrees = function (n) {
    let dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }

    return dp[n];
};
console.log(numTrees(5));