const Playlist = require("../models/Playlist");
const PlaylistItem = require("../models/PlaylistItem");
const Song = require('../models/Song');

const ApiError = require("../api-error");

class PlaylistController {
    //POST playlist/
    async create(req, res, next) {
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

            const {title, description, genreId} = req.body;

            // // new playlist
            const newPlaylist = new Playlist({
                user_id: userId,
                title: title,
                description: description,
                genre_id: genreId
            });

            // // save
            const savedPlaylist = await newPlaylist.save();
            res.status(201).json({ playlist: savedPlaylist });


        } catch(error) {
            console.error(error);
            return next(
                new ApiError(500, "An error occurred!!")
            );
        }
    }

    // GET playlist/song/:id
    async findAllSong(req, res, next) {
        try {
            const playlistId = req.params.id;
            console.log(playlistId);

            // Retrieve playlist information
            const playlist = await Playlist.findByPk(playlistId);

            if (!playlist) {
                return next(new ApiError(404, "Playlist not found"));
            }

            // Retrieve all songs in the playlist directly
            const songs = await Song.findAll({
                include: {
                    model: PlaylistItem,
                    where: { playlist_id: playlistId },
                    attributes: []
                },
                attributes: ['song_id', 'title', 'artist', 'genre_id', 'album_id', 'audio_path', 'image_path', 'is_vip', 'duration'],
                order: [[PlaylistItem, 'position', 'ASC']]
            });

            // Return playlist title and list of songs
            res.status(200).json({ 
                title: playlist.title,
                songs: songs 
            });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }


    // GET playlist/
    async findAll(req, res, next) {
        try {
            const playlists = await Playlist.findAll();

            res.status(200).json({ playlists });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }

    // POST playlist/song/:id
    async addSong(req, res, next) {
        try {
            const playlistId = req.params.id;
            const songId = req.body.songId; 
            const song = await Song.findOne({ where: { song_id: songId }});

            //check song
            if (!song) {
                return next(
                    new ApiError(404, "Song not found!")
                );
            }

            // Check if the song exists in the playlist
            const songExists = await PlaylistItem.findOne({
                where: { playlist_id: playlistId, song_id: songId },
            });
    
            if (songExists) {
                return next(new ApiError(400, "Song already exists in the playlist"));
            }
    
            // Create new PlaylistItem directly
            const newPlaylistItem = new PlaylistItem({
                playlist_id: playlistId,
                song_id: songId,
            });
    
            // Save new PlaylistItem 
            const savedPlaylistItem = await newPlaylistItem.save();
    
            res.status(201).json({ playlistItem: savedPlaylistItem });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }

    // DELETE playlist/:id
    async delete(req, res, next) {
        try {
            const playlistId = req.params.id;

            // Check if the playlist exists
            const playlist = await Playlist.findByPk(playlistId);

            if (!playlist) {
                return next(new ApiError(404, "Playlist not found"));
            }

            // Delete the Playlist and associated PlaylistItems
            await Playlist.destroy({
                where: { playlist_id: playlistId },
                cascade: true, // This deletes associated PlaylistItems
            });

            res.status(200).json({ message: "Playlist deleted successfully" });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }

    // DELETE playlist/song/:id
    async deleteSong(req, res, next) {
        try {
            const playlistId = req.params.id;
            const songId = req.body.songId;

            // Check if the song exists in the playlist
            const playlistItem = await PlaylistItem.findOne({
                where: { playlist_id: playlistId, song_id: songId },
            });

            if (!playlistItem) {
                return next(new ApiError(404, "Song not found in the playlist"));
            }

            // Delete the PlaylistItem
            await playlistItem.destroy();

            res.status(200).json({ message: "Song deleted from the playlist" });
        } catch (error) {
            console.error(error);
            return next(new ApiError(500, "An error occurred!!"));
        }
    }

    
}

module.exports = new PlaylistController();