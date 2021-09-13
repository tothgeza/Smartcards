import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3" aria-label="Third navbar example">
            <div className="container">
                <a className="navbar-brand" href="#">SmartCards</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample03">
                    <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
                        <Link className="nav-link" to="/account">
                            My Classes
                        </Link>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Search Flashcards</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link me-4" href="#">Make Flashcards</a>
                        </li>
                        <Link className="nav-link " to="/signin">
                            Login
                        </Link>
                        <Link className="nav-link " to="/signup">
                            Get Started
                        </Link>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
