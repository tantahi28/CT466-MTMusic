const ApiError = require('../api-error');
const Genre = require('../models/Genre');
const Song = require("../models/Song");


class GenreController {
    //[GET] /genre
    async findAll(req, res, next) {
        try {
            const genres = await Genre.findAll();
            res.json({ genres: genres });
        } catch (error) {
            console.error(error);
            return next (
                new ApiError(500, "An error occurred!!")
            );
        }
    }

    // [GET] /genre/:id
    async findAllSong(req, res, next) {
        try {
            const genreId = req.params.id;

            // Check if the genre exists
            const genre = await Genre.findByPk(genreId);
            if (!genre) {
                return new ApiError(404, "Genre does not exist.")
            }

            // Get all songs belonging to that genre
            const songs = await Song.findAll({
                where: { genre_id: genreId },
            });

            // Return the list of songs
            res.json({ genre, songs });
        } catch (error) {
            return next(
                new ApiError(500, "An error occurred!!")
            )
        }
    }
    

    // [POST] /
    async create(req, res, next) {
        
    }

    // [PUT] /
    async edit(req, res, next) {
       
    }



    // [DELETE] /
    async delete(req, res, next) {

    }


    

}

module.exports = new GenreController();
