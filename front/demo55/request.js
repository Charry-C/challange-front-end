// 实现一个封装了Promise的xhr网络请求
// 可以直接传入 方法 + url + data进行调用并获取response
function request({ method, url, headers, data }) {
    return new Promise((res, rej) => {
        const baseUrl = 'http://localhost:3000'
        const xhr = new XMLHttpRequest()
        xhr.open(method, baseUrl + url)
        // 设置请求头
        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key])
        })
        method.toUpperCase() === 'POST' ? xhr.send(data) : xhr.send()
        xhr.onload = e => {
            res(e.target.response)
        }
        xhr.onerror = e => {
            rej(e.target.response)
        }
    })
}


async function upload(fileData) {
    // 使用 FormData 传输数据
    const formData = new FormData();
    formData.append('chunkIndex', fileData.chunkIndex);
    formData.append('totalChunks', fileData.totalChunks);
    formData.append('fileChunk', fileData.fileChunk);
    formData.append('filename', fileData.filename);

    // request配置项
    const options = {
        method: 'POST',
        url: '/upload',
        headers: {},
        data: formData
    }
    let res = await request(options)
    return res
}


async function merge(totalInfo) {
    const options = {
        method: 'POST',
        url: '/merge',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(totalInfo)
    }
    let res = await request(options)

    return res
}