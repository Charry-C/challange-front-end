function renderTemplate(template, data) {
    const re = /{{(.*?)}}/g
    const len = template.match(re)
    const matchAll = [...template.matchAll(re)]
    const map = new Map(transform(data))
    matchAll.forEach(item => {
        if (map.has(item[1])) {
            template = template.replace(item[0], map.get(item[1]))
        }
    })
    return template
}

// Usage
const template = 'Hello, {{user.name}}! Your age is {{user.age}}.';
const data = { user: { name: 'Alice', age: 30 }, env: 'js' };
const result = renderTemplate(template, data);
console.log(result); // Output: 'Hello, Alice! Your age is 30.'

function transform(data, key = null) {
    let MapArr = [], mapArr

    for (const key in data) {
        if (typeof data[key] === 'object') {
            mapArr = transform(data[key], key)
            mapArr.forEach(item => {
                MapArr.push([key + '.' + item[0], item[1]])
            })
        } else {
            MapArr.push([key, data[key]])
        }
    }
    return MapArr
}

var getAllsort = function (arr) {
    let useArr = [], sortArr = []
    for (let i = 0; i < arr.length; i++) {
        useArr = arr.filter((x) => x !== arr[i])
        for (let range = 0; range < useArr.length; range++) {
            [useArr[0], useArr[1]] = [useArr[1], useArr[0]]
            sortArr.push([arr[i], ...useArr])
        }
    }
    return sortArr
}
console.log(getAllsort([1, 2, 3]));