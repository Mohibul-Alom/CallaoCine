const express = require('express');

const controller = require('../controllers/Auditorium.controller');

const router = express.Router();

router.get('/',controller.auditoriumGet);

router.post('/create',controller.auditoriumPost);

router.put('/add-movie',controller.auditoriumPut);

module.exports = router;
