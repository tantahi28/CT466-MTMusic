const Album = require("../models/Album");
const AlbumItem = require("../models/AlbumItem");
const Song = require('../models/Song');

const uploadOne = require("../../utils/uploadOne")
const deleteUpload = require("../../utils/deleteUpload")

const ApiError = require("../api-error");

class AlbumController {
    // POST album/
    async create(req, res, next) {
        try {
            uploadOne(req, res, async (error) => {
                // session
                const session = req.session;
                // get info from session
                const userId = session.getUserId(); // user id
    
                if(userId === undefined) {
                    return next(
                        new ApiError(500, "Should nerver come here!")
                    );
                }

                const image_path = req.file
                    ? '/uploads/' + req.file.filename
                    : null;

                const { title, artist, isVip, genreId } = req.body;

                // // new album
                const newAlbum = new Album({
                    title: title,
                    artist: artist,
                    image_path: image_path,
                    is_vip: isVip,
                    genre_id: genreId,
                });

                // // save
                const savedAlbum = await newAlbum.save();
                res.status(201).json({ album: savedAlbum });
                    
            });

        } catch(error) {
            console.error(error);
            return next(
                new ApiError(500, "An error occurred!!")
            );
        }
    }

    // GET album/:id
    async findAllSong(req, res, next) {
        try {
            const albumId = req.params.id;

            // Retrieve album information
            const album = await Album.findByPk(albumId);

            if (!album) {
                return next(new ApiError(404, "Album not found"));
            }

            // Retrieve all songs in the album
            const albumItems = await AlbumItem.findAll({
                where: { album_id: albumId },
                attributes: [ 'song_id'],
                include: [{
                    model: Song,
                    attributes: ['song_id', 'title', 'artist', 'genre_id', 'album_id', 'audio_path', 'image_path', 'is_vip'], // Include other columns you need
                }]
            });

            // Extract the songs from the result
            const songs = albumItems.map(item => ({
                song_id: item.song_id,
                position: item.position,
                title: item.Song.title,
                artist: item.Song.artist,
                genre_id: item.Song.genre_id,
                album_id: item.Song.album_id,
                audio_path: item.Song.audio_path,
                image_path: item.Song.image_path,
                is_vip: item.Song.is_vip
            }));

            // Return album information along with the list of songs
            res.status(200).json({ songs: songs });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }

    // GET album/
    async findAll(req, res, next) {
        try {
            const albums = await Album.findAll();

            res.status(200).json({ albums });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }

    // POST album/song/:id
    async addSong(req, res, next) {
        try {
            const albumId = req.params.id;
            const songId = req.body.songId; 
            const song = await Song.findOne({ where: { song_id: songId }});

            // Check if the song exists
            if (!song) {
                return next(
                    new ApiError(404, "Song not found!")
                );
            }

            // Check if the song exists in the album
            const songExists = await AlbumItem.findOne({
                where: { album_id: albumId, song_id: songId },
            });

            if (songExists) {
                return next(new ApiError(400, "Song already exists in the album"));
            }

            // Create new AlbumItem directly
            const newAlbumItem = new AlbumItem({
                album_id: albumId,
                song_id: songId,
            });

            // Save new AlbumItem 
            const savedAlbumItem = await newAlbumItem.save();

            res.status(201).json({ albumItem: savedAlbumItem });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }

    // DELETE album/:id
    async delete(req, res, next) {
        try {
            const albumId = req.params.id;

            // Check if the album exists
            const album = await Album.findByPk(albumId);

            
            if (!album) {
                return next(new ApiError(404, "Album not found"));
            }

            let imagePath = 'D:/atSchool/CT466-MTMusic/server/public' + album.image_path;
            deleteUpload(imagePath);
            
            // Delete the Album and associated AlbumItems
            await Album.destroy({
                where: { album_id: albumId },
                cascade: true, // This deletes associated AlbumItems
            });

            res.status(200).json({ message: "Album deleted successfully" });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }

    // DELETE album/song/:id
    async deleteSong(req, res, next) {
        try {
            const albumId = req.params.id;
            const songId = req.body.songId;

            // Check if the song exists in the album
            const albumItem = await AlbumItem.findOne({
                where: { album_id: albumId, song_id: songId },
            });

            if (!albumItem) {
                return next(new ApiError(404, "Song not found in the album"));
            }

            // Delete the AlbumItem
            await albumItem.destroy();

            res.status(200).json({ message: "Song deleted from the album" });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }
}

module.exports = new AlbumController();
