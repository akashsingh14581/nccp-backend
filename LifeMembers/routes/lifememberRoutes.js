// routes/lifeMemberRoutes.js
const express = require('express');
const { uploadExcel, getData, getAllRecords, createLifeMember, updateMember, deleteLifeMemberById } = require('../controllers/lifememberControllers');
const router = express.Router();

router.post('/uploadXsl', uploadExcel);
router.get('/getXsl', getData);
router.get('/getAllRecords', getAllRecords);
router.post('/createLifeMember', createLifeMember)
// routes/lifeMemberRoutes.js
router.put('/updateMember/:id', updateMember);
router.delete('/deleteLifeMember/:id', deleteLifeMemberById)



module.exports = router;
