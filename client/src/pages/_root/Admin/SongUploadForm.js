import React, { useState, useEffect } from 'react';
import SongService from '../../../services/SongService';
import GenreService from '../../../services/GenreService'; 
import Notification from '../../../components/Common/Notification';

import { Link } from 'react-router-dom';


function SongUploadForm() {
    const [title, setTitle] = useState('');
    const [urlImg, setUrlImg] = useState(null);
    const [urlSong, setUrlSong] = useState(null);
    const [artist, setArtist] = useState('');
    const [genreId, setGenreId] = useState(1);
    const [genres, setGenres] = useState([]);
    const [notification, setNotification] = useState({ message: '', severity: '' });

    useEffect(() => {
        async function fetchGenres() {
            try {
                const data = await GenreService.getAll();
                console.log(data.genres)
                setGenres(data.genres || []); // Assuming the response has a 'genres' key with an array of genres
            } catch (error) {
                console.error('Lỗi khi tải thể loại nhạc:', error);
            }
        }

        fetchGenres();
    }, []);

    const handleImageChange = (event) => {
        setUrlImg(event.target.files[0]);
    };

    const handleSongChange = (event) => {
        setUrlSong(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('urlImg', urlImg);
        formData.append('urlSong', urlSong);
        formData.append('artist', artist);
        formData.append('genreId', genreId);

        try {
            await SongService.create(formData);
            setNotification({ message: 'Bài hát đã được tạo mới thành công!', severity: 'success' });
        } catch (error) {
            setNotification({ message: `Lỗi khi tạo mới bài hát: ${error.message}`, severity: 'error' });
        }
    };

    return (
        <div className="mt-4">
            <div className='d-flex justify-content-between'>
                <h3>Đăng bài hát</h3>
                <Link to="/admin">
                    Danh sách bài hát
                </Link>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Notification message={notification.message} severity={notification.severity} />
                <div className="form-group">
                    <label htmlFor="title">Tên bài hát</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        name="title" 
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="urlImg">Đường dẫn hình ảnh bài hát</label>
                    <input 
                        type="file" 
                        accept="image/png, image/gif, image/jpeg" 
                        className="form-control" 
                        id="urlImg" 
                        name="urlImg"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="urlSong">Đường dẫn bài hát</label>
                    <input 
                        type="file" 
                        accept=".mp3,audio/*" 
                        className="form-control" 
                        id="urlSong" 
                        name="urlSong"
                        onChange={handleSongChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="artist">Tên ca sĩ</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="artist" 
                        name="artist" 
                        required
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Thể loại nhạc</label>
                    {genres.map((genre) => (
                        <div className="form-check" key={genre.id}>
                        <input 
                            type="radio" 
                            className="form-check-input" 
                            id={`genre-${genre.genre_id}`} 
                            name="genre" 
                            value={genre.genre_id} 
                            required 
                            onChange={(e) => setGenreId(e.target.value)} 
                        />
                            <label className="form-check-label" htmlFor={`genre-${genre.genre_id}`}>{genre.name}</label>
                        </div>
                    ))} 
                </div>
                <button type="submit" className="btn btn-primary">Thêm bài hát</button>
            </form>
        </div>
    );
}

export default SongUploadForm;
