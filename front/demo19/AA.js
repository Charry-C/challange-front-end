//  Generator函数的两个特征
// 1. function关键字 与 函数名之间有*
// 2. 内部使用yield定义不同状态
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();
// 调用函数返回的是：指向内部状态的指针对象(Iterator Object)
// Iterator Object又是啥
function createMyIterator(arr) {
    let count = 0 // 闭包，用于保存状态
    // 返回指针对象，包含,next()方法
    return {
        next: () => {
            return count < arr.length ?
                { val: arr[count++], done: false } :
                { val: undefined, done: true }
        }
    }
}
const it = createMyIterator([1, 2, 3, 4])
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

// iterator接口提出的目的是为  所有数据结构提供了一种统一的访问机制
// 凡是部署了[Symbol.iterator]属性的构造函数都可以用 for...of循环
console.log(String.prototype[Symbol.iterator]);
console.log(Array.prototype[Symbol.iterator]);
console.log(Map.prototype[Symbol.iterator]);
console.log(Set.prototype[Symbol.iterator]);
console.log(Object.prototype[Symbol.iterator]);


// 应用：1. 解构赋值 2. 扩展运算符
// 只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组
const myMap = new Map([['a', 1], ['b', 2], ['c', 3]])
console.log([...myMap]);

// 复习扩展运算符
// 对象的扩展运算符会返回对象本身
// 数组的扩展运算符会返回数组的每个元素


// 回到正题，forof也可以用在Generator中，为什么可以用，其本质是Generator内部实现了iterator接口
for (const i of hw) {
    console.log(i);
}
// yield是暂停的标记，next()是继续的标记



// 异步编程的解决方案
// 1. 回调
// 2. 事件监听
// 3. 发布/订阅
// 4. Promise
// 5. 他来了！Generator!!!(可以暂停执行和恢复执行)

function* gen() {
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log('返回值：', result.bio);
}

const myAsync = gen()
myAsync.next().value.then((data) => {
    return data.json()
}).then((val) => {
    myAsync.next(val)
})
// 可以看到yield后面的fetch其实是在执行的，只不过是异步挂起，只有当fetch这个promise执行完成才会触发下一个步骤
// 可以看到这个gen()已经有点同步函数的那味了，但是管理这个执行还是麻烦，咋办呢
// Thunk函数


function front() {
    const fs = require('fs');
    const readFile = function (fileName) {
        return new Promise(function (resolve, reject) {
            fs.readFile(fileName, function (error, data) {
                if (error) return reject(error);
                resolve(data);
            });
        });
    };
    const gen = function* () {
        const f1 = yield readFile('/etc/fstab');
        const f2 = yield readFile('/etc/shells');
        console.log(f1.toString());
        console.log(f2.toString());
    };
}


function now() {
    const asyncReadFile = async function () {
        const f1 = await readFile('/etc/fstab');
        const f2 = await readFile('/etc/shells');
        console.log(f1.toString());
        console.log(f2.toString());
    };
}
// await命令后面，可以是 Promise 对象和原始类型的值
// （数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）
// await命令就是内部then命令的语法糖

// async函数返回一个 Promise 对象
// async会等待内部所有的await发生变化后，返回的promise的then回调才触发
// 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
// 防止出错的方法，也是将其放在try...catch代码块之中。