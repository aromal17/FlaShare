const express = require('express');

const fs = require('fs');
const util = require('util')
const unlinkFile = util.promisify(fs.unlink);

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadFile, getFile }  = require('./s3');

const app = express();
const PORT = process.env.PORT || 5000;


//downloading file
app.get('/files/:key', async(req, res) => {
    const key = req.params.key;
    const readStream = await getFile(key);
    readStream.pipe(res);
})


//uploading file
app.post('/files', upload.single('file'), async(req, res) => {
    try {
        const file = req.file;
        const result = await uploadFile(file);
        await unlinkFile(file.path) //removing file from local server
        console.log("result is :", result)
        res.send(result.Key);   
    } catch (error) {
        console.log("Unable to upload file")
    }
   
})

app.listen(PORT, () => {
    console.log(`listening here at port ${PORT}`);
})