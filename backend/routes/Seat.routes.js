const express = require('express');
const router = express.Router();

const controller = require('../controllers/Seat.controller');

router.get('/',controller.seatGet);

router.post('/create',controller.seatPost);

router.put('/edit',controller.seatPut);

router.delete('/delete',controller.seatDelete);


module.exports = router;