    import React, { useState, useRef, useEffect } from 'react';
    import styled from 'styled-components';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faPlay, faPause, faStepBackward, faStepForward, faRandom, faRedo, faCircleArrowDown, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
    import TimeSlider from "react-input-slider";
    import { useSongs } from '../../provider/SongProvider';
    import SongService from '../../services/SongService';


    const PlayerWrapper = styled.div`
    display: flex;
    background-color: var(--player-bg);
    justify-content: center;
    border-radius: 1.5rem;
    `;

    const Dashboard = styled.div`
    min-width: 225px;
    max-width: 280px;
    background-color: #f8f9fd;
    border-radius: 1.5rem;
    `;

    const MusicName = styled.h4`
    font-size: 1.4rem;
    `;

    const Artist = styled.h6`
    font-size: 1.2rem;
    `;

    const CdThumb = styled.div`
    position: relative;
    padding-top: 100%;
    padding-right: 100%;
    background-size: cover;
    `;

    const ControlBtn = styled.div`
    border-radius: 2rem;
    .btn {
        font-size: 2.4rem;
        border-radius: 50%;
        transition: all 0.5s;
    }
    `;

    const parseTimeStringToSeconds = (timeString) => {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return minutes * 60 + seconds;
    };

    const StyledPlayer = () => {
        const audioRef = useRef();
        const [isPlaying, setIsPlaying] = useState(false);
        const [isRepeat, setIsRepeat] = useState(false);
        const [isRandom, setIsRandom] = useState(false);
        const [currentTime, setCurrentTime] = useState(0);
        const [duration, setDuration] = useState(0);
        const [volume, setVolume] = useState(0);
        const { songs, currentSongIndex, setCurrentSongIndex } = useSongs();
        const [showVolumeSlider, setShowVolumeSlider] = useState(false);



        const handleLoadedData = () => {
            setDuration(audioRef.current.duration);
            if (isPlaying) audioRef.current.play();
        };

        const handleTogglePlay = () => {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        setIsPlaying(!isPlaying);
        };

        const handleTimeSliderChange = ({ x }) => {
            audioRef.current.currentTime = x;
            setCurrentTime(x);
            
            if (!isPlaying) {
            setIsPlaying(true);
            audioRef.current.play();
            }
        };

        const playPrevSong = () => {
        setCurrentSongIndex((prevIndex) => {
            if (prevIndex === 0) {
            return songs.length - 1;
            } else {
            return prevIndex - 1;
            }
        });
        };

        const playNextSong = () => {
        setCurrentSongIndex((prevIndex) => {
            if (prevIndex === songs.length - 1) {
                audioRef.current.play();
            return 0;
            } else {
            return prevIndex + 1;
            }
        });
        };

        const handleAudioEnd = () => {
            if (isRandom) {
                const randomIndex = Math.floor(Math.random() * songs.length);
                setCurrentSongIndex(randomIndex);
                audioRef.current.currentTime = 0; 
                // audioRef.current.play();
            } else if (isRepeat) {
                audioRef.current.currentTime = 0; 
                audioRef.current.play();
            } else {
                playNextSong(); 
            }
        };

        const handleDownload = async () => {
            if (songs.length > 0) {
                try {
                    const response = await fetch(`http://localhost:3001${songs[currentSongIndex].audio_path}`);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', songs[currentSongIndex].title + '.mp3');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } catch (error) {
                    console.error('Error downloading the file:', error);
                }
            }
        };


        const handleVolumeChange = ({ y }) => {
            const newVolume = y; 
            setVolume(newVolume);
            audioRef.current.volume = (100 - newVolume) / 100; 
        };
        
        


    
        return (
        <PlayerWrapper className="player w-100 mt-3 px-4 py-4 d-flex justify-content-center">
            <Dashboard className="dashboard w-75 p-1 d-flex align-items-center flex-column">
            <div className="music-header text-center">
                {songs.length > 0 ? (
                <>
                    <MusicName className="music-name pt-3 font-weight-bold d-block">{songs[currentSongIndex].title}</MusicName>
                    <Artist className="artist d-block">{songs[currentSongIndex].artist}</Artist>
                </>
                ) : (
                <MusicName className="music-name pt-3 font-weight-bold d-block">Bạn chưa chọn bản nhạc nào</MusicName>
                )}
            </div>
            <div className="cd w-75 justify-items-center">
                <CdThumb
                    id="#cd__thumb"
                    className="cd__thumb my-3 rounded-circle"
                    style={{backgroundImage: `url(http://localhost:3001${songs.length > 0 ? songs[currentSongIndex].image_path : '/uploads/logo/logo.png'})`}}
                ></CdThumb>
            </div>
            <div className="control d-flex flex-column align-content-center px-3e">
            <div className=" d-flex justify-content-between mx-3">
                <div onClick={handleDownload} className='btn'>
                    <div className='h4 m-0'><FontAwesomeIcon icon={faCircleArrowDown} /></div>
                </div>
                <div className='btn position-relative ' onClick={() => {setShowVolumeSlider(!showVolumeSlider);}}>
                    <div className='h4 m-0'><FontAwesomeIcon icon={faVolumeHigh} /></div>
                    {showVolumeSlider && (
                        <TimeSlider
                            className="position-absolute bottom-100"
                            axis="y"
                            ymax={100} 
                            y={volume} 
                            onChange={handleVolumeChange} 
                            styles={{
                                track: {
                                    width: "4px",
                                    backgroundColor: "var(--primary-color)",
                                    height: "50px", 
                                },
                                active: {
                                    backgroundColor: "#e3e3e3",
                                    width: "4px",
                                },
                                thumb: {
                                    marginLeft: "-3px",
                                    width: "8px",
                                    height: "8px",
                                    backgroundColor: "#333",
                                    borderRadius: 0,
                                },
                            }}
                        />
                    )}

                </div>
            </div>
                <audio id="myAudio">
                <source src="" type="audio/mpeg" />
                </audio>
                <div className='mx-4'>
                    {songs.length > 0 && (
                        <TimeSlider
                            axis="x"
                            xmax={parseTimeStringToSeconds((songs.length > 0 ? songs[currentSongIndex].duration : '0:0'))}
                            x={currentTime}
                            onChange={handleTimeSliderChange}
                            styles={{
                            track: {
                                width: "100%",
                                backgroundColor: "#e3e3e3",
                                height: "4px",
                            },
                            active: {
                                backgroundColor: "var(--primary-color)",
                                height: "4px",
                            },
                            thumb: {
                                marginTop: "-3px",
                                width: "8px",
                                height: "8px",
                                backgroundColor: "#333",
                                borderRadius: 0,
                            },
                        }}
                        />
                    )}
                </div>
                <audio
                    ref={audioRef}
                    src={'http://localhost:3001' + (songs.length > 0 ? songs[currentSongIndex].audio_path : '')}
                    onLoadedData={handleLoadedData}
                    onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                    onEnded={() => handleAudioEnd()}
                />
                {/* ========== BUTTON CONTROL ========== */}
                <ControlBtn className="ctrl__btn  d-flex justify-content-center flex-nowrap">
                {/* ========== BUTTON REPEAT ========== */}
                <div className={`btn ctrl__btn--repeat ${isRepeat ? 'active' : ''}`} onClick={() => {setIsRepeat(!isRepeat)}}>
                    <FontAwesomeIcon icon={faRedo} />
                </div>
                {/* ========== BUTTON PREV ========== */}
                <div onClick={playPrevSong} className="btn ctrl__btn--prev">
                    <FontAwesomeIcon icon={faStepBackward} />
                </div>
                {/* ========== BUTTON PLAY / PAUSE ========== */}
                <div className={`btn ctrl__btn--toggle--play ${isPlaying ? 'playing' : 'paused'}`} onClick={handleTogglePlay}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </div>
                {/* ========== BUTTON NEXT ========== */}
                <div onClick={playNextSong} className="btn ctrl__btn--next">
                    <FontAwesomeIcon icon={faStepForward} />
                </div>
                {/* ========== BUTTON RANDOM ========== */}
                <div className={`btn ctrl__btn--random ${isRandom ? 'active' : ''}`} onClick={() => {setIsRandom(!isRandom)}}>
                    <FontAwesomeIcon icon={faRandom} />
                </div>
                </ControlBtn>
            </div>
            </Dashboard>
        </PlayerWrapper>
        );
    }
    

    export default StyledPlayer;
