const express = require('express');
const controller = require('../controllers/Ticket.controller');
const { isAuth } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/',[isAuth],controller.ticketGet);

router.post('/create',[isAuth],controller.ticketPost);

router.put('/edit',[isAuth],controller.ticketPut);

router.delete('/delete',[isAuth],controller.ticketDelete);

module.exports = router;