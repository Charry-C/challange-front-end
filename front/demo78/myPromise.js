function isFunction(value) { return typeof value === 'function' }

class myPromise {
    constructor(executor) {
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCallback = []
        this.onRejectedCallback = []

        let resolve = (val) => {
            this.state = 'fulfilled'
            this.value = val
            this.onFulfilledCallback.forEach(fn => fn()) // 当同步时数组为空
        }
        let reject = (err) => {
            this.state = 'rejected'
            this.reason = err
            this.onRejectedCallback.forEach(fn => fn()) // 当同步时数组为空
        }
        executor(resolve, reject)

    }

    then(onFulfilled, onRejected) {
        onFulfilled = isFunction(onFulfilled) ? onFulfilled : (data) => data
        onRejected = isFunction(onRejected) ? onRejected : (err) => { throw new Error(err) }
        let x
        const p = new myPromise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                // A+规范规定then中的回调要异步执行，所以这里变成setTimeout
                // 这样就保证了then的回调是异步的了
                setTimeout(() => {
                    x = onFulfilled(this.value)
                    // resolve(value)
                    // 这个是个好办法，当value是一个promise时，要保证当前的const p和传入的promise状态一致
                    // 那么就得让x去改变p的状态
                    resolvePromise(p, x, resolve, reject)
                }, 0)
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    x = onRejected(this.reason)
                    resolvePromise(p, x, resolve, reject)
                }, 0)
            }

            // 如果execute中的函数是异步的，那就要把then回调存起来
            if (this.state === 'pending') {
                this.onFulfilledCallback.push(() => {
                    setTimeout(() => {
                        x = onFulfilled(this.value)
                        resolvePromise(p, x, resolve, reject)
                    })
                })
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        x = onRejected(this.reason)
                        resolvePromise(p, x, resolve, reject)
                    }, 0)
                })
            }
        })
        return p
    }
}

function resolvePromise(p, x, resolve, reject) {
    // x不能和p是同一个promise，A+规范规定的
    if (p === x) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 如果x存在，且是一个promise函数
    if (x && (typeof x === 'object' || typeof x === 'function')) {
        let then = x.then
        // 看看x是不是一个thenable对象/promise对象
        if (typeof then === 'function') {
            // 根据A+规范，当x是一个promise时，状态的
            // 参数1是onFulfilled 参数2是onRejected
            then.call(x, (y) => {
                resolvePromise(p, y, resolve, reject);
            }, (err) => {
                reject(err)
            })
        }
        // 不是就直接resolve
        else {
            resolve(x)
        }
    }
    // x不是函数就直接resolve
    else {
        resolve(x)
    }
}

const p1 = new myPromise((res, rej) => {
    res(1)
})

// 要记住这里的p2并不是then返回的promise，而是then内部的那个新promise
// 只是状态一致而已，内部会把p2的state也改为new mypromise的res里的值，也就是new mypromise的state
// 实现了类似替换的效果
const p2 = p1.then((val) => {
    return new myPromise((res, rej) => {
        res(100)
    })
})

const p3 = p2.then((val) => {
    console.log(val);
})
