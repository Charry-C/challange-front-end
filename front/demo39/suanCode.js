// dp系列
// 不同路径

// 二维数组类型的dp我觉得都需要对边界进行处理
var uniquePaths = function (m, n) {
    let dp = []
    Array(m + 1).fill().forEach(() => {
        dp.push(Array(n + 1).fill(0))
    })

    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp[i].length; j++) {
            if (i === 1 && j === 1) {
                // 初始化
                dp[1][1] = 1
                continue
            }
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m][n]
}

console.log(uniquePaths(3, 7));

// 最小路径和
// 回溯暴力解法不得行，超时了，就过了30%用例
var minPathSum = function (grid) {
    // 初始化数组
    grid.forEach((arr) => {
        arr.push(-1)
    })
    grid.push(Array(grid[0].length).fill(-1))

    let ret = []
    findMinRoute(grid, 0, 0, ret, [grid[0][0]])
    return ret.map(r => r.reduce((a, b) => a + b)).sort((a, b) => a - b)[0]
};

var findMinRoute = function (grid, i, j, ret, path) {

    // 到达终点
    if (grid[i + 1][j] === -1 && grid[i][j + 1] === -1) {
        return ret.push(path)
    }
    // 可以向下走
    if (grid[i + 1][j] != -1) {
        let newPath = [...path].concat(grid[i + 1][j])
        findMinRoute(grid, i + 1, j, ret, newPath)
    }
    // 可以向右走
    if (grid[i][j + 1] != -1) {
        let newPath = [...path].concat(grid[i][j + 1])
        findMinRoute(grid, i, j + 1, ret, newPath)
    }

}





// 采用动态规划的思想来实现
// 所谓动态规划，核心就是当前的状态可以由之前的状态推出（状态转移方程）
// 可优化的点（如何取当前状态）
var minPathSum = function (grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (!grid[i - 1]?.[j] && !grid[i]?.[j - 1]) continue
            // 触碰到上边界，那么当前状态就由左边推出
            else if (!grid[i - 1]?.[j]) grid[i][j] = grid[i][j - 1] + grid[i][j]
            // 触碰到左边界，那么当前状态就由上面推出
            else if (!grid[i]?.[j - 1]) grid[i][j] = grid[i - 1][j] + grid[i][j]
            else grid[i][j] = Math.min(grid[i][j - 1], grid[i - 1][j]) + grid[i][j]
        }
    }
    return grid[grid.length - 1][grid[0].length - 1]
}

console.log(minPathSum([[1, 2, 3], [4, 5, 6]]));


// 放松一下：合并区间
var merge = function (intervals) {
    // 按start给intervals排个序先
    intervals.sort((a, b) => a[0] - b[0])
    for (let i = 0; i < intervals.length; i++) {
        // 能合并
        if (i + 1 < intervals.length && intervals[i][1] >= intervals[i + 1][0]) {
            if (intervals[i][1] >= intervals[i + 1][1]) {
                intervals[i] = [intervals[i][0], intervals[i][1]]
                intervals.splice(i + 1, 1)
                i--
            } else {
                intervals[i] = [intervals[i][0], intervals[i + 1][1]]
                intervals.splice(i + 1, 1)
                i--
            }
        }
        // 不能合并
        else {
            continue
        }
    }
    return intervals
};


console.log(merge([[1, 4], [0, 2], [3, 5]]));
