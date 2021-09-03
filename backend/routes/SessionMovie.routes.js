const express = require('express');

const controller = require('../controllers/SessionsMovie.controller');
const { isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/',controller.sessionGet);

router.post('/create',[isAdmin],controller.sessionPost);

router.put('/edit',[isAdmin],controller.sessionPut);

router.get('/movie/:movieId',controller.sessionGetByMovie);

router.delete('/delete/:id',controller.sessionDelete);

router.get('/:id',controller.sessionGetById);

module.exports = router;

//TODO: for implementing delete sessions i need a senior

