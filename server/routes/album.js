const express = require('express');
const router = express.Router();
const { verifySession } = require('supertokens-node/recipe/session/framework/express');

const albumController = require('../app/controllers/AlbumController');


router.route('/')
    .get(albumController.findAll)

router.post('/', verifySession(), albumController.create)    

router.route('/:id')
    .delete(albumController.delete)

// router.route('/song')

router.route('/song/:id')
    .post(albumController.addSong)
    .delete(albumController.deleteSong)
    .get(albumController.findAllSong)


module.exports = router;
