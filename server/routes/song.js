const express = require('express');
const router = express.Router();

const songController = require('../app/controllers/songController');

router.route('/')
    .get(songController.findAll)
    .post(songController.create)


router.route('/:id')
    .get(songController.findOne)
    .put(songController.edit)
    .delete(songController.delete)

module.exports = router;
