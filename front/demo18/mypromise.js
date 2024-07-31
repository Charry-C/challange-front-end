class myProm {
    static all(promises) {
        return new Promise((resolve, reject) => {
            const result = []
            let count = 0
            promises.forEach((p, index) => {
                Promise.resolve(p)
                    .then((val) => {
                        result[index] = val
                        console.log(`完成第${index + 1}条`);
                        count++
                        if (count === promises.length) {
                            resolve(result)
                        }
                    })
                    .catch((error) => {
                        console.log("终止", error);
                        reject()
                    })
            });
        })

    }

    // 并发控制,一次发k条,递归
    static map(promises, k) {
        const result = []
        return new Promise((res, rej) => {
            toolFn(promises, k).then((val) => {
                res(val)
            }).catch((error) => {
                rej(error)
            })

        })

        function toolFn(promises, k, cur = 0) {
            let count = 0
            if (promises.length < cur + k) k = promises.length
            return new Promise((res, rej) => {
                promises.slice(cur, cur + k).forEach((p, index) => {
                    Promise.resolve(p).then((val) => {
                        result[index + cur] = val
                        count++
                        console.log(`map完成第${index + cur + 1}条`);
                        if (cur + 1 === promises.length) res(result)
                        if (count === k) {
                            toolFn(promises, k, cur + k)
                        }
                    })
                        .catch((error) => {
                            rej(error)
                        })
                })
            })
        }
    }
}


let nums = [1, 2, 3, 4, 5]
const promises = nums.map((item) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(item)
        }, item * 1000)
    })
})

myProm.all(promises).then(val => {
    console.log(val);
})

let bigNums = new Array(100).fill(0).map((x, index) => index + 1)
const promisess = bigNums.map((item) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(item)
        }, item * 100)
    })
})

myProm.map(promisess, 3)