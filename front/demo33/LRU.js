// LRU缓存原理
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity
    this.arr = new Array()
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    let index = this.arr.findIndex(x => x === key)
    if (index !== -1) {
        toolFunc(this.arr, index)
        return this.arr[index]
    } else {
        return -1
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    let index = this.arr.findIndex(x => x === key)
    if (index !== -1) {
        toolFunc(this.arr, index)
        return this.arr
    } else {
        this.arr.push({ key: value })
        if (this.arr.length > this.capacity) {
            return this.arr.slice(this.arr.length - this.capacity - 1)
        }
        return this.arr
    }
};

var toolFunc = function (arr, index) {
    for (let i = index; i < arr.length - 1; i++) {
        let temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
    }
    return arr
}

/**
 * Your LRUCache object will be instantiated and called as such:

 */
var obj = new LRUCache(3)
console.log(obj);
console.log(obj.get(1));
console.log(obj.put(1, 1));
console.log(obj.put(2, 2));
console.log(obj.put(3, 3));
console.log(obj.put(4, 4));
console.log(obj.get(1));
console.log(obj.get(2));

