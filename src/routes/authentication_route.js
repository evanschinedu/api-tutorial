const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authentication_controller');


router.post('/api/tutorial/register', register);
router.post('/api/tutorial/login', login);

module.exports = router;