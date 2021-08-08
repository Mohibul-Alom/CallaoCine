const express = require('express');
const controller = require('../controllers/Ticket.controller');
const router = express.Router();

router.get('/',controller.moviesGet);

router.post('/create',controller.moviesPost);

router.put('/edit',controller.moviesPut);

router.delete('/delete',controller.moviesDelete);


module.exports = router;