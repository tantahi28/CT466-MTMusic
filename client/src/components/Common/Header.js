import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <header className="position-sticky top-0 ">
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    {/* <a className="navbar-brand" href="/">
                        <img src="/img/logo.png" style={{ height: "auto", width: "100px" }} className="img-fluid rounded mr-2" alt="..." />
                    </a> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form action="/search" method="GET" className="mx-2 form-inline">
                            <input className="form-control" placeholder="Search for..." type="text" name="q" required />
                        </form>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Genres</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" >
                                    Popular
                                </a>
                            </li>
                        </ul>

                        <a className="my-2 my-lg-0" href="/">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
