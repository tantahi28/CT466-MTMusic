import { Link } from 'react-router-dom';


export default function Sider() {
    return (
        <div className="d-flex flex-column">
            <div className="logo pt-2">
                <Link to="/" className="d-flex align-items-center flex-column flex-wrap text-center">
                    <img className="logo__img d-block w-50" src="http://localhost:3001/uploads/1711723117972.png" alt=""/>
                    <p className="p-3 logo__name">MTMusic</p>
                </Link>
            </div>
            <div className="nav">
                <ul className="nav__list list-unstyled">
                    <li className="nav__list-item">
                        <Link to="/" className="nav__list-item-link p-3 d-block">
                            <i className="fa fa-home mr-3" aria-hidden="true"></i>
                            Home
                        </Link>
                    </li>
                    <li className="nav__list-item">
                        <Link to="/me/stored/songs" className="nav__list-item-link p-3 d-block">
                            <i className="fa fa-folder-open mr-3" aria-hidden="true"></i>
                            Album
                        </Link>
                    </li>
                    <li className="nav__list-item">
                        <Link to="/songs/create" className="nav__list-item-link p-3 d-block">
                            <i className="fa fa-play-circle mr-3" aria-hidden="true"></i>
                            Playlist
                        </Link>
                    </li>
                    <li className="nav__list-item">
                        <Link to="/favourite" className="nav__list-item-link p-3 d-block">
                            <i className="fa fa-heart mr-3" aria-hidden="true"></i>
                            Favourite
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
