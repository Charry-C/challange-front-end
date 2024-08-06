// 温习一遍深拷贝
const obj = {
    nickName: 'charry',
    age: 22,
    school: {
        address: [
            '广东省广州市海珠区',
            {
                info: {
                    academy: '数字经济学院',
                    professional: '大数据管理与应用'
                },
            },
            () => {
                console.log('数组里的函数')
            },
            ['没想到吧']
        ],
    },
    sayHi: () => {
        console.log('HELLO JAVASCRIPT!');
    }
}

// 检查数据类新的函数
var checkType = (val) => {
    if (val === undefined) return 'undefined'
    if (val === null) return 'null'
    return `${val.constructor}`.replace(/(\[|\])/g, '').split(' ')[1].replace('()', '')
}

// 困难重重：
// 1. 函数咋处理，正则会丢失？（能想到的方法就是用JSON.stringify❌ 这个方法不行，这就是为什么不能用JSON.stringify深拷贝的原因）
// 函数不需要克隆，直接返回即可（不要为了克隆而克隆，深拷贝对象是有作用的，深拷贝函数没有意义）
// 类似的，像Date,Promsie,RegExp都没有必要克隆，都是功能，直接return即可
// 那么问题一下就简单很多了，只需要区分哪些是直接返回，哪些是需要创建新的引用来实现克隆
// 直接返回：Date, Promise, Function, 基本数据类型（String, Number, null, undefined）
// 说到底，就五种需要克隆：Object, Array, Map, Set, RegExp
// 其中需要遍历的是：Object, Array, Map, Set
// 不需要遍历的是：RegExp

function deepClone(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => {
            return deepClone(item)
        })
    }
    else if (typeof obj === 'object') {
        const newObj = {}
        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                newObj[key] = deepClone(obj[key])
            }
            if (typeof (obj[key]) === 'object') {
                newObj[key] = deepClone(obj[key])
            }
            else {
                newObj[key] = obj[key]
            }
        }
        return newObj
    }
    else {
        return obj
    }
}

// 上面的代码可以继续优化,比如数组的克隆其实可以和对象的合并，都用forin
// 优化版本：
function betterClone(target) {

    // 属于下面这些类型的直接返回
    switch (checkType(target)) {
        case 'undefined':
        case 'null':
        case 'String':
        case 'Number':
        case 'Function':
            return target
        // source是regexp的正则匹配，flags是后面的/g /i
        case 'RegExp': return new RegExp(target.source(), target.flags())
        // 获取时间戳才能生成新对象
        case 'Date': return new Date(target.getTime())
    }

    // 当不是上面类型的，那就是可遍历类型的了，那就得有东西可以存这些值了
    // init
    let newTarget = new target.constructor
    // Map
    if (checkType(target) === 'Map') {
        for (const [key, val] of target) {
            newTarget.set(deepClone(key), deepClone(val))
        }
        return newTarget
    }
    // Set
    if (checkType(target) === 'Set') {
        for (const val of target) {
            newTarget.add(deepClone(val))
        }
        return newTarget
    }
    // Object 和 Array都可以用下面的
    for (const key in target) {
        newTarget[key] = betterClone(target[key])
    }
    return newTarget
}


let a = [{
    b: 1
},
{
    c: 2,
    f: () => { },
    a: new Map([['1', '2'], ['a', 'b']])
}
    , 1]

let d = betterClone(a)
a[1].a.set('1', 1000)
console.log(d);






// obj.newkey = obj要处理循环引用问题，但是回想一下，为什么会写这样的对象呢？
// 对象里还有个属性名是指向原来的对象,这不是变成环了吗? newkey: [Circular *1]
// 我认为这样的循环引用不需要考虑，做了解即可（我是实用派，不是八股派）
// 解决方案：用map存当前的对象，然后传给下一个clone函数，如过已经存在了这个对象，那就直接return这个对象为val
// obj.newkey = obj

let newObj = deepClone(obj)
obj.school.address[1].info.academy = '信息学院'
obj.nickName = 'harry'
console.log(newObj);







// 完成深拷贝之前，需要先编写两个工具函数
// 1. 克隆函数 的 工具函数（写的并不好）
// 2. “精准判断” 数据类型的函数

// 由于函数拥有toString()实例方法,因此可以直接使用该方法将函数变为字符串
// 这个克隆函数还不够健壮，克隆不了Promise
// 虽然但是，克隆fn好像没有必要，函数=功能，既然要的是功能那就直接返回就好了啊！
var cloneFn = (fn) => {
    return new Function('return ' + fn.toString())()
}

const p1 = new Promise((res, rej) => {
    setTimeout(() => res, 1000, 'ok')
})
const p2 = Promise.resolve(p1) // 返回一个相同的promise
console.log(p1 === p2); // true



// 获取数据类型的通用方法❌ null undefined判断不了,只能手动if

console.log(checkType(undefined)); // "undefined"
console.log(checkType(null)); // "null"
console.log(checkType("string")); // "String"
console.log(checkType(123)); // "Number"
console.log(checkType([])); // "Array"
console.log(checkType({})); // "Object"
console.log(checkType(function () { })); // "Function"
console.log(checkType(new Date())); // "Date"
console.log(checkType(new RegExp())); // "RegExp"
console.log(checkType(new Map())); // "Map"
console.log(checkType(new Set())); // "Set"
console.log(checkType(Promise.resolve())); // "Promise"



// 深拷贝都撕出来了，那么浅拷贝就洒洒水啦
// 浅拷贝那就只是复制顶级属性即可,次级的对象可以直接保留原引用
function shallowClone(target) {
    if (checkType(target) === 'Object') {
        return Object.assign({}, target)
    }
    if (checkType(target) === 'Array') {
        return [...target]
    }
    if (checkType(target) === 'Map') {
        const map = new Map()
        for (const [k, e] of target) {
            map.set(k, e)
        }
        return map
    }
    if (checkType(target) === 'Set') {
        const set = new Set()
        for (const e of target) {
            set.add(e)
        }
        return set
    }
    return target
}