const ApiError = require('../api-error');
const Song = require('../models/Song');
const path = require('path');
const uploadMultiple = require("../../utils/uploadMultiple")
const deleteUpload = require("../../utils/deleteUpload")
const getAudioDuration = require("../../utils/getAudioDur");

class SongController {
    
    //[GET] /song/:id
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

    // [GET] /song
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
            const publicDir = path.join(__dirname, '../../public');
            uploadMultiple(req, res, async (error) => {
                const { title, artist, genreId, albumId, isVip } = req.body;
        
                if (!title || !artist || !genreId) {
                    throw new ApiError(400, "Please fill in the information");
                }

                if (error) return next(error);


                const image_path = req.files['urlImg']
                    ? '/uploads/' + req.files['urlImg'][0].filename
                    : null;

                const audio_path = req.files['urlSong']
                    ? '/uploads/' + req.files['urlSong'][0].filename
                    : null;
                
                let duration = null;
                let audioPath = path.join(publicDir, audio_path);
                if (audioPath) {
                    // Lấy tổng thời gian của file audio
                    try {
                        duration = await getAudioDuration(audioPath);
                    } catch (err) {
                        console.log(audioPath);
                        console.error(err);
                        return next(new ApiError(500, "Failed to get audio duration"));
                    }
                }

                // new song
                const newSong = new Song({
                    title: title,
                    artist: artist,
                    image_path: image_path,
                    audio_path: audio_path,
                    duration: duration,
                    is_vip: isVip,
                    genre_id: genreId,
                    album_id: albumId,
                });

                // save
                const savedSong = await newSong.save();
                res.status(201).json({ song: savedSong });
            });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }

    // [PUT] /song/:id
    async edit(req, res, next) {
        try {
            uploadMultiple(req, res, async (error) => {
                
                const id = req.params.id;
                const { title, artist, genreId, albumId, isVip } = req.body;
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
                if (error) return next(error);

                let imagePath = 'D:/atSchool/CT466-MTMusic/server/public' + editSong.image_path;
                let audioPath = 'D:/atSchool/CT466-MTMusic/server/public' + editSong.audio_path;

                // Update file paths if they exist in the request
                if (req.files['urlImg']) {
                    deleteUpload(imagePath);
                    editSong.image_path = '/uploads/' + req.files['urlImg'][0].filename;
                }

                if (req.files['urlSong']) {
                    deleteUpload(audioPath);
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



    // [DELETE] /song/:id
    async delete(req, res, next) {
        try {
            const id = req.params.id;

            // find song to get file paths
            const songToDelete = await Song.findOne({ where: { song_id: id } });

            if (!songToDelete) {
                return next(new ApiError(404, "Song doesn't exist!"));
            }
            
            let imagePath = 'D:/atSchool/CT466-MTMusic/server/public' + songToDelete.image_path;
            let audioPath = 'D:/atSchool/CT466-MTMusic/server/public' + songToDelete.audio_path;
            
            // delete files
            deleteUpload(imagePath);
            deleteUpload(audioPath);
            
            // Delete playlist items associated with the song
            // await PlaylistItem.destroy({ where: { song_id: id } });
            // delete song record
            const deletedSong = await Song.delete(id)

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
