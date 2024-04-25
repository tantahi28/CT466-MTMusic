import React, { useState, useEffect } from 'react';
import SongService from '../../../services/SongService';
import GenreService from '../../../services/GenreService'; 
import Notification from '../../../components/Common/Notification';
import { useParams } from 'react-router-dom';

function SongEdit() {
    const { id } = useParams(); // Lấy id của bài hát từ URL

    const [songData, setSongData] = useState({
        title: '',
        urlImg: null,
        urlSong: null,
        artist: '',
        genreId: 1,
        isVip: false // Thêm trường isVip và khởi tạo giá trị là false
    });

    const [genres, setGenres] = useState([]);
    const [notification, setNotification] = useState({ message: '', severity: '' });

    useEffect(() => {
        async function fetchGenres() {
            try {
                const data = await GenreService.getAll();
                setGenres(data.genres || []);
            } catch (error) {
                console.error('Lỗi khi tải thể loại nhạc:', error);
            }
        }

        fetchGenres();

        async function fetchSong() {
            try {
                const song = await SongService.get(id);
                setSongData({
                    title: song.song.title,
                    urlImg: 'http://localhost:3001' +  song.song.image_path,
                    urlSong: 'http://localhost:3001' +  song.song.audio_path,
                    artist: song.song.artist,
                    genreId: song.song.genre_id,
                    isVip: song.song.is_vip // Cập nhật giá trị của isVip từ dữ liệu fetch
                });
            } catch (error) {
                console.error('Lỗi khi tải thông tin bài hát:', error);
            }
        }

        fetchSong();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSongData({
            ...songData,
            [name]: value
        });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSongData({
            ...songData,
            [name]: checked
        });
    };

    const handleImageChange = (event) => {
        setSongData({
            ...songData,
            urlImg: event.target.files[0]
        });
    };

    const handleSongChange = (event) => {
        setSongData({
            ...songData,
            urlSong: event.target.files[0]
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', songData.title);
        formData.append('urlImg', songData.urlImg);
        formData.append('urlSong', songData.urlSong);
        formData.append('artist', songData.artist);
        formData.append('genreId', songData.genreId);
        formData.append('isVip', songData.isVip); // Thêm giá trị của isVip vào formData

        try {
            await SongService.update(id, formData);
            setNotification({ message: 'Thông tin bài hát đã được cập nhật thành công!', severity: 'success' });
        } catch (error) {
            setNotification({ message: `Lỗi khi cập nhật thông tin bài hát: ${error.message}`, severity: 'error' });
        }
    };

    return (
        <div className="mt-4">
            <h3>Sửa thông tin bài hát</h3>
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
                        value={songData.title}
                        onChange={handleInputChange}
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
                    <img 
                        src={songData.urlImg} 
                        alt={songData.title} 
                        style={{ 
                            maxWidth: '200px', 
                            margin: '5px 0 5px 0', 
                            display: 'block' 
                        }} 
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
                    <audio 
                        controls 
                        src={songData.urlSong} 
                        style={{
                            marginTop: '10px'
                        }}
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
                        value={songData.artist}
                        onChange={handleInputChange}
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
                                name="genreId" 
                                value={genre.genre_id} 
                                required 
                                checked={parseInt(songData.genreId) === parseInt(genre.genre_id)}
                                onChange={handleInputChange} 
                            />
                            <label className="form-check-label" htmlFor={`genre-${genre.genre_id}`}>{genre.name}</label>
                        </div>
                    ))} 
                </div>
                <div className="form-group">
                    <label htmlFor="isVip">Bài hát VIP</label>
                    <input 
                        type="checkbox" 
                        className="form-check" 
                        id="isVip" 
                        name="isVip" 
                        checked={songData.isVip} // Thiết lập trạng thái checked dựa trên giá trị của isVip
                        onChange={handleCheckboxChange} // Xử lý sự kiện khi ô input check thay đổi
                    />
                </div>
                <button type="submit" className="btn btn-primary">Cập nhật bài hát</button>
            </form>
        </div>
    );
}

export default SongEdit;
