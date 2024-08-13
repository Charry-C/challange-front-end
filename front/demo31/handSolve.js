// ES5继承
function Parent() {
    this.parent = 'parent'
}

Parent.prototype.getParentPropoty = function () {
    return this.parent
}

// 现在定义一个子类，要继承父类的属性和方法
function Child() {
    Parent.call(this) // 这里继承了属性
    this.child = 'child'
}

// 继承方法需要把原型链挂到Parent上
Child.prototype = new Parent()