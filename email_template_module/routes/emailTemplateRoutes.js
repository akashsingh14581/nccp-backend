// Router for email template operations
const express = require('express');
const router = express.Router();
const EmailTemplateController = require('../controllers/emailTemplateController');

router.post('/postEmailTemplateData', EmailTemplateController.createEmailTemplate);
router.get('/getEmailTemplateData', EmailTemplateController.getEmailTemplateData);
router.put('/updateEmailTemplateData/:id', EmailTemplateController.updateEmailTemplate);
router.delete('/deleteEmailTemplateData/:id', EmailTemplateController.deleteEmailTemplate);

module.exports = router;
