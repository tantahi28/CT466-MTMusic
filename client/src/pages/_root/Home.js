import React, { useState, useEffect } from 'react';
import SongList from '../../components/UI/SongList';
import SongService from '../../services/SongService';
import GenreService from '../../services/GenreService';
import styled from "styled-components";

const Home = () => {
    const [songs, setSongs] = useState([]);
    const [genres, setGenres] = useState([]);
    const [activeGenre, setActiveGenre] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataSong = await SongService.getAll();
                setSongs(dataSong.songs);

                const dataGenres = await GenreService.getAll();
                setGenres(dataGenres.genres)
                // console.log(dataGenres)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    
    // Xác định danh sách bài hát dựa trên thể loại được chọn
    const filteredSongs = activeGenre ?  songs.filter(song => song.genre_id === activeGenre) : [];
    const genreTitle = activeGenre ? genres.find(genre => genre.genre_id === activeGenre)?.name : '';
    

    return (
        <div className='w-100'>
            {genres && songs ? (
                <>
                    <TabGroup genres={genres} setActiveGenre={setActiveGenre} />
                    <SongList songs={filteredSongs} title={genreTitle}/>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
// Tab styled component
const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;

function TabGroup({ genres, setActiveGenre }) {
    const [active, setActive] = useState(null); 

    // Xử lý khi bấm vào tab
    const handleTabClick = (genreId) => {
        setActive(genreId); 
        setActiveGenre(genreId); 
    };

    useEffect(() => {
        // Nếu active chưa được thiết lập, và genres không rỗng, gán active là genre 1
        if (active === null && genres.length > 0) {
            setActive(genres[0].genre_id);
            setActiveGenre(genres[0].genre_id);
        }
    }, [active, genres, setActiveGenre]);

    return (
        <div>
            {genres.map(genre => (
                <Tab
                    key={genre.genre_id}
                    onClick={() => handleTabClick(genre.genre_id)} 
                    active={active === genre.genre_id} 
                >
                    {genre.name}
                </Tab>
            ))}
        </div>
    );
}


export default Home;
