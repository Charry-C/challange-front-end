function throttle(fn,delay){
    let timer = null
    return function(){
        // timer存在，返回，等待之前的timer执行完并消除
        if(timer) return
        timer = setTimeout(()=>{
            fn()
            timer = null
        },delay)
    }
}