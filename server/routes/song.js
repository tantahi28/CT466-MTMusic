const express = require('express');
const router = express.Router();
const { verifySession } = require('supertokens-node/recipe/session/framework/express');
const isAdmin = require("../app/middlewares/isAdmin")
const songController = require('../app/controllers/songController');

router.route('/')
    .get(songController.findAll)
    .post(verifySession(), isAdmin, songController.create);

router.route('/:id')
    .get(songController.findOne)
    .put(verifySession(), isAdmin, songController.edit) 
    .delete(verifySession(), isAdmin, songController.delete); 

module.exports = router;
