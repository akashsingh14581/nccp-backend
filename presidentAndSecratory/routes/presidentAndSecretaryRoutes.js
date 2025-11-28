const express = require('express');
const router = express.Router();
const {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord, 
  uploadPresidentSecretaryExcel
} = require('../controllers/presidentAndSecretaryController');

// ✅ Create new record
router.post('/', createRecord);

// ✅ Get all records
router.get('/', getAllRecords);

// ✅ Get record by ID
router.get('/:id', getRecordById);

// ✅ Update record by ID
router.put('/:id', updateRecord);

// ✅ Delete record by ID
router.delete('/:id', deleteRecord);

// ✅ Upload excel file
router.post('/uploadExcel', uploadPresidentSecretaryExcel)

module.exports = router;
