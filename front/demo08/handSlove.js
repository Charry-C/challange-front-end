function delay(func, seconds, ...args) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('...args', ...args);
            res(...args)
        }, seconds)
    })

}
function conSole(...args) {
    console.log('hello world', ...args);
}
delay(conSole, 1000, '你好').then((val) => {
    console.log('aaa', val);
})
// promise实例应该是一个 类函数吧（且还是立即执行的那种）
// new Promise返回的promise实例的状态会在Promise实例的resolve()/reject()函数触发时改变
// 而.then 方法会接受两个参数
// 一个是promise实例状态变为fullfilled时触发的回调函数
// 另一个是promise实例状态变为rejected时触发的回调函数
// 其中回调函数接受一个value，该值为promise实例触发resolve/reject传入的值


// p2的状态会被p1锁定，直到p1变为resovle
const p1 = new Promise((res, rej) => {
    setTimeout(() => {
        res()
        console.log('p1');
    }, 5000)
})

const p2 = new Promise((res, rej) => {
    setTimeout(() => {
        res(p1)
    }, 1000)
})
p2.then(() => {
    console.log('p2');
})


// then是promise的prototype上的方法
// then方法的返回值return是一个新的promise实例，因此可以一直使用then方法来链式调用
// 如果返回值不是一个 Promise 对象，则会隐式地将其包装在 Promise 中，然后resolve(返回值)，传递给下一个then方法
// 如果返回值是一个新的Promise实例对象，则下一个.then方法会等待这个新的Promise实例对象resolve后才继续触发回调




// Promise的错误会被下一个catch捕捉到，其实这里的catch方法等同于then方法
// 其实只要写了catch,那么这条链上有错误都可以捕捉到
// Promise 内部的错误不会影响到 Promise 外部的代码
new Promise().then(() => { }).catch(() => { })



// Promise.all()
// 当这6个任务都 正确的执行 完毕后，then方法才会触发
// 当这6个任务 有一个失败， 就会reject，其他不执行
// 想要都能执行，不管成功与否，就得使用Promise.allSettled()
const promises = [1, 2, 3, 4, 5, 6].map((e) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(e);
            resolve();
        }, e * 1000);
    });
})
const p3 = Promise.all(promises).then(() => {
    console.log('all setteled');
})


// Promise.resolve()
// 1. 当传入的不是 promise对象时，状态会直接变成resolve,然后作为参数传递给then的回调
// Promise.resolve('foo')
// 等价于
// new Promise(resolve => resolve('foo'))
// 2. 当传入的是Promise实例对象，则原封不动返回