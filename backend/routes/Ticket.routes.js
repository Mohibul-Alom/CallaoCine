const express = require('express');
const controller = require('../controllers/Ticket.controller');
const { isAuth, isAdmin} = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/',[isAuth],[isAdmin],controller.ticketGet);

router.post('/create',[isAuth],[isAdmin],controller.ticketPost);

router.put('/edit',[isAuth],[isAdmin],controller.ticketPut);

router.delete('/delete',[isAuth],[isAdmin],controller.ticketDelete);

module.exports = router;