import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const SongList = () => {
    const [songs, setSongs] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/song');
                setSongs(response.data.songs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:3001/favourite');
                const favSongIds = response.data.songs.map(song => song.song_id);
                setFavorites(favSongIds);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };
        
        console.log(favorites)
        fetchFavorites();
    }, []);

    const handleAddFav = async (songId) => {
        try {
            await axios.post('http://localhost:3001/favourite', {
                songId: songId
            });
    
            const updatedFavorites = [...favorites, songId];
            setFavorites(updatedFavorites);
    
            console.log("Thêm yêu thích thành công!");
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };

    const handleRemoveFav = async (songId) => {
        try {
            await axios.delete(`http://localhost:3001/favourite/${songId}`);
            
            const updatedFavorites = favorites.filter(favId => favId !== songId);
            setFavorites(updatedFavorites);
        
            console.log("Xóa yêu thích thành công!");
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };
    
    

    const isFavorite = (songId) => {
        return favorites.includes(songId);
    };
    
    return (
        <div>
            <h1>Song List</h1>
            <Playlist className="w-100 rounded bg-body-secondary p-3 d-flex flex-column">
                {songs.map(song => (
                    <Song key={song.song_id} currentSong={song} isFavorite={isFavorite(song.song_id)} handleAddFav={handleAddFav} handleRemoveFav = {handleRemoveFav}/>
                ))}
            </Playlist>
        </div>
    );
};

const Song = ({ currentSong, isFavorite, handleAddFav, handleRemoveFav }) => {
    return (
        <MusicList className="mt-2">
            <ListSong className={`list__song`}>
                <ListThumb style={{ backgroundImage: `url(http://localhost:3001${currentSong.image_path})` }}></ListThumb>
                <ListBody>
                    <Title>{currentSong.title}</Title>
                    <Author>{currentSong.artist}</Author>
                </ListBody>
            </ListSong>
            <ListFav isFavorite={isFavorite} onClick={() => isFavorite ? handleRemoveFav(currentSong.song_id) : handleAddFav(currentSong.song_id)}>   
                <FontAwesomeIcon icon={faHeart} />
            </ListFav>
        </MusicList>
    );
};


export const Playlist = styled.div`
  max-width: 40rem;
  max-height: 21rem;
  overflow: overlay;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MusicList = styled.div`
  display: flex;
  background-color: var(--player-bg);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 0.5rem 0;
  border: 1px solid #000;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;

  p {
    color: var(--text-content);
    font-weight: 100;
  }

  &:hover {
    background-color: #fff;
    cursor: pointer;
  }
`;

export const ListSong = styled.div`
  display: flex;
  padding-left: 1rem;
  align-items: center;
`;

export const ListThumb = styled.div`
  border-radius: 50%;
  display: block;
  width: 3rem;
  height: 3rem;
  background-size: cover;
`;

export const ListBody = styled.div`
  padding-left: 1.5rem;
`;

export const Title = styled.h3`
  display: block;
  font-size: 1.25rem;
`;

export const Author = styled.p`
  padding: 0.5rem 0;
  font-size: 1rem;
`;

export const ListFav = styled.div`
  padding: 5px;
  color: ${props => props.isFavorite ? '#ff0000' : '#a4adc6'};
  font-size: 1.5rem;
  margin-right: 2rem;

  &:hover {
    cursor: pointer;
    color: #000;
  }
`;

export const Active = styled.div`
  color: var(--primary-color) !important;
`;

export const ActiveMusicList = styled.div`
  background-color: #eda7dc;
`;

export default SongList;
