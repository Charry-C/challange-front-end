// 大数相加
function bigNumAdd(numstr1, numstr2, n) {
    let toup = 0
    let isup = 0
    let zeroAdd
    if (numstr1.length < numstr2.length) {
        zeroAdd = Array(numstr2.length - numstr1.length).fill(0).join('')
        numstr1 = zeroAdd + numstr1
    } else {
        zeroAdd = Array(numstr1.length - numstr2.length).fill(0).join('')
        numstr2 = zeroAdd + numstr2
    }
    let sumStr = ''
    for (let i = numstr1.length - 1; i >= 0; i--) {
        toup = Number(numstr1[i]) + Number(numstr2[i]) + isup
        isup = 0
        if (toup >= 10) {
            isup = 1
        }
        toup = toup + ''

        if (isup == 1 && i == 0) {
            sumStr = '1' + toup[toup.length - 1] + sumStr
        } else {
            sumStr = toup[toup.length - 1] + sumStr
        }

    }
    return sumStr
}

const num1 = '99999999'
const num2 = '999999'
console.log(bigNumAdd(num1, num2));