const express = require('express');
const router = express.Router();
const HonoraryFormModule = require('../controllers/contactController.js');

router.post('/postcontactquery', HonoraryFormModule.post_query);
router.get('/getcontactquery',   HonoraryFormModule.get_query);


module.exports = router;