const arr =
    [
        [1, 5, 1, 5, 1],
        [5, 4, 3, 4, 2],
        [5, 3, 2, 1, 3],
        [1, 1, 3, 3, 4],
        [5, 2, 1, 3, 5],
        [1, 2, 3, 4, 5]
    ];

arr.forEach(e => {
    e.unshift(0)
    e.push(0)
})
arr.unshift(Array(arr[0].length).fill(0))
arr.push(Array(arr[0].length).fill(0))
console.log(arr);

var findMaxRoute = function (arr) {
    let cunOne = [], max = 0
    arr.forEach((a, r) => {
        cunOne = []
        for (let c = 0; c < a.length; c++) {
            if (arr[r][c] === 1) {
                cunOne.push(dfs(arr, r, c, 1, 0))
            } else {
                cunOne.push(0)
            }
        }
        max = Math.max(max, cunOne.sort((a, b) => b - a)[0])
    })
    return max
}

var dfs = function (arr, i, j, nowNum, count) {
    let findNum, nowCount = 0
    if (nowNum === 5) {
        findNum = 1
    } else {
        findNum = nowNum + 1
    }
    if (arr[i - 1][j] === findNum) {
        nowCount = Math.max(nowCount, dfs(arr, i - 1, j, findNum, count + 1))

    }
    if (arr[i + 1][j] === findNum) {
        nowCount = Math.max(nowCount, dfs(arr, i + 1, j, findNum, count + 1))

    }
    if (arr[i][j - 1] === findNum) {
        nowCount = Math.max(nowCount, dfs(arr, i, j - 1, findNum, count + 1))

    }
    if (arr[i][j + 1] === findNum) {
        nowCount = Math.max(nowCount, dfs(arr, i, j + 1, findNum, count + 1))
    }
    return Math.max(count, nowCount)
}

try {
    console.log(findMaxRoute(arr));
} catch (error) {
    console.log(-1);
}