const express = require('express');
const router = express.Router();
const HonoraryFormModule = require('../controllers/HonorarymembersController.js');

router.post('/PostHonorarymembers', HonoraryFormModule.Honorarymembers);
router.get('/getHonorarymembers', HonoraryFormModule.getmembersdatas);
router.put('/update/:id', HonoraryFormModule.updateHonoraryMember);
router.delete('/deleteHonoraryMember/:id', HonoraryFormModule.deleteHonoraryMemberById);
router.post('/uploadHonoraryMembersExcel', HonoraryFormModule.uploadHonoraryMembersExcel)

module.exports = router;