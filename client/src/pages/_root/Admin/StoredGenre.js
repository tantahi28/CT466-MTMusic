import React, { useState, useEffect } from 'react';
import GenreService from '../../../services/GenreService';
import Modal from '../../../components/Common/Modal';
import { Button } from '../../../components/Common/Button';
import { Link } from 'react-router-dom';

const MyGenres = () => {
    const [genreIdToDelete, setGenreIdToDelete] = useState(null);
    const [genres, setGenres] = useState([]);
    const [genreToDelete, setGenreToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false); // Trạng thái để hiển thị modal

    useEffect(() => {
        fetchData();
    }, [genreIdToDelete]); 

    const fetchData = async () => {
        try {
            const dataGenre = await GenreService.getAll();
            setGenres(dataGenre.genres);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDeleteGenre = async (id) => {
        const genreToDelete = genres.find(genre => genre.genre_id === id);
        setGenreToDelete(genreToDelete);
        setGenreIdToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        console.log("Xác nhận xóa thể loại với ID: ", genreIdToDelete);
        try {
            await GenreService.delete(genreIdToDelete); // Xóa thể loại
            setShowModal(false); // Ẩn modal
            await fetchData(); // Cập nhật danh sách thể loại
        } catch (error) {
            console.error('Error deleting genre:', error);
        }
    };

    return (
        <div className="mt-4">
            <div className='d-flex justify-content-between'>
                <h3>Tất cả thể loại</h3>
                <Link to="/admin/genre/create">
                    <Button>Thêm mới</Button>
                </Link>
            </div>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên thể loại</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.length > 0 ? (
                        genres.map((genre, index) => (
                            <tr key={genre._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{genre.name}</td>
                                <td>
                                    <>
                                        <Link to={`/admin/genre/${genre.genre_id}`} className="btn btn-link">Sửa</Link>
                                        <button
                                            className="btn btn-link"
                                            onClick={() => handleDeleteGenre(genre.genre_id)}
                                        >
                                            Xóa
                                        </button>
                                    </>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                Không có thể loại nào. <Link to="/admin/genre/create">Thêm thể loại mới!</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Confirm delete genre modal */}
            <Modal title="Xóa thể loại" show={showModal} handleClose={() => setShowModal(false)}>
                <p>
                    Bạn chắc chắn muốn xóa thể loại "{genreToDelete ? genreToDelete.name : ''}" này không?
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

export default MyGenres;
