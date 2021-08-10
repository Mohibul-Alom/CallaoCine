const express = require('express');
const controller = require('../controllers/Movie.controller');
const { isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/',controller.moviesGet);

router.post('/create',[isAdmin],controller.moviesPost);

router.put('/edit',[isAdmin],controller.moviesPut);

router.delete('/delete',[isAdmin],controller.moviesDelete);

router.get('/title/:name',controller.movieFindByName)

module.exports = router;