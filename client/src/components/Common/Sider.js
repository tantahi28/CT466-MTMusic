import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'supertokens-auth-react/recipe/session';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

import {Button} from '../../components/Common/Button'
export default function Sider() {
    const navigate = useNavigate();
    const { loading, doesSessionExist } = useSessionContext();

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    return (
        <div className='h-100 d-flex justify-content-around flex-column'>
            <div className="nav flex-column">
                <div className="logo pt-2">
                    <Link to="/" className="d-flex align-items-center text-decoration-none flex-column flex-wrap text-center">
                        <img className="logo__img d-block w-50" src="http://localhost:3001/uploads/logo/logo.png" alt=""/>
                        <p className="p-3 logo__name">MTMusic</p>
                    </Link>
                </div>
                <ul className="nav__list list-unstyled">
                    <li className="nav__list-item">
                        <Link to="/" className="nav__list-item-link text-decoration-none px-4 py-3 d-block">
                            Home
                        </Link>
                    </li>
                    <li className="nav__list-item">
                        <Link to="/album" className="nav__list-item-link text-decoration-none px-4 py-3 d-block">
                            Album
                        </Link>
                    </li>
                    <li className="nav__list-item">
                        <Link to="/playlist" className="nav__list-item-link text-decoration-none px-4 py-3 d-block">
                            Playlist
                        </Link>
                    </li>
                    <li className="nav__list-item">
                        <Link to="/favourite" className="nav__list-item-link text-decoration-none px-4 py-3 d-block">
                            Favourite
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="logout d-flex justify-content-center">
                {!loading && doesSessionExist ? (
                        <Button onClick={logoutClicked}>Logout</Button>
                ) : (
                    <Link to="/auth" className="text-decoration-none px-4 py-3 d-block">
                        <Button>Login</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
