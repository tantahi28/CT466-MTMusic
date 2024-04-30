    import React, { useState, useEffect } from 'react';
    import SongList from '../../components/UI/SongList';
    import PlaylistService from '../../services/PlaylistService';
    import { useParams } from 'react-router-dom';

    const Playlist = () => {
        const { id } = useParams();
        const [playlistSongs, setPlaylistSongs] = useState([]);
        const [playlistTitle, setPlaylistTitle] = useState('');

        useEffect(() => {
            const fetchPlaylist = async () => {
                try {
                    if (id.trim() !== '') {
                        const playlistData = await PlaylistService.getAllSongs(id);
                        setPlaylistSongs(playlistData.songs);
                        setPlaylistTitle(playlistData.title);
                        console.log(playlistData)
                    } else {
                        setPlaylistSongs([]);
                        setPlaylistTitle('');
                    }
                } catch (error) {
                    console.error('Error fetching playlist:', error);
                }
            };
            fetchPlaylist();
        }, [id]);

        return (
            <div className='w-100'>
                {playlistSongs.length > 0 ? (
                    <SongList songs={playlistSongs} title={`Playlist: ${playlistTitle}`} />
                ) : (
                    <p>No songs found in the playlist.</p>
                )}
            </div>
        );
    }

    export default Playlist;
