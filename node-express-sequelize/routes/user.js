const express = require('express');
const login = require('../controllers/user/login');
const me = require('../controllers/user/me');
const register = require('../controllers/user/register');
const isAuth = require('../middlewares/isAuth');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/me', isAuth, me);

module.exports = router;
