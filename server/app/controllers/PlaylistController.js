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

            const {name, description, genreId} = req.body;

            // // new playlist
            const newPlaylist = new Playlist({
                user_id: userId,
                name: name,
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

    // GET playlist/:id
    async findAllSong(req, res, next) {
        try {
            const playlistId = req.params.id;

            // Retrieve playlist information
            const playlist = await Playlist.findByPk(playlistId);

            if (!playlist) {
                return next(new ApiError(404, "Playlist not found"));
            }

            // Retrieve all songs in the playlist
            const playlistItems = await PlaylistItem.findAll({
                where: { playlist_id: playlistId },
                attributes: ['position', 'song_id'], // Include the 'position' column
                include: [{
                    model: Song,
                    attributes: {}, 
                }],
                order: [['position', 'ASC']], // Order the result by 'position'
            });

            // console.log(playlistItems);

            // Extract the songs from the result
            const songs = playlistItems.map(item => ({
                song_id: item.song_id,
                position: item.position,
                title: item.Song.title,
                artist: item.Song.artist,
                genre_id: item.Song.genre_id,
                album_id: item.Song.album_id,
                audio_path: item.Song.audio_path,
                image_path: item.Song.image_path,
                is_vip: item.Song.is_vip
                // Include other song columns
            }));

            // Return playlist information along with the list of songs
            res.status(200).json({ songs: songs });
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