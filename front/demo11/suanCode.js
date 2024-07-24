// 栈和队列
// 1. 有效的括号
// 思路：由于括号肯定是两个符号才能组成的
// 所以只需要判断组成的在不在“(){}[]”中即可
var isValid = function (s) {
    if (!s.length % 2 || !s.length) return false
    const re = /^(?!.*(\{.*\}|\[.*\]|\(.*\))).*/g
    if (s.match(re) === null) return true
    return false
};
console.log(isValid('([)]'));

// {[]}
var isValid = function (s) {
    if (!s.length % 2 || !s.length) return false
    for (let i = 0; i < s.length; i += 2) {
        let checkstr = s.slice(i, i + 2)
        if (checkstr !== '{}' && checkstr !== '[]' && checkstr !== '()') {
            return false
        }
    }
    return true
};
console.log(isValid('{[]}'));

// 本题混淆的概念就是闭合，这个闭合搞清楚了那就是一道简单题
// 仔细思考了一下，确实可以采用栈的数据结构
// 入栈条件为同向括号，出栈条件：出现不同向括号
var isValid = function (s) {
    let stack = [s[0]]
    const re = /[\{\(\[]/g, valid = /(\{\})|(\[\])|(\(\))/g
    if (!s[0].match(re)) return false
    let d = false
    for (let i = 1; i < s.length; i++) {
        if (s[i].match(re)) {
            stack.push(s[i])
        } else {
            // 有反向括号则触发比对
            let str = stack.pop() + s[i]
            if (str.match(valid)) {
                continue
            } else {
                return false
            }
        }
    }
    if (stack.length) return false
    return true
}

isValid('[]{}')

// 看了题解发现可以更简单一点，不需要使用正则，而是用括号的相反压入
// 然后做消消乐
// 上面的想法实际上不太好想到，因为涉及到很多情况，所以不可能说第一次解题就能想到可以这样
// 仔细一想确实是在做消消乐，因为本题的本质就是寻找 同向括号 与 不同项括号 能否组合
// 还有一个需要考虑到的就是 比对的时机（不同向括号）
// 看题解发现以后遇到多类型的题可以用switch-case-default
var isValid = function (s) {
    let stack = []
    for (let i = 0; i < s.length; i++) {
        const c = s[i]
        switch (c) {
            case '[':
                stack.push(']');
                break;
            case '{':
                stack.push('}');
                break;
            case '(':
                stack.push(')');
                break;
            // 相反括号情况，进行比对
            default:
                if (c !== stack.pop()) {
                    return false
                }
        }
    }
    return stack.length == 0
};


// 2. 删除字符串中的所有相邻重复项
var removeDuplicates = function (s) {
    let stack = [s[0]]
    for (let i = 1; i < s.length; i++) {
        let popItem = stack.pop()
        if (popItem === s[i]) continue
        else {
            stack.push(popItem)
            stack.push(s[i])
        }
    }
    return stack.join('')
};
removeDuplicates('abc')


// 3. 滑动窗口最大值
var maxSlidingWindow = function (nums, k) {
    let maxArr = []
    for (let i = 0; i <= nums.length - k; i++) {
        maxArr.push(getMax(nums.slice(i, i + k)))
    }
    return maxArr
};

var getMax = (a) => {
    let max = a[0]
    for (let i = 1; i < a.length; i++) {
        if (a[i] > max) {
            max = a[i]
        }
    }
    return max
}


console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// 后续有空来看单调队列


// 4. 前 K 个高频元素,这个别理解错了（前k高的意思就是前1，前2，前3）

var topKFrequent = function (nums, k) {
    let map = new Map(), arr = []
    for (const i of nums) {
        map.set(i, (map.get(i) || 0) + 1)
    }
    let sortArr = Array.from(map).sort((a, b) => {
        return b[1] - a[1]
    })
    return sortArr.slice(0, k).map((x) => x[0])
};
console.log(topKFrequent([3, 3, 5, 5, 6, 7], 2));


