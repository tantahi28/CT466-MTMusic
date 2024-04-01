const Favourite = require('../models/Favourite');
const ApiError = require('../api-error');
const Song = require('../models/Song');


class FavouriteController {

    // POST /favourite
    async addFavorite(req, res, next) {
        try {

            // session
            const session = req.session;
            // get info from session
            const userId = session.getUserId(); // user id

            if(userId === undefined) {
                return next(
                    new ApiError(500, "Should nerver come here!")
                );
            }
            const songId = req.body.songId;

            // Check if the favorite already exists
            const favoriteExists = await Favourite.findOne({
                where: { user_id: userId, song_id: songId },
            });

            if (favoriteExists) {
                return next(new ApiError(400, 'Song already in favorites'));
            }

            // Create a new favorite record
            const newFavorite = new Favourite({
                user_id: userId,
                song_id: songId,
            });

            // Save the new favorite
            const savedFavorite = await newFavorite.save();

            res.status(201).json({ favorite: savedFavorite });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, 'An error occurred!!'));
        }
    }

    // DELETE /favourite/:id
    async deleteFavorite(req, res, next) {
        try {
            // session
            const session = req.session;
            // get info from session
            const userId = session.getUserId(); // user id

            if(userId === undefined) {
                return next(
                    new ApiError(500, "Should nerver come here!")
                );
            }
            const songId = req.params.id;

            // Find the favorite to be deleted
            const favoriteToDelete = await Favourite.findOne({
                where: { user_id: userId, song_id: songId },
            });

            if (!favoriteToDelete) {
                return next(new ApiError(404, 'Favorite not found'));
            }

            // Delete the favorite record
            await favoriteToDelete.destroy();

            res.json({ message: 'Favorite deleted successfully' });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, 'An error occurred!!'));
        }
    }

    // GET /favourite
    async findAllSong(req, res, next) {
        try {
            // session
            const session = req.session;
            // get info from session
            const userId = session.getUserId(); // user id

            if (userId === undefined) {
                return next(new ApiError(500, "Should never come here!"));
            }

            // Retrieve all favorite records for the user
            const favorites = await Favourite.findAll({
                where: { user_id: userId },
            });

            // Extract song ids from favorites
            const songIds = favorites.map(favorite => favorite.song_id);

            // Retrieve songs based on song ids
            const songs = await Song.findAll({
                where: { song_id: songIds },
            });

            res.status(200).json({ songs: songs });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, 'An error occurred!!'));
        }
    }

}

module.exports = new FavouriteController();
