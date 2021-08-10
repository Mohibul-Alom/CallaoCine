const express = require('express');
const controller = require('../controllers/Seat.controller');
const { isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/',controller.seatGet);

router.post('/create',[isAdmin],controller.seatPost);

router.put('/edit',[isAdmin],controller.seatPut);

router.delete('/delete',[isAdmin],controller.seatDelete);


module.exports = router;