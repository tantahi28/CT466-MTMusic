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
    

    // [POST] /genre
    async create(req, res, next) {
        try {
            const { name, description } = req.body;
            if (!name) {
                return next(new ApiError(400, "Genre name must be provided."));
            }

            const newGenre = await Genre.create({ name, description });
            res.status(201).json(newGenre);
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred while creating the genre."));
        }
    }

    // [PUT] /genre/:id
    async edit(req, res, next) {
        try {
            const genreId = req.params.id;
            const { name } = req.body;

            const genre = await Genre.findByPk(genreId);
            if (!genre) {
                return next(new ApiError(404, "Genre does not exist."));
            }

            genre.name = name;
            await genre.save();

            res.json(genre);
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred while updating the genre."));
        }
    }

    // [DELETE] /genre/:id
    async delete(req, res, next) {
        try {
            const genreId = req.params.id;
            const genre = await Genre.findByPk(genreId);
            if (!genre) {
                return next(new ApiError(404, "Genre does not exist."));
            }

            await genre.destroy();
            res.status(204).send(); // No content to send back
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred while deleting the genre."));
        }
    }

    

}

module.exports = new GenreController();
