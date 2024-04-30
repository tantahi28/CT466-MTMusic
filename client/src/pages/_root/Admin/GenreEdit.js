import React, { useState, useEffect } from 'react';
import GenreService from '../../../services/GenreService';
import Notification from '../../../components/Common/Notification';
import { useParams } from 'react-router-dom';

function GenreEdit() {
    const { id } = useParams(); // Lấy id của thể loại từ URL

    const [genreData, setGenreData] = useState({
        name: '',
        description: ''
    });

    const [notification, setNotification] = useState({ message: '', severity: '' });

    useEffect(() => {
        async function fetchGenre() {
            try {
                const genre = await GenreService.get(id);
                console.log(genre)
                setGenreData({
                    name: genre.name,
                    description: genre.description
                });
            } catch (error) {
                console.error('Lỗi khi tải thông tin thể loại:', error);
            }
        }

        fetchGenre();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setGenreData({
            ...genreData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await GenreService.update(id, genreData);
            setNotification({ message: 'Thông tin thể loại đã được cập nhật thành công!', severity: 'success' });
        } catch (error) {
            setNotification({ message: `Lỗi khi cập nhật thông tin thể loại: ${error.message}`, severity: 'error' });
        }
    };

    return (
        <div className="mt-4">
            <h3>Sửa thông tin thể loại</h3>
            <form onSubmit={handleSubmit}>
                <Notification message={notification.message} severity={notification.severity} />
                <div className="form-group">
                    <label htmlFor="name">Tên thể loại</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        required
                        value={genreData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Mô tả</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        name="description" 
                        value={genreData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật thể loại</button>
            </form>
        </div>
    );
}

export default GenreEdit;
