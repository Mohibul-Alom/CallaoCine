const express = require('express');
const controller = require('../controllers/Ticket.controller');
const { isAuth, isAdmin} = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/',[isAuth],[isAdmin],controller.ticketGet);

//TODO: ⚠️⚠️😒😒 no esta securizado 😒😒⚠️⚠️ pista--> JWT

router.post('/create',controller.ticketPost);

router.put('/edit',[isAuth],[isAdmin],controller.ticketPut);

router.delete('/delete',[isAuth],[isAdmin],controller.ticketDelete);

router.get('/:id',controller.ticketGetById);

module.exports = router;