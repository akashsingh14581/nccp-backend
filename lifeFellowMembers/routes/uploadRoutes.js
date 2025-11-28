const express = require('express');
const { getfellowmemberAllRecords, uploadfellowmemberExcel, getfellowData, editUploadedFellowMembers, deleteuploadFellowMembers, createLifeFellowMember } = require('../controllers/uploadControllers');
const router = express.Router();

router.post('/uploadfellowmember', uploadfellowmemberExcel);
router.post('/createLifeFellowMember', createLifeFellowMember);
router.get('/getfellowmember', getfellowData);
router.get('/getfellowmemberAllRecords', getfellowmemberAllRecords);
router.put("/editFellowMember/:id", editUploadedFellowMembers);
router.delete('/deleteFellowMember/:id', deleteuploadFellowMembers);

module.exports = router;
