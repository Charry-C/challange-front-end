// 一道别人的面试题
// ==TODO==:考察了对象赋值的一个点 obj.a 和 obj[a] 的区别
// ==TODO==:看了一下别人写的，使用了Object.keys()这个API,可以了解一下
let obj = {
    "a": { "n1": 1, "n2": 3 },
    "b": { "n1": 2, "n2": 4 },
    "c": { "n1": 3, "n2": 5 }
}
// 要求输出 { n1: { a: 1, b: 2, c: 3 }, n2: { a: 3, b: 4, c: 5 } }

function transformer(obj) {
    let newObj = {}
    for (objKey in obj) {
        for (newKey in obj[objKey]) {
            if (!newObj.hasOwnProperty(newKey)) {
                newObj[newKey] = {}
            }
            newObj[newKey][objKey] = obj[objKey][newKey]
        }
    }
    return newObj
}
console.log(transformer(obj));



var a = () => {
    console.log('Hi! I\'m ' + this.name + '.');
};


console.log(new a.constructor());
// 总结一下 Object.create() 和 对象.constructor()之间的区别
// Object.create()是按照现有的object实例构建一个新的实例对象，可以用于object的深拷贝
// console.log(Object.create(person1) === person1); >>> flase
// 实例对象.constructor()直接就是对象的构造函数
// 1. 实例对象是function myFn() 那么就是 实例对象.constructor() === Function
// 2. 实例对象是myObj 那么就是 实例对象.constructor() ===Object

// 利用函数作用域+闭包使其输出为0 1 2 3 4 
// for (var i = 0; i < 5; i++) {
//     setTimeout(function () {
//         console.log(new Date, i);
//     }, 0);
// }
console.log('函数作用域版本:')
for (let i = 0; i < 5; i++) {
    ((i) => {
        // 隐含一个点，函数传参是会在函数体先申明这个变量i的
        // 相当于这里第一句执行了let i = i 
        // 这里的回调(回调到别的地方去执行了) 传入了这个i 因此形成了闭包
        setTimeout(function () {
            console.log(i);
        }, 0);
    })(i)
}

setTimeout(() => { console.log('ES6 let块级作用域绑定版本:'); }, 0)
// let变量只在for循环体中的作用域生效
// 每一次循环的i其实都是一个新的变量
// for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，
// 而循环体内部是一个单独的子作用域(也就是在循环体中设置let i = 'abc'也不会飘红)
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 0);
}