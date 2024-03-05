const ApiError = require('../api-error');
const Song = require('../models/Song');

class SongController {
    //[GET] /songs/:id
    async findOne(req, res, next) {
        try {
            // id
            const id = req.params.id;

            const song = await Song.findOne({ where: { song_id: id } });

            if (!song) {
                return next(
                    new ApiError(404, "Song not found!")
                );
            }

            res.json({ song: song });
        } catch (error) {
            console.error(error);
            return next(
                new ApiError(500, "An error occurred!!")
            );
        }
    }

    // [GET] /songs
    async findAll(req, res, next) {
        try {
            const songs = await Song.findAll();
            res.json({ songs: songs });
        } catch (error) {
            console.error(error);
            return next (
                new ApiError(500, "An error occurred!!")
            );
        }
    }
    

    // [POST] /songs
    async create(req, res, next) {
        if (!title || !artist || !album || !duration || !genre) {
            throw new ApiError(400, "Please fill in the information");
        }
        try {
            const { title, artist, album, duration, genre } = req.body;

            // new song
            const newSong = new Song({
                title: title,
                artist: artist,
                album: album,
                duration: duration,
                genre: genre,
            });

            // save
            const savedSong = await newSong.save();

            res.status(201).json({ song: savedSong });
        } catch (error) {
            console.error(error);
            return next (
                new ApiError(500, "An error occurred!!")
            );
        }
    }

    // [PUT] /songs/:id
    async edit(req, res, next) {
        const id = req.params.id;
        const { title, artist, album, duration, genre } = req.body;

        try {
            // check song exist
            const editSong = await Song.findOne({ where: { song_id: id } });

            if (!editSong) {
                return next(
                    new ApiError(404, "Song not found!")
                );
            }

            editSong.title = title;
            editSong.artist = artist;
            editSong.album = album;
            editSong.duration = duration;
            editSong.genre = genre;

            // save
            const updatedSong = await editSong.save();

            res.json({ song: updatedSong });
        } catch (error) {
            console.error(error);
            return next(
                new ApiError(500, "An error occurred!!")
            );
        }
    }


    // [DELETE] /songs/:id
    async delete(req, res, next) {
        try {
            const id = req.params.id;

            const deletedSong = await Song.findOneAndDelete({ where: { song_id: id } });

            if (!deletedSong) {
                return new ApiError(404, "Song doesn't exist!")
            }

            res.json({ message: "Song has been deleted" });
        } catch (error) {
            console.error(error);
            return next (
                new ApiError(500, "An error occurred!!")
            );
        }
    }

    

}

module.exports = new SongController();
