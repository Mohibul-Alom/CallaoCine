const express = require('express');

const controller = require('../controllers/Auditorium.controller');
const { isAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/',controller.auditoriumGet);

router.post('/create',[isAdmin],controller.auditoriumPost);

router.delete('/delete',[isAdmin],controller.auditoriumDelete);

router.delete('/name/:name',[isAdmin],controller.auditoriumGetByName);

module.exports = router;
