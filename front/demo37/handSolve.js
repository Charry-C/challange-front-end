// 大数字符串除法
// 思路：核心就是要找到每次要进行的操作是什么，然后做一个区分即可
// 1. 当除数 % 被除数===0，证明可以整除，那么就可以直接把后面的那一位作为下一个除数
// 2. 当除数 % 被除数!==0，证明不能整除，那么只能取余并加入下一位作为下一个除数
const cs = '62666686435135324938493748573423488'
const bcs = 3235253

var cfm = function (cs, bcs, jd) {
    let ret = '', nowCs = cs[0]
    cs = cs + '.' + '0'.repeat(jd - 1)
    for (let range = 0; range < cs.length; range++) {
        if ((nowCs % bcs) === 0) {
            ret = ret + (Math.floor(nowCs / bcs))
            if (cs[range + 1] === '.') {
                nowCs = cs[range + 2]
                ret += '.'
            } else {
                nowCs = cs[range + 1]
            }

        } else {
            ret = ret + (Math.floor(nowCs / bcs))
            if (cs[range + 1] === '.') {
                nowCs = Number((nowCs % bcs) + '' + cs[range + 2])
                ret += '.'
            } else {
                nowCs = Number((nowCs % bcs) + '' + cs[range + 1])
            }

        }
    }
    return ret.slice(Array.from(ret).findIndex(x => x > 0))
}

console.log(cfm(cs, bcs, 3));


// 合并有序链表




