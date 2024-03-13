const express = require('express');
const router = express.Router();
const {uploadNewImage, readImage} = require('../controllers/imageController')

router.post('/uploadNewImage', uploadNewImage);
router.get('/readImage', readImage);

module.exports = router;