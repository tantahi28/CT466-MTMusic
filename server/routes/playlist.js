const express = require('express');
const router = express.Router();
const { verifySession } = require('supertokens-node/recipe/session/framework/express');
const playlistController = require('../app/controllers/PlaylistController');

router.route('/')
    .post(verifySession(), playlistController.create)
    .get(playlistController.findAll);

router.route('/:id')
    .delete(verifySession(), playlistController.delete);

router.route('/song/:id')
    .post(verifySession(), playlistController.addSong)
    .delete(verifySession(), playlistController.deleteSong)
    .get(playlistController.findAllSong);

module.exports = router;
