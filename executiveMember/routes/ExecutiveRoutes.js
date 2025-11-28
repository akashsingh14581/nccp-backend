const express = require('express');
const router = express.Router();
const executiveFormModule = require('../controllers/executiveController');

router.post('/PostmemberForm', executiveFormModule.membersForm);
router.get('/getmemberData', executiveFormModule.getexecutivemembers);
router.put('/updateExecutiveMember/:id', executiveFormModule.executiveMemberUpdateById)
router.delete('/deleteExecutiveMember/:id', executiveFormModule.executiveMemberDeleteById)
router.post('/upload-Exceutive-member-excel', executiveFormModule.uploadExecutiveExcel)

module.exports = router;