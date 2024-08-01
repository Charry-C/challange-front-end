// 测试用例
var x = 1
const obj = {
    x: 2
}

function test(y = 0) {
    console.log(this.x, 'ceshi:', this.x + y);
}

// 1. call/apply
Function.prototype.myCall = function (obj, ...args) {
    obj.fn = this
    return obj.fn(...args)
}


test() // >> undifeined Node环境并不会把var的值注册到globel
test.myCall(obj) // >> 2


// 2. bind
Function.prototype.myBind = function (obj, ...args) {
    obj.fn = this
    return () => {
        const rb = obj.fn(...args)
        delete obj.fn
        return rb
    }
}

test.myBind(obj, 3)()

// 总结一下，call/apply/bind原理很简单，其实就是让你传入对象，然后把函数绑到你传进去的对象上
// 直接调用 对象.函数(...args) 就改变了这个this指向了



// 3. new 过程
function myNew() {
    // 1. 先造一个空对象作为新的实例
    let NewObj = {}
    // 2. 这个实例不是对象的实例，是函数的实例
    // 为了以后能用上Function的方法，那必须把原型链绑到Function上啦
    NewObj.__proto__ = Function.prototype
    // 3. 这个Function的构造函数上还定义了东西，我得用上啊
    // 让对象能绑定到函数的this，那就用call吧
    let result = Function.call(NewObj, '123', '345')
    // 4. 返回,可以发现这里如果result是对象，那前面的操作就无效了？
    // nonono看仔细咯，前面的操作大大滴有效，因为传入NewObj作为this绑定啊
    // 越来越清晰了，那么在构造函数中会执行this.xxx = aaa this.yyy= bbb
    // 这里的this因为已经绑定到NewObj了，那么此时就是在给NewObj创建新属性了呀！
    return typeof result === 'object' ? result : NewObj
}
// 顺便引申到class类的创建，其实就是语法糖，底层实现同上
