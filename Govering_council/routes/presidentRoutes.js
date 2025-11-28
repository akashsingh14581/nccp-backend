const express = require('express');
const router = express.Router();
const HonoraryFormModule = require('../controllers/HonorarymembersController.js');

router.post('/PostHonorarymembers', HonoraryFormModule.Honorarymembers);
router.get('/getHonorarymembers',   HonoraryFormModule.getmembersdatas);

module.exports = router;