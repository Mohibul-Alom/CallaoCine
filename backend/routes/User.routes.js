const express = require('express');
const router = express.Router();
const controller = require('../controllers/User.controller');
const { isAuth, isAdmin } = require('../middlewares/auth.middleware');

router.get('/',[isAuth],[isAdmin],controller.userGet);

//TODO: ⚠️⚠️😒😒 no esta securizado 😒😒⚠️⚠️ pista--> JWT

router.put('/add-ticket',controller.userUpdateTickets);

router.post('/delete-ticket/:ticketId',[isAuth,isAdmin],controller.userDeleteTickets);

module.exports = router;