// 开胃小菜
// 1. 反转字符串
var reverseStr = function (arr) {
    let left = 0, right = arr.length - 1

    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
    }
    return arr
}
console.log(reverseStr(["h", "e", "l", "l", "o"]));

// 2. 反转字符串II 采用分治法
var reverseStrII = function (str, k) {

    let sliceStr = []
    // 分片操作
    let len = str.length
    for (let i = 0; i < Math.ceil(len / 2 * k); i++) {
        let pushStr = str.slice(0, 2 * k)
        if (pushStr.length < k) {
            // 翻转str
            pushStr = reverseTool(pushStr)

        } else {
            // 翻转前K个
            pushStr = reverseTool(pushStr, k)

        }
        sliceStr.push(pushStr)
        str = str.slice(2 * k)
        console.log('str:', str);
    }
    return sliceStr.join('')


}

var reverseTool = function (str, len = str.length) {
    let left = 0, right = len - 1
    let arr = Array.from(str) // str.split('')
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
    }
    return arr.join('')
}

console.log(reverseStrII("abcdefg", 1));

// 3. 替换数字
// 可以用指针遍历判断正则是否匹配数字，匹配到数字直接换成number即可
var replaceNum = (s) => {
    let re = /\d/g
    str = s.split('')
    for (let i = 0; i < s.length; i++) {
        str[i] = str[i].match(re) ? 'number' : str[i]
    }
    return str.join('')
}
console.log(replaceNum('a1b2c3'));



// 学习一下正则：
// 一、断言（指针）：
// 1. \b：用于匹配单词的边界
//      例如：/\b\w+\b/g
//      A quick fox -> ["A", "quick", "fox"]
// 2. $:用于匹配结束，$的意思其实就相当于匹配指针从最后一个字符开始
//      例如：/\w+$/
//      A quick foxss -> ["foxss"]
//      /$\w+/  -> null
// 3. ^：用于匹配开头，和$类似，相当于匹配指针从第一个字符前开始
// 总结一下:断言其实就是指针，只不过指针的类型可以通过不同字符来看
// 边界指针(连续字符的边界)：\b
// 末尾匹配指针：$
// 开头匹配指针：^

// 二、匹配糖🍬(下面的'\xxx'都表示匹配一类东西)
// 1. \w:匹配[A-Z a-z 0-9 _] 在这个区间中的“字符”都可匹配 取反类是\W
// 2. \d:匹配[0-9]的数字“字符”  取反的类是\D
// 3. x|y:匹配 x/y

// 三、组(和上面的匹配糖类似，相当于可以自定义匹配糖)
// []来定义要匹配哪些字符，这里面写编为的一组匹配字符
// 1. [a-zA-z] 匹配所有大小写英文字符
// 2. [^]用于取反，[^123]：表示只要不是123都可以匹配
// ()用来“保存”匹配项，可以用来获取多个匹配，规则和[]一样，只不过它可以保存到match中并取出来
// 1. (?<Name>x)可以给组命名，这里的x是匹配规则，name是组名

// 四、量词(表示表达式要匹配多少个)
// 1. x*：匹配0——无穷次
// 2. x+：匹配1——无穷次
// 3. x{n}：匹配n次
// 4. x{n,}：匹配 n——无穷次
// 5. x{n,m}：匹配n——m区间次
// 6. x?：匹配0/1次(贪婪模式的启用)
// 注意一点：这里匹配像这里的x，那就是匹配x本身,如果是组就是组内的字符，是类就是类中的字符


var reverseWord = (s) => {
    const re = /(\b\w+[,.!]*)/g
    let arr = s.match(re)
    let left = 0, right = arr.length - 1
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
    }
    return arr.join(' ')
}
console.log(reverseWord('the sky is blue!'));


// 4. strStr()
var strStr = (h, n) => {
    if (n.length > h.length || n.length <= 0) return -1
    let round = h.length + 1 - n.length

    for (let i = 0; i < round; i++) {
        let count = 0
        for (let j = 0; j < n.length; j++) {
            if (n[j] === h[i + j]) {
                count++
                continue
            }
            break
        }
        if (count == n.length) {
            return i
        }
    }
    return -1
}
console.log(strStr('leetcode', 'leeto'));

// 5. repeatedSubstringPattern
var repeatedSubstringPattern = function (s) {
    let len = s.length;
    for (let i = 1; i <= len / 2; i++) {
        if (len % i === 0) { // 检查长度是否是 i 的倍数
            let subStr = s.slice(0, i);
            let repeatedStr = subStr.repeat(len / i);
            if (repeatedStr === s) {
                return true;
            }
        }
    }
    return false
};
console.log(repeatedSubstringPattern('ababx'));