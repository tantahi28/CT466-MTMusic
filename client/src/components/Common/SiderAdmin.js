import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'supertokens-auth-react/recipe/session';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import styled from 'styled-components';

import { Button } from '../../components/Common/Button';

export default function SiderAdmin() {

    const navigate = useNavigate();
    const { loading, doesSessionExist } = useSessionContext();

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    return (
        <SiderContainer>
            <div className='sider h-100 d-flex justify-content-around flex-column'>
                <div className="nav flex-column">
                    <div className="logo pt-2">
                        <Link to="/" className="d-flex align-items-center text-decoration-none flex-column flex-wrap text-center">
                            <img className="logo__img d-block w-50" src="http://localhost:3001/uploads/logo/logo.png" alt=""/>
                            <p className="p-3 logo__name">MTMusic</p>
                        </Link>
                    </div>
                    <ul className="nav__list list-unstyled">
                        <li className="nav__list-item">
                            <Link to="/admin" className="nav__list-item-link text-decoration-none px-4 py-3 d-block">
                                Quản lý bài hát
                            </Link>
                        </li>
                        <li className="nav__list-item">
                            <Link to="/admin/genre" className="nav__list-item-link text-decoration-none px-4 py-3 d-block">
                                Quản lý thể loại
                            </Link>
                        </li>
                        <li className="nav__list-item">
                            <Link to="http://localhost:3001/auth/dashboard/" className="nav__list-item-link text-decoration-none px-4 py-3 d-block">
                                Quản lý người dùng
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
        </SiderContainer>
    );
}

const SiderContainer = styled.div`

.nav {
  height: 75vh; 
}

.nav__list {
  width: 100%;
  list-style: none; }

.nav__bottom {
  width: 100%;
  list-style: none; }

.nav__bottom-item-login {
  text-align: center;
  background-color: var(--primary-color); }
  .nav__bottom-item-login :hover {
    color: #fff !important;
    background-color: var(--text-item-hover) !important; }
  .nav__bottom-item-login a {
    color: #fff !important; }

.nav__list-item-link {
  font-size: 1.4rem;
  color: var(--text-content); }
  .nav__list-item-link:hover {
    color: var(--text-item-hover) !important;
    font-size: 1.6rem;
    list-style: none;
    background-color: rgba(255, 255, 255, 0.5); }

.nav__bottom-item-link {
  font-size: 1.4rem;
  color: var(--text-content); }
  .nav__bottom-item-link:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: var(--text-item-hover);
    font-size: 1.6rem;
    list-style: none; }

.nav__list-item-link.active {
  font-size: 1.6rem;
  color: var(--active) !important; }

.nav__bottom-item-link.active {
  font-size: 1.6rem;
  color: var(--active) !important; }

.site-left {
  background-color: var(--sidebar-bg); }

    .logout {
        margin-top: auto;
        margin-bottom: 1rem;
    }
`;
