const express = require('express');
const createPost = require('../controllers/post/createPost');
const isAuth = require('../middlewares/isAuth');
const router = express.Router();

router.post('/create', isAuth, createPost);

module.exports = router;
