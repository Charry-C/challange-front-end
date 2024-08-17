// 柯里化函数
function curry(fn) {
    const fnArg = fn.length
    return function _curry(...args) {
        if (args.length >= fnArg) {
            return fn(...args)
        }
        else {
            // 这里要想办法把之前传递的参数保存起来，又要保证能传递到下一个函数去判断是否查询完了
            // 那么就可以用一个函数来造一个闭包，然后把之前的参数给存到这个lastArgs中
            // 递归调用_curry来实现这个链式判断！妙哉~
            return function (...lastArgs) {
                return _curry(...lastArgs, ...args)
            }
        }
    }
}

const sum = (a, b, c) => {
    return a + b + c
}

const currySum = curry(sum)
console.log(currySum(1, 2)(3));
console.log(currySum(1)(2)(3));
console.log(currySum(1, 2, 3));

// 