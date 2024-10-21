const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/check-auth', authController.checkAuth);
router.post('/logout', authController.logout);
// router.post('/request-password-reset', authController.RequestPasswordReset);
// router.post('/reset-password', authController.ResetPassword);

module.exports = router;