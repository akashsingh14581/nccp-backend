const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const { register, login } = require('../controller/authController');



// ✅ Register User (Normal User)
router.post('/register', register);

// ✅ Login (Admin/User)
router.post('/login', login);


router.get('/admin-dashboard', verifyToken, isAdmin, (req, res) => {
    res.json({ message: `Welcome Admin ${req.user.id}` });
});



module.exports = router;
