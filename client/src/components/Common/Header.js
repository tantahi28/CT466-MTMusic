import { React, useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import UserService from '../../services/UserService';
import { Button } from '../../components/Common/Button';

const Header = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { loading, doesSessionExist } = useSessionContext();
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchQuery = formData.get('q');
        console.log('Search query:', searchQuery);
        navigate(`/search?q=${searchQuery}`);
    };

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const userData = await UserService.getUserInfo();
                setUserInfo(userData);
                console.log(userData.userInfo.metadata.first_name);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        }

        fetchUserInfo();
    }, []);

    return (
        <HeaderContainer className="header py-3 row m-0 position-relative">
            <div className="header__tool col-8 px-4 d-flex flex-nowrap align-items-center">
                <form onSubmit={handleSearch} className="w-100 rounded-pill header__search--form">
                    <div className="input-group">
                        <input
                            className="form-control rounded-pill header__tool--search px-3 py-3"
                            type="search"
                            name="q"
                            id="search"
                            placeholder="Search, Songs, Album, Artists..."
                            required
                        />
                        <div className="header__search--submit">
                            <button type="submit" id="search-submit" className="btn bg-light">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </form>
                <div className="header__tool-noti pl-3">
                    <button className="btn btn-outline-secondary bg-transparent border-0" href="">
                        <FontAwesomeIcon icon={faBell} />
                    </button>
                </div>
            </div>
            <div className="header__info col-4 d-flex justify-content-evenly align-items-center">
                {!loading && doesSessionExist && userInfo ? (
                    <h4 className="header__info-username pr-3 font-weight-bolder">
                        <span className="m-2">
                            {userInfo.userInfo.metadata.first_name} {userInfo.userInfo.metadata.last_name}
                        </span>
                        <img
                            src="http://localhost:3001/uploads/logo/logo.png"
                            alt="User avt img"
                            className="header__info-userimg img-fluid rounded-circle ml-2"
                        />
                    </h4>
                ) : (
                    <Link to="http://localhost:3000/auth/" className="">
                        <Button>Login Now</Button>
                    </Link>
                )}
            </div>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    background-color: var(--layout-header-bg);
    color: #fff;

    .header__tool-noti button {
        font-size: 2rem;
        color: var(--text-item-hover);
    }

    .header__tool--search {
        border: 1px solid var(--grey-color);
        border-radius: 2.5rem;
        outline: none;
    }

    .header__search--form {
        position: relative;
    }

    .header__search--submit {
        position: absolute;
        top: 20%;
        right: 4%;
        border: none;
        background-color: none;
    }

    .header__search--submit i {
        font-size: 2rem;
    }

    .header__search--submit:hover {
        cursor: pointer;
    }

    .header__info {
        color: #000000 !important;
    }

    /* .header__info :hover {
        cursor: pointer;
        background: var(--text-item-hover);
    } */

    .header__info-box {
        margin-right: 10px;
        justify-items: center;
        background: var(--primary-color);
        padding: 5px;
        border-radius: 10px;
    }

    .header__info-username {
        margin: 0;
        color: var(--primary-color);
    }

    .header__info-userimg {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;

export default Header;
