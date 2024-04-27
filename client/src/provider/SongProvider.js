import React, { createContext, useState, useContext } from 'react';

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

//   setCurrentSongIndex(1);
  const addSong = (song) => {
    setSongs([...songs, song]);
  };

  const removeSong = (songId) => {
    setSongs(songs.filter(song => song.id !== songId));
  };

  const addAllSongs = (newSongs) => {
    setSongs([...newSongs]);
  };

  const removeAllSongs = () => {
    setSongs([]);
  };

  return (
    <SongContext.Provider value={{ songs, currentSongIndex, addSong, removeSong, addAllSongs, removeAllSongs, setCurrentSongIndex }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongs = () => useContext(SongContext);
