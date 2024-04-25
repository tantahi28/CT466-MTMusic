import React, { useState, useEffect } from 'react';
import SongService from '../../../services/SongService';
import Modal from '../../../components/Common/Modal';
import { Button } from '../../../components/Common/Button';
import { Link } from 'react-router-dom';

const MySongs = () => {
    const [songIdToDelete, setSongIdToDelete] = useState(null);
    const [songs, setSongs] = useState([]);
    const [songToDelete, setSongToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false); // Trạng thái để hiển thị modal

    useEffect(() => {
        fetchData();
    }, [songIdToDelete]); 

    const fetchData = async () => {
        try {
            const dataSong = await SongService.getAll();
            setSongs(dataSong.songs);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDeleteSong = async (id) => {
        const songToDelete = songs.find(song => song.song_id === id);
        setSongToDelete(songToDelete);
        setSongIdToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        console.log("Xác nhận xóa bài hát với ID: ", songIdToDelete);
        try {
            await SongService.delete(songIdToDelete); // Xóa bài hát
            setShowModal(false); // Ẩn modal
            await fetchData(); // Cập nhật danh sách bài hát
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    return (
        <div className="mt-4">
            <div className='d-flex justify-content-between'>
                <h3>Tất cả bài hát</h3>
                <Link to="/admin/song/create">
                    <Button>Thêm mới</Button>
                </Link>
            </div>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Artist</th>
                        <th scope="col">Action</th>
                        <th scope="col" colSpan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    {songs.length > 0 ? (
                        songs.map((song, index) => (
                            <tr key={song._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>
                                    <>
                                        <Link to={`/admin/song/${song.song_id}`} className="btn btn-link">Sửa</Link>
                                        <button
                                            className="btn btn-link"
                                            onClick={() => handleDeleteSong(song.song_id)}
                                        >
                                            Xóa
                                        </button>
                                    </>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                Bạn chưa đăng bài hát nào. <Link to="/admin/song/create">Thêm bài hát mới!</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Confirm delete song modal */}
            <Modal title="Xóa bài hát" show={showModal} handleClose={() => setShowModal(false)}>
                <p>
                    Bạn chắc chắn muốn xóa bài hát "{songToDelete ? songToDelete.title : ''}" của ca sĩ "{songToDelete ? songToDelete.artist : ''}" này không?
                </p>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmDelete}
                >
                    Xóa bỏ
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Hủy
                </button>
            </Modal>
        </div>
    );
};

export default MySongs;
