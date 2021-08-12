const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();
const PORT = process.env.PORT || 5000;

app.post('/image', upload.single('image'), (req, res) => {
    const file = req.file;
    console.log("uploaded succesfully");
    console.log(req.file);
    res.send("File uploaded to server successfully");
})

app.listen(PORT, () => {
    console.log(`listening here at port ${PORT}`);
})