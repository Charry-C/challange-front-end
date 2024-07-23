// 扁平化对象
let obj = {
    "a": {
        "b": {
            "c": {
                "d": 1
            }
        }
    },
    "aa": 2,
    "c": [
        1,
        2
    ]
}
// >>{ 'a.b.c.d': 1, aa: 2, 'c[0]': 1, 'c[1]': 2 }

function flatObj(obj, thisKey) {
    let item, arr = [], str
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            for (let i = 0; i < obj[key].length; i++) {
                str = '[' + i + ']' + flatObj(arr[i])
                arr.push(str)
            }
        }
        else if (typeof obj[key] === 'object') {
            str = key + '.' + flatObj(obj[key], key)
        } else {
            return
        }
    }
}
console.log(flatObj(obj));

function flattenObject(obj, prefix = '') {
    let result = {};

    for (let key in obj) {
        // 第一层三元运算是为了第一层
        let newKey = prefix ? prefix + (Array.isArray(obj) ? `[${key}]` : `.${key}`) : key

        if (typeof obj[key] === 'object') {
            Object.assign(result, flattenObject(obj[key], newKey));
        } else {
            result[newKey] = obj[key];
        }
    }

    return result;
}
console.log(flattenObject(obj));


let obj1 = {
    "menu": {
        "system": {
            "role": "角色",
            "setting": "设置"
        },
        "home": "首页"
    }
}
// {
//     menu.home: "首页",
//     menu.system.role: "角色",
//     menu.system.setting: "设置"
// }

function flattenObj(obj, prefix = '') {
    let result = {}

    for (key in obj) {
        let newKey = prefix + (prefix ? `.${key}` : key)
        if (typeof obj[key] === 'object') {
            // 这里就是为了能把返回来的对象merge到result对象中
            Object.assign(result, flattenObj(obj[key], newKey))
        } else {
            result[newKey] = obj[key]
        }
    }
    return result
}
console.log(flattenObj(obj1));


setTimeout(() => {
    console.log('yes');
}, 0)
Promise.resolve(1).then((val) => {
    console.log(val + 1)
    return val + 1
}).then((val) => {
    console.log(val + 1)
})



