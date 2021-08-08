const express = require('express');
const controller = require('../controllers/Ticket.controller');
const router = express.Router();

router.get('/',controller.ticketGet);

router.post('/create',controller.ticketPost);

router.put('/edit',controller.ticketPut);

router.delete('/delete',controller.ticketDelete);


module.exports = router;