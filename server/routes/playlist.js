const express = require('express');
const router = express.Router();

const playlistController = require('../app/controllers/PlaylistController');


router.route('/')
    .post(playlistController.create)
    .get(playlistController.findAll)

router.route('/:id')
    .delete(playlistController.delete)

// router.route('/song')

router.route('/song/:id')
    .post(playlistController.addSong)
    .delete(playlistController.deleteSong)
    .get(playlistController.findAllSong)


module.exports = router;
