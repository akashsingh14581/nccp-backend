
const express = require('express');
const router = express.Router();
const formController = require('../controllers/confrenceController');

router.post('/form', formController.createForm);
router.get('/forms', formController.getForms);

module.exports = router;
