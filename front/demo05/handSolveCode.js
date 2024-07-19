// 手撕curry函数
const join = (a, b, c) => {
    return `${a}_${b}_${c}`
}
const curriedJoin = curry(join)
console.log(curriedJoin(1, 2, 3)); // '1_2_3'
console.log(curriedJoin(1)(2, 3)); // '1_2_3'
console.log(curriedJoin(1, 2)(3)); // '1_2_3'
console.log(curriedJoin(1)(2)(3)); // '1_2_3'

function curry(fn) {
    // 在这里面对fn做一些额外的处理才行
    // 如果传进来的参数并没有达到fn所有形参则返回一个带有闭包参数的函数
    return function curryInner(...args) {
        if (args.length >= fn.length) {
            return fn(...args)
        }
        return (...args2) => {
            return curryInner(...args, ...args2)
        }

    }
}
// 我的想法：
// 首先先把需要柯里化的函数 先进行柯里化
// 柯里化的过程就是
// 返回 一个当参数没达到传参所需的数量时就一直返回“函数”
// 当参数达到了传参所需的数量时就返回 该函数的“执行结果”
// if(Object.keys(arguments).length < 3){
//     return curry(fn)
// }
// return fn(arguments)
// 想法方向是对的，但是这里需要对箭头函数、args有深刻理解
// TODO：复习箭头函数 and arguments and ...args
// 箭头函数没有自己的arguments,但是箭头函数可以集成父级function的arguments
// 箭头函数有rest参数,可以用rest参数来访问箭头函数的参数列表

// ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数
// fn.length 返回的是没有指定默认值的参数个数
//...args并不是箭头函数有的，而是ES6的新特性

// TODO：复习Promise ES6的书

// then方法分别指定resolved状态和rejected状态的回调函数（即：then方法的作用在于当状态改变后可以执行的回调）
// then方法可以接受两个回调函数作为参数
// 第一个回调函数是Promise对象的状态变为resolved时调用
// 第二个回调函数是Promise对象的状态变为rejected时调用

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(1000).then((value) => {
    console.log(value);
});