const express = require('express');
const router = express.Router();
const TestController = require('../app/controllers/testController');

router.get('/', TestController.index);

module.exports = router;
