// 1. 并发控制promise
// 假设有100个ajax请求，每次发送3个请求，其中一个请求完毕，再加入新的请求，
// 直到全部请求完毕
// 如果使用promsie.all，浏览器会瞬间发送100个请求
// 这样可能会造成请求阻塞、页面卡顿、甚至服务器崩溃，显然不合理；
// 那么就需要设计一个方案
var promises = Array(100).fill(0).map(e => {
    return new Promise((res, rej) => {
        fetch('https://api.chucknorris.io/jokes/random').then((resp) => { resp.data }).then((data) => res(data))
    })
}
)
const Concurrent = function (promises, n) {
    return new Promise((resolve, rej) => {
        let index = 0, retArr = []
        for (let i = 0; i < n; i++) {
            run()
        }
        async function run() {
            let i = index
            const reData = await promises[index++]
            retArr[i] = reData
            if (index < promises.length) {
                run()
            }
            if (retArr.length === promises.length) {
                resolve(retArr)
            }
        }
    })
}


// var fnWorker = function (promises, i) {
//     promises[index].then((res) => {
//         result[index++] = res
//     }).then(() => {
//         if (index < promises.length) {
//             fnWorker()
//         }
//     })
// }

// 要明白为什么上面写的那么难受(下标问题),思路其实没问题，就是需要一个执行器来递归执行，但是因为下标控制有大问题
// 改版
Concurrent(promises, 3).then((val) => {
    console.log('val:', val);
})



const p1 = new Promise((res, rej) => {
    setTimeout(() => {
        res('ok11111')
    }, 100)
})

new Promise((res, rej) => {
    res(p1)
}).then((val) => {
    console.log(val);

})





// 2. 封装一个拥有promise的XHR


