// 开启副本系列 动态规划启动！
// 1. 使用最小花费爬楼梯
// 由题意来思考，怎么去掉一些不必要的楼梯呢
// 首先可以思考在第n层上楼梯有几种方式
// 根据这些方式来寻找最优的方式即可


// 其实爬楼梯的方式可以从最顶层的楼梯开始获取
// 最顶层肯定是一种1
// 次顶层两种，一种是上两节，一种是上1节然后+顶层的那一种

// 思路：从顶层，也就是下表最大开始计算
// 然后一步步往下（下标减小）计算最优，可以用数组存
// 只要能找到顶层和次顶层的最小花费，就能找到后面的最小花费了
var getCostMin = function (cost) {
    let costMin = []
    costMin[0] = cost[cost.length - 1]
    // 这里对应一层 和 两层
    costMin[1] = Math.min(cost[cost.length - 2], cost[cost.length - 2] + cost[0])

    for (let i = cost.length - 3, j = 2; i >= 0; i--, j++) {
        // 这里取的是后面走一层 和 走两层 的最低消费，就能得到该层的最低消费走法
        costMin[j] = cost[i] + Math.min(costMin[j - 2], costMin[j - 1])
    }
    return Math.min(costMin[costMin.length - 1], costMin[costMin.length - 2])
}
console.log(getCostMin([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));


// 2. 不同路径
// 有了上一题的基础，其实这也是道简单题，只需要找到起始即可
// 问题在于这里要如何处理边界，即初始化
// 需要初始化一个类似这样的二维数组
// [0,0,0,1]
// [1,1,1,1]
var uniquePaths = function (m, n) {
    let dp = new Array(m).fill(0).map((row, index) => {
        let fillNum = 0
        if (m === index + 1) fillNum = 1
        return new Array(n).fill(fillNum).map((col, index) => {
            if (n === index + 1) col = 1
            return col
        })
    })

    let i = m - 1, j = n - 1
    for (let range = 0; range < dp.length - 1; range++) {
        while (j >= 0) {
            dp[i - 1][j - 1] = dp[i][j - 1] + dp[i - 1][j]
            j--
        }
        i--
        j = n - 1;
    }
    return dp[0][0]
};
console.log(uniquePaths(3, 7));

// 不同路径II
// 还是很简单，只需要当到达障碍物位置时，让“路径种数”变为0即可(加一个判断即可)
// 这题ac不了的原因是因为初始化有问题，后续思考一下这种方法如何进行初始化
var uniquePathsWithObstacles = function (obstacleGrid) {
    let m = obstacleGrid.length, n = obstacleGrid[0].length
    if (obstacleGrid[m - 1][n - 1] == 1) return 0
    let dp = new Array(m).fill(0).map((row, index) => {
        let fillNum = 0
        if (m === index + 1) fillNum = 1
        let mIndex = index
        return new Array(n).fill(fillNum).map((col, index) => {
            if (n === index + 1) col = 1
            if (obstacleGrid[mIndex][index] === 1) col = -1
            return col
        })
    })

    console.log(dp);
    let i = m - 1, j = n - 1
    for (let range = 0; range < dp.length - 1; range++) {
        while (j > 0) {
            if (dp[i][j - 1] == -1) dp[i][j - 1] = 0
            if (dp[i - 1][j] == -1) dp[i - 1][j] = 0
            if (dp[i - 1][j - 1] == -1) {
                dp[i - 1][j - 1] = 0
                j--
                continue
            }
            dp[i - 1][j - 1] = dp[i][j - 1] + dp[i - 1][j]
            j--

        }
        i--
        j = n - 1
    }
    return dp[0][0]
};
console.log(uniquePathsWithObstacles([[0, 0], [1, 1], [0, 0]]));