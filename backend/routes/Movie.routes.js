const express = require('express');
const controller = require('../controllers/Movie.controller');
const { isAdmin } = require('../middlewares/auth.middleware');
const { upload, uploadToCloudinary } = require("../middlewares/file.middleware");

const router = express.Router();

router.get('/',controller.moviesGet);

router.post('/create',[isAdmin, upload.single("image"), uploadToCloudinary],controller.moviesPost);

router.put('/edit',[isAdmin],controller.moviesPut);

router.delete('/delete',[isAdmin],controller.moviesDelete);

router.get('/title/:name',controller.movieFindByName)

module.exports = router;