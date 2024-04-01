/* 
 Author: Ram David Brodett
*/
const { s3, GetObjectCommand, bucketName } = require('../s3Conn');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const readImage = async (req, res) => {
    const {imgKey} = req.query; 
    const params = {
        Bucket: bucketName,
        Key: imgKey,
    };

    try {
        const signedUrl = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 3600 });
        res.send({ imageUrl: signedUrl });
    } catch (error) {
        console.error('Error reading image:', error);
        res.status(500).send({ error: 'Failed to read image' });
    }
};

module.exports = {readImage};