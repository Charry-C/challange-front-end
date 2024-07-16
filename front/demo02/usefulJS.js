// 随机数组



// 首先需要先明白 “直接赋值” “浅拷贝” “深拷贝”这三个定义之间的关系
// 赋值（赋值给的是 等号右侧对象 在栈中的“地址”，并不是堆中的数据，这里需要先知道一点
// 在js中，基本类型的数据（Number、Boolean、String、undefined、null）是存放在栈内存中
// 而引用类型的数据（Object、Function）是存放在堆内存中的）
// 对象赋值
function evaluation(){
    let obj1 = {
        name : 'charry',
        arr : [1,2],
    };
    let obj2 = obj1;
    obj2.name = "Charryc";
    obj2.arr[1] =[5,6,7] ;
    console.log('obj1',obj1) // obj1 { name: 'Charryc', arr: [ 1, [ 5, 6, 7 ] ] }
    console.log('obj2',obj2) // obj2 { name: 'Charryc', arr: [ 1, [ 5, 6, 7 ] ] }
}
evaluation()

// 浅拷贝（会在堆中创建一块新的内存空间，拷贝前后 基础数据类型互不影响，引用数据类型共享内存）
function shallowClone(){

}



// 深拷贝（会在堆中开辟一块新的内存空间，拷贝前后，数据互不影响）
function deepClone(){

}



// typeof 与 instanceof





// what is different beteween 'bind'、'call' and 'apply'，哪个函数需要改变this就给哪个函数加
// 都是绑定 this 的，但是
// bind 返回函数 需要手动调用
// call/apply 直接执行函数
// this指向 调用 他所在函数中 的对象
// 参考：
// 1. https://juejin.cn/post/6844903496253177863?searchId=20240715200607823C3192FCCBB0F94FE9
// 2. https://juejin.cn/post/6844903746984476686?searchId=20240715200746D03B20CA746E0BF35FAD








//JS 中的函数调用
/**
 * 1.作为一个函数调用(直接调用)
 * 2.函数作为方法调用(作为方法就证明是在对象中的函数)
 * 3.使用构造函数调用函数
 * 4.作为函数方法调用函数(call、apply)
 */
// 1 直接调用
var name = "windowsName";
function a() {
    var name = "Cherry";

    console.log(this.name);          // windowsName

    console.log("inner:" + this);    // inner: Window
}
a();
console.log("outer:" + this)         // outer: Window

// 2 对象调用对象自己的方法
var name = "windowsName";
var a = {
    name: "Cherry",
    fn : function () {
        console.log(this.name);      // Cherry
    }
}
a.fn();

// 3 new调用构造函数
// 构造函数:
function myFunction(arg1, arg2) {
    this.firstName = arg1;
    this.lastName  = arg2;
}

// This    creates a new object
var a = new myFunction("Li","Cherry");
a.lastName;
// new的过程
// var a = new myFunction("Li","Cherry");
// new myFunction{
//     var obj = {};
//     obj.__proto__ = myFunction.prototype;
//     var result = myFunction.call(obj,"Li","Cherry");
//     return typeof result === 'obj'? result : obj;
// }