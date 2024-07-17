// 随机打乱数组
function shuffle(arr) {
    const change = (arr, i, j) => {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    for (let i = arr.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        // change(arr, i, randomIndex)
        // ES6解构赋值,两两对应交换
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];  // 使用解构赋值交换元素
    }
    return arr
}
// 测试
new Array(10).fill(0).forEach(() => {
    console.log(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).join(''));
})





// 扁平化数组,使用参数传递currentDepth很妙，并没有改变currentDepth的值
// （currentDepth一直都是0），而是使用参数传递增加的方式
function flattenArr(arr, deep, currentDepth = 0) {
    let flatArr = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Array && currentDepth < deep) {
            flatArr.push(...flattenArr(arr[i], deep, currentDepth + 1))
        } else {
            flatArr.push(arr[i])
        }
    }
    return flatArr
}
console.log(flattenArr([1, [2, 3, 4, [5, [0], 6], 7], 8, 10, [11, [12, 13]], [14]], 3));



// 首先需要先明白 “直接赋值” “浅拷贝” “深拷贝”这三个定义之间的关系
// 赋值（赋值给的是 等号右侧对象 在栈中的“地址”，并不是堆中的数据，这里需要先知道一点
// 在js中，基本类型的数据（Number、Boolean、String、undefined、null）是存放在栈内存中
// 而引用类型的数据（Object、Function）是存放在堆内存中的）
// 对象赋值
function evaluation() {
    let obj1 = {
        name: 'charry',
        arr: [1, 2],
    };
    let obj2 = obj1;
    obj2.name = "Charryc";
    obj2.arr[1] = [5, 6, 7];
    console.log('obj1', obj1) // obj1 { name: 'Charryc', arr: [ 1, [ 5, 6, 7 ] ] }
    console.log('obj2', obj2) // obj2 { name: 'Charryc', arr: [ 1, [ 5, 6, 7 ] ] }
}
evaluation()

// 浅拷贝（会在堆中创建一块新的内存空间，拷贝前后 基础数据类型互不影响，引用数据类型共享内存）
function shallowClone(obj) {
    let cloneObj = {}
    for (key in obj) {
        cloneObj[key] = obj[key]
    }
    return cloneObj
}

let myObj = {
    name: 'charry',
    data: {
        a: 1,
        b: 2
    },
    fn: () => {
        console.log('hello clone')
    }
}

// let newObj = shallowClone(myObj)
// newObj.name = 'harry'
// newObj.data = 2
// console.log(myObj.constructor());


// 深拷贝（会在堆中开辟一块新的内存空间，拷贝前后，数据互不影响）
// JSON.parse(JSON.stringify())会使得 函数and正则丢失，f()->null 
// 可以使用loadsh的_.cloneDeep
// 下面演示一下如何手搓，声明为什么已经有loadash库了还要自己手写一遍，一个是为了巩固js基础知识点，另一个是锻炼自己的代码能力
function deepClone(obj) {
    // 每个对象都有一个constructor属性，他指向创建该对象的构造函数
    // 这里深拷贝实际上就是要 为拷贝对象 创建一个新的实例对象，让其指向的是新的对象实例
    // 采用的就是new obj.constructor()这段代码来实现的
    // new 的过程其中就是有创建空{},然后将空{}.__proto__ = 构造函数.prototype来实现这条原型链

    // 1. 是null也直接返回
    if (obj === null) return obj;
    // 2. 是 日期实例 创建一个新的日期实例
    if (obj instanceof Date) return new Date(obj);
    // 3. 是 正则实例 创建一个新的正则实例
    if (obj instanceof RegExp) return new RegExp(obj);
    // 4. 不是对象类型直接返回
    if (typeof obj !== "object") return obj;
    // Object === {}.constructor >>> true
    // Function === function fn(){}.constructor  >>> true
    // 以上两段代码就解释了为什么要用obj.constructor而不是直接new Object()
    // 精髓：创建具有 构造函数属性 的实例对象
    let cloneObj = new obj.constructor();
    for (let key in obj) {
        cloneObj[key] = deepClone(obj[key]);
    }
    return cloneObj;
}

let newObj = deepClone(myObj)
newObj.data.a = 33
console.log(myObj);
console.log(newObj);