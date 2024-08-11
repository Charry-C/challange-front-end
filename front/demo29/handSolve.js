// 千分位分割
const nums = ['125', '44115', '8484842020215', '5538979', '213262234262032361298']

var cutNums = function (num) {
    const newArr = []
    let count = 0
    for (let i = num.length - 1; i >= 0; i--) {
        count++
        if (i - 1 >= 0) {
            count % 3 === 0 ? newArr.unshift(',', num[i]) : newArr.unshift(num[i])
        } else {
            newArr.unshift(num[i])
        }
    }
    return newArr.join('')
}
nums.forEach(item => {
    console.log(cutNums(item));
})

