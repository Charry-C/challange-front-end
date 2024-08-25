// 手撕Promise系列
// 1. Promise.race
// 效果：最快的promise实例触发后 Promise变为resolve
// 1.1. 创建n个promise实例
var createPromises = function (n) {
    return new Array(n).fill().map((_, index) => {
        return new Promise((res, rej) => {
            // if (Math.floor(Math.random() * n) === Math.floor(Math.random() * n)) rej('中奖啦~')
            setTimeout(() => {
                res(`第${index + 1}个完成`)
            }, Math.floor(Math.random() * n) * 1000)
        })
    })
}
// 1.2 并发所有的promise,然后给每一个promise都加.then()方法
// 触发.then()方法即可resolve()
var myRace = function (promises) {
    return new Promise((res, rej) => {
        promises.forEach(p => {
            p.then((val) => {
                res(val)
            }).catch((err) => {
                rej(err)
            })
        });
    })
}


myRace(createPromises(5)).then((ret) => {
    console.log('Promise.race 方法👇');
    console.log(ret);
}).catch((err) => {
    console.log('Promise.race 方法有报错：', err);
})





// 2. Promise.all
// 效果：
// 1. 当所有promises实例都resolve()时，all才会res(),并把结果放在相应的调用顺序中
// 2. 任意一个promises实例被rej()时，all都会直接结束并调用rej()

var myPromiseAll = function (promises) {
    return new Promise((res, rej) => {
        let retArr = [], resCount = 0
        promises.forEach((p, index) => {
            p.then((val) => {
                retArr[index] = val
                resCount++
                if (resCount === promises.length) res(retArr)
            }).catch(err => {
                rej(err)
            })
        })
    })
}


myPromiseAll(createPromises(5)).then((retArr) => {
    console.log('Promise.all 方法👇');
    retArr.forEach(r => {
        console.log(r);
    })
}).catch(err => {
    console.log('Promise.all 方法报错了', err);
})


// 3. Promise.allSettled
// 效果：只有当所有传入的promise实例都完成时才会返回结果
// 返回的结果是带有 { 状态 和 val }

var myAllSettled = function (promises) {
    return new Promise((res, rej) => {
        let retArr = [], retCount = 0
        promises.forEach((p, index) => {
            p.then((val) => {
                retArr[index] = {
                    "status": 'fullfilled',
                    val
                }
            }).catch((err) => {
                retArr[index] = {
                    "status": 'rejected',
                    err
                }
            }).finally(() => {
                retCount++
                if (retCount === promises.length) res(retArr)
            })
        })
    })
}

myAllSettled(createPromises(5)).then((retArr) => {
    console.log('allSettled👇');
    retArr.forEach(r => {
        console.log(r);
    })
})



// 4. Promise.any
// 效果：有点类似于race,不同的是只有当所有的promise实例都rej他才会rej
// 任意一个成功时即返回结果，所有都失败时即返回失败的reason
var myPromiseAny = function (promises) {
    return new Promise((res, rej) => {
        let rejCount = 0, errArr = []
        promises.forEach((p, index) => {
            p.then(val => {
                res(val)
            }).catch(err => {
                rejCount++
                errArr[index] = err
                if (rejCount === promises.length) rej(errArr)
            })
        })
    })
}

myPromiseAny(createPromises(1)).then((val) => {
    console.log('myPromiseAny:', val);
}).catch(err => {
    console.log('promise any全部失败');
    err.forEach(e => {
        console.log(e);
    }
    )
})


// 5. 并发控制（异步调度器-可传入参数表示一次发送几个请求）
// 也就是说控制队列中保持n个promise，完成一个就补一个
// 结果要按照原本的顺序存储到retArr中
var conPromise = function (promises, n) {
    let sumLen = promises.length
    return new Promise((res, rej) => {
        let retArr = [], retCount = 0
        for (let c = 0; c < Math.min(n, promises.length); c++) {
            goNext(retArr, c)
        }

        async function goNext(retArr, index) {
            // 关键在于这里的两层判断，这里promises.length就是得return掉，不然会shift出来空对象，然后报错
            if (promises.length === 0) {
                if (retCount === sumLen) {
                    res(retArr);
                }
                return;
            }
            console.log(`开始执行第${index + 1}个`);
            promises.shift().then((val) => {
                console.log(val);
                retCount++
                retArr[index] = val
                let nextIndex = sumLen - promises.length
                goNext(retArr, nextIndex)
            }).catch(err => {
                rej(err)
            })
        }
    })
}


conPromise(createPromises(10), 15).then((retArr) => {
    console.log('并发返回结果👇');
    retArr.forEach(r => {
        console.log(r);
    });
});




// 非常常见系列
// 1. 深拷贝 浅拷贝



// 2. 柯里化



// 3. 节流



// 4. 防抖



// 5. call



// 6. apply



// 7. bind




// 8. new




// 9. instanceof





// 11. Object.create