require('dotenv').config()
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region, 
    accessKeyId,
    secretAccessKey
})

//file upload to S3
function uploadFile(file){
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket : bucketName,
        Body : fileStream,
        key : file.filename //name or unique key with which the file is to be stored 
    }

    return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;
