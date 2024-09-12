const express = require('express');
const fs = require('fs');
const cors = require('cors'); // 引入 cors 中间件
const path = require('path');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const app = express();
const PORT = 3000;
app.use(cors()); // 允许所有来源的请求
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


// 创建一个目录用于存储上传的文件
const UPLOAD_DIR = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

// 处理文件分片上传
app.post('/upload', upload.single('fileChunk'), (req, res) => {
    const { chunkIndex, totalChunks, filename } = req.body;
    const chunkFilePath = path.join(UPLOAD_DIR, `${filename}.part.${chunkIndex}`);
    const fileChunk = req.file.buffer
    // 接收并保存文件片段
    fs.writeFileSync(chunkFilePath, fileChunk);
    console.log(`Received chunk ${chunkIndex} of ${totalChunks} for ${filename}`);
    res.sendStatus(200);
});
// 处理文件合并请求
app.post('/merge', (req, res) => {
    const { totalChunks, filename } = req.body;
    const finalFilePath = path.join(UPLOAD_DIR, filename);
    console.log(req.body);

    const writeStream = fs.createWriteStream(finalFilePath);

    // 逐个读取分片文件并合并到最终文件
    for (let i = 0; i < totalChunks; i++) {
        // 获取分片数据
        const chunkFilePath = path.join(UPLOAD_DIR, `${filename}.part.${i}`);
        // 写入最终文件
        const data = fs.readFileSync(chunkFilePath);
        writeStream.write(data);
        // 合并后删除片段文件
        fs.unlinkSync(chunkFilePath);
    }

    writeStream.end(() => {
        console.log(`File ${filename} has been merged successfully.`);
        res.sendStatus(200);
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
