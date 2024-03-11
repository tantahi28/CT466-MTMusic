const express = require('express');
const router = express.Router();

const favouriteController = require('../app/controllers/FavouriteController');

router.route('/')
    .get(favouriteController.findAllSong)
    .post(favouriteController.addFavorite)
    .delete(favouriteController.deleteFavorite)


module.exports = router;
