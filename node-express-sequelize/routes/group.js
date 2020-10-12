const express = require('express');
const addMember = require('../controllers/group/addMember');
const createGroup = require('../controllers/group/createGroup');
const isAuth = require('../middlewares/isAuth');
const router = express.Router();

router.post('/create', isAuth, createGroup);

router.post('/add-member', isAuth, addMember);

module.exports = router;
