// 手撕解析路径
var deCode = function (url) {
    const re = /\?([^/?#:]+)#?/
    const paramStr = url.match(re)?.[1]
    const map = new Map()
    let point = 0, curKey
    for (let i = 1; i <= paramStr.length; i++) {
        if (paramStr[i] === '=') {
            curKey = paramStr.substring(point, i)
            point = i + 1
        }
        if (paramStr[i] === '&' || i === paramStr.length) {
            let curVal = decodeURIComponent(paramStr.substring(point, i))
            if (map.has(curKey)) {
                // 如果已经存在这个键，并且其值不是数组，则转化为数组
                if (!Array.isArray(map.get(curKey))) {
                    map.set(curKey, [map.get(curKey)])
                }
                // 向数组中添加新的值
                map.get(curKey).push(curVal)
            } else {
                // 如果键不存在，则直接设置
                map.set(curKey, curVal)
            }
            point = i + 1
        }
    }
    return map
}

// 解析后得到 qs 如下
const qs = {
    a: 3,
    b: 4,
    c: 5,
};


[
    "https://shanyue.tech?name=%E5%B1%B1%E6%9C%88",
    "https://shanyue.tech?name=%E5%B1%B1%E6%9C%88&a=3",
    "https://shanyue.tech?name=%E5%B1%B1%E6%9C%88&a=3&a=4",
    "https://shanyue.tech?name=%E5%B1%B1%E6%9C%88&a=3#hash",
    "https://shanyue.tech?name=1%2B1%3D2"].forEach((t) => {
        console.log(deCode(t));
    })