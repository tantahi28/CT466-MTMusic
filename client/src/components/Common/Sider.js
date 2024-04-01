import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/session";

export default function Sider() {
    const navigate = useNavigate();

    async function logoutClicked() {
        await signOut();
        console.log("hello")
        navigate("/auth");
    }
    return (
        <div className='h-100 d-flex justify-content-around flex-column'>
            <div className="nav flex-column">
                <div className="logo pt-2">
                    <Link to="/" className="d-flex align-items-center text-decoration-none flex-column flex-wrap text-center">
                        <img className="logo__img d-block w-50" src="http://localhost:3001/uploads/1711875074919.png" alt=""/>
                        <p className="p-3 logo__name">MTMusic</p>
                    </Link>
                </div>
                <ul className="nav__list list-unstyled">
                    <li className="nav__list-item">
                        <Link to="/" className="nav__list-item-link text-decoration-none px-4 py-3 d-block">
                            <i className="fa fa-home mr-3" aria-hidden="true"></i>
                            Home
                        </Link>
                    </li>
                    <li className="nav__list-item">
                        <Link to="/album" className="nav__list-item-link text-decoration-none px-4 py-3 d-block">
                            <i className="fa fa-folder-open mr-3" aria-hidden="true"></i>
                            Album
                        </Link>
                    </li>
                    <li className="nav__list-item">
                        <Link to="/playlist" className="nav__list-item-link text-decoration-none px-4 py-3 d-block">
                            <i className="fa fa-play-circle mr-3" aria-hidden="true"></i>
                            Playlist
                        </Link>
                    </li>
                    <li className="nav__list-item">
                        <Link to="/favourite" className="nav__list-item-link text-decoration-none px-4 py-3 d-block">
                            <i className="fa fa-heart mr-3" aria-hidden="true"></i>
                            Favourite
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="logout">
                <a className='text-decoration-none px-4 py-3 d-block' role={"button"} onClick={logoutClicked }>
                    Logout
                </a>
            </div>
        </div>
    );
}
