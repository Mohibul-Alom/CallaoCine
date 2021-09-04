const express = require('express');
const router = express.Router();
const controller = require('../controllers/User.controller');
const { isAuth, isAdmin } = require('../middlewares/auth.middleware');


//TODO: ⚠️⚠️😒😒 no esta securizado 😒😒⚠️⚠️ pista--> JWT

router.put('/add-ticket',controller.userUpdateTickets);

router.delete('/delete-ticket',[isAuth,isAdmin],controller.userDeleteTickets);

//TODO: ⚠️⚠️😒😒 no esta securizado 😒😒⚠️⚠️ pista--> JWT
router.get('/',controller.userGet);

module.exports = router;