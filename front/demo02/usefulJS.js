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





// what is different beteween 'bind'、'call' and 'apply'
// 都是绑定 this 的，但是
// bind 返回函数
// call/apply 直接执行函数