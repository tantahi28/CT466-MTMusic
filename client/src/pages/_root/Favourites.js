import React, { useState, useEffect } from 'react';
import SongList from '../../components/UI/SongList';
import FavouriteService from '../../services/FavouriteService';
import styled from "styled-components";

const Favourites = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataSong = await FavouriteService.getAllSong();
                setSongs(dataSong.songs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    
    

    return (
        <div className='w-100'>
            {songs ? (
                <SongList songs={songs} title={'All Favourite Song'}/>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}



export default Favourites;
