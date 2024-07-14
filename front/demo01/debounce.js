function debounce(fn, delay) {
    let timer = null;
    return function() {
        const context = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(context);
        }, delay);
    };
}