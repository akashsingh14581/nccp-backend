const express = require('express');
const { subscribe, getSubscribers } = require('../controllers/newsletterControllers');
const router = express.Router();

router.post('/postNesletter', subscribe);
router.get('/subscribers', getSubscribers);

module.exports = router;
