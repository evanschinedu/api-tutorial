const express = require('express');
const router = express.Router();
const { register, login, updateUser, showAllUsers } = require('../controllers/authentication_controller');


router.post('/api/tutorial/register', register);
router.post('/api/tutorial/login', login);
router.patch('/api/tutorial/update/:id', updateUser);
router.get('/api/tutorial/allUsers', showAllUsers);

module.exports = router;