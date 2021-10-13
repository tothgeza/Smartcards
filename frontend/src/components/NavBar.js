import React, { useState, useEffect } from 'react';
import {IoPersonCircleSharp} from 'react-icons/io5';
import { useHistory, Link } from "react-router-dom";

import AuthService from "../services/auth.service";
import LoginModal from "./MyClasses/Modals/LoginModal";

const NavBar = () => {
    const history = useHistory();
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showLoginModal, setShowLoginModal] = useState(false);

    function openLoginModal() {
        setShowLoginModal(true);
    }

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowModeratorBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
        history.push("/home");
        window.location.reload();
    };

    return (
      <div style={{overflowX:"hidden"}}>
          <LoginModal
            show={showLoginModal}
            setShow={setShowLoginModal}/>
        <nav className="navbar navbar-expand-lg navbar-dark py-3 shadow" aria-label="Third navbar example"
             style={{backgroundColor: "#333"}}
        >
            <div className="container">
                <h4 style={{color: "#9f9f9f"}}>SmartCards</h4>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample03">
                    <div className="navbar-nav ms-auto mb-2 mb-sm-0">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {showModeratorBoard && (
                            <li className="nav-item">
                                <Link to={"/mod"} className="nav-link">
                                    Moderator Board
                                </Link>
                            </li>
                        )}

                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}

                        {currentUser && !showAdminBoard && (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/myclass"} className="nav-link">
                                        My Classes
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="#">Search Flashcards</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link me-4" href="#">Make Flashcards</a>
                                </li> */}
                            </div>
                        )}

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li>
                                    <IoPersonCircleSharp size="2em"
                                    style={{position:"relative", top:"4px"}}/>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                         {currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/home"} className="nav-link" onClick={logOut}>
                                        LogOut
                                    </Link>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    {/*<Link to={"/login"} className="nav-link">*/}
                                    <Link to={"/#0"} className="nav-link" onClick={()=> openLoginModal()}>
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </nav>

      </div>
    )
}

export default NavBar
