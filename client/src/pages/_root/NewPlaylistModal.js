// NewPlaylistModal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/Common/Button';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 999; 
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px; 
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); 
`;

const Modal = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
`;

const NewPlaylistModal = ({ show, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      await handleSubmit({ title, description }); // Gọi handleSubmit được truyền từ prop với dữ liệu của form
      handleClose();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <Modal show={show}>
      <ModalWrapper>
        <ModalContent>
          <div className="modal-header">
            <h5 className="modal-title">Create New Playlist</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Title:</label>
                <input type="text" className="form-control" value={title} onChange={handleTitleChange} required />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea className="form-control" value={description} onChange={handleDescriptionChange}></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <Button type="submit" className="btn btn-primary">Create Playlist</Button>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            </div>
          </form>
        </ModalContent>
      </ModalWrapper>
    </Modal>
  );
};

export default NewPlaylistModal;
