const express = require('express');

const controller = require('../controllers/Movie.controller');

const router = express.Router();

router.get('/',controller.moviesGet);

router.post('/create',controller.moviesPost);

module.exports = router;