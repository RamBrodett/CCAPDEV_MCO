const express = require('express');
const router = express.Router();
const {readImage} = require('../controllers/imageController')
const { uploadFile, deleteFile, bucketName} = require('../s3Conn');
const User = require('../model/User');
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

router.post('/uploadNewImage', upload.single('image'), async(req, res)=> {
    const file = req.file
    const userId = req.body.userID
    const imageName = randomImageName()
    try{
        const user = await User.findOne({userID: userId});
        const prevImageUrl = user.profile_info.profile_picture_url;
        const defaulturl = "https://lrs-dp-db.s3.ap-southeast-1.amazonaws.com/default.png";

        if(prevImageUrl !== defaulturl){
            const prevKey = prevImageUrl.split('.com/')[1];
            await deleteFile(prevKey)
        }

        await uploadFile(file.buffer, imageName, file.mimetype);

        const newImageURL = `https://${bucketName}.s3.amazonaws.com/${imageName}`;

        await User.findOneAndUpdate({userID:userId},{
            $set: {
                "profile_info.profile_picture_url" : newImageURL
            }
        })
        res.status(200).send({ message: 'Image uploaded successfully' });

    }catch(error){
        console.error('Error uploading image:', error);
        res.status(500).send({ error: 'Failed to upload image' });
        console.log(error);
    }
});

router.get('/readImage', readImage);

module.exports = router;