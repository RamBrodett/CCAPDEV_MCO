const { s3, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, bucketName } = require('../s3Conn');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { crypto } = require('crypto');
const User = require('../model/User');


const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const uploadNewImage = async (req, res) => {
    const params = {
        Bucket: bucketName,
        Key: randomImageName(),
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }

    try {
        const user = await User.findById(req.userId);
        const prevImageUrl = user.profile_info.profile_picture_url;

        if (prevImageUrl !== 'default') {
            const prevKey = prevImageUrl.split('.com/')[1];
            const deleteParams = {
                Bucket: bucketName,
                Key: prevKey
            };
            await s3.send(new DeleteObjectCommand(deleteParams));
        }

        const command = new PutObjectCommand(params);
        await s3.send(command);

        const imageUrl = `https://${bucketName}.s3.amazonaws.com/${params.Key}`;

        // Update user's profile picture URL in MongoDB
        await User.findByIdAndUpdate(req.userId, {
            'profile_info.profile_picture_url': imageUrl
        });

        res.send({ imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send({ error: 'Failed to upload image' });
    }
}

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

module.exports = {uploadNewImage, readImage};