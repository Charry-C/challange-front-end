var maxNum = function (a, b, c, k) {
    let arr = [Number(a), Number(b), Number(c)]
    // let sortArr = arr.sort((a, b) => a - b)
    // if ((sortArr[0] + sortArr[1] + Number(k)) / 2 > sortArr[2]) {
    //     let Num = Math.floor((sortArr[0] + sortArr[1] + sortArr[2] + Number(k)) / 3)
    //     return (sortArr[0] + sortArr[1] + sortArr[2] + Number(k)) % 3 === 0 ?
    //         [Num, Num, Num] :
    //         [Num, Num, Num + 1]

    // } else {
    //     let Num = Math.floor((sortArr[0] + sortArr[1] + Number(k)) / 2)
    //     return (sortArr[0] + sortArr[1] + sortArr[2] + Number(k)) % 2 === 0 ?
    //         [Num, Num, sortArr[3]] :
    //         [Num, Num + 1, sortArr[3]]
    // }

    for (let i = k; i > 0; i--) {
        let addNum = Math.min(...arr)
        arr[arr.indexOf(addNum)] += 1
    }
    return arr
}


console.log(maxNum(1, 2, 3, 100).reduce((a, b) => a * b));


// 实现hardMan
// 方法一：采用事件循环的特性实现延迟调用
var hardMan = function (name) {
    setTimeout(() => {
        console.log(`Hi! I am ${name}.`);
    }, 0)
    this.study = function (todo) {
        setTimeout(() => {
            console.log(`I am studying ${todo}.`);
        }, 0)
        return this

    }
    this.waitTime = function (time) {
        setTimeout(() => {
            let now = new Date().getTime()
            console.log(`Wait ${time} ms`);
            while (new Date().getTime() - now < time) {
            }
        }, 0)
        return this
    }
    this.waitFirst = function (time) {
        let now = new Date().getTime()
        console.log(`First Wait ${time} ms`);
        while (new Date().getTime() - now < time) {
        }
        return this
    }
    return this
}

// 方法二：任务队列
// 任务队列的目的就是：“控制执行函数的顺序”
// 一个函数被调用并不是马上调用，而是保存到队列中
// 等到要调用的时候才调用，因此其实是得设计一个函数包着函数的函数才行

// 这里采用任务队列的核心就是将所有功能包装到fn中然后加入到任务队列
// 最核心的地方就在于所有的fn的功能都装在setTimeout里,那么这样就可以使得原本不同顺序的可以按照队列顺序的宏任务去执行
// 其实核心还是和上面的一样，就是事件循环，这里就算waitFirst不包装在setTimeout也没问题，只需要保证有waitFirst时他插入到第一个即可
var taskQueue = function (name) {
    const sleep = function (time) {
        let now = new Date().getTime()
        console.log(`等待${time} ms`);
        while (new Date().getTime() - now < time) { }
    }
    this.queue = []
    this.next = function () {
        if (!this.queue.length) return // 当队列为空时,需要把return,否则报错
        this.queue.shift()() // 把任务拿出来执行
    }

    const fn = function () {
        setTimeout(() => {
            console.log(`Hi I am ${name}`);
            this.next() // 调用排在我后面的函数
        }, 0)
    }
    this.queue.push(fn)


    this.study = function (todo) {
        const fn = function () {
            setTimeout(() => {
                console.log(`i am studying ${todo}.`);
                this.next()
            }, 0)
        }
        this.queue.push(fn)
        return this
    }

    this.waitTime = function (time) {
        const fn = function () {
            setTimeout(() => {
                sleep(time)
                this.next()
            }, 0)
        }
        this.queue.push(fn)
        return this
    }

    this.waitFirst = function (time) {
        const fn = function () {
            sleep(time)
            this.next()
        }
        this.queue.unshift(fn)
        return this
    }

    // 为什么这里需要使用setTimeout？
    // 因为这里的this.next()如果执行了，没有setTimeout的话
    // 那么由于代码的同步性，下一个函数拿不到返回的this，就会报错
    setTimeout(() => {
        this.next()
    }, 0)
    return this
}


hardMan('charry').waitTime(2000).study('js').waitFirst(1000)
