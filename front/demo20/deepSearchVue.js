// 简易的响应式

// 1. 实现当data变化时，使用了data的函数重新执行一遍
const data = {
    text: "hello, world",
    name: 'charry',
};

function printName() {
    console.log('打印名字：', data.name);
}

function sayName() {
    console.log('我的名字：', data.name);
}


// 如何实现呢？
// 1. 需要知道有哪些函数使用了
// 2. 需要当data变化时 把这些函数全都再执行一遍
// 解决问题1： data => data:[fn1,fn2,fn3...]
// 解决问题2：[fn1,fn2,fn3...].forEach(f=>f())
// 可以用对象自带的get和set属性来实现 读取/修改 对象 xx属性时触发函数
// 结合defineProperty来对xx obj的yy属性进行设置get 和 set方法
// defineProperty是专门用来设置 对象属性 的方法
function myReactive(obj, key) {
    // 形成闭包，这样dep实例就可以一直存的是当前这个obj对应的key了
    const dep = new Dep()
    let val = obj[key]
    Object.defineProperty(obj, key, {
        get: function () {
            // 怎么把当前使用到这个obj[key]的函数保存下来呢
            // (我以为有上面骚操作，原来就是把函数传进一个封装好的容器Watcher)
            // 判断watcher是否存在
            if (Dep.target) {
                dep.depend()
            }
            return val
        },
        set: function (newVal) {
            val = newVal
            // 怎么把obj[key]保存的函数都执行一遍
            dep.notify()
        }
    })
}


class Watcher {
    constructor(fn) {
        this.getter = fn
        this.get()
    }

    // watcher的执行器
    get() {
        // 也就是保存了fn的Watcher实例
        Dep.target = this
        // 这里模拟了使用到当data的函数会被调用
        // (因为现在不是直接调用，是封装成watcher，所以要手动调用)
        // 这里调用了方法就会触发 查询对象属性的get回调
        this.getter.call()
    }

    // 调用 执行器
    update() {
        this.get()
    }


}

class Dep {
    static target
    constructor() {
        this.subs = new Set()
    }

    // 收集watcher函数
    depend() {
        // 现在Dep.target不是别人，正是刚刚赋值的watcher实例
        // 传入dep实例
        if (!this.subs.has(Dep.target)) {
            this.subs.add(Dep.target)
        }
    }

    // 通知可以执行watcher了
    notify() {
        for (let i = 0, watchers = [...this.subs]; i < watchers.length; i++) {
            watchers[i].update();
        }
    }

}

myReactive(data, 'text')
myReactive(data, 'ok')

new Watcher(printName)
new Watcher(sayName)
