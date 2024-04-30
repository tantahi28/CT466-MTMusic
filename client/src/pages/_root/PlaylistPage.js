import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link
import PlaylistService from '../../services/PlaylistService'; 
import NewPlaylistModal from './NewPlaylistModal'; 
import { Button } from '../../components/Common/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Styled Components
const PlaylistContainer = styled.div`
  height: 100%;
`;

const PlaylistCard = styled.div`
  border: none;
  height: 100%;
`;

const MusicItem = styled(Link)` // Use Link instead of div
  margin-bottom: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--player-bg);
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none; // Remove default link underline
  color: inherit; // Inherit parent color
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  font-size: 1.5rem;
  cursor: pointer;
`;

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPlaylists(); 
  }, []); 

  const fetchPlaylists = async () => {
    try {
      const allPlaylists = await PlaylistService.getAll();
      setPlaylists(allPlaylists);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const handleDeleteButtonClick = async (playlistId) => {
    try {
      await PlaylistService.delete(playlistId);
      fetchPlaylists(); 
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (playlistData) => {
    try {
      const newPlaylist = await PlaylistService.create(playlistData);
      fetchPlaylists(); 
    } catch (error) {
      console.error('Error creating playlist:', error);
    }

    closeModal(); 
  };

  return (
    <PlaylistContainer className="container">
      <NewPlaylistModal show={showModal} handleClose={closeModal} handleSubmit={handleSubmit} />
      <div className="row cant d-flex justify-content-center align-items-center">
        <div className="col-12">
          <PlaylistCard className="p-3 card">
            {playlists.map(playlist => (
              <MusicItem key={playlist.id} to={`/playlist/${playlist.playlist_id}`}>
                <div className="d-flex flex-row align-items-center">
                  <small className="ml-2">{playlist.title}</small>
                </div>
                <Button className='mx-3 float-end' onClick={() => handleDeleteButtonClick(playlist.playlist_id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </MusicItem>
            ))}
            <Button className="py-4" onClick={openModal}>
              Create new playlist
            </Button>
          </PlaylistCard>
        </div>
      </div>
    </PlaylistContainer>
  );
};

export default PlaylistPage;
