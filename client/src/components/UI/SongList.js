import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';

const SongList = () => {
    const [songs, setSongs] = useState([]);

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

    return (
        <div>
            <h1>Song List</h1>
            <Playlist className="w-100 rounded mt-3 px-3 d-flex flex-column">
                {songs.map(song => (
                    <Song key={song.song_id} currentSong={song}/>
                ))}
            </Playlist>
        </div>
    );
};

const Song = ({ currentSong }) => {
    return (
        <MusicList>
            <ListSong className={`list__song`}>
                <ListThumb style={{ backgroundImage: `url(http://localhost:3001${currentSong.image_path})` }}></ListThumb>
                <ListBody>
                    <Title>{currentSong.title}</Title>
                    <Author>{currentSong.artist}</Author>
                </ListBody>
            </ListSong>
            <ListFav>
                <i className="fa-solid fa-heart"></i>
            </ListFav>
        </MusicList>
    );
};

export const Playlist = styled.div`
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
  width: 50%;
  padding: 0.5rem 0;
  margin-top: 1rem;
  border: 1px solid #000;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 1rem;
  }

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
  color: #a4adc6;
  font-size: 2rem;
  margin-right: 2rem;

  &:hover {
    color: red;
    cursor: pointer;
  }
`;

export const Active = styled.div`
  color: var(--primary-color) !important;
`;

export const ActiveMusicList = styled.div`
  background-color: #eda7dc;
`;

export default SongList;
