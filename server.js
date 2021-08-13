const express = require('express');
const { read } = require('fs/promises');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadFile, getFile }  = require('./s3');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/images/:key', async(req, res) => {
    const key = req.params.key;
    const readStream = await getFile(key);
    readStream.pipe(res);
})


//uploading file
app.post('/images', upload.single('image'), async(req, res) => {
    try {
        const file = req.file;
        const result = await uploadFile(file);
        console.log("rseult is :", result)
        res.send("File uploaded to server successfully");   
    } catch (error) {
        console.log("could not do the uploading")
    }
   
})

app.listen(PORT, () => {
    console.log(`listening here at port ${PORT}`);
})