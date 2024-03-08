const ApiError = require('../api-error');
const Song = require('../models/Song');

const uploadMultiple = require("../../utils/uploadMultiple")
const deleteUpload = require("../../utils/deleteUpload")

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
    

    // [POST] /song
    async create(req, res, next) {
        try {
            const { title, artist, genreId, albumId, isVip } = req.body;
            if (!title || !artist || !genreId) {
                throw new ApiError(400, "Please fill in the information");
            }

            // new song
            const newSong = new Song({
                title: title,
                artist: artist,
                image_path: image_path,
                audio_path: audio_path,
                is_vip: isVip,
                genre_id: genreId,
                album_id: albumId,
            });
            uploadMultiple(req, res, async (error) => {
                if (error) return next(error);

                // Update file paths 
                if (req.files['urlImg']) {
                    newSong.image_path = '/uploads/' + req.files['urlImg'][0].filename;
                }
                if (req.files['urlSong']) {
                    newSong.audio_path = '/uploads/' + req.files['urlSong'][0].filename;
                }
                // save
                const savedSong = await newSong.save();
                res.status(201).json({ song: savedSong });
            });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }

    // [PUT] /songs/:id
    async edit(req, res, next) {
        const id = req.params.id;
        const { title, artist, genreId, albumId, isVip } = req.body;

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
            editSong.album_id = albumId;
            editSong.is_vip = isVip;
            editSong.genre_id = genreId;

            // Check if there are files to upload
            uploadMultiple(req, res, async (error) => {
                if (error) return next(error);

                // Update file paths if they exist in the request
                if (req.files['urlImg']) {
                    editSong.image_path = '/uploads/' + req.files['urlImg'][0].filename;
                }

                if (req.files['urlSong']) {
                    editSong.audio_path = '/uploads/' + req.files['urlSong'][0].filename;
                }

                // save
                const updatedSong = await editSong.save();
                res.json({ song: updatedSong });
            });
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

            // find song to get file paths
            const songToDelete = await Song.findOne({ where: { song_id: id } });

            if (!songToDelete) {
                return next(new ApiError(404, "Song doesn't exist!"));
            }

            // delete files
            deleteUpload(songToDelete.image_path);
            deleteUpload(songToDelete.audio_path);

            // delete song record
            const deletedSong = await Song.destroy({ where: { song_id: id } });

            if (!deletedSong) {
                return next(new ApiError(404, "Song doesn't exist!"));
            }

            res.json({ message: "Song has been deleted" });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }


    

}

module.exports = new SongController();
