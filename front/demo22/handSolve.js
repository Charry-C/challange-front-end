// 订阅发布模式
class EventCenter {
    constructor() {
        this.eventCt = {}
    }

    /**
     * @param {String} event 订阅事件
     * @param {Function} cb 事件触发时执行的回调
     */
    $on(event, cb) {
        // 事件中心没有存该事件,就给他存个事件key进去 , 将回调push进去对应的事件中
        // 这个写法我超爱!
        (this.eventCt[event] || (this.eventCt[event] = [])).push(cb)
    }

    /**
     * @param {String} event 触发的事件
     * @param  {...any} args 传递的参数
     */
    $emit(event, ...args) {
        // 有注册了这个事件,那就取出来在这执行了
        if (this.eventCt[event].length) {
            const cbs = this.eventCt[event]
            cbs.forEach(cb => {
                cb(...args)
            });
        }
    }
}
const vm = new EventCenter()


vm.$on('click', (clickName, clickTime) => {
    console.log(clickName, '在时间点:', clickTime, '触发的');
})
vm.$on('click', (Name, age) => {
    console.log(Name, '今年:', age, '岁');
})
vm.$emit('click', 'charry', Date.now())



// 观察者模式
// 其实Vue的响应式系统就是一个观察者模式的实现
// 每一个对象的属性都会有变成一个observer观察者
// 观察者拥有两大功能:
// 1. 数据被读取时, 将用到这个数据的函数保存起来
// 2. 数据被修改时, 通知所有用到这个数据的函数重新执行一遍