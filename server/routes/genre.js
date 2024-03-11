const express = require('express');
const router = express.Router();

const genreController = require('../app/controllers/GenreController');

router.route('/')
    .get(genreController.findAll)
    // .post(genreController.create)

router.route('/:id')
    .get(genreController.findAllSong)

module.exports = router;
