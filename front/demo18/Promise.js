console.log(Promise);
// Promise构造函数在 创建实例时，接收一个 函数作为参数，该函数会被Promise内部的立即执行器执行
const obj = {
    fn: out
}
function out() {
    setTimeout(() => {
        console.log('sss', this);
    })
}

obj.fn()



const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(new Error('nonono')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
})

p2
    .then(() => { return 1 }).then(2).then(3).then((val) => { console.log(val) })
    .catch(error => console.log(error))
// 这里按MDN的说法就是，resolve函数是可以接受另一个promise作为参数的
// 当接收 另一个promise作为参数时就会把当前的promise状态与其绑定（已解决但未敲定settled）
// 调用.then 方法的就是另一个promise的回调了
// 相当于 传入的promise把原来的顶替了，传入的promise说的算

// .then回调会在本轮事件循环的末尾执行，也就是在主线任务之后
// (这点也好理解，就是微任务再快也要等宏任务执行完才执行)

// 2. 实例的prototype的then方法
// 接受参数：
//   1. resolved状态的回调函数 onFulfilled
// (若其不是函数，则会转换(x)=>x，将之前promise的值向前传递，相当于变成了一个函数未undefined的promise(fulfilled))
// (若是函数但不是promise，会将return的值作为下一个回调的val)
//   2. rejected状态的回调函数 onRejected
// 返回值：
// 新的Promise实例



// 3. catch方法
// 返回值：一个全新的promise实例
// const someAsyncThing = function () {
//     return new Promise(function (resolve, reject) {
//         // 下面一行会报错，因为x没有声明
//         resolve(x + 2);
//     });
// };

// someAsyncThing()
//     .catch(function (error) {
//         console.log('oh no', error);
//     })
//     .then(function () {
//         console.log('carry on');
//     });

// // 4. finall
// promise
//     .finally(() => {
//         // 语句
//     });

// // 等同于
// promise
//     .then(
//         result => {
//             // 语句
//             return result;
//         },
//         error => {
//             // 语句
//             throw error;
//         }
//     );






// Promise.resolve()
// 将现有对象转为Promise对象
// 1. 参数 是Promise实例，原封不动返回
// 2. 参数 不是对象，返回resovle(参数)
// 3. 不带参数，返回 一个promise对象



// 静态方法
// 1. Promise.all
// 自己封装一个，当所有的都为fulfilled才会fulfilled
// 参数：一个iterator


// 2. Promise.map
// 限制Promise并发数


