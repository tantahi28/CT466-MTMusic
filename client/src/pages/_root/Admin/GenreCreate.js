import React, { useState } from 'react';
import GenreService from '../../../services/GenreService';
import Notification from '../../../components/Common/Notification';
import { Link } from 'react-router-dom';

function GenreCreate() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [notification, setNotification] = useState({ message: '', severity: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await GenreService.create({ name, description });
            setNotification({ message: 'Thể loại nhạc đã được thêm mới thành công!', severity: 'success' });
            setName('');
            setDescription('');
        } catch (error) {
            setNotification({ message: `Lỗi khi thêm mới thể loại nhạc: ${error.message}`, severity: 'error' });
        }
    };

    return (
        <div className="mt-4">
            <div className='d-flex justify-content-between'>
                <h3>Thêm mới thể loại nhạc</h3>
                <Link to="/admin">
                    Danh sách thể loại nhạc
                </Link>
            </div>
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Mô tả</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Thêm thể loại</button>
            </form>
        </div>
    );
}

export default GenreCreate;
