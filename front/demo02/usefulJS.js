/*
 * @Author: Charryc 1121716938@qq.com
 * @Date: 2024-07-15 15:58:15
 * @LastEditors: Charryc 1121716938@qq.com
 * @LastEditTime: 2024-07-16 15:40:59
 * @FilePath: \手撕代码\front\demo02\usefulJS.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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