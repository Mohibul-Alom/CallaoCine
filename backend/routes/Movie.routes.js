const express = require('express');

const controller = require('../controllers/Movie.controller');

const router = express.Router();

router.get('/',controller.moviesGet);

router.post('/create',controller.moviesPost);

router.put('/edit',controller.moviesPut);

router.delete('/delete',controller.moviesDelete);

router.get('/title/:name',controller.movieFindByName)

module.exports = router;