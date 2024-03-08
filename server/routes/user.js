const express = require('express');
const router = express.Router();


const UserController = require('../app/controllers/UserController');

router.route('/')
    .get(UserController.findOne)
    .put(UserController.edit)

module.exports = router;
