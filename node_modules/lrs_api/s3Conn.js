/* 
 Author: Ram David Brodett
*/
require('dotenv').config();

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
});

const uploadFile = (fileBuffer, filename, mimetype) => {
    console.log("uploadFile");
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        key: filename,
        ContentType: mimetype
    }

    return s3.send(new PutObjectCommand(uploadParams))
}

const deleteFile = (filename) =>{
    console.log("deleteFile");
    const deleteParams ={
        Bucket: bucketName,
        Key: filename,
    }
    return s3.send(new DeleteObjectCommand(deleteParams))
}

module.exports = {s3,GetObjectCommand, bucketName, deleteFile, uploadFile};