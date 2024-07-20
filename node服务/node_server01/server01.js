/*
 * @Author: Charryc 1121716938@qq.com
 * @Date: 2024-07-11 12:04:19
 * @LastEditors: Charryc 1121716938@qq.com
 * @LastEditTime: 2024-07-19 21:01:22
 * @FilePath: \手撕代码\node服务\node_server01\server01.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Express
const express = require('express')
const app = express()

app.get('/cors', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500') 
  res.send('Hello Express')
})

app.listen(3000)