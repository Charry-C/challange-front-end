/**
 * 1. 压缩字符串
 * Input: 'aaaabbbaccd'
 * Output: 'a4b3c2d1'
 * @param  {String} input
 * @return {String} 
 */
function enCodeString(input) {
    let obj = {}
    let Output = ''
    for (let i = 0; i < input.length; i++) {
        if (!obj.hasOwnProperty(input[i])) {
            obj[input[i]] = 0
        }
        if (obj.hasOwnProperty(input[i])) {
            obj[input[i]]++
        }
    }
    for (key in obj) {
        Output = Output + key + obj[key]
    }
    return Output
}
console.log(enCodeString('aaaabbbcAAcd'));
// 优化一下，使用双指针
function BestenCode(input, min) {
    let slow = 0
    let arr = [], Output = ''
    for (let i = 1; i <= input.length; i++) {
        if (input[i] !== input[slow]) {
            arr.push(input.slice(slow, i))
            slow = i
        }
    }
    arr.forEach(e => {
        if (e.length <= min) {
            Output = Output + e
        } else {
            Output = Output + e[0] + e.length
        }
    })
    return Output
}
console.log('最优方案:', BestenCode('aaab', 1));